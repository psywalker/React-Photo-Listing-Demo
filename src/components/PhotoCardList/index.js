import React, { memo } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Masonry from 'react-masonry-component';

const PhotoCardList = memo(({
  onSearchTagValue,
  getPaginationChange,
  cards,
}) => (
  <InfiniteScroll
    pageStart={0}
    element="div"
    data-test="photoCardList"
    initialLoad={false}
    threshold={250}
    loadMore={getPaginationChange}
    loader={<div className="loader" key={0}>Loading ...</div>}
    hasMore
  >
    <Masonry
      className="photo-card-list"
      elementType="ul"
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}
    >
      { cards.map((item) => <div>{item.photoID}</div>)}
    </Masonry>
  </InfiniteScroll>
));

PhotoCardList.propTypes = {
  onSearchTagValue: PropTypes.func,
  getPaginationChange: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.object),
};
PhotoCardList.defaultProps = {
  onSearchTagValue: () => {},
  getPaginationChange: () => {},
  cards: [],
};

export default PhotoCardList;
