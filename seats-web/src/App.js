import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfigForm from "./components/ConfigForm";
import NameList from "./components/NameList";
import SeatTable from "./components/SeatTable"
import StudentArrangement from "./components/StudentArrangement"

const App = () => {
  // state: seat, studentArrangement

  // 座席入力欄の初期化
  const rowSize    = 5;
  const columnSize = 6;
  const rowIndex    = [...Array(rowSize).keys()];
  const columnIndex = [...Array(columnSize).keys()];
  const initialSeat = rowIndex.map(()=>columnIndex.map(()=>{}));
  const [seat, setSeat] = useState(initialSeat);

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

  // // 生徒情報取得リクエスト（未完成）
  // const studentListURL = "http://localhost:3010/api/seats/namelist";
  // const params = {
  //   a: "xxx",
  //   b: "yyy",
  //   c: "zzz",
  // }
  // const query_params = new URLSearchParams(params); 
  // // const getStudentList = (url, postData) => {
  // const getStudentList = (url) => {
  //   return new Promise((resolve, reject) => {
  //     // 
  //     fetch(url , {
  //       method: "GET",
  //       // headers: { "Content-Type": "application/json" },
  //       // body: JSON.stringify(postData)
  //     }).then((res) => resolve(res.json()));
  //   })
  // }

  // useEffect(() => {
  //   const getStudentData = async () => {
  //     // const res = await getStudentList(studentListURL, data);
  //     const res = await getStudentList(`${studentListURL}?${query_params}`);
  //     console.log(res);
  //   };
  //   getStudentData();
  // }, []);

  const postURL = "http://localhost:3010/api/seats/arrangement";
  const dataPost = () => {
    const postData = JSON.stringify(seat);
    axios.post(postURL, {postData})
      .then((response) => console.log(response));
  };

  const getURL = "http://localhost:3010/api/seats/arrangement_load";
  const dataGet = () => {
    axios.get(getURL)
      .then((response) => console.log(JSON.parse(response.data.data.arrangement)));
  };

  // arr（json配列）からsearchObj（key+value）を探してインデックスを返す
  const searchValue = (arr, searchObj) => {
    const values = arr.map(x => x[Object.keys(searchObj)[0]]);
    return values.indexOf(Object.values(searchObj)[0]);
  };

  // 座席の配置に表示する情報
  const initialStudentArrangement = rowIndex.map((r)=>columnIndex.map((c)=>{
    const index = searchValue(studentList, {id: initialSeat[r][c]});
    if(index > -1){
      return {gcn: studentList[index].gcn, name: studentList[index].name, kana: studentList[index].kana}
    }else{
      return {gcn: "", name: "", kana: ""}
    }
  }));

  const [studentArrangement, setStudentArrangement] = useState(initialStudentArrangement);

  const changeValue = (e) => {
    // アクティブセルの位置を取得
    const activeRow = Number(e.target.dataset.row);
    const activeColumn = Number(e.target.dataset.column);
    // 変更部分をstate(seat)に反映
    const newSeat = [...seat];
    newSeat[activeRow][activeColumn] = Number(e.target.value);
    setSeat(() => newSeat);

    // 変更部分をstate(studentArrangement)に反映
    const index = searchValue(studentList, {id: Number(e.target.value)});
    const newStudentArrangement = [...studentArrangement];
    if(index > -1){
      newStudentArrangement[activeRow][activeColumn] = {gcn: studentList[index].gcn, name: studentList[index].name, kana: studentList[index].kana}
    } else {
      newStudentArrangement[activeRow][activeColumn] = {gcn: "", name: "", kana: ""}
    }
    setStudentArrangement(newStudentArrangement);
  };

  const submitNewSeat = (e) => {
    // 送信しない
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(formData.get("list-type"));
    // console.log(formData.get("klass-select"));
    // console.log(formData.get("lesson-select"));

    const newRowSize    = Number(formData.get("row"));
    const newColumnSize = Number(formData.get("column"));
    const newRowIndex    = [...Array(newRowSize).keys()];
    const newColumnIndex = [...Array(newColumnSize).keys()];

    // 入力表のサイズを更新
    const newSizeSeat = newRowIndex.map((r)=>newColumnIndex.map((c)=>{
      if(r+1 <= seat.length && c+1 <= seat[0].length) return seat[r][c];
    }));
    setSeat(newSizeSeat);

    // 座席表のサイズを更新
    const newStudentArrangement = newRowIndex.map((r)=>newColumnIndex.map((c)=>{
      const index = searchValue(studentList, {id: newSizeSeat[r][c]});
      if(index > -1){
        return {gcn: studentList[index].gcn, name: studentList[index].name, kana: studentList[index].kana}
      }else{
        return {gcn: "", name: "", kana: ""}
      }
    }));
    setStudentArrangement(newStudentArrangement);
  };

  const autoInput = () => {
    console.log(seat.length);
    console.log(seat[0].length);
    const inputOrder = {
      1:[4,0,1],
      2:[3,0,7],
      3:[2,0,13],
      4:[1,0,19],
      5:[0,0,25],
      6:[4,1,2],
      7:[3,1,8],
      8:[2,1,14],
      9:[1,1,20],
      10:[0,1,26],
      11:[4,2,3],
      12:[3,2,9],
      13:[2,2,15],
      14:[1,2,21],
      15:[0,2,27],
      16:[4,3,4],
      17:[3,3,10],
      18:[2,3,16],
      19:[1,3,22],
      20:[0,3,28],
      21:[4,4,5],
      22:[3,4,11],
      23:[2,4,17],
      24:[1,4,23],
      25:[0,4,29],
      26:[4,5,6],
      27:[3,5,12],
      28:[2,5,18],
      29:[1,5,24],
      30:[0,5,30]
    };
    console.log(inputOrder)

    for(let i=1;i<=30;i++){
      console.log(inputOrder[i][2] <= 10);
    };
  };

  // props: selectText, moveFocus, seat, changeValue
  return (
    <>
      <div style={{"margin-bottom": "20px"}}>
        <ConfigForm submitNewSeat={submitNewSeat} />

        <br />

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
          <SeatTable 
            seat={seat}
            // selectText={selectText}
            changeValue={changeValue}
          />
          <div>
            <button onClick={dataPost} >送信</button>
            <button onClick={dataGet} >取得</button>
            <button onClick={autoInput} >自動入力</button>
          </div>
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
