function DTRow({ row, rowKey }) {
  return (
    <tr>
      {Object.keys(row).map((key, index) => {
        return <td key={`dataRow_${rowKey}_${index}`}>{row[key]}</td>;
      })}
    </tr>
  );
}

export default DTRow;
