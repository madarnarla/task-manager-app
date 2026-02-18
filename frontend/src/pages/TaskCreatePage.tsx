import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { createTask } from "../api/taskApi";

export default function TaskCreatePage() {
  const nav = useNavigate();

  const handleSubmit = async (task: any) => {
    await createTask(task);
    nav("/");
  };

  return (
    <div>
      <h2>Create Task</h2>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
