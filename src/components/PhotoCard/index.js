import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Tag,
  Popover,
} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Tags from '../Tags';
import './index.scss';

export const getTagsVisibleArr = item => (
  item.tags.length < 4
    ? item.tags
    : item.tags.slice(0, 3)
);

export const getTagsHiddenArr = item => (
  item.tags.length > 3
    ? item.tags.slice(3)
    : false
);

const PhotoCard = memo(({
  onSearchTagValue,
  getCardsPhotosTest,
  cards,
}) => {
  const loadItems = () => {
    console.log("1: ");
    getCardsPhotosTest();
  };
  return (
    <InfiniteScroll
      pageStart={0}
      element="ul"
      className="photo-card-list"
      data-test="photoCardList"
      loadMore={loadItems}
      loader={<div className="loader" key={0}>Loading ...</div>}
      hasMore
    >
      { cards.map((item) => {
        const tagsVisibleArr = getTagsVisibleArr(item);
        const tagsHiddenArr = getTagsHiddenArr(item);
        return (
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
                <Tags
                  data-test="photoCardTagMainContainer"
                  handleMethod={onSearchTagValue}
                  tags={tagsVisibleArr}
                />
                { tagsHiddenArr && (
                  <Popover
                    data-test="photoCardPopover"
                    placement="top"
                    title="Remaining tags"
                    content={(
                      <Tags
                        data-test="photoCardTagPopup"
                        handleMethod={onSearchTagValue}
                        tags={tagsHiddenArr}
                      />
                    )}
                    trigger="click"
                  >
                    <Tag
                      data-test="photoCardTagMore"
                      className="photo-card-badge__tag"
                    >
                      more tags...
                    </Tag>
                  </Popover>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </InfiniteScroll>
  );
});


PhotoCard.propTypes = {
  onSearchTagValue: PropTypes.func,
  getCardsPhotosTest: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.object),
};
PhotoCard.defaultProps = {
  onSearchTagValue: () => {},
  getCardsPhotosTest: () => {},
  cards: [],
};

export default PhotoCard;
