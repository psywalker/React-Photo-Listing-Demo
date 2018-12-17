import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './index.css';
const InputSearch = Input.Search;

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

  submitSearch = () => {
    if(this.state.inputValue) this.props.onSearchInputValue(this.state.inputValue);
  }

  changeInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    }, () => {
      this.props.onChangeInputValue(this.state.inputValue);
    });
  };

  render() {
    const { inputValue } = this.state
    return (
      <div className="search">
        <InputSearch
          value={inputValue}
          placeholder="Wallpapers"
          onChange={value => this.changeInputValue(value)}
          onPressEnter={this.submitSearch}
          onSearch={this.submitSearch}
          style={{ width: '100%' }}
        />
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
