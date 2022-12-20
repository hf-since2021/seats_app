import React, { useRef } from "react";

const SeatTable = (props) => {
  // props: selectText, moveFocus, seat, changeValue
  const rowSize    = props.seat.length;
  const columnSize = props.seat[0].length;
  const rowIndex    = [...Array(rowSize).keys()];
  const columnIndex = [...Array(columnSize).keys()];

  // アクティブセルの移動関数(moveFocus)で、focus先の要素への参照を格納
  // SeatTable.jsで、ref.currentに配列を代入して、そこへcallback refで参照を格納
  const inputElement = useRef(new Map());

  // レンダリングのタイミングによって、refのMapオブジェクトのサイズがレンダリングする要素の数（テーブルサイズ）と
  // 合わなかったりするため、オプショナルチェーンで回避する。（コードの改善ができて、オプショナルチェーンによるエラー回避は不要に）
  // とくに2次元配列（実際には配列ではないが）の2つめの次元にget,set,deleteするときに、
  // 1つめの次元に相当するMapオブジェクトが存在しない状態だとエラーで止まるので要注意。
  const refUpdate = (r, c) => {
    // マウントした要素もしくはアンマウントした要素（input要素）を受け取って、
    return (input) => {
      // r行目に相当するrefのMapオブジェクトがなかったらsetする。
      if(![...inputElement.current.keys()].includes(r)) inputElement.current.set(r, new Map());
      // マウント時は当該要素、アンマウント時はnullを受け取るから、それで分岐
      if(input){
        // ref(=inputElement)に当該要素をセットする。
        inputElement.current.get(r).set(c, input);
      } else {
        // アンマウント時はrefから消去。
        inputElement.current.get(r).delete(c);
        // r行目に相当するMapオブジェクトが空だったらMapオブジェクトそのものを消去。
        if (inputElement.current.get(r).size == 0) inputElement.current.delete(r);
      };
    };
  };

  // セルがアクティブになったときに、全選択する
  const selectText = (e)=>{e.target.select()};

  // Ctrl or cmd + arrow keys でセル移動
  const moveFocus = (e) => {
    if((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)){
      let activeRow = Number(e.target.dataset.row);
      let activeColumn = Number(e.target.dataset.column);
      // 方向キー・アクティブセルが端でない
      // preventDefault()とfocus()はbreak後に実行するとctrl(meta)＋別キー押下でエラーになる。
      switch (e.nativeEvent.key) {
        case "ArrowUp":
          if(activeRow > 0){
            e.preventDefault();
            activeRow --;
            inputElement.current.get(activeRow).get(activeColumn).focus();
          };
          break;
        case "ArrowLeft":
          if(activeColumn > 0){
            e.preventDefault();
            activeColumn --;
            inputElement.current.get(activeRow).get(activeColumn).focus();
          };
          break;
        case "ArrowDown":
          // const tableRow = seat.length;
          if(activeRow < rowSize-1){
            e.preventDefault();
            activeRow ++;
            inputElement.current.get(activeRow).get(activeColumn).focus();
          };
          break;
        case "ArrowRight":
          // const tableColumn = seat[0].length;
          if(activeColumn < columnSize-1){
            e.preventDefault();
            activeColumn ++;
            inputElement.current.get(activeRow).get(activeColumn).focus();
          };
          break;
      };
    };
  };

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
                      <input ref = {refUpdate(r,c)}
                            defaultValue={props.seat[r][c]}
                            // onFocus={props.selectText}
                            onFocus={selectText}
                            // onKeyDown={props.moveFocus}
                            onKeyDown={moveFocus}
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