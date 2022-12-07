const StudentArrangement = (props) => {
  // props: studentArrangement
  const tableSize = [props.studentArrangement.length, props.studentArrangement[0].length];
  const rowIndex    = [...Array(tableSize[0]).keys()];
  const columnIndex = [...Array(tableSize[1]).keys()];
  return(
    <table>
      <tbody>
        {rowIndex.map((r,rowKey)=>{
          return(
            <tr key={rowKey}>
              {columnIndex.map((c,colKey)=>{
                return(
                  <td key={colKey}>
                    <div className="arrangement-card">
                      <div className="gcn" >{props.studentArrangement[r][c].gcn}</div>
                      <div className="name">{props.studentArrangement[r][c].name}</div>
                      <div className="kana">{props.studentArrangement[r][c].kana}</div>
                    </div>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default StudentArrangement;