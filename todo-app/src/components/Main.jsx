import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const Main = () => {
  const tasks = useSelector((state) => state.todos); 
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const location = useLocation();

  const handleSearch = (query) => {
    if (!query) {
      filterTasksByRoute();
    } else {
      setFilteredTasks(
        tasks.filter((task) =>
          task.text.toLowerCase().includes(query.toLowerCase()) ||
          task.description.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const filterTasksByRoute = () => {
    switch (location.pathname) {
      case '/completed':
        setFilteredTasks(tasks.filter((task) => task.completed));
        break;
      case '/uncompleted':
        setFilteredTasks(tasks.filter((task) => !task.completed));
        break;
      case '/important':
        setFilteredTasks(tasks.filter((task) => task.important));
        break;
      case '/today-task':

        const today = new Date().toISOString().split('T')[0]; // Getting today's date in YYYY-MM-DD format

        setFilteredTasks(tasks.filter((task) => task.creationDate === today));
        break;
      case '/all-Tasks':
      default:
        setFilteredTasks(tasks);
        break;
    }
  };

  useEffect(() => {
    filterTasksByRoute();
  }, [location.pathname, tasks]);

  return (
    <div >
      <Header onSearch={handleSearch} />
      <div style={{ marginTop: '5rem' , marginLeft:'10rem' }}>

      <Outlet context={{ filteredTasks }} /> 
      </div>
    </div>
  );
};

export default Main;
