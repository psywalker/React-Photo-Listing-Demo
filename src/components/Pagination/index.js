import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      navigationItems: [1],
    };
  }

  componentDidMount = () => {
    this.pageCalc();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.totalCards !== this.props.totalCards || prevProps.page !== this.props.page) this.pageCalc();
  }

  getPageNumbers = (page, perPage, totalCards) => {
    return (page + (Math.ceil(totalCards / perPage)));
  }

  pageCalc = () => {
    const { page, perPage, totalCards } = this.props;

    const navigationItems = [];
    const i = this.getPageNumbers(page, perPage, totalCards);
    
    if (!i || i === 1) {
      navigationItems.push(1);
    } else if (page < 11) {
      for (let k = 1; k < i ; k += 1) {
        navigationItems.push(k);
      }
    } else {
      for (let k = page - 9; k < i; k += 1) {
        navigationItems.push(k);
      }
    }

    this.setState({
      page,
      navigationItems,
    });
  }

  handleNavigationPrevClick = () => {
    const { onNavigationPrevClick } = this.props;
    const { page } = this.state;
    if (page - 1 <= 1) return false;
    else onNavigationPrevClick();
  }

  handleNavigationNextClick = () => {
    const { totalCards, perPage, onNavigationNextClick} = this.props;
    const { page } = this.state;
    const i = this.getPageNumbers(page, perPage, totalCards);
    if (page + 1 >= i) return false;
    else onNavigationNextClick();
  }

  handleNavigationClick = (item) => {
    const { onNavigationClick } = this.props;
    const { page } = this.state;
    if (page === item) return false;
    else onNavigationClick(item);
  }

  render() {
    const {
      perPage, 
      totalCards,
    } = this.props;

    const { navigationItems, page } = this.state;

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
            if (i < 10) {
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
  onNavigationClick: () => {},
  onNavigationPrevClick: () => {},
  onNavigationNextClick: () => {},
};
export default PaginationSelf;
