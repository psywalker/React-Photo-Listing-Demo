import React, { memo } from 'react';
import i18next from 'i18next';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { updateChartsStart } from '../../actions';
import { URL_FOR_FLAG_RU, URL_FOR_FLAG_EN } from '../../constants';
import './index.scss';

const { Option } = Select;

const SelectLanguage = memo(() => {
  const dispatch = useDispatch();
  const userLang = window.navigator.language || window.navigator.userLanguage;
  const isLangRu = userLang.includes('ru');
  const defaultValue = isLangRu ? 'ru' : 'en';
  if (isLangRu) i18next.changeLanguage('ru');
  else i18next.changeLanguage('en');
  const handleChange = (value) => {
    i18next.changeLanguage(value);
    dispatch(updateChartsStart());
  };
  return (
    <div
      data-test="selectLanguage"
      className="language"
    >
      <Select defaultValue={defaultValue} onChange={handleChange}>
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
