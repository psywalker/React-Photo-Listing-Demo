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
          userAvatar: 'User Avatar',
          profileAvatar: 'Profile avatar',
          profileDesc: 'Download free, beautiful high-quality photos curated by',
          lang: {
            title: 'Choose language',
            ru: 'Russian',
            en: 'English',
          },
          userTabs: {
            myPhotos: 'My photos',
            myLikes: 'My Likes',
            myStatistic: 'My statistic',
          },
          chartsConfig: {
            myDownloads: 'My Downloads',
            myViews: 'My Views',
            myLikes: 'My Likes',
            seriesNameDownloads: 'Downloads',
            seriesNameViews: 'Views',
            seriesNameLikes: 'Likes',
            yAxisTitle: 'Values',
          },
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
          errors: {
            oops: 'OOPS',
            goBackHome: 'BACK TO HOME',
            increasedNumberDownloads: 'You have increased the number of downloads per hour. Try later.',
            errorLoadingPhotolisting: 'Error loading photolisting',
            imagesNotFound: 'No images were found for your request.',
            photoNotFound: 'Sorry, no photo found',
            failedUserStatistics: 'Failed to get user statistics. Try later again',
            userNotFound: 'Sorry, user is not found',
            authorizationFailed: 'An authorization failed. Try logging in later!',
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
          userAvatar: 'Аватарка пользователя',
          profileAvatar: 'Аватарка профиля',
          profileDesc: 'Скачать бесплатные, красивые, высококачественные фотографии, выбранные пользователем ',
          lang: {
            title: 'Выберите язык',
            ru: 'Русский',
            en: 'Английский',
          },
          userTabs: {
            myPhotos: 'Мои фотографии',
            myLikes: 'Мои лайки',
            myStatistic: 'Моя статистика',
          },
          chartsConfig: {
            myDownloads: 'Мои скачивания',
            myViews: 'Мои просмотры',
            myLikes: 'Мои лайки',
            seriesNameDownloads: 'Скачивания',
            seriesNameViews: 'Просмотры',
            seriesNameLikes: 'Лайки',
            yAxisTitle: 'Количество',
          },
          photoInfo: {
            info: 'Информация о фото',
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
          errors: {
            oops: 'Упс',
            goBackHome: 'Вернуться на главную',
            increasedNumberDownloads: 'Вы привысили число скачиваний за час. Попробуйте позже.',
            errorLoadingPhotolisting: 'Ошибка загрузки фотолистинга',
            imagesNotFound: 'По этому запросу картинок не найдено.',
            photoNotFound: 'Извините, фото не найдено',
            failedUserStatistics: 'Не удалось получить статистику пользователя. Попробуйте позже.',
            userNotFound: 'Извините, пользователь не найден',
            authorizationFailed: 'Авторизация не прошла',
          },
        },
      },
    },
    fallbackLng: 'ru',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparation: true, // we use content as keys

  });

export default i18n;
