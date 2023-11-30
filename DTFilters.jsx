function DTFilters({
  setPerPage,
  setSearch,
  options = { entries: true, search: true },
}) {
  const changeEntries = ({ target }) => {
    setPerPage(parseInt(target.value));
  };

  const changeSearch = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <header>
      {options.entries ? (
        <label>
          Show&nbsp;
          <select name="entries" id="entries" onChange={changeEntries}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          &nbsp;entries
        </label>
      ) : null}
      {options.search ? (
        <label>
          Search:&nbsp;
          <input type="search" onChange={changeSearch} />
        </label>
      ) : null}
    </header>
  );
}

export default DTFilters;
