import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://to-do-list-api-integration.onrender.com/api/todos/";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Fetch tasks from the backend
    axios
      .get(API_URL)
      .then((response) => {
        setTasks(response.data);  // Assuming your API returns the task list
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") return;
    axios
      .post(API_URL, { text: task, completed: false })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTask("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  // Delete a task
  const removeTask = (index) => {
    const taskToRemove = tasks[index];
    axios
      .delete(`${API_URL}${taskToRemove.id}`)
      .then(() => {
        setTasks(tasks.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  // Start editing a task
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  // Save edited task
  const saveEdit = () => {
    if (editingText.trim() === "") return;
    const updatedTask = { ...tasks[editingIndex], text: editingText };
    axios
      .put(`${API_URL}${updatedTask.id}/`, updatedTask)
      .then((response) => {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = response.data;
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditingText("");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  // Toggle task completion
  const toggleComplete = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    axios
      .put(`${API_URL}${updatedTask.id}/`, updatedTask)
      .then((response) => {
        const updatedTasks = tasks.map((t, i) =>
          i === index ? response.data : t
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error toggling task completion:", error);
      });
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
          <li key={index} className={`task-item ${t.completed ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(index)}
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
                <span className="task-text">{t.text}</span>
                <div className="buttons">
                  <button className="edit-btn" onClick={() => startEditing(index)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => removeTask(index)}>🗑️ Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
