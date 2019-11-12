import React, { memo, useState, useEffect } from 'react';
import i18next from 'i18next';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeLang } from '../../actions';
import {
  URL_FOR_FLAG_RU,
  URL_FOR_FLAG_EN,
} from '../../constants';
import './index.scss';

const { Option } = Select;

const SelectLanguage = memo(() => {
  const [selectVisible, setSelectVisible] = useState(false);
  const dispatch = useDispatch();
  const propsLang = useSelector(state => state.lang);

  const setLang = (value) => {
    i18next.changeLanguage(value);
    dispatch(changeLang(value));
    window.localStorage.setItem('lang', value);
  };
  const onVisibleChange = (value) => {
    setSelectVisible(value);
  };
  const handleScroll = () => {
    setSelectVisible(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      data-test="selectLanguage"
      className="language"
    >
      <Select defaultValue={propsLang} onChange={setLang} open={selectVisible} onDropdownVisibleChange={onVisibleChange}>
        <Option value="ru">
          <img className="language__img" src={URL_FOR_FLAG_RU} alt="Ru" />
        </Option>
        <Option value="en">
          <img className="language__img" src={URL_FOR_FLAG_EN} alt="En" />
        </Option>
      </Select>
    </div>
  );
});

export default SelectLanguage;
