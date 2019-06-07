import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './index.css';

const InputSearch = Input.Search;

class Search extends Component {
  constructor(...args) {
    super(...args);
    const { queryText } = this.props;
    this.state = {
      inputValue: queryText,
    };
  }

  componentDidUpdate = (prevProps) => {
    const { queryText } = this.props;
    if (prevProps.queryText !== queryText) {
      this.setState({
        inputValue: queryText,
      });
    }
  };

  submitSearch = () => {
    const { inputValue } = this.state;
    const { onSearchInputValue } = this.props;
    if (inputValue) onSearchInputValue(inputValue);
  }

  changeInputValue = (e) => {
    const { onChangeInputValue } = this.props;
    console.log("1: ", e.target.value)
    this.setState({
      inputValue: e.target.value,
    }, () => {
      const { inputValue } = this.state;
      onChangeInputValue(inputValue);
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="search">
        <InputSearch
          className="search__input"
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
  onSearchInputValue: PropTypes.func,
  onChangeInputValue: PropTypes.func,
};
Search.defaultProps = {
  queryText: '',
  onSearchInputValue: () => {},
  onChangeInputValue: () => {},
};

export default Search;
