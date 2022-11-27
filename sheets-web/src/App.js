import React, { useState } from "react";

const App = () => {
  const tableSize = [5,7];
  const rowIndex    = [...Array(tableSize[0]).keys()];
  const columnIndex = [...Array(tableSize[1]).keys()];
  const sheets0 = rowIndex.map(()=>columnIndex.map(()=>{}));
  const [sheets, setSheets] = useState(sheets0);
  // console.log(sheets[1][2])
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
            document.getElementById(cellId.join("-")).select();
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
    sheets0[cellId[0]][cellId[1]] = Number(e.target.value);
    setSheets(sheets0);
    console.log(sheets)
  };
  return (
    <table className="sheet-table">
      <tbody>
        {rowIndex.map((r,i)=>{
          return(
            <tr key={i}>
              {columnIndex.map((c,j)=>{
                return(
                  <td key={j}>
                    <input id={`${r}-${c}`} 
                           onFocus={selectText} 
                           onKeyDown={moveFocus} 
                           defaultValue={sheets[r][c]}
                           onChange={changeValue}>
                    </input>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}
// if(e.nativeEvent.key=="ArrowDown"){console.log("↓")}
export default App;
