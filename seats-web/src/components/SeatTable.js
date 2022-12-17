const SeatTable = (props) => {
  // props: selectText, moveFocus, seat, changeValue
  const rowSize    = props.seat.length;
  const columnSize = props.seat[0].length
  const rowIndex    = [...Array(rowSize).keys()];
  const columnIndex = [...Array(columnSize).keys()];

  // レンダリングのタイミングによって、refのMapオブジェクトのサイズがレンダリングする要素の数（テーブルサイズ）と
  // 合わなかったりするため、オプショナルチェーンで回避する。
  // とくに2次元配列（実際には配列ではないが）の2つめの次元にget,set,deleteするときに、
  // 1つめの次元に相当するMapオブジェクトが存在しない状態だとエラーで止まるので要注意。
  const refUpdate = (r, c) => {
    // r行目に相当するrefのMapオブジェクトがなかったらsetする。
    if (![...props.inputElement.current.keys()].includes(r)) props.inputElement.current.set(r, new Map());
    // マウントした要素もしくはアンマウントした要素（input要素）を受け取って、
    return (input) => {
      // マウント時は当該要素、アンマウント時はnullを受け取るから、それで分岐
      if(input){
        // ref(=inputElement)に当該要素をセットする。
        props.inputElement.current.get(r)?.set(c, input);
        // props.inputElement.current[r][c] = input;
      }else{
        // アンマウント時はrefから消去。
        props.inputElement.current.get(r)?.delete(c);
        // r行目に相当するMapオブジェクトが空だったらMapオブジェクトそのものを消去。
        if (props.inputElement.current.get(r)?.size == 0) props.inputElement.current.delete(r);
      }
    }
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