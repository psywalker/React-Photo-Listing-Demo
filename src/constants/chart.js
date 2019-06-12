export const INITIONAL_CHARTS_CONFIGS = {
  highchartsDownloadsConfig: {
    title: 'My Downloads',
    seriesName: 'Downloads',
    colors: 'rgba(255, 0, 255, .5)',
  },
  highchartsViewsConfig: {
    title: 'My Views',
    seriesName: 'Views',
    colors: 'rgba(255, 165, 0, .5)',
  },
  highchartsLikesConfig: {
    title: 'My Likes',
    seriesName: 'Likes',
    colors: 'rgba(0, 255, 0, .5)',
  },
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
