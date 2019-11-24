import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Icon,
  Button,
  Input,
  AutoComplete,
} from 'antd';
import getURLParam from '../../utils/getURLParam';
import handleVisibleByScroll from '../../utils/handleVisibleByScroll';
import { QUERY_TEXT_DEFAULT, NAV_TOP_ITEM_ACTIVE_DEFAULT } from '../../constants';
import { updateTagsStartAction, updateTagsEndAction, searchTextAction } from '../../actions';
import './index.scss';

const { Option } = AutoComplete;

class Search extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      inputValue: '',
      lastRequest: '',
      isSelectOpen: false,
      dataSource: [],
      options: [],
    };

    this.searchInput = null;
    this.queryCancel = false;
  }

  componentDidMount = () => {
    const { updateTagsStartAction: updateTagStart } = this.props;
    const tagName = getURLParam(window.location, 'search');
    const searchOptions = JSON.parse(window.localStorage.getItem('searchOptions')) || [];
    if (tagName) {
      this.setState({
        lastRequest: tagName,
        options: searchOptions,
        inputValue: tagName,
      });
      updateTagStart(tagName);
    } else {
      this.setState({
        lastRequest: QUERY_TEXT_DEFAULT,
        inputValue: QUERY_TEXT_DEFAULT,
        options: searchOptions,
      });
      updateTagStart(QUERY_TEXT_DEFAULT);
      this.handleUrl('');
    }
    handleVisibleByScroll('addEventListener', ['scroll'], [this.handleScroll]);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {
      updateTags: { isUpdateTag, tagValue },
      updateTagsEndAction: updateTagEnd,
    } = this.props;
    const { options } = this.state;
    this.searchInput.focus();

    if (isUpdateTag) {
      this.setState({ lastRequest: tagValue, inputValue: tagValue });
      this.handleUrl(tagValue);
      updateTagEnd();
    }

    if (JSON.stringify(prevState.options) !== JSON.stringify(options)) {
      window.localStorage.setItem('searchOptions', JSON.stringify(options));
      this.setState({ isSelectOpen: false });
    }
  };

  componentWillUnmount = () => {
    handleVisibleByScroll('removeEventListener', ['scroll'], [this.handleScroll]);
  }

  handleUrl = (str) => {
    const { history } = this.props;
    const newUrl = str ? `?search=${str}` : '';
    history.push(newUrl, {});
  };

  handleScroll = () => {
    this.setState({ isSelectOpen: false });
  };

  renderOption = (item) => {
    return (
      <Option key={item.query} text={item.query}>
        <div className="global-search-item">
          <span className="global-search-item-desc">
            <b>
              «
              {item.query}
              »
            </b>
          </span>
        </div>
      </Option>
    );
  }

  handleKeyDown = (e) => {
    const {
      searchTextAction: onSearchInputValue,
      updateTagsStartAction: updateTagStart,
    } = this.props;
    const { lastRequest } = this.state;
    const value = e && e.target ? e.target.value : e;
    this.setState({ isSelectOpen: !!value });
    this.searchResult(value);

    if (e === lastRequest) {
      this.queryCancel = true;
      this.setState({ isSelectOpen: false }, () => this.setState({ isSelectOpen: false }));
      return false;
    }

    if (e && !e.target && e !== lastRequest) {
      this.increaseCount(e);
      onSearchInputValue(e);
      this.setState({ lastRequest: e });
      updateTagStart(e);
    } else if (e.keyCode === 13 && value && value !== lastRequest) {
      if (this.queryCancel) {
        this.queryCancel = false;
        this.setState({ isSelectOpen: false });
        return false;
      }
      this.increaseCount(value);
      this.createNewOption(value);
      this.setState({ isSelectOpen: false });
      onSearchInputValue(value);
      this.setState({ lastRequest: value });
      updateTagStart(value);
    }

    return false;
  };

  handleButton = (e) => {
    e.stopPropagation();
    e.target.blur();
    const {
      searchTextAction: onSearchInputValue,
      updateTagsStartAction: updateAction,
    } = this.props;
    const { inputValue, lastRequest } = this.state;

    if (inputValue && inputValue !== lastRequest) {
      this.increaseCount(inputValue);
      this.createNewOption(inputValue);
      this.setState({ lastRequest: inputValue });
      onSearchInputValue(inputValue);
      updateAction(inputValue);
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
            onChange={this.handleInputChange}
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
  updateTagsStartAction: PropTypes.func,
  updateTagsEndAction: PropTypes.func,
  searchTextAction: PropTypes.func,
  t: PropTypes.func,
  updateTags: PropTypes.shape({
    id: PropTypes.number,
    tagValue: PropTypes.string,
    isUpdateTag: PropTypes.bool,
  }),
  history: PropTypes.shape({}),
};
Search.defaultProps = {
  updateTagsStartAction: () => {},
  updateTagsEndAction: () => {},
  searchTextAction: () => {},
  t: () => {},
  updateTags: {
    id: NAV_TOP_ITEM_ACTIVE_DEFAULT,
    tagValue: QUERY_TEXT_DEFAULT,
    isUpdateTag: false,
  },
  history: {},
};

export const mapStateToProps = (state) => {
  const updateTags = {
    ...state.updateTags,
  };
  return { updateTags };
};

const mapDispatchToProps = {
  updateTagsStartAction,
  updateTagsEndAction,
  searchTextAction,
};

export default withRouter(withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)));
