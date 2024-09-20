import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';


const Layout = () => {
  
  return (
    <>
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className='layout'>
    
        <Main />
      </div>
      
    </div>
    </>
  );
};

export default Layout;
