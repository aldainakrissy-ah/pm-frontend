import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskCreated = () => setRefresh(r => !r);

  return (
    <div>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList refresh={refresh} />
    </div>
  );
}

export default App;