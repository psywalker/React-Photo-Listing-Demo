import { connect } from 'react-redux';
import HomeTest from './HomeTest';
import {
  cardsPhotosRequestAction,
  paginationChangeAction,
  filterItemValueAction,
  searchTextAction,
  searchChangeInputValueAction,
} from '../../actions';

// export const mapStateToProps = state => state.photolisting;

// const mapDispatchToProps = ({
//   handleСardsPhotosAction: cardsPhotosRequestAction,
//   paginationChangeAction,
//   filterItemValueAction,
//   searchTextAction,
//   searchChangeInputValueAction,
// });
// const ContainerComponent = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(HomeTest);

// export default ContainerComponent;
export default connect(null, null)(HomeTest);
