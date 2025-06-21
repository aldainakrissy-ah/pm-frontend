/**
 * TaskList Component
 * ------------------
 * Displays a list of tasks for a selected project.
 * Allows filtering by date range, sorting by priority or due date,
 * and paginating results.
 *
 * Props:
 * - selectedProject: string | number (project ID to filter tasks)
 * - refresh: boolean (triggers re-fetch of tasks)
 *
 * Dependencies:
 * - @mui/material
 * - @mui/x-date-pickers
 * - dayjs
 */
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
  Box,
  Grid,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

function TaskList({ selectedProject, refresh }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTasks, setTotalTasks] = useState(0);
  const [orderBy, setOrderBy] = useState('priority');
  const [order, setOrder] = useState('asc');
  const [dateRange, setDateRange] = useState([dayjs().startOf('month'), dayjs().endOf('month')]);

  useEffect(() => {
    async function fetchTasks() {
      if (!selectedProject || !dateRange[0] || !dateRange[1]) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await getTasks(selectedProject, {
          startDate: dayjs(dateRange[0]).format('YYYY-MM-DD'),
          endDate: dayjs(dateRange[1]).format('YYYY-MM-DD'),
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
  }, [refresh, selectedProject, page, rowsPerPage, orderBy, order, dateRange]);

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

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              value={dateRange[0]}
              onChange={newValue => setDateRange([newValue, dateRange[1]])}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ mr: 2 }}
                  inputProps={{
                    ...params.inputProps,
                    'aria-label': 'Start date',
                  }}
                
                  inputRef={params.inputRef}
                />
              )}
              disableMaskedInput={false}
              allowKeyboardControl
              showDaysOutsideCurrentMonth
            />
            <DatePicker
              label="End date"
              value={dateRange[1]}
              onChange={newValue => setDateRange([dateRange[0], newValue])}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    'aria-label': 'End date',
                  }}
                  inputRef={params.inputRef}
                />
              )}
              disableMaskedInput={false}
              allowKeyboardControl
              showDaysOutsideCurrentMonth
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      {loading ? (
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
      )}
    </Box>
  );
}

export default TaskList;