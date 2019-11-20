import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  Icon,
  Button,
  Input,
  AutoComplete,
} from 'antd';
import declOfNum from '../../utils/declOfNum';
import getURLParam from '../../utils/getURLParam';
import handleVisibleByScroll from '../../utils/handleVisibleByScroll';
import isStrSearchEmpty from '../../utils/isStrSearchEmpty';
import { QUERY_TEXT_DEFAULT } from '../../constants';
import filters from '../../filters';
import './index.scss';

const { Option } = AutoComplete;

class Search extends PureComponent {
  constructor(...args) {
    super(...args);
    const { queryText } = this.props;
    this.state = {
      inputValue: queryText,
      lastRequest: queryText,
      isSelectOpen: false,
      dataSource: [],
      options: [],
    };

    this.searchInput = null;
  }

  componentDidMount = () => {
    const searchOptions = JSON.parse(window.localStorage.getItem('searchOptions')) || [];
    this.setState({ options: searchOptions });
    handleVisibleByScroll('addEventListener', ['scroll', 'resize'], [this.handleScroll]);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { navTopItemActive, queryText, changeQueryText } = this.props;
    const { options, inputValue } = this.state;
    this.searchInput.focus();
    if (prevState.inputValue !== inputValue) {
      changeQueryText(inputValue);
    }

    if (inputValue === null && queryText === QUERY_TEXT_DEFAULT) {
      this.setState({ inputValue: QUERY_TEXT_DEFAULT, lastRequest: QUERY_TEXT_DEFAULT });
    }
    if (prevProps.navTopItemActive !== navTopItemActive) {
      const tagName = getURLParam(window.location, 'search');
      this.setState({ inputValue: tagName });
      if (tagName) {
        const tag = filters.filter(item => item.label.toLowerCase() === tagName.toLowerCase());
        if (tag.length) {
          const { lastRequest } = this.state;
          //if (lastRequest !== tagName) this.setState({ lastRequest: tagName });
        }
      }
    }
    if (JSON.stringify(prevState.options) !== JSON.stringify(options)) {
      window.localStorage.setItem('searchOptions', JSON.stringify(options));
      this.setState({ isSelectOpen: false });
    }
  };

  componentWillUnmount = () => {
    handleVisibleByScroll('removeEventListener', ['scroll', 'resize'], [this.handleScroll]);
  }

  handleUrl = (str) => {
    const { history } = this.props;
    const newUrl = `${isStrSearchEmpty(str) ? '' : `?search=${str}`}`;
    history.push(newUrl, {});
  };

  handleScroll = () => {
    this.setState({ isSelectOpen: false });
  };

  renderOption = (item) => {
    const { t } = this.props;
    return (
      <Option key={item.query} text={item.query}>
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
    const { onSearchInputValue } = this.props;
    const { lastRequest } = this.state;
    const { value } = e.target || e;
    this.setState({ isSelectOpen: !!value });
    this.searchResult(value);
    if (!e.target && e && e !== lastRequest) {
      this.increaseCount(e);
      onSearchInputValue(e);
      this.setState({ lastRequest: e });
    } else if (e.keyCode === 13 && value && value !== lastRequest) {
      this.increaseCount(value);
      this.createNewOption(value);
      this.setState({ isSelectOpen: false });
      onSearchInputValue(value);
      this.setState({ lastRequest: value });
    }

    if (
      (!e.target && e && e === lastRequest)
      || (e.keyCode === 13 && value && value === lastRequest
      )) {
      this.setState({ isSelectOpen: false }, () => this.setState({ isSelectOpen: false }));
    }

    return false;
  };

  handleButton = (e) => {
    e.stopPropagation();
    e.target.blur();
    const { onSearchInputValue } = this.props;
    const { inputValue, lastRequest } = this.state;

    if (inputValue && inputValue !== lastRequest) {
      this.increaseCount(inputValue);
      this.createNewOption(inputValue);
      onSearchInputValue(inputValue);
      this.setState({ lastRequest: inputValue });
    }

    if (inputValue && inputValue === lastRequest) {
      this.searchInput.focus();
      this.setState({ isSelectOpen: false });
    }
  }

  handleInputChange = (value) => {
    this.setState({
      isSelectOpen: !!value,
      inputValue: value,
    });
    this.handleUrl(value);
  };

  searchResult = (value) => {
    if (!value) return;
    const { options } = this.state;
    const items = options
      .filter(({ query }) => query.startsWith(value))
      .sort((a, b) => b.count - a.count);

    this.setState({ dataSource: items });
  }

  handleInputBlur = () => {
    this.setState({ isSelectOpen: false });
    this.searchInput.blur();
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
        options: [...options, { query: value, count: 1 }],
      });
    }
  };

  increaseCount = (value) => {
    const { options } = this.state;

    const newOptions = options
      .map(item => (item.query === value
        ? { ...item, count: item.count + 1 }
        : item));

    return this.setState({
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
          defaultActiveFirstOption={false}
          placeholder={t('search.placeholder')}
          optionLabelProp="text"
          value={inputValue}
          defaultOpen={false}
          backfill
          allowClear
          autoFocus
        >
          <Input
            onKeyDown={this.handleKeyDown}
            onClick={this.handleInputFocus}
            value={inputValue}
            ref={(searchInput) => {
              this.searchInput = searchInput;
            }}
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
  queryText: PropTypes.string,
  onSearchInputValue: PropTypes.func,
  t: PropTypes.func,
  changeQueryText: PropTypes.func,
  history: PropTypes.shape({}),
  navTopItemActive: PropTypes.number,
};
Search.defaultProps = {
  queryText: '',
  changeQueryText: () => {},
  onSearchInputValue: () => {},
  t: () => {},
  history: {},
  navTopItemActive: 2,
};

export default withTranslation()(Search);
