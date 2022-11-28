import React, { useState } from "react";
import SheetTable from "./components/SheetTable"

const App = () => {
  const tableSize = [5,6];
  const rowIndex    = [...Array(tableSize[0]).keys()];
  const columnIndex = [...Array(tableSize[1]).keys()];
  const sheet0 = rowIndex.map(()=>columnIndex.map(()=>{}));
  const [sheet, setSheet] = useState(sheet0);

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

  const searchValue = (arr, searchObj) => {
    const values = arr.map(x => x[Object.keys(searchObj)[0]]);
    return values.indexOf(Object.values(searchObj)[0]);
  };

  const studentArrangement0 = rowIndex.map((r)=>columnIndex.map((c)=>{
    const index = searchValue(studentList, {id: sheet0[r][c]});
    if(index > -1){
      return {gcn: studentList[index].gcn, name: studentList[index].name, kana: studentList[index].kana}
    }else{
      return {gcn: "　", name: "　", kana: "　"}
    }
  }));

  const [studentArrangement, setStudentArrangement] = useState(studentArrangement0);

  const selectText = (e)=>{e.target.select()};
  const moveFocus = (e) => {
    const cellId = e.target.id.split("-").map(Number);
    if((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)){
      switch (e.nativeEvent.key) {
        case "ArrowUp":
          if(cellId[0]>0){
            e.preventDefault();
            cellId[0] --;
            document.getElementById(cellId.join("-")).focus();
          };
          break;
        case "ArrowLeft":
          if(cellId[1]>0){
            e.preventDefault();
            cellId[1] --;
            document.getElementById(cellId.join("-")).focus();
          };
          break;
        case "ArrowDown":
          if(cellId[0]<tableSize[0]-1){
            e.preventDefault();
            cellId[0] ++;
            document.getElementById(cellId.join("-")).focus();
          };
          break;
        case "ArrowRight":
          if(cellId[1]<tableSize[1]-1){
            e.preventDefault();
            cellId[1] ++;
            document.getElementById(cellId.join("-")).focus();
          };
          break;
      };
    };
  };
  const changeValue = (e) => {
    const cellId = e.target.id.split("-").map(Number);
    const newSheet = [...sheet];
    newSheet[cellId[0]][cellId[1]] = Number(e.target.value);
    setSheet(newSheet);

    const index = searchValue(studentList, {id: Number(e.target.value)});
    const newStudentArrangement = [...studentArrangement];
    if(index > -1){
      newStudentArrangement[cellId[0]][cellId[1]] = {gcn: studentList[index].gcn, name: studentList[index].name, kana: studentList[index].kana}
    }else{
      newStudentArrangement[cellId[0]][cellId[1]] = {gcn: "　", name: "　", kana: "　"}
    }
    setStudentArrangement(newStudentArrangement);
    console.log(studentArrangement);
  };

  // props: rowIndex, columnIndex, selectText, moveFocus, sheet, changeValue
  return (
    <>
      <div style={{display: "table"}}>
        <div style={{display: "table-cell", "padding-right": "30px", "vertical-align": "top"}}>
          <SheetTable 
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            selectText={selectText}
            moveFocus={moveFocus}
            sheet={sheet}
            changeValue={changeValue}
          />
          <table className="student-list">
            <thead>
              <tr>
                <th>席</th>
                <th>年組番</th>
                <th>氏名</th>
                <th>フリガナ</th>
                <th>性</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student,key)=>{
                return(
                  <tr key={key}>
                    <td>{student.id}</td>
                    <td>{student.gcn}</td>
                    <td>{student.name}</td>
                    <td>{student.kana}</td>
                    <td style={student.sex=="女" ? {color: "red"} : {color: "blue"}}>{student.sex}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{display: "table-cell", "vertical-align": "top"}}>
          <table>
            <tbody>
              {rowIndex.map((r,rowKey)=>{
                return(
                  <tr key={rowKey}>
                    {columnIndex.map((c,colKey)=>{
                      return(
                        <td key={colKey}>
                          <div className="arrangement-card">
                            <p className="gcn" >{studentArrangement[r][c].gcn}</p>
                            <p className="name">{studentArrangement[r][c].name}</p>
                            <p className="kana">{studentArrangement[r][c].kana}</p>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
