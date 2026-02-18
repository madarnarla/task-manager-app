import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, updateTask } from "../api/taskApi";
import TaskForm from "../components/TaskForm";
import type { Task } from "../types/Task";

export default function TaskEditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    if (!id) return;
    const res = await getTask(Number(id));
    setTask(res.data);
  };

  const handleSubmit = async (t: Task) => {
    if (!id) return;
    await updateTask(Number(id), t);
    nav("/");
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm initial={task} onSubmit={handleSubmit} />
    </div>
  );
}
