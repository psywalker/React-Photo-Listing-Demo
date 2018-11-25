import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPageNumbers, generateNavItems } from "../../utils";
import {
  Pagination,
  PageItem,
  PageLink,
} from 'mdbreact';

class PaginationSelf extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      page: 1,
      itemNumbers: 10,
      navigationItems: [1],
    };
  }

  componentDidMount = () => {
    this.pageCalc();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.totalCards !== this.props.totalCards) this.pageCalc();
  }

  pageCalc = () => {
    const { perPage, totalCards } = this.props;
    const { page, itemNumbers} = this.state;

    const navigationItems = generateNavItems(page, perPage, totalCards, itemNumbers);

    this.setState({
      navigationItems,
    });
  }

  handleNavigationPrevClick = () => {
    const { onNavigationPrevClick } = this.props;
    const { page } = this.state;
    if (page - 1 < 1) return false;
    else {
      this.setState({
        page: page - 1,
      }, onNavigationPrevClick);
    }
  }

  handleNavigationNextClick = () => {
    const { totalCards, perPage, onNavigationNextClick } = this.props;
    const { page } = this.state;
    const i = getPageNumbers(page, perPage, totalCards);
    if (page + 1 >= i) return false;
    else {
      
      this.setState({
        page: page + 1,
      }, onNavigationNextClick);
    }
  }

  handleNavigationClick = (item) => {
    const { onNavigationClick } = this.props;
    const { page } = this.state;
    if (page === item) return false;
    else {
      this.setState({
        page: item,
      }, onNavigationClick(item));
    }
  }

  render() {

    const { navigationItems, page, itemNumbers } = this.state;

    return (
      <Pagination className="pagination-lg pagination">
        <PageItem className="pagination__item pagination__item_left">
          <PageLink
            onClick={this.handleNavigationPrevClick}
            className="page-link page-link_left"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </PageLink>
        </PageItem>
        {
          navigationItems.map((item, i) => {
            if (i < itemNumbers) {
              return (
                <PageItem className={`pagination__item ${item === page ? 'pagination__item_active' : ''}`} active={item === page} key={item}>
                  <PageLink key={item} onClick={() => this.handleNavigationClick(item)} className={`page-link pagination__link ${item === page ? 'pagination__link_active' : ''}`}>
                    {item}
                  </PageLink>
                </PageItem>);
            }
            return false;
          })
        }
        <PageItem className="pagination__item pagination__item_right">
          <PageLink
            onClick={this.handleNavigationNextClick}
            className="page-link page-link_right"
            aria-label="Next"
          >
            &raquo;
          </PageLink>
        </PageItem>
      </Pagination>
    );
  }
}
PaginationSelf.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  totalCards: PropTypes.number,
  onNavigationClick: PropTypes.func,
  onNavigationPrevClick: PropTypes.func,
  onNavigationNextClick: PropTypes.func,
};
PaginationSelf.defaultProps = {
  page: 1,
  perPage: 20,
  totalCards: 0,
  onNavigationClick: () => { },
  onNavigationPrevClick: () => { },
  onNavigationNextClick: () => { },
};
export default PaginationSelf;
