/**
 * TaskForm Component
 * ------------------
 * Form for creating a new task.
 * Allows users to enter task details and select a project.
 *
 * Props:
 * - selectedProject: string | number (project ID)
 * - onTaskCreated: function (callback after task creation)
 *
 * Dependencies:
 * - @mui/material
 */
import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { createTask } from '../api/api';

function TaskForm({ selectedProject, onTaskCreated }) {
  const [form, setForm] = useState({
    name: '',
    priority: 1,
    dueDate: '',
    assignee: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = { ...form, projectId: selectedProject };
      await createTask(selectedProject, taskData);
      alert('Task created');
      if (onTaskCreated) onTaskCreated();
      setForm({ name: '', priority: 1, dueDate: '', assignee: '' }); // Reset form
    } catch {
      alert('Error creating task');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '1em 0', display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
      <TextField
        label="Task Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Assignee"
        name="assignee"
        value={form.assignee}
        onChange={handleChange}
        required
      />
      <TextField
        label="Priority"
        name="priority"
        type="number"
        select
        value={form.priority}
        onChange={handleChange}
      >
        {[1, 2, 3, 4, 5].map(n => (
          <MenuItem key={n} value={n}>{n}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Due Date"
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained">Create Task</Button>
    </form>
  );
}

export default TaskForm;
// This component allows users to create a new task for a selected project.