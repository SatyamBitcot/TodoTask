import React , {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo ,toggleImportant,editTodo} from '../store/TodoSlice';
import TaskCard from '../components/TaskCard';
import EditTodoDialog from '../components/EditTodo';
import { Container, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { BorderRight } from '@mui/icons-material';

const CompletedTask = () => {
  const tasks = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);


  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleToggleImportant = (id) => {
    dispatch(toggleImportant(id));
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);  
    setIsEditDialogOpen(true);  
  };

  const handleEditTodo = (updatedTask) => {
    dispatch(editTodo(updatedTask));  
    setIsEditDialogOpen(false);  
  };


  // const completedTasks = tasks.filter((task) => task.completed);
  const { filteredTasks } = useOutletContext();

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{color:'black'}}>Completed Tasks...</Typography>
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
            context="completed"
          />
        ))
      ) : (
        <Typography variant='h3' sx={{color:'green'}}>No completed tasks available!</Typography>
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

export default CompletedTask;
