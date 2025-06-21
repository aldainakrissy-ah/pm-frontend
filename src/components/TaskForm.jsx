import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { createTask } from '../api/api';

function TaskForm({onTaskCreated}) {
  const [form, setForm] = useState({
    name: '',
    priority: 1,
    dueDate: '',
    assignee: '',
    projectId: 1
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(form.projectId, form);
      alert('Task created');
      if (onTaskCreated) onTaskCreated();
    } catch (error) {
      alert('Error creating task');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1em' }}>
      <TextField label="Task Name" name="name" onChange={handleChange} required />
      <TextField label="Assignee" name="assignee" onChange={handleChange} required />
      <TextField
        label="Priority"
        name="priority"
        type="number"
        select
        onChange={handleChange}
        value={form.priority}
      >
        {[1,2,3,4,5].map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
      </TextField>
      <TextField
        label="Due Date"
        type="date"
        name="dueDate"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained">Create Task</Button>
    </form>
  );
}

export default TaskForm;