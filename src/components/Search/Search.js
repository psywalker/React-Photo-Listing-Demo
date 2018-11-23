import React from 'react';
import PropTypes from 'prop-types';
import {
  FormInline,
  Fa,
} from 'mdbreact';

const Search = ({ getSearchText }) => (
  <div className="flex-container">
    <FormInline className="md-form ml-3">
      <Fa icon="search" onClick={(e) => getSearchText(textInput, e)} />
      <input onKeyPress={(e) => getSearchText(textInput, e)} onInput={(e) => getSearchText(textInput, e)} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
    </FormInline>
  </div>);


Search.propTypes = {
  getSearchText: PropTypes.func,
};
Search.defaultProps = {
  getSearchText: () => {},
};

export default Search;
