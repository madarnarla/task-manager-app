import { useState } from "react";
import { Task } from "../types/Task";

interface Props {
  initial?: Task;
  onSubmit: (task: Task) => void;
}

export default function TaskForm({ initial, onSubmit }: Props) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [dueDate, setDueDate] = useState(initial?.dueDate || "");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title required");
      return;
    }

    onSubmit({
      title,
      description,
      dueDate,
      completed: initial?.completed || false
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input
        type="datetime-local"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />

      <button type="submit">Save</button>
    </form>
  );
}
