import initialStore from '../initialStore';

const charts = (state = initialStore, action = {}) => {
  switch (action.type) {
    case 'UPDATE_CHARTS_START':
      return {
        ...state,
        isChart: true,
      };
    case 'UPDATE_CHARTS_END':
      return {
        ...state,
        isChart: false,
      };
    default:
      return state;
  }
};

export default charts;
