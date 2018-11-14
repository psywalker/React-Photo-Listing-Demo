import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import { Dropdown, DropdownToggle, DropdownMenu } from 'mdbreact';
import DropdownItem from './DropdownItem';

class Filter extends Component {
  constructor(...args) {
    super(...args);
    const { activeFilter } = this.props;
    this.state = {
      activeFilter,
      showDropdown: false,
    };
  }

  toggle() {
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
  }

  hide() {
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
  }

  renderListItems(filters) {
    const { activeFilter } = this.state;
    return filters.map(item => (
      <DropdownItem
        key={item.text}
        activeFilter={activeFilter}
        filterType={item.text}
        hasPadding={item.hasPadding}
        onFilterClick={() => this.setState({ activeFilter: item.text, showDropdown: false })}
      />
    ));
  }

  render() {
    const { activeFilter, showDropdown } = this.state;
    const { filters } = this.props;

    return (
      <ClickOutside onClickOutside={() => this.hide()}>
        <Dropdown className="ml-3">
          <DropdownToggle caret color="primary ml-0" onClick={() => this.toggle()}>
            {activeFilter}
          </DropdownToggle>
          {showDropdown && (
          <DropdownMenu style={{ display: 'block' }}>
            {this.renderListItems(filters)}
          </DropdownMenu>
          )}
        </Dropdown>
      </ClickOutside>
    );
  }
}


Filter.propTypes = {
  activeFilter: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.object),
};
Filter.defaultProps = {
  activeFilter: '',
  filters: [],
};
export default Filter;
