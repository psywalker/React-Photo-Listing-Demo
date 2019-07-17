import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Tag,
  Popover,
} from 'antd';
import './index.scss';

const PhotoCard = memo(({
  onSearchTagValue,
  cards,
}) => (
  <ul
    className="photo-card-list"
    data-test="photoCardList"
  >
    { cards.map(item => (
      <li
        data-test="photoCardListItem"
        key={item.photoID}
        className="photo-card-list__item"
      >
        <div
          data-test="photoCard"
          className="photo-card"
        >
          <Link
            data-test="photoCardPhotoLink"
            to={`/photo/${item.photoID}`}
          >
            <img
              data-test="photoCardImg"
              className="photo-card__img"
              alt={item.photoAltDesc}
              src={item.photoName}
            />
          </Link>

          <div
            data-test="photoCardAutor"
            className="photo-card__autor photo-card-autor"
          >
            <Link
              data-test="photoCardAutorLink"
              className="photo-card-autor__link"
              to={`/users/${item.userID}`}
            >
              <img
                data-test="photoCardAutorAvatar"
                className="photo-card-autor__avatar"
                alt={item.userID}
                src={item.userAvatar}
              />
              <span
                data-test="photoCardAutorName"
                className="photo-card-autor__name"
              >
                { item.title }
              </span>
            </Link>
          </div>

          <p
            className="photo-card__desc"
            data-test="photoCardDesc"
          >
            { item.photoDesc }
          </p>

          <div
            className="photo-card__badge-container photo-card-badge"
            data-test="photoCardBadge"
          >
            {item.tags.map((itemTag, i) => {
              if (i < 3) {
                return (
                  <Tag
                    key={itemTag.title}
                    onClick={() => onSearchTagValue(itemTag.title, 'tags')}
                    className="photo-card-badge__tag"
                    data-test="photoCardBadgeTagMain"
                  >
                    {itemTag.title}
                  </Tag>
                );
              }
              return null;
            })}
 
            { item.tags.length > 3 && (
              <Popover
                data-test="photoCarPopover"
                placement="top"
                title="Remaining tags"
                content={(
                  <div>
                    {item.tags.map((itemTag, i) => {
                      if (i > 2) {
                        return (
                          <Tag
                            key={itemTag.title}
                            onClick={() => onSearchTagValue(itemTag.title, 'tags')}
                            className="photo-card-badge__tag"
                            data-test="photoCardBadgeTagInner"
                          >
                            {itemTag.title}
                          </Tag>
                        );
                      }
                      return null;
                    })}
                  </div>
              )}
                trigger="click"
              >
                <Tag
                  data-test="photoCardBadgeTagInnerMore"
                  className="photo-card-badge__tag"
                >
                  more tags...
                </Tag>
              </Popover>
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
));

PhotoCard.propTypes = {
  onSearchTagValue: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.object),
};
PhotoCard.defaultProps = {
  onSearchTagValue: () => {},
  cards: [],
};

export default PhotoCard;
