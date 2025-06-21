import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { getProjects } from '../api/api';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

function TaskManager() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await getProjects();
        const list = res?.data ?? [];
        setProjects(list);
        if (list.length > 0) {
          setSelectedProject(list[0].id);
        }
      } catch {
        alert('Failed to fetch projects');
      }
    }

    fetchProjects();
  }, []);

  const handleTaskCreated = () => {
    setRefresh(r => !r);
  };

  return (
    <div style={{ padding: '1em' }}>
      <Typography variant="h4" gutterBottom>
        Project Management Tool
      </Typography>

      {/* Project Selector */}
      <Box sx={{ marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="project-select-label">Select Project</InputLabel>
          <Select
            labelId="project-select-label"
            value={selectedProject}
            label="Select Project"
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {projects.map(project => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TaskForm
        selectedProject={selectedProject}
        onTaskCreated={handleTaskCreated}
      />
      <TaskList
        selectedProject={selectedProject}
        refresh={refresh}
      />
    </div>
  );
}

export default TaskManager;
