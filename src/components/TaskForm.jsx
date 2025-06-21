import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import { createTask, getProjects } from '../api/api';

function TaskForm({ onTaskCreated }) {
  const [form, setForm] = useState({
    name: '',
    priority: 1,
    dueDate: '',
    assignee: '',
    projectId: ''
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await getProjects();
        const projectList = res?.data ?? [];
        setProjects(projectList);

        // Set default selected project if list is not empty
        if (projectList.length > 0) {
          setForm(prev => ({ ...prev, projectId: projectList[0].id }));
        }
      } catch {
        alert('Failed to load projects');
        setProjects([]);
      }
    }

    fetchProjects();
  }, []);

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
    <form onSubmit={handleSubmit} style={{ marginBottom: '1em', display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
      <TextField
        label="Task Name"
        name="name"
        onChange={handleChange}
        required
      />
      <TextField
        label="Assignee"
        name="assignee"
        onChange={handleChange}
        required
      />
      <TextField
        label="Priority"
        name="priority"
        type="number"
        select
        onChange={handleChange}
        value={form.priority}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <MenuItem key={n} value={n}>{n}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Due Date"
        type="date"
        name="dueDate"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />

      <FormControl>
        <InputLabel id="project-select-label">Project</InputLabel>
        <Select
          labelId="project-select-label"
          name="projectId"
          value={form.projectId}
          onChange={handleChange}
          required
          style={{ minWidth: 200 }}
        >
          {projects.map(project => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" alignItems="center">
        <Button type="submit" variant="contained">Create Task</Button>
      </Box>
    </form>
  );
}

export default TaskForm;
