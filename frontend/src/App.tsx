import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskListPage from "./pages/TasksListPages";
import TaskCreatePage from "./pages/TaskCreatePage";
import TaskEditPage from "./pages/TaskEditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/create" element={<TaskCreatePage />} />
        <Route path="/edit/:id" element={<TaskEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
