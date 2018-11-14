import React from 'react';
import {
  Pagination,
  PageItem,
  PageLink,
} from 'mdbreact';

const PaginationSelf = () => (
  <Pagination className="pagination-lg">
    <PageItem>
      <PageLink className="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </PageLink>
    </PageItem>
    <PageItem>
      <PageLink className="page-link">
        1
        <span className="sr-only">(current)</span>
      </PageLink>
    </PageItem>
    <PageItem>
      <PageLink className="page-link">
        2
      </PageLink>
    </PageItem>
    <PageItem>
      <PageLink className="page-link">
        3
      </PageLink>
    </PageItem>
    <PageItem>
      <PageLink className="page-link">
        &raquo;
      </PageLink>
    </PageItem>
  </Pagination>);


export default PaginationSelf;
