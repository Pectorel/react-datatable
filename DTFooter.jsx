import style from "./assets/datatable.module.css";

function DTFooter({ page, maxPage, perPage, setPage, dataLength, options }) {
  const getLastRowIndex = () => {
    let res = perPage * (page + 1);
    if (dataLength < perPage * (page + 1)) res = dataLength;
    return res;
  };

  const goToPage = (index) => {
    if (index > maxPage) {
      index = maxPage;
    } else if (index < 0) {
      index = 0;
    }
    setPage(index);
  };

  // Pagination limit must be >= 3
  if(options.pagination.limit < 3){
    options.pagination.limit = 3;
  }

  // Pagination step must be < limit by 2 to avoid duplicates and off limits pagination
  if(options.pagination.step > options.pagination.limit - 2){
    options.pagination.step = options.pagination.limit - 2;
  }

  const getPagination = () => {
    // Array that will contain all pagination buttons (numbers)
    const pages = [];
    // How much buttons do we show when pages are in their limits (start and end)
    let limit = page + options.pagination.limit;
    // How much buttons do we show after current page when off limits
    let step = page + options.pagination.step;
    // At which page do we start
    let starter = 0;

    // If we are at the max page or in its limits
    if(page >= (maxPage - (options.pagination.limit - 1))){

      starter = maxPage - options.pagination.limit;
      // If stater is below
      if(starter >= 0){
        pages.push(<button
          className={style["pagination-btn"]}
          onClick={() => goToPage(0)}
          disabled={page === 0}
          key={`page_${0}`}
        >
          1
        </button>);
        pages.push(<span key={"page_delimiter_previous"} className={style["page-limiter"]}>...</span>)

      }

      step = maxPage;

    }
    else if(page >= options.pagination.limit - 1 && page != maxPage){
      starter = page - options.pagination.step;
      pages.push(<button
        className={style["pagination-btn"]}
        onClick={() => goToPage(0)}
        disabled={page === 0}
        key={`page_${0}`}
      >
        1
      </button>);
      pages.push(<span key={"page_delimiter_previous"} className={style["page-limiter"]}>...</span>)
    }
    else{
      step = options.pagination.limit - 1;
    }

    if(starter < 0) starter = 0;


    for (let i = starter; i <= step; i++) {
      if(i > maxPage) break;

      pages.push(
        <button
          className={style["pagination-btn"]}
          onClick={() => goToPage(i)}
          disabled={page === i}
          key={`page_${i}`}
        >
          {i + 1}
        </button>
      );
    }

    if(limit < maxPage || page == (maxPage - options.pagination.limit)){
      pages.push(<span key={"page_delimiter_next"} className={style["page-limiter"]}>...</span>)
      pages.push(<button
        className={style["pagination-btn"]}
        onClick={() => goToPage(maxPage+1)}
        disabled={page === maxPage}
        key={`page_${maxPage + 1}`}
      >
        {maxPage+1}
      </button>)
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
