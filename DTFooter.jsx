/**
 * --- Footer for Datatable ---
 *
 * Show index of entries and its total
 * Also show the pagination
 *
 */


import style from "./assets/datatable.module.css";
function DTFooter({ page, maxPage, perPage, setPage, dataLength }) {

  // Get last data index of the current page
  const getLastRowIndex = () => {
    let res = perPage * (page + 1);
    if (dataLength < perPage * (page + 1)) res = dataLength;
    return res;
  };

  // Switch datatable page
  const goToPage = (index) => {
    if (index > maxPage) {
      index = maxPage;
    } else if (index < 0) {
      index = 0;
    }
    setPage(index);
  };

  // generates all the button needed for pagination
  const getPagination = () => {
    const pages = [];
    for (let i = 0; i <= maxPage; i++) {
      pages.push(
        <button
          className={style["pagination-btn"]}
          onClick={() => goToPage(i)}
          disabled={page === i}
          key={`page_${i}`}
        >
          {i + 1}
        </button>,
      );
    }

    return pages;
  };

  return (
    <footer>
      <span>
        Showing {perPage * page + 1} to {getLastRowIndex()} of&nbsp;
        {dataLength} entries
      </span>

      <div>
        <button onClick={() => goToPage(page - 1)} disabled={page === 0} data-testid={"datatable-pagination-previous"}>
          Previous
        </button>
        {getPagination()}
        <button onClick={() => goToPage(page + 1)} disabled={page === maxPage} data-testid={"datatable-pagination-next"}>
          Next
        </button>
      </div>
    </footer>
  );
}

export default DTFooter;
