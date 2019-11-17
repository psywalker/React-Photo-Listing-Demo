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
import { QUERY_TEXT_DEFAULT } from '../../constants';
import './index.scss';

const { Option } = AutoComplete;

class Search extends PureComponent {
  constructor(...args) {
    super(...args);
    const { queryText: { value } } = this.props;
    this.state = {
      inputValue: value,
      isSelectOpen: false,
      dataSource: [],
      options: [],
    };
  }

  componentDidMount = () => {
    const searchOptions = JSON.parse(window.localStorage.getItem('searchOptions')) || [];
    this.setState({ options: searchOptions });
    handleVisibleByScroll('addEventListener', ['scroll', 'resize'], [this.handleScroll]);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { queryText } = this.props;
    const { options, inputValue } = this.state;
    if (prevState.inputValue !== inputValue || prevProps.queryText !== queryText) {
      let tagName = getURLParam(window.location, 'search');
      if (!tagName && window.location.href.indexOf('?search') === -1) tagName = QUERY_TEXT_DEFAULT;
      this.setState({ inputValue: tagName });
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
    const newUrl = `?search=${str}`;
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
    const { value } = e.target || e;
    this.setState({ isSelectOpen: !!value });
    this.searchResult(value);
    if (!e.target && e) {
      this.increaseCount(e);
      onSearchInputValue(e);
    } else if (e.keyCode === 13 && value) {
      this.increaseCount(value);
      this.createNewOption(value);
      this.setState({ isSelectOpen: false });
      onSearchInputValue(value);
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
    this.handleUrl(value)
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
  queryText: PropTypes.shape({}),
  onSearchInputValue: PropTypes.func,
  t: PropTypes.func,
  history: PropTypes.shape({}),
};
Search.defaultProps = {
  queryText: {},
  onSearchInputValue: () => {},
  t: () => {},
  history: {},
};

export default withTranslation()(Search);
