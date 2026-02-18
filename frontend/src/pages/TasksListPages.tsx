import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  dueDate: string;
}

function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [page, setPage] = useState(0);
  const [size] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    let url = `http://localhost:8080/api/tasks?page=${page}&size=${size}&sortBy=${sortBy}`;

    if (statusFilter) {
      url += `&status=${statusFilter}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setTasks(data.content))
      .catch((err) => console.error(err));
  }, [page, size, sortBy, statusFilter]);

  const deleteTask = (id: number) => {
    if (!window.confirm("Delete this task?")) return;

    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task List</h2>

      {/* FILTER + SORT */}
      <div style={{ marginBottom: "15px" }}>
        <label>Status Filter: </label>
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <label style={{ marginLeft: "20px" }}>Sort By: </label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Created Date</option>
          <option value="title">Title</option>
          <option value="dueDate">Due Date</option>
        </select>

        <button
          style={{ marginLeft: "20px" }}
          onClick={() => navigate("/create")}
        >
          + Create Task
        </button>
      </div>

      {/* TABLE */}
      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
            <th>Due</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.createdAt}</td>
              <td>{task.dueDate}</td>
              <td>
                <button onClick={() => navigate(`/edit/${task.id}`)}>
                  Edit
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{ marginTop: "20px" }}>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>Page {page + 1}</span>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default TaskListPage;
