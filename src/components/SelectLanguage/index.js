import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { Select } from 'antd';
import { URL_FOR_FLAG_RU, URL_FOR_FLAG_EN } from '../../constants';
import './index.scss';

const { Option } = Select;

const SelectLanguage = memo(() => {
  const { t, i18n } = useTranslation();
  const isLangRu = i18next.language.includes('ru');
  const defaultValue = isLangRu ? 'ru' : 'en';
  const handleChange = (value) => {
    i18n.changeLanguage(value);
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
