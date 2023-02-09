import { useRef } from "react";

// 入力行列欄でフォーカス移動機能を実装するためのRef。SeatTable.jsで使う（というかそこから切り出してきた）
// 参考URL:https://qiita.com/chelproc/items/de83a6f2959490109b49「フォーカス管理の Custom Hook」
// input要素に与えるべき属性を一括（スプレッド構文で展開するだけ）で付与できる。
// 具体的には、「位置」を表すカスタムデータ(row, column)、onKeyDown属性に渡すコールバック関数、ref属性に渡すRefオブジェクト
// カスタムデータは、onKeyDownでフォーカスを移動させるときに、現在位置が入力欄の端（移動できない）かどうかを判定するのに使用。

export const useFocusControl = (rowSize, columnSize) => {
  // refオブジェクトを初期化。連想配列を格納。
  const ref = useRef(new Map());
  return (r, c) => ({
    "data-row": r,
    "data-column": c,
    onKeyDown(e){
      if((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)){
        let activeRow = Number(e.target.dataset.row);
        let activeColumn = Number(e.target.dataset.column);
        switch (e.nativeEvent.key) {
          case "ArrowUp":
            if(activeRow > 0){
              e.preventDefault();
              activeRow --;
              ref.current.get(activeRow).get(activeColumn).focus();
            };
            break;
          case "ArrowLeft":
            if(activeColumn > 0){
              e.preventDefault();
              activeColumn --;
              ref.current.get(activeRow).get(activeColumn).focus();
            };
            break;
          case "ArrowDown":
            if(activeRow < rowSize-1){
              e.preventDefault();
              activeRow ++;
              ref.current.get(activeRow).get(activeColumn).focus();
            };
            break;
          case "ArrowRight":
            if(activeColumn < columnSize-1){
              e.preventDefault();
              activeColumn ++;
              ref.current.get(activeRow).get(activeColumn).focus();
            };
            break;
          default:
        };
      };
    },
    // ref属性に渡すコールバックref()
    ref(element){
      // refのキーにr(行)がなかったら、新しい連想配列(行)を付け加える。
      if(![...ref.current.keys()].includes(r)) ref.current.set(r, new Map());
      if(ref){
        // refのr行c列目として、html要素を追加
        ref.current.get(r).set(c, element);
      } else {
        ref.current.get(r).delete(c);
        if (ref.current.get(r).size === 0) ref.current.delete(r);
      };
    },
  });
};



// SeatTable.js----------------------------------------------------------------------------
  // // アクティブセルの移動関数(moveFocus)で、focus先の要素への参照を格納
  // // SeatTable.jsで、ref.currentに配列を代入して、そこへcallback refで参照を格納
  // const inputElement = useRef(new Map());

  // // レンダリングのタイミングによって、refのMapオブジェクトのサイズがレンダリングする要素の数（テーブルサイズ）と
  // // 合わなかったりするため、オプショナルチェーンで回避する。（コードの改善ができて、オプショナルチェーンによるエラー回避は不要に）
  // // とくに2次元配列（実際には配列ではないが）の2つめの次元にget,set,deleteするときに、
  // // 1つめの次元に相当するMapオブジェクトが存在しない状態だとエラーで止まるので要注意。
  // const refUpdate = (r, c) => {
  //   // マウントした要素もしくはアンマウントした要素（input要素）を受け取って、
  //   return (input) => {
  //     // r行目に相当するrefのMapオブジェクトがなかったらsetする。
  //     if(![...inputElement.current.keys()].includes(r)) inputElement.current.set(r, new Map());
  //     // マウント時は当該要素、アンマウント時はnullを受け取るから、それで分岐
  //     if(input){
  //       // ref(=inputElement)に当該要素をセットする。
  //       inputElement.current.get(r).set(c, input);
  //     } else {
  //       // アンマウント時はrefから消去。
  //       inputElement.current.get(r).delete(c);
  //       // r行目に相当するMapオブジェクトが空だったらMapオブジェクトそのものを消去。
  //       if (inputElement.current.get(r).size == 0) inputElement.current.delete(r);
  //     };
  //   };
  // };

  // // セルがアクティブになったときに、全選択する
  // const selectText = (e)=>{e.target.select()};

  // // Ctrl or cmd + arrow keys でセル移動
  // const moveFocus = (e) => {
  //   if((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)){
  //     let activeRow = Number(e.target.dataset.row);
  //     let activeColumn = Number(e.target.dataset.column);
  //     // 方向キー・アクティブセルが端でない
  //     // preventDefault()とfocus()はbreak後に実行するとctrl(meta)＋別キー押下でエラーになる。
  //     switch (e.nativeEvent.key) {
  //       case "ArrowUp":
  //         if(activeRow > 0){
  //           e.preventDefault();
  //           activeRow --;
  //           inputElement.current.get(activeRow).get(activeColumn).focus();
  //         };
  //         break;
  //       case "ArrowLeft":
  //         if(activeColumn > 0){
  //           e.preventDefault();
  //           activeColumn --;
  //           inputElement.current.get(activeRow).get(activeColumn).focus();
  //         };
  //         break;
  //       case "ArrowDown":
  //         // const tableRow = seat.length;
  //         if(activeRow < rowSize-1){
  //           e.preventDefault();
  //           activeRow ++;
  //           inputElement.current.get(activeRow).get(activeColumn).focus();
  //         };
  //         break;
  //       case "ArrowRight":
  //         // const tableColumn = seat[0].length;
  //         if(activeColumn < columnSize-1){
  //           e.preventDefault();
  //           activeColumn ++;
  //           inputElement.current.get(activeRow).get(activeColumn).focus();
  //         };
  //         break;
  //     };
  //   };
  // };

  // <input 
  //   data-row = {r}
  //   data-column = {c}
  //   onFocus={selectText}
  //   ref = {refUpdate(r,c)}
  //   defaultValue={props.seat[r][c]}
  //   onKeyDown={moveFocus}
  //   onChange={props.changeValue}
  //   autoComplete="off" />