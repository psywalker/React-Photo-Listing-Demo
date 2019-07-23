import { connect } from 'react-redux';
import Home from '.';
import {
  cardsPhotosRequestAction,
  paginationChangeAction,
  filterItemValueAction,
  searchTextAction,
  searchChangeInputValueAction,
} from '../../actions';

export const mapStateToProps = (state) => {
  const { photolisting } = state;
  return photolisting;
};

const mapDispatchToProps = ({
  handleСardsPhotosAction: cardsPhotosRequestAction,
  paginationChangeAction,
  filterItemValueAction,
  searchTextAction,
  searchChangeInputValueAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
