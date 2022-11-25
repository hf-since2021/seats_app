const App = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>a</th>
          <th>b</th>
          <th>c</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input style={{width: 20}}></input></td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td><input style={{width: "20px"}}></input></td>
          <td>5</td>
          <td>6</td>
        </tr>
        <tr>
          <td>7</td>
          <td>8</td>
          <td>9</td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
