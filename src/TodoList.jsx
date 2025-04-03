import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api/todos/";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch tasks from API
  useEffect(() => {
    fetch(`${API_URL}fetch`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") return;
    fetch(`${API_URL}create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task, completed: false }),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks([...tasks, newTask]))
      .catch((err) => console.error("Error adding task:", err));
    setTask("");
  };

  // Delete a task
  const removeTask = (id) => {
    fetch(`${API_URL}${id}/delete`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => console.error("Error deleting task:", err));
  };

  // Start editing a task
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].title);
  };

  // Save edited task
  const saveEdit = () => {
    if (editingText.trim() === "") return;
    const taskToUpdate = tasks[editingIndex];

    fetch(`${API_URL}${taskToUpdate.id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...taskToUpdate, title: editingText }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
        setEditingIndex(null);
        setEditingText("");
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    const taskToUpdate = tasks.find((t) => t.id === id);

    fetch(`${API_URL}${id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...taskToUpdate, completed: !taskToUpdate.completed }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      })
      .catch((err) => console.error("Error toggling completion:", err));
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h2>To-Do List</h2>

      {/* Task Input */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>➕ Add Task</button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-container">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed ✅</button>
        <button onClick={() => setFilter("Pending")}>Pending ⏳</button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.map((t, index) => (
          <li key={t.id} className={`task-item ${t.completed ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t.id)}
            />
            {editingIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button className="save-btn" onClick={saveEdit}>💾 Save</button>
                <button className="cancel-btn" onClick={() => setEditingIndex(null)}>❌ Cancel</button>
              </div>
            ) : (
              <>
                <span className="task-text">{t.title}</span>
                <div className="buttons">
                  <button className="edit-btn" onClick={() => startEditing(index)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => removeTask(t.id)}>🗑️ Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
