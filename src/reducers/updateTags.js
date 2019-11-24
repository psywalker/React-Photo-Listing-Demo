import initialStore from '../initialStore';
import filters from '../filters';

const updateTags = (state = initialStore, action = {}) => {
  switch (action.type) {
    case 'UPDATE_TAGS_START': {
      const { newTagvalue } = action;
      const tag = filters.filter(item => item.label.toLowerCase() === newTagvalue.toLowerCase());

      return {
        tagValue: tag.length ? tag[0].filterValue : newTagvalue,
        isUpdateTag: true,
        id: tag.length ? tag[0].id : null,
      };
    }
    case 'UPDATE_TAGS_END': {
      return {
        ...state,
        isUpdateTag: false,
      };
    }
    default:
      return state;
  }
};

export default updateTags;
