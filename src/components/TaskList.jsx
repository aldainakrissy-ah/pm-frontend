import React, { useState, useEffect } from 'react';
import { getTasks } from '../api/api';
import {
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  Box
} from '@mui/material';

function TaskList({ selectedProject, refresh }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTasks, setTotalTasks] = useState(0);
  const [orderBy, setOrderBy] = useState('priority');
  const [order, setOrder] = useState('asc');

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
          sortBy: orderBy,
          sortDirection: order,
          page,
          size: rowsPerPage
        });
        setTasks(res?.data?.content ?? []);
        setTotalTasks(res?.data?.totalElements ?? 0);
      } catch {
        alert('Failed to load tasks');
        setTasks([]);
        setTotalTasks(0);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [refresh, selectedProject, page, rowsPerPage, orderBy, order]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return loading ? (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
      <CircularProgress />
    </div>
  ) : (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell sortDirection={orderBy === 'priority' ? order : false}>
              <TableSortLabel
                active={orderBy === 'priority'}
                direction={orderBy === 'priority' ? order : 'asc'}
                onClick={() => handleRequestSort('priority')}
              >
                Priority
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'dueDate' ? order : false}>
              <TableSortLabel
                active={orderBy === 'dueDate'}
                direction={orderBy === 'dueDate' ? order : 'asc'}
                onClick={() => handleRequestSort('dueDate')}
              >
                Due Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Assignee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">No tasks found.</TableCell>
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
      <TablePagination
        component="div"
        count={totalTasks}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}

export default TaskList;