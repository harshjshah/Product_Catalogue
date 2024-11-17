import ReactPaginate from 'react-paginate';

export default function Pagination({ pageCount, onPageChange, forcePage }) {
  return (
    <ReactPaginate
      previousLabel={'Previous'}
      forcePage={forcePage}
      nextLabel={'Next'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={4}
      onPageChange={onPageChange}
      pageClassName={'page-link'}    
      activeClassName={'active'}
      className={'pagination-data'}
    />
  );
}
