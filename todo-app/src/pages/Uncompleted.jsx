import React ,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo ,editTodo,toggleImportant} from '../store/TodoSlice';
import TaskCard from '../components/TaskCard';
import { Container, Typography } from '@mui/material';
import EditTodoDialog from '../components/EditTodo';
import { useOutletContext } from 'react-router-dom';

const UncompletedTask = () => {
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
  // const uncompletedTasks = tasks.filter((task) => !task.completed);
  const { filteredTasks } = useOutletContext();

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{color:'black',}}>Uncompleted Tasks...</Typography>
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
            style={{BorderRight:'5px solid red'}}
          />
        ))
      ) : (
        <Typography variant='h3' sx={{color:'green'}}>No uncompleted tasks available!</Typography>
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

export default UncompletedTask;
