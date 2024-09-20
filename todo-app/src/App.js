import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AllTask from './pages/AllTask';
import Completed from './pages/Completed';
import Uncompleted from './pages/Uncompleted';
import Important from './pages/Important';
import TodayTask from './pages/TodayTask';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/all-Tasks" element={<AllTask />}/>
        <Route path="/completed" element={<Completed />}/>
        <Route path="/uncompleted" element={<Uncompleted />}/>
        <Route path="/important" element={<Important />}/>
        <Route path="/today-task" element={<TodayTask />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
