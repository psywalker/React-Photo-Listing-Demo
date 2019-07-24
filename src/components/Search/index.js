import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import './index.css';

const InputSearch = Input.Search;

class Search extends PureComponent {
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

  onChangeDebounced = debounce((value) => {
    const { onChangeInputValue } = this.props;
    onChangeInputValue(value);
  }, 500)

  submitSearch = () => {
    const { inputValue } = this.state;
    const { onSearchInputValue } = this.props;
    if (inputValue) onSearchInputValue(inputValue);
  }

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    }, () => {
      const { inputValue } = this.state;
      this.onChangeDebounced(inputValue);
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div
        data-test="searchContainer"
        className="search"
      >
        <InputSearch
          data-test="searchInput"
          className="search__input"
          value={inputValue}
          placeholder="Wallpapers"
          onChange={this.handleInputChange}
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
