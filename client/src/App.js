import { useEffect } from "react";

function App() {

 const getData = async () => {
  const data = await fetch('http://localhost:8000/message');

  console.log(data.message);
 }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => getData()}>Get Data</button>
      </header>
    </div>
  );
}

export default App;
