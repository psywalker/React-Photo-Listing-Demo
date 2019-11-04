import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Tag,
  Popover,
} from 'antd';
import Tags from '../../Tags';
import './index.scss';

export const getTagsVisibleArr = tags => (
  tags.length < 4
    ? tags
    : tags.slice(0, 3)
);

export const getTagsHiddenArr = tags => (
  tags.length > 3
    ? tags.slice(3)
    : false
);

const PhotoCardTags = memo(({
  onSearchTagValue,
  tags,
}) => {
  const tagsVisibleArr = getTagsVisibleArr(tags);
  const tagsHiddenArr = getTagsHiddenArr(tags);

  return (
    <div
      className="photo-card-list__tags photo-card-tags"
      data-test="photoCardTags"
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
            className="photo-card-tags__tag"
          >
            more tags...
          </Tag>
        </Popover>
      )}
    </div>
  );
});


PhotoCardTags.propTypes = {
  onSearchTagValue: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.shape({})),
};
PhotoCardTags.defaultProps = {
  onSearchTagValue: () => {},
  tags: [],
  photoUrlSizes: [],
};

export default PhotoCardTags;
