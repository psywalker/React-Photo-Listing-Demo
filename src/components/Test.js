import React, { Component } from 'react';
import ClickOutside from 'react-click-outside';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    };
    this.toggle = this.toggle.bind(this);
    this.hide = this.hide.bind(this);
  }

  toggle() {
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
  }

  hide() {
    this.setState({ showDropdown: false });
  }

  render() {
    const { showDropdown } = this.state;
    return (
      <div>
        <div>
          <ClickOutside onClickOutside={this.hide}>
            <button type="button" onClick={this.toggle}>Button</button>
            { showDropdown && (
              <p>
                Im a menu or something that you want
                to hide when clicking outside.
              </p>)
            }
          </ClickOutside>
        </div>
        <div>
          <ClickOutside onClickOutside={this.hide}>
            <button type="button" onClick={this.toggle}>Button</button>
            { showDropdown && (
              <p>
                Im a menu or something that you want
                to hide when clicking outside.
              </p>)
            }
          </ClickOutside>
        </div>
      </div>
    );
  }
}

export default Test;
