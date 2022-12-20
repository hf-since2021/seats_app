import React, { useState } from "react";

const ConfigForm = (props) => {
  const [listType, setListType] = useState("");
  const changeListType = (e) => {
    setListType(e.target.value);
  };

  return(
    <form onSubmit={props.submitNewSeat}>
      <div style={{display: "inline-block"}}>
        <input type="radio" name="list-type" value="klass" checked={listType == "klass"} onChange={changeListType} />
        <div style={{display: "inline-block"}}>学級</div>
        <select name="klass-select" style={{width: "40px", "margin-left": "10px"}}>
          <option value="1">---</option>
          <option value="2">1A</option>
          <option value="3">1B</option>
          <option value="4">1C</option>
          <option value="5">1D</option>
        </select>
      </div>
      <div style={{display: "inline-block", "margin-left": "20px"}}>
        <input type="radio" name="list-type" value="lesson" checked={listType == "lesson"} onChange={changeListType} />
        <div style={{display: "inline-block"}}>授業</div>
        <select name="lesson-select" style={{width: "100px", "margin-left": "10px"}}>
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
        <select name="row" style={{width: "50px", "margin-left": "5px"}}>
          <option value="4">4席</option>
          <option value="5" selected>5席</option>
          <option value="6">6席</option>
          <option value="7">7席</option>
          <option value="8">8席</option>
        </select>
        <div style={{display: "inline-block", "margin-left": "5px"}}>× 左右</div>
        <select name="column" style={{width: "50px", "margin-left": "5px"}}>
          <option value="4">4席</option>
          <option value="5">5席</option>
          <option value="6" selected>6席</option>
          <option value="7">7席</option>
          <option value="8">8席</option>
        </select>
      </div>
      <div style={{display: "inline-block", "margin-left": "20px"}}>
        <input type="submit" value="新規作成" />
      </div>
    </form>
  );
};

export default ConfigForm;