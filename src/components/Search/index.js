import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
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

class Search extends PureComponent {
  constructor(...args) {
    super(...args);
    const { queryText } = this.props;
    this.state = {
      inputValue: queryText,
      isSelectOpen: false,
      dataSource: [],
      options: [],
    };
  }

  componentDidMount = () => {
    const searchOptions = JSON.parse(window.localStorage.getItem('searchOptions')) || [];
    this.setState({ options: searchOptions });

    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { queryText } = this.props;
    const { options } = this.state;
    if (prevProps.queryText !== queryText) {
      const tagName = getURLParam(window.location, 'search');
      const value = !tagName ? '' : queryText;
      this.setState({ inputValue: value });
    }
    if (JSON.stringify(prevState.options) !== JSON.stringify(options)) {
      window.localStorage.setItem('searchOptions', JSON.stringify(options));
      this.setState({ isSelectOpen: false });
    }
  };

  onChangeDebounced = debounce((value) => {
    const { onChangeInputValue } = this.props;
    onChangeInputValue(value);
  }, 500)

  componentUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.setState({ isSelectOpen: false });
  };

  renderOption = (item) => {
    const { t } = this.props;
    return (
      <Option key={item.category} text={item.category}>
        <div className="global-search-item">
          <span className="global-search-item-desc">
            { t('search.youSearched') }
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

  handleKeyDown = (e) => {
    const { value } = e.target || e;
    this.setState({ isSelectOpen: !!value });
    this.searchResult(value);
    if (!e.target && e) {
      this.increaseCount(e);
      return false;
    }
    if (e.keyCode === 13 && value) {
      const { onSearchInputValue } = this.props;
      this.increaseCount(value);
      this.createNewOption(value);
      onSearchInputValue(value);
      this.setState({ isSelectOpen: false });
    }
    return false;
  };

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
      isSelectOpen: !!value,
      inputValue: value,
    });
    this.onChangeDebounced(value);
  };

  searchResult = (value) => {
    if (!value) return;
    const { options } = this.state;
    const items = options
      .filter(({ query }) => value.length <= query.length)
      .filter((item) => {
        const querySearch = item.query.substr(0, value.length).toLowerCase();
        return value.toLowerCase() === querySearch ? item : false;
      }).sort((a, b) => b.count - a.count);

    this.setState({ dataSource: items.length ? items : [] });
  }

  handleInputBlur = () => {
    this.setState({ isSelectOpen: false });
  };

  handleInputFocus = () => {
    const { inputValue } = this.state;
    this.searchResult(inputValue);
    this.setState({ isSelectOpen: true });
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

    return this.setState({
      dataSource: newDataSource,
      options: newOptions,
    });
  }

  render() {
    const { inputValue, dataSource, isSelectOpen } = this.state;
    const { t } = this.props;
    return (
      <div
        data-test="searchContainer"
        className="search"
      >
        <AutoComplete
          className="global-search"
          style={{ width: '100%' }}
          dataSource={dataSource.map(this.renderOption)}
          open={isSelectOpen}
          onBlur={this.handleInputBlur}
          onSelect={this.handleKeyDown}
          onSearch={this.searchResult}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          defaultActiveFirstOption={false}
          placeholder={t('search.placeholder')}
          optionLabelProp="text"
          value={inputValue}
          backfill
          allowClear
          autoFocus
        >
          <Input
            onKeyDown={this.handleKeyDown}
            onClick={this.handleInputFocus}
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
  t: PropTypes.func,
};
Search.defaultProps = {
  history: {},
  queryText: '',
  onSearchInputValue: () => {},
  onChangeInputValue: () => {},
  t: () => {},
};

export default withTranslation()(Search);
