import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const createTask = (projectId, task) =>
  API.post(`/projects/${projectId}/tasks`, task);

export const getTasks = (projectId, params) =>
  API.get(`/projects/${projectId}/tasks`, { params });

export const getProjects = () =>
  API.get('/projects');