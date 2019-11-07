import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Input, AutoComplete } from 'antd';
import debounce from 'lodash/debounce';
import './index.scss';

const InputSearch = Input.Search;
function onSelect(value) {
  console.log('onSelect', value);
}
const { Option } = AutoComplete;

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}


function renderOption(item) {
  return (
    <Option key={item.category} text={item.category}>
      <div className="global-search-item">
        <span className="global-search-item-desc">
          Found
          {' '}
          {item.query}
          {' '}
          on
          {' '}
          {item.category}

        </span>
        <span className="global-search-item-count">
          {' '}
          {item.count}
          {' '}
          results
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
      dataSource: [
        {
          query: 'work',
          category: 'work',
          count: getRandomInt(200, 100),
        },
        {
          query: 'word',
          category: 'word',
          count: getRandomInt(200, 100),
        },
      ],
    };
  }

  componentDidUpdate = (prevProps) => {
    const { queryText } = this.props;
    if (prevProps.queryText !== queryText) {
      const { dataSource } = this.state;
      this.setState({
        dataSource,
        inputValue: queryText,
      });
    }
  };

  onChangeDebounced = debounce((value) => {
    const { onChangeInputValue } = this.props;
    //onChangeInputValue(value);
  }, 5000)

  submitSearch = () => {
    const { inputValue, dataSource } = this.state;
    const { onSearchInputValue } = this.props;

    console.log("1: ", inputValue)
    if (inputValue) {
      console.log("2: ", dataSource)
      onSearchInputValue(inputValue);
      const newObj = {
        query: inputValue,
        category: inputValue,
        count: getRandomInt(200, 100),
      };
      this.setState({
        inputValue,
        dataSource: [...dataSource, newObj],
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      // inputValue: event.target.value,
      dataSource: event ? this.searchResult(event) : [],
      inputValue: event,
    }, () => {
      const { inputValue } = this.state;
      //if (inputValue) this.onChangeDebounced(inputValue);
    });
  };

  searchResult = (query) => {
    const { inputValue, dataSource } = this.state;
    return dataSource.map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }))
    // return new Array(getRandomInt(5))
    //   .join('.')
    //   .split('.')
    //   .map((item, idx) => ({
    //     query,
    //     category: `${query}${idx}`,
    //     count: getRandomInt(200, 100),
    //   }));
  }

  handleSearch = (value) => {
    const { inputValue } = this.state;
    this.setState({
      inputValue,
      dataSource: value ? this.searchResult(value) : [],
    });
  };

  handleKeyPress = (ev) => {
    console.log('handleKeyPress', ev);
  };

  render() {
    const { inputValue, dataSource } = this.state;
    return (
      <div
        data-test="searchContainer"
        className="search"
      >
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '100%' }}
          dataSource={dataSource.map(renderOption)}
          onSelect={this.submitSearch}
          onSearch={this.handleInputChange}
          value={inputValue}
          // placeholder="input here"
          // optionLabelProp="text"
        >
          <Input
            suffix={
              <Button
                className="search-btn"
                style={{ marginRight: -12 }}
                size="large"
                type="primary"
              >
                <Icon type="search" />
              </Button>
            }
          />
        </AutoComplete>
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
