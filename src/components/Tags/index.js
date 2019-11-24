import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Tag } from 'antd';
import { updateTagsStartAction } from '../../actions';

const Tags = memo(({ handleMethod, tags }) => {
  const dispatch = useDispatch();
  return (
    tags.map(item => (
      <Tag
        key={item.title}
        onClick={() => {
          handleMethod(item.title, 'tags');
          dispatch(updateTagsStartAction(item.title));
        }}
        className="tag"
        data-test="tag"
      >
        {item.title}
      </Tag>
    )));
});

Tags.propTypes = {
  handleMethod: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.object),
};
Tags.defaultProps = {
  handleMethod: () => {},
  tags: [],
};

export default Tags;
