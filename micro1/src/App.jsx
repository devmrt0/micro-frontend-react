import React,{useState,useEffect,useContext} from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Grid from "./components/Grid";
import addRow from  "./utils/addRow";
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import {QueryClient, QueryClientProvider} from 'react-query';
import { DataComponent } from './components/DataComponent';
import { HookComponent } from './components/HookComponent';




import "./index.css";


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

const queryClient = new QueryClient();

const App = () => {
  const [allData, setAllData] = useState(rows);
  


  useEffect(() => {
    if (rows) {
      setAllData(allData);
    }
  }, [allData]);
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ThemeSwitcher></ThemeSwitcher>
     <div className="container">
      <Grid rows={rows}></Grid>
      <button onClick={() =>addRow(allData,setAllData,{id:allData.length+1,lastName:"",firstName:"",age:""})}>Ekle</button>
      <Header></Header>
      <DataComponent></DataComponent>
      <HookComponent></HookComponent>
      <div>Name: micro1</div>
      <div>Framework: react</div>
      <div>Language: JavaScript</div>
      <div>CSS: Empty CSS</div>
    </div>
    </ThemeProvider>
    </QueryClientProvider>
    )
};
ReactDOM.render(<App />, document.getElementById("app"));
