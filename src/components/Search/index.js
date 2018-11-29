import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormInline,
  Fa,
} from 'mdbreact';

class Search extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      inputValue: this.props.queryText,
    };
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.queryText !== this.props.queryText) {
      this.setState({
        inputValue: this.props.queryText,
      });
    }
  };

  submitSearch = (e) => {
    if(e.charCode === 13) {
      e.preventDefault();
      if(this.state.inputValue) this.props.onSearchInputValue(this.state.inputValue);
    } 
  }

  changeInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    }, () => {
      this.props.onChangeInputValue(this.state.inputValue);
    });
  };

  render() {

    return (
      <div className="flex-container">
        <FormInline className="md-form ml-3">
          <Fa icon="search" onClick={this.submitSearch} />
          <input onChange={this.changeInputValue} onInput={this.changeInputValue} onKeyPress={this.submitSearch} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" value={this.state.inputValue} />
        </FormInline>
      </div>
    );
  }
}

Search.propTypes = {
  queryText: PropTypes.string,
  getSearchInputValue: PropTypes.func,
};
Search.defaultProps = {
  queryText: '',
  getSearchInputValue: () => {},
};

export default Search;
