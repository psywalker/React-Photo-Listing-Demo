import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tag } from 'antd';
import { updateTagsStartAction, filterItemValueAction } from '../../actions';
import filters from '../../filters';
import './index.scss';

const NavTop = memo(() => {
  const dispatch = useDispatch();
  const navTopItemActive = useSelector(state => state.updateTags.id);
  return (
    <ul className="nav-top" data-test="navTop">
      {filters.map(item => (
        <li
          key={item.id}
          data-test="navTopItem"
          className={`nav-top__item ${item.border ? 'nav-top__item_border-right' : ''}`}
        >
          <Tag
            data-test="navTopItemTag"
            color={`${item.id === navTopItemActive ? 'purple' : ''}`}
            onClick={() => {
              if (item.id !== navTopItemActive) {
                dispatch(filterItemValueAction(item.filterValue, item.id));
                dispatch(updateTagsStartAction(item.filterValue));
              }
            }}
          >
            {item.label}
          </Tag>
        </li>
      ))}
    </ul>
  );
});

export default NavTop;
