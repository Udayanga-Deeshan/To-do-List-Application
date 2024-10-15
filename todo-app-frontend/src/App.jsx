import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; 
import TaskList from './Components/TaskList/TaskList';
import TaskForm from './Components/TaskForm/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finish Project', description: 'Complete the web app by the end of the week.', due_date: '2024-10-20', status: 'pending' },
    { id: 2, title: 'Plan Vacation', description: 'Plan the vacation for December.', due_date: '2024-12-15', status: 'pending' },
    { id: 3, title: 'Buy Groceries', description: 'Get groceries for the week.', due_date: '2024-10-17', status: 'completed' }
  ]);

  
  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

 
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    setTasks(updatedTasks);
  };

  
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <Routes>
        
        <Route
          path="/"
          element={<TaskList tasks={tasks} deleteTask={deleteTask} />}
        />

        
        <Route
          path="/add-task"
          element={<TaskForm addTask={addTask} />}
        />

        
        <Route
          path="/edit-task/:id"
          element={<TaskForm updateTask={updateTask} tasks={tasks} />}
        />
      </Routes>
    </div>
  );
};

export default App;
