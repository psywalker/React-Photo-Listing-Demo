import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Button,
  Input,
  AutoComplete,
} from 'antd';
import debounce from 'lodash/debounce';
import declOfNum from '../../utils/declOfNum';
import getURLParam from '../../utils/getURLParam';
import './index.scss';

const { Option } = AutoComplete;

function renderOption(item) {
  return (
    <Option key={item.category} text={item.category}>
      <div className="global-search-item">
        <span className="global-search-item-desc">
          Вы искали слово
          {' '}
          <b>
            «
            {item.query}
            »
          </b>
        </span>
        <span className="global-search-item-count">
          {' '}
          {item.count}
          {' '}
          {declOfNum(item.count)}
        </span>
      </div>
    </Option>
  );
}
class Search extends PureComponent {
  constructor(...args) {
    super(...args);
    const { queryText } = this.props;
    this.state = {
      inputValue: queryText,
      dataSource: [],
      queryFlag: false,
      options: [
        {
          query: 'working',
          category: 'working',
          count: 1,
        },
        {
          query: 'wording',
          category: 'wording',
          count: 1,
        },
      ],
    };
    this.inputSearch = null;
  }

  componentDidUpdate = (prevProps) => {
    const { queryText } = this.props;
    if (prevProps.queryText !== queryText) { 
      const tagName = getURLParam(window.location, 'search');
      const value = !tagName ? '' : queryText;
      this.setState({
        inputValue: value,
      });
    }
  };

  onChangeDebounced = debounce((value) => {
    const { onChangeInputValue } = this.props;
    onChangeInputValue(value);
  }, 500)

  submitSearch = (value) => {
    const { onSearchInputValue } = this.props;
    if (value) {
      console.log("1: submitSearch::: ", value)
      this.setState({
        queryFlag: true,
      });
      this.increaseCount(value);
      onSearchInputValue(value);
    }
  }

  handleButton = (e) => {
    e.stopPropagation();
    e.target.blur();
    const { onSearchInputValue } = this.props;
    const { inputValue } = this.state;

    if (inputValue) {
      this.increaseCount(inputValue);
      this.createNewOption(inputValue);
      onSearchInputValue(inputValue);
    }
  }

  handleInputChange = (value) => {
    this.setState({
      inputValue: value,
    }, () => {
      const { queryFlag, inputValue } = this.state;
      if (!queryFlag) this.onChangeDebounced(inputValue);
      if (queryFlag) this.setState({ queryFlag: false });
    });
  };

  searchResult = (value) => {
    if (!value) return [];
    const { options } = this.state;
    const items = options
      .filter(({ query }) => value.length <= query.length)
      .filter((item) => {
        const querySearch = item.query.substr(0, value.length).toLowerCase();
        return value.toLowerCase() === querySearch ? item : false;
      }).sort((a, b) => b.count - a.count);

    if (!items.length) return [];
    return items;
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: this.searchResult(value),
    });
  };

  handleKeyUp = (e) => {
    const { value } = e.target;
    if (e.keyCode === 13 && value) {
      
      const { onSearchInputValue } = this.props;
      const { queryFlag } = this.state;
      console.log("2: handleKeyUp::: ", e.target)

      if (!queryFlag) this.increaseCount(value);
      else this.setState({ queryFlag: false });
      this.createNewOption(value);
      onSearchInputValue(value);
    }
  };

  handleInputFocus = () => {
    const { inputValue } = this.state;
    this.handleSearch(inputValue);
  };

  createNewOption = (value) => {
    const { options } = this.state;
    const isQuery = options.some(item => item.query === value);
    if (!isQuery) {
      this.setState({
        options: [...options, { query: value, category: value, count: 1 }],
      });
    }
  };

  increaseCount = (value) => {
    const { options, dataSource } = this.state;
    let newDataSource = [];
    const newOptions = options.map((itemOption) => {
      if (value === itemOption.query) {
        newDataSource = dataSource.map(itemDataSource => (
          value !== itemDataSource.query
            ? itemDataSource
            : { ...itemDataSource, count: itemDataSource.count + 1 }
        )).sort((a, b) => b.count - a.count);
        return { ...itemOption, count: itemOption.count + 1 };
      }
      return itemOption;
    }).sort((a, b) => b.count - a.count);

    this.setState({
      dataSource: newDataSource,
      options: newOptions,
    });
  }

  render() {
    const { inputValue, dataSource } = this.state;
    return (
      <div
        data-test="searchContainer"
        className="search"
      >
        <AutoComplete
          className="global-search"
          style={{ width: '100%' }}
          dataSource={dataSource.map(renderOption)}
          onSelect={this.submitSearch}
          onSearch={this.handleSearch}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          defaultActiveFirstOption={false}
          optionLabelProp="text"
          value={inputValue}
          backfill
          allowClear
        >
          <Input
            onKeyUp={this.handleKeyUp}
            onClick={this.handleInputFocus}
            ref={(input) => {
              this.inputSearch = input;
            }}
            value={inputValue}
            suffix={(
              <Button
                className="search-btn"
                style={{ marginRight: -12 }}
                onClick={this.handleButton}
              >
                <Icon type="search" />
              </Button>
            )}
          />
        </AutoComplete>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({}),
  queryText: PropTypes.string,
  onSearchInputValue: PropTypes.func,
  onChangeInputValue: PropTypes.func,
};
Search.defaultProps = {
  history: {},
  queryText: '',
  onSearchInputValue: () => {},
  onChangeInputValue: () => {},
};

export default Search;
