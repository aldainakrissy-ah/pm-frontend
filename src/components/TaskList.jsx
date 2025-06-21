import React, { useState, useEffect } from 'react';
import { getTasks, getProjects } from '../api/api';
import {
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';

function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await getProjects();
        setProjects(res?.data ?? []);
      } catch {
        alert('Failed to load projects');
        setProjects([]);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      if (!selectedProject) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await getTasks(selectedProject, {
          startDate: '2024-01-01',
          endDate: '2025-12-31',
          sortBy: 'priority',
          page: 0,
          size: 10
        });
        setTasks(res?.data?.content ?? []);
      } catch {
        alert('Failed to load tasks');
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [refresh, selectedProject]);

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  return (
    <>
      <Box sx={{ margin: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="project-select-label">Select Project</InputLabel>
          <Select
            labelId="project-select-label"
            value={selectedProject}
            label="Select Project"
            onChange={handleProjectChange}
          >
            {projects.map(project => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
          <CircularProgress />
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Assignee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}

export default TaskList;
