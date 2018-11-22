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
      itemActive: 0,
    };
  }

  render() {
    const {
      totalCards,
      page,
      perPage,
      getNavigationClick,
      getNavigationPrevClick,
      getNavigationNextClick,
      navigationItems,
      navigationActiveItem,
    } = this.props;
    return (
      <Pagination className="pagination-lg">
        <PageItem>
          <PageLink
            onClick={() => getNavigationPrevClick()}
            className="page-link"
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
                <PageItem active={item === navigationActiveItem} key={item}>
                  <PageLink key={item} onClick={() => getNavigationClick(item)} className="page-link">
                    {item}
                  </PageLink>
                </PageItem>);
            }
            return false;
          })
        }
        <PageItem>
          <PageLink
            onClick={() => getNavigationNextClick()}
            className="page-link"
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
  totalCards: PropTypes.number,
  page: PropTypes.number,
  perPage: PropTypes.number,
  navigationActiveItem: PropTypes.number,
  navigationItems: PropTypes.arrayOf(PropTypes.number),
  getNavigationClick: PropTypes.func,
  getNavigationPrevClick: PropTypes.func,
  getNavigationNextClick: PropTypes.func,
};
PaginationSelf.defaultProps = {
  totalCards: 20,
  page: 1,
  perPage: 20,
  navigationItems: [],
  navigationActiveItem: 0,
  getNavigationClick: () => {},
  getNavigationPrevClick: () => {},
  getNavigationNextClick: () => {},
};
export default PaginationSelf;
