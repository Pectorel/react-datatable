/**
 *
 * Objectives : Renders only visible Row at first to speed up the calculation
 * But Store all data for filtering purpose
 * By default sort by array index
 *
 *
 */
import { useEffect, useState } from "react";
import DTRow from "./DTRow.jsx";
import DTHead from "./DTHead.jsx";
import DTFooter from "./DTFooter.jsx";
import DTFilters from "./DTFilters.jsx";
import style from "./assets/datatable.module.css";

function Datatable({ data, className, options = { perPage: 10, entries: true, search: true, sort: true} }) {
  const [page, setPage] = useState(() => {
    return 0;
  });

  const [maxPage, setMaxPage] = useState(() => {
    return 1;
  });

  const [perPage, setPerPage] = useState(() => {
    return options.perPage;
  });

  const [search, setSearch] = useState(() => {
    return null;
  });

  const [sortBy, setSortBy] = useState(() => {
    return null;
  });

  data = [...data];

  useEffect(() => {
    // Calculating max pages
    let i = 1;
    let stop = false;

    do {
      if (getRowsToShow().length <= perPage * i) stop = true;
      else i++;
    } while (!stop);

    i -= 1;
    setMaxPage(i);

    if (page >= i) setPage(i);
  }, [perPage, search]);

  /**
   * Function to get sorted data based on sorting criteria.
   *
   * @function getSortedData
   * @returns {Array} - The sorted data array.
   */
  const getSortedData = () => {
    if (sortBy != null) {
      return data.sort((a, b) => {
        if (sortBy.order === "asc")
          return a[sortBy.field].localeCompare(b[sortBy.field]);
        return b[sortBy.field].localeCompare(a[sortBy.field]);
      });
    }
    return data;
  };

  /**
   * Retrieves rows to show based on search input if any.
   * @function getRowsToShow
   * @return {array} - Array of rows to show.
   */
  const getRowsToShow = () => {
    let res = [];
    data = getSortedData();
    if (typeof search == "string" && search.length >= 2) {
      for (let row of data) {
        for (let field in row) {
          if (row[field].toLowerCase().includes(search.toLowerCase())) {
            res.push(row);
            break;
          }
        }
      }
    } else {
      res = data;
    }
    return res;
  };

  if(className === undefined) className = "";

  return (
    <div className={`${className} ${style.datatable}`}>
      <DTFilters setPerPage={setPerPage} setSearch={setSearch} options={options} />
      <table>
        <DTHead setSort={setSortBy} headRow={data[0]} options={options} />
        <tbody>
          {getRowsToShow()
            .slice(perPage * page, perPage * (page + 1))
            .map((row, key) => {
              return <DTRow row={row} key={key} />;
            })}
        </tbody>
      </table>
      <DTFooter
        page={page}
        maxPage={maxPage}
        setPage={setPage}
        perPage={perPage}
        dataLength={getRowsToShow().length}
      />
    </div>
  );
}

export default Datatable;
