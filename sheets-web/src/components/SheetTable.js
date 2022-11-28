const SheetTable = (props) => {
  // props: rowIndex, columnIndex, selectText, moveFocus, sheet, changeValue
  return (
    <>
      <p>Ctrl (⌘) ＋ ←↑↓→</p>
      <table className="sheet-table">
        <tbody>
          {props.rowIndex.map((r,rowKey)=>{
            return(
              <tr key={rowKey}>
                {props.columnIndex.map((c,colKey)=>{
                  return(
                    <td key={colKey}>
                      <input id={`${r}-${c}`} 
                            onFocus={props.selectText} 
                            onKeyDown={props.moveFocus} 
                            defaultValue={props.sheet[r][c]}
                            onChange={props.changeValue} />
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