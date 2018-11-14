import React from 'react';
import {
  FormInline,
  Fa,
} from 'mdbreact';

const Search = () => (
  <div className="flex-container">
    <FormInline className="md-form ml-3">
      <Fa icon="search" />
      <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
    </FormInline>
  </div>);

export default Search;
