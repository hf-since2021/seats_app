const App = () => {
  const tableSize = [2,2];
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
          if(cellId[0]<tableSize[0]){
            e.preventDefault();
            cellId[0] ++;
            document.getElementById(cellId.join("-")).focus();
          };
          break;
        case "ArrowRight":
          if(cellId[1]<tableSize[1]){
            e.preventDefault();
            cellId[1] ++;
            document.getElementById(cellId.join("-")).focus();
          };
          break;
      };
    };
  };
  return (
    <table className="sheet-table">
      <tbody>
        <tr>
          <td><input id={"0-0"} onKeyDown={moveFocus}></input></td>
          <td><input id={"0-1"} onFocus={selectText} onKeyDown={moveFocus}></input></td>
          <td><input id={"0-2"} onFocus={selectText} onKeyDown={moveFocus}></input></td>
        </tr>
        <tr>
          <td><input id={"1-0"} onFocus={selectText} onKeyDown={moveFocus}></input></td>
          <td><input id={"1-1"} onFocus={selectText} onKeyDown={moveFocus}></input></td>
          <td><input id={"1-2"} onFocus={selectText} onKeyDown={moveFocus}></input></td>
        </tr>
        <tr>
          <td><input id={"2-0"} onFocus={selectText} onKeyDown={moveFocus}></input></td>
          <td><input id={"2-1"} onFocus={selectText} onKeyDown={moveFocus}></input></td>
          <td><input id={"2-2"} onFocus={selectText} onKeyDown={moveFocus}></input></td>
        </tr>
      </tbody>
    </table>
  );
}
// if(e.nativeEvent.key=="ArrowDown"){console.log("↓")}
export default App;
