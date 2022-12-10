const SheetTable = (props) => {
  // props: selectText, moveFocus, sheet, changeValue
  // const tableSize = [props.sheet.length, props.sheet[0].length];
  const rowSize    = props.sheet.length;
  const columnSize = props.sheet[0].length
  // const rowIndex    = [...Array(tableSize[0]).keys()];
  // const columnIndex = [...Array(tableSize[1]).keys()];
  const rowIndex    = [...Array(rowSize).keys()];
  const columnIndex = [...Array(columnSize).keys()];

  const refTable = rowIndex.map(()=>columnIndex.map(()=>{}));
  props.inputElement.current = refTable;

  return (
    <>
      <p>Ctrl (⌘) ＋ ←↑↓→</p>
      <table className="sheet-table">
        <tbody>
          {rowIndex.map((r,rowKey)=>{
            return(
              <tr key={rowKey}>
                {columnIndex.map((c,colKey)=>{
                  return(
                    <td key={colKey}>
                      <input /* id={`${r}-${c}`}  */
                            ref = {(input) => {props.inputElement.current[r][c] = input}}
                            defaultValue={props.sheet[r][c]}
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

export default SheetTable;