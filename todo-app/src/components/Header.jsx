import React, { useState } from 'react';
import { TextField, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddTodoDialog from './AddTodo';

const Header = ({ onSearch }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <div  className='header'>
      <Tooltip title='Search'>
      <TextField
      className='searchInput'
        variant="outlined"
        placeholder="Search..."
        size="small"
        value={query} 
        onChange={handleSearchChange} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">

              <SearchIcon />
            </InputAdornment>
          ),
        }}
        
      />
      </Tooltip>
      <Tooltip title='Add Todo'>     
         <button className="btn  ms-5 headerAddTodoBtn" onClick={handleClickOpenDialog} >Add Todo</button>
         </Tooltip>

      <AddTodoDialog open={dialogOpen} onClose={handleCloseDialog} />
    </div>
  );
};

export default Header;
