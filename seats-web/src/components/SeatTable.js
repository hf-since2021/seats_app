// import React, { useRef } from "react";
import { useFocusControl } from "../utils/focusControlHook";

const SeatTable = (props) => {
  // props: selectText, moveFocus, seat, changeValue
  const rowSize    = props.seat.length;
  const columnSize = props.seat[0].length;
  const rowIndex    = [...Array(rowSize).keys()];
  const columnIndex = [...Array(columnSize).keys()];

  // {data-row, data-column, onKeyDown, ref}
  const register = useFocusControl(rowSize, columnSize);

  // セルがアクティブになったときに、全選択する
  const selectText = (e)=>{e.target.select()};

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
                      <input {...register(r, c)}
                            defaultValue={props.seat[r][c]}
                            onChange={props.changeValue}
                            onFocus={selectText}
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