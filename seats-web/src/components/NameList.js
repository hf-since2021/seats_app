const NameList = (props) => {
  return(
    <>
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
          {props.studentList.map((student,key)=>{
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
    </>
  )
}

export default NameList;