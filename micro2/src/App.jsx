import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import addRow from "micro1/addRow";
import { DataComponent } from "micro1/DataComponent";
import { HookComponent } from "micro1/HookComponent";
import { QueryClient, QueryClientProvider } from 'react-query';





const Header = React.lazy(() => import('micro1/Header'));
const Grid = React.lazy(() => import('micro1/Grid'));
const queryClient = new QueryClient();

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const App = () => {
  const [allData, setAllData] = useState(rows);


  useEffect(() => {
    if (rows) {
      setAllData(allData);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
     
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}><Header />
            <button onClick={() => addRow(allData, setAllData, { id: allData.length + 1, lastName: "", firstName: "", age: "" })}>Ekle</button>
            <Grid rows={rows} />
            <DataComponent></DataComponent>
            <HookComponent></HookComponent>
          </Suspense>

          <div>Name: micro2</div>
          <div>Framework: react</div>
          <div>Language: JavaScript</div>
          <div>CSS: Empty CSS</div>
        </div>
      
    </QueryClientProvider>)
};
ReactDOM.render(<App />, document.getElementById("app"));
