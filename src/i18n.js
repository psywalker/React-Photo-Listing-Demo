import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
          profile: 'Profile',
          login: 'Login',
          logout: 'Logout',
          goBack: 'Go back',
          download: 'Download',
          share: 'Share',
          showAllTags: 'Show all tags',
          allTags: 'All tags',
          photoInfo: {
            info: 'Info',
            published: 'Published on',
            views: 'Views',
            downloads: 'Downloads',
            likes: 'Likes',
            cameraMake: 'Camera Make',
            cameraModel: 'Camera Model',
            focalLength: 'Focal Length',
            aperture: 'Aperture',
            shutterSpeed: 'Shutter Speed',
            iso: 'ISO',
            dimensions: 'Dimensions',
          },
        },
      },
      ru: {
        translations: {
          profile: 'Профиль',
          login: 'Войти',
          logout: 'Выйти',
          goBack: 'Вернуться назад',
          download: 'Скачать',
          share: 'Поделиться',
          showAllTags: 'Показать все теги',
          allTags: 'Все теги',
          photoInfo: {
            info: 'Информация',
            published: 'Опубликовано в',
            views: 'Просмотры',
            downloads: 'Скачивания',
            likes: 'Лайки',
            cameraMake: 'Компания',
            cameraModel: 'Модель камеры',
            focalLength: 'Фокусное расстояние',
            aperture: 'Апертура',
            shutterSpeed: 'Скорость затвора',
            iso: 'ISO',
            dimensions: 'Размеры',
          },
        },
      },
    },
    fallbackLng: 'en',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false, // we use content as keys

  });

export default i18n;
