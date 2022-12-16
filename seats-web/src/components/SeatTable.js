const SeatTable = (props) => {
  // props: selectText, moveFocus, seat, changeValue
  // const tableSize = [props.seat.length, props.seat[0].length];
  const rowSize    = props.seat.length;
  const columnSize = props.seat[0].length
  // const rowIndex    = [...Array(tableSize[0]).keys()];
  // const columnIndex = [...Array(tableSize[1]).keys()];
  const rowIndex    = [...Array(rowSize).keys()];
  const columnIndex = [...Array(columnSize).keys()];

  // const refTable = rowIndex.map(()=>columnIndex.map(()=>{}));
  // props.inputElement.current = refTable;

  return (
    <>
      <p>Ctrl (⌘) ＋ ←↑↓→</p>
      <table className="seat-table">
        <tbody>
          {rowIndex.map((r,rowKey)=>{
            return(
              <tr key={rowKey}>
                {columnIndex.map((c,colKey)=>{
                  return(
                    <td key={colKey}>
                      <input /* id={`${r}-${c}`}  */
                            ref = {(input) => {props.inputElement.current[r][c] = input}}
                            defaultValue={props.seat[r][c]}
                            onFocus={props.selectText} 
                            onKeyDown={props.moveFocus} 
                            onChange={props.changeValue}
                            data-row = {r}
                            data-column = {c}
                            autoComplete="off" />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
}

export default SeatTable;