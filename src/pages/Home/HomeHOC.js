import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Home from '.';
import {
  cardsPhotosRequestAction,
  paginationChangeAction,
  filterItemValueAction,
  searchTextAction,
  searchChangeInputValueAction,
} from '../../actions';

export const mapStateToProps = state => state.photolisting;

const mapDispatchToProps = ({
  handleСardsPhotosAction: cardsPhotosRequestAction,
  paginationChangeAction,
  filterItemValueAction,
  searchTextAction,
  searchChangeInputValueAction,
});

export default withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home));
