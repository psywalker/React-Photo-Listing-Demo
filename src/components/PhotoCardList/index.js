import React, { memo } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Masonry from 'react-masonry-component';
import PhotoCard from './PhotoCard';
import SpinnerPhotoCard from '../SpinnerPhotoCard';
import './index.scss';

const PhotoCardList = memo(({
  onSearchTagValue,
  getPaginationChange,
  cards,
  totalCards,
}) => (
  <InfiniteScroll
    pageStart={0}
    data-test="photoCardList"
    initialLoad={false}
    threshold={0}
    loadMore={getPaginationChange}
    loader={totalCards > cards.length ? <SpinnerPhotoCard key="spinner" /> : null}
    hasMore={totalCards > cards.length}
  >
    <Masonry
      className="photo-card-list"
      elementType="ul"
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}
    >
      { cards.map(item => (
        <PhotoCard
          key={item.photoID}
          data-test="photoCard"
          onSearchTagValue={onSearchTagValue}
          getPaginationChange={getPaginationChange}
          item={item}
        />
      ))}
    </Masonry>
  </InfiniteScroll>
));

PhotoCardList.propTypes = {
  onSearchTagValue: PropTypes.func,
  getPaginationChange: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.object),
  totalCards: PropTypes.number,
};
PhotoCardList.defaultProps = {
  onSearchTagValue: () => {},
  getPaginationChange: () => {},
  cards: [],
  totalCards: 0,
};

export default PhotoCardList;
