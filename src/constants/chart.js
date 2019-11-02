import i18n from '../i18n';

export const INITIONAL_CHARTS_CONFIGS = (num) => {
  const arr = [
    {
      title: i18n.t('chartsConfig.myDownloads'),
      seriesName: i18n.t('chartsConfig.seriesNameDownloads'),
      colors: 'rgba(255, 0, 255, .5)',
    },
    {
      title: i18n.t('chartsConfig.myViews'),
      seriesName: i18n.t('chartsConfig.seriesNameViews'),
      colors: 'rgba(255, 165, 0, .5)',
    },
    {
      title: i18n.t('chartsConfig.myLikes'),
      seriesName: i18n.t('chartsConfig.seriesNameLikes'),
      colors: 'rgba(0, 255, 0, .5)',
    },
  ];
  return arr[num];
};
export const CHARTS_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const CHART_CONFIG = {
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 700,
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
        },
      },
    }],
  },
};
