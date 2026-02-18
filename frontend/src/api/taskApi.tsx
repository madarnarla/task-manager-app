import axios from "axios";
import type { Task } from "../types/Task";

const API_URL = "http://localhost:8080/api/tasks";

export const getTasks = () => axios.get<Task[]>(API_URL);

export const getTask = (id: number) =>
  axios.get<Task>(`${API_URL}/${id}`);

export const createTask = (task: Task) =>
  axios.post<Task>(API_URL, task);

export const updateTask = (id: number, task: Task) =>
  axios.put<Task>(`${API_URL}/${id}`, task);

export const deleteTask = (id: number) =>
  axios.delete(`${API_URL}/${id}`);

export const toggleTask = (id: number) =>
  axios.patch(`${API_URL}/${id}/toggle`);
