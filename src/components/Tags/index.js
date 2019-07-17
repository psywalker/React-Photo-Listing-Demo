import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const Tags = memo(({ handleMethod, tags }) => (
  tags.map(item => (
    <Tag
      key={item.title}
      onClick={() => handleMethod(item.title, 'tags')}
      className="tag"
      data-test="tag"
    >
      {item.title}
    </Tag>
  ))
));

Tags.propTypes = {
  handleMethod: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.object),
};
Tags.defaultProps = {
  handleMethod: () => {},
  tags: [],
};

export default Tags;