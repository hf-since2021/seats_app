import React, { useState, useEffect, useRef } from "react";
import NameList from "./components/NameList";
import SheetTable from "./components/SheetTable"
import StudentArrangement from "./components/StudentArrangement"

const App = () => {
  // state: sheet, studentArrangement

  // 座席入力欄の初期化
  const rowSize    = 5;
  const columnSize = 6;
  // const [rowSize, setRowSize] = useState(5);
  // const [columnSize, setColumnSize] = useState(6);
  const rowIndex    = [...Array(rowSize).keys()];
  const columnIndex = [...Array(columnSize).keys()];
  const initialSheet = rowIndex.map(()=>columnIndex.map(()=>{}));
  const [sheet, setSheet] = useState(initialSheet);

  // 生徒情報、APIで取得予定
  const studentList = [
    {id:1, gcn:"2A01", name:"小西 伸江", kana:"ｺﾆｼ ﾉﾌﾞｴ", sex:"女"},
    {id:2, gcn:"2A02", name:"永井 浩治", kana:"ﾅｶﾞｲ ｺｳｼﾞ", sex:"男"},
    {id:3, gcn:"2A03", name:"中田 記代", kana:"ﾅｶﾀ ｷﾖ", sex:"女"},
    {id:4, gcn:"2A04", name:"花田 奈緒", kana:"ﾊﾅﾀﾞ ﾅｵ", sex:"女"},
    {id:5, gcn:"2A05", name:"石井 則昭", kana:"ｲｼｲ ﾉﾘｱｷ", sex:"男"},
    {id:6, gcn:"2A06", name:"青木 徳彦", kana:"ｱｵｷ ﾉﾘﾋｺ", sex:"男"},
    {id:7, gcn:"2A07", name:"石川 義隆", kana:"ｲｼｶﾜ ﾖｼﾀｶ", sex:"男"},
    {id:8, gcn:"2A08", name:"神田 多紀子", kana:"ｺｳﾀﾞ ﾀｷｺ", sex:"女"},
    {id:9, gcn:"2A09", name:"三浦 房実", kana:"ﾐｳﾗ ﾌｻﾐ", sex:"女"},
    {id:10, gcn:"2A10", name:"今野 一樹", kana:"ｺﾝﾉ ﾋﾄｷ", sex:"男"}
  ];

  // 生徒情報取得リクエスト（未完成）
  const studentListURL = "http://localhost:3010/api/sheets/namelist";
  const params = {
    a: "xxx",
    b: "yyy",
    c: "zzz",
  }
  const query_params = new URLSearchParams(params); 
  // const getStudentList = (url, postData) => {
  const getStudentList = (url) => {
    return new Promise((resolve, reject) => {
      // 
      fetch(url , {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(postData)
      }).then((res) => resolve(res.json()));
    })
  }

  useEffect(() => {
    const getStudentData = async () => {
      // const res = await getStudentList(studentListURL, data);
      const res = await getStudentList(`${studentListURL}?${query_params}`);
      console.log(res);
    };
    getStudentData();
  }, []);

  // arr（json配列）からsearchObj（key+value）を探してインデックスを返す
  const searchValue = (arr, searchObj) => {
    const values = arr.map(x => x[Object.keys(searchObj)[0]]);
    return values.indexOf(Object.values(searchObj)[0]);
  };

  // 座席の配置に表示する情報
  const initialStudentArrangement = rowIndex.map((r)=>columnIndex.map((c)=>{
    const index = searchValue(studentList, {id: initialSheet[r][c]});
    if(index > -1){
      return {gcn: studentList[index].gcn, name: studentList[index].name, kana: studentList[index].kana}
    }else{
      return {gcn: "", name: "", kana: ""}
    }
  }));
  const [studentArrangement, setStudentArrangement] = useState(initialStudentArrangement);

  // セルがアクティブになったときに、全選択する
  const selectText = (e)=>{e.target.select()};

  // Ctrl or cmd + arrow keys でセル移動
  const moveFocus = (e) => {
    if((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)){
      let activeRow = Number(e.target.dataset.row);
      let activeColumn = Number(e.target.dataset.column);
      // 方向キー・アクティブセルが端でない
      switch (e.nativeEvent.key) {
        case "ArrowUp":
          if(activeRow > 0){
            e.preventDefault();
            activeRow --;
            inputElement.current[activeRow][activeColumn].focus();
          };
          break;
        case "ArrowLeft":
          if(activeColumn > 0){
            e.preventDefault();
            activeColumn --;
            inputElement.current[activeRow][activeColumn].focus();
          };
          break;
        case "ArrowDown":
          const tableRow = sheet.length;
          if(activeRow < tableRow-1){
            e.preventDefault();
            activeRow ++;
            inputElement.current[activeRow][activeColumn].focus();
          };
          break;
        case "ArrowRight":
          const tableColumn = sheet[0].length;
          if(activeColumn < tableColumn-1){
            e.preventDefault();
            activeColumn ++;
            inputElement.current[activeRow][activeColumn].focus();
          };
          break;
      };
    };
  };

  const changeValue = (e) => {
    // アクティブセルの位置を取得
    const activeRow = Number(e.target.dataset.row);
    const activeColumn = Number(e.target.dataset.column);
    // 変更部分をstate(sheet)に反映
    const newSheet = [...sheet];
    newSheet[activeRow][activeColumn] = Number(e.target.value);
    setSheet(newSheet);

    // 変更部分をstate(studentArrangement)に反映
    const index = searchValue(studentList, {id: Number(e.target.value)});
    const newStudentArrangement = [...studentArrangement];
    if(index > -1){
      newStudentArrangement[activeRow][activeColumn] = {gcn: studentList[index].gcn, name: studentList[index].name, kana: studentList[index].kana}
    }else{
      newStudentArrangement[activeRow][activeColumn] = {gcn: "", name: "", kana: ""}
    }
    setStudentArrangement(newStudentArrangement);
  };

  const clickNewButton = () => {
    const newRowSize    = Number(document.getElementById("row").value);
    const newColumnSize = Number(document.getElementById("column").value);
    const newRowIndex    = [...Array(newRowSize).keys()];
    const newColumnIndex = [...Array(newColumnSize).keys()];
    const newSizeSheet = newRowIndex.map((r)=>newColumnIndex.map((c)=>{
      if(r+1 <= sheet.length && c+1 <= sheet[0].length){
        return sheet[r][c];
      };
    }));
    setSheet(newSizeSheet);
    const newStudentArrangement = newRowIndex.map((r)=>newColumnIndex.map((c)=>{
      const index = searchValue(studentList, {id: newSizeSheet[r][c]});
      if(index > -1){
        return {gcn: studentList[index].gcn, name: studentList[index].name, kana: studentList[index].kana}
      }else{
        return {gcn: "", name: "", kana: ""}
      }
    }));
    setStudentArrangement(newStudentArrangement);
  };

  // アクティブセルの移動関数(moveFocus)で、focus先の要素への参照を格納
  // SheetTable.jsで、ref.currentに配列を代入して、そこへcallback refで参照を格納
  const inputElement = useRef(null);

  // props: selectText, moveFocus, sheet, changeValue
  return (
    <>
      <div style={{height: "50px"}}>
        <div style={{display: "inline-block"}}>
          <input type="radio" name="list-type" value="klass" />
          <div style={{display: "inline-block"}}>学級</div>
          <select style={{width: "40px", "margin-left": "10px"}}>
            <option value="1">---</option>
            <option value="2">1A</option>
            <option value="3">1B</option>
            <option value="4">1C</option>
            <option value="5">1D</option>
          </select>
        </div>
        <div style={{display: "inline-block", "margin-left": "20px"}}>
          <input type="radio" name="list-type" value="lesson" />
          <div style={{display: "inline-block"}}>授業</div>
          <select style={{width: "100px", "margin-left": "10px"}}>
            <option value="1">--------</option>
            <option value="2">1A-国語</option>
            <option value="3">1B-国語</option>
            <option value="4">1C-国語</option>
            <option value="5">1D-国語</option>
          </select>
        </div>
        <div style={{display: "inline-block", "margin-left": "20px"}}>
          <div style={{display: "inline-block"}}>レイアウト</div>
          <div style={{display: "inline-block", "margin-left": "5px"}}>前後</div>
          <select id="row" style={{width: "50px", "margin-left": "5px"}}>
            <option value="4">4席</option>
            <option value="5" selected>5席</option>
            <option value="6">6席</option>
            <option value="7">7席</option>
            <option value="8">8席</option>
          </select>
          <div style={{display: "inline-block", "margin-left": "5px"}}>× 左右</div>
          <select id="column" style={{width: "50px", "margin-left": "5px"}}>
            <option value="4">4席</option>
            <option value="5">5席</option>
            <option value="6" selected>6席</option>
            <option value="7">7席</option>
            <option value="8">8席</option>
          </select>
        </div>
        <div style={{display: "inline-block", "margin-left": "20px"}}>
          <button onClick={clickNewButton}>新規作成</button>
        </div>

        <br></br>

        <div style={{display: "inline-block"}}>
          (あなた)の座席表
        </div>
        <select style={{width: "150px", "margin-left": "10px"}}>
          <option value="1">--------</option>
          <option value="2">1A-国語（１）</option>
          <option value="3">1B-国語（１）</option>
          <option value="4">1C-国語（１）</option>
          <option value="5">1D-国語（１）</option>
        </select>
        <div style={{display: "inline-block", "margin-left": "20px"}}>
          <button>編集</button>
        </div>

        <div style={{display: "inline-block", "margin-left": "40px"}}>
          他ユーザーの座席表
        </div>
        <select style={{width: "150px", "margin-left": "10px"}}>
          <option value="1">--------</option>
          <option value="2">1A-数学（１）</option>
          <option value="3">1B-数学（１）</option>
          <option value="4">1C-数学（１）</option>
          <option value="5">1D-数学（１）</option>
        </select>
        <div style={{display: "inline-block", "margin-left": "20px"}}>
          <button>コピーして編集</button>
        </div>
      </div>

      <div style={{display: "table"}}>
        <div style={{display: "table-cell", "padding-right": "30px", "vertical-align": "top"}}>
          <SheetTable 
            sheet={sheet}
            inputElement={inputElement}
            selectText={selectText}
            moveFocus={moveFocus}
            changeValue={changeValue}
          />
          <NameList
            studentList={studentList}
          />
        </div>
        <div style={{display: "table-cell", "vertical-align": "top"}}>
          <StudentArrangement
            studentArrangement={studentArrangement}
          />
        </div>
      </div>
    </>
  );
}

export default App;
