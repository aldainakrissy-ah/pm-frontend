import React, { useState, useEffect } from 'react';
import { getTasks } from '../api/api';
import { CircularProgress, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

function TaskList({ refresh }) {
  // State to hold tasks and loading state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
// Fetch tasks when component mounts or refresh changes
useEffect(() => {
  async function fetchTasks() {
    setLoading(true);
    try {
      const res = await getTasks(1, {
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        sortBy: 'priority',
        page: 0,
        size: 10
      });
      setTasks(res?.data?.content ?? []); // <-- fallback to empty array
    } catch {
      alert('Failed to load tasks');
      setTasks([]); // <-- ensure tasks is always an array on error
    } finally {
      setLoading(false);
    }
  }
  fetchTasks();
}, [refresh]);

 if (loading) return <CircularProgress />;

  return (
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
  );
}

export default TaskList;