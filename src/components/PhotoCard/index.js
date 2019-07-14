import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  Avatar,
  Tag,
  Popover,
} from 'antd';
import './index.scss';

const { Meta } = Card;

const PhotoCard = memo(({
  onSearchTagValue,
  cards,
}) => (
  <ul className="photo-list" data-test="PhotoList">
    {cards.map(item => (
      <li
        data-test="PhotoListItem"
        key={item.photoID}
        className="photo-list__item"
      >
        <div className="photo-card-self">
          <Card
            style={{ width: '100%' }}
            cover={(
              <Link
                className="photo-card__photo-link"
                to={`/photo/${item.photoID}`}
              >
                <img
                  className="photo-card__img"
                  alt="example"
                  src={item.photoName}
                />
              </Link>
          )}
          >
            { item.title && (
            <Link
              className="photo-card-self__link-ava"
              to={`/users/${item.userID}`}
            >
              <Meta
                avatar={
                  <Avatar src={item.userAvatar} />
              }
                title={item.title}
              />
            </Link>
            )}
            <p className="photo-card-self__desc">
              {`${item.photoDesc || 'No Description'}`}
            </p>
            <div className="photo-card-self__badge-wrap">
              {item.tags.map((itemTag, i) => {
                if (i < 3) {
                  return (
                    <Tag
                      key={itemTag.title}
                      onClick={() => onSearchTagValue(itemTag.title, 'tags')}
                      className="photo-card-self__badge"
                    >
                      {itemTag.title}
                    </Tag>
                  );
                }
                return null;
              })}
              {item.tags.length > 3 && (
              <Popover
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
                            className="photo-card-self__badge"
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
                <Tag className="photo-card-self__badge">more tags...</Tag>
              </Popover>
              )}
            </div>
          </Card>
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
