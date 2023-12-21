/**
 * --- Head Row of Datatable ---
 *
 * Show the column names based on the data given to the Datatable component
 * Also have a sort system that can be toggled on/off
 *
 */


import style from "./assets/datatable.module.css";

function DTHead({ setSort, headRow = {}, options = { sort: true } }) {

  // Change style of the sort element + change sort state
  const changeSort = ({ target }) => {
    if (!options.sort) return false;
    let icon = target.querySelector(`.${style["sort-icon"]}`);
    let icons = document.querySelectorAll(`.${style["sort-icon"]}`);
    icons.forEach((cell) => {
      if (cell !== icon) cell.classList.remove(style["asc"], style["desc"]);
    });

    let order = "asc";
    if (icon.classList.contains(style["asc"])) {
      icon.classList.remove(style["asc"]);
      icon.classList.add(style["desc"]);
      order = "desc";
    } else {
      icon.classList.remove(style["desc"]);
      icon.classList.add(style["asc"]);
    }

    setSort({
      field: target.getAttribute("data-sort"),
      order,
    });
  };

  return (
    <thead>
      <tr>
        {Object.keys(headRow).length > 0
          ? Object.keys(headRow).map((key, index) => {
              name = key.replaceAll(new RegExp("-", "g"), " ");
              return (
                <td data-sort={key} key={index} onClick={changeSort}>
                  {name}
                  {options.sort ? <i className={style["sort-icon"]}></i> : null}
                </td>
              );
            })
          : null}
      </tr>
    </thead>
  );
}
export default DTHead;
