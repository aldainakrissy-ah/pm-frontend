
/**
 * API Utility Functions
 * ---------------------
 * Provides functions to interact with the backend API for projects and tasks.
 *
 * Endpoints:
 * - POST   /projects/:projectId/tasks   (create a new task)
 * - GET    /projects/:projectId/tasks   (get tasks for a project, with filters)
 * - GET    /projects                    (get all projects)
 */

import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const createTask = (projectId, task) =>
  API.post(`/projects/${projectId}/tasks`, task);

export const getTasks = (projectId, params) =>
  API.get(`/projects/${projectId}/tasks`, { params });

export const getProjects = () =>
  API.get('/projects');