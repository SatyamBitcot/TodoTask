import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, toggleImportant, deleteTodo, editTodo } from '../store/TodoSlice';
import TaskCard from '../components/TaskCard';
import EditTodoDialog from '../components/EditTodo';
import { Container, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import { useOutletContext } from 'react-router-dom';

const AllTask = () => {
  // const tasks = useSelector((state) => state.todos); 
  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleToggleImportant = (id) => {
    dispatch(toggleImportant(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);  
    setIsEditDialogOpen(true);  
  };

  const handleEditTodo = (updatedTask) => {
    dispatch(editTodo(updatedTask));  
    setIsEditDialogOpen(false);  
  };
  
  const { filteredTasks } = useOutletContext();
  return (
    <Container>
      <Typography variant="h4" gutterBottom  className='commonTitle'>All Tasks...</Typography>
      <div  style={{display:'flex', gap:'10px'}}>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onToggleImportant={handleToggleImportant}
            onDelete={handleDelete}
            onEdit={handleEditClick}  
          />
        ))
      ) : (
        <Typography variant='h3' sx={{color:'green'}} className='commonTitle'>No tasks available!</Typography>
      )}
      </div>

     
      {selectedTask && (
        <EditTodoDialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          task={selectedTask}
          onEditTodo={handleEditTodo}
        />
      )}
    </Container>
  );
};

export default AllTask;
