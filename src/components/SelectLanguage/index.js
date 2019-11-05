import React, { memo, useEffect } from 'react';
import i18next from 'i18next';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeLang } from '../../actions';
import detectLang from '../../utils/detectLang';
import {
  URL_FOR_FLAG_RU,
  URL_FOR_FLAG_EN,
  INITIAL_LANG,
} from '../../constants';
import './index.scss';

const { Option } = Select;

const SelectLanguage = memo(() => {
  const dispatch = useDispatch();
  const langFromProps = useSelector(state => state.lang);
  let lang = detectLang();
  const langLocalStorage = window.localStorage.getItem('lang');
  if (langLocalStorage && langFromProps !== langLocalStorage) {
    dispatch(changeLang(langLocalStorage));
    i18next.changeLanguage(langLocalStorage);
    lang = langLocalStorage;
  } else {
    dispatch(changeLang(langLocalStorage));
    i18next.changeLanguage(langLocalStorage);
  }
  // if (langLocalStorage && langLocalStorage !== lang) {
  //   lang = langLocalStorage;
  //   i18next.changeLanguage(langLocalStorage);
  // }

  // useEffect(() => {
  //   if (INITIAL_LANG !== lang) dispatch(changeLang(lang));
  // }, [dispatch, lang]);
  const handleChange = (value) => {
    i18next.changeLanguage(value);
    dispatch(changeLang(value));
    window.localStorage.setItem('lang', value);
  };
  return (
    <div
      data-test="selectLanguage"
      className="language"
    >
      <Select defaultValue={lang} onChange={handleChange}>
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
