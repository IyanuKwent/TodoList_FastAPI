import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const API_URL = "https://backend-fastapi-obja.onrender.com";

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" | "error"

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          setAlertMessage("Failed to fetch tasks.");
          setAlertType("error");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setAlertMessage("Unable to fetch tasks.");
        setAlertType("error");
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (task.trim() === "") {
      setAlertMessage("Task cannot be empty.");
      setAlertType("error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        setTask("");
        setAlertMessage("Task added!");
        setAlertType("success");
      } else {
        const errorData = await response.json();
        console.error("Error adding task:", errorData);
        setAlertMessage("Failed to add task.");
        setAlertType("error");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      setAlertMessage("An error occurred while adding task.");
      setAlertType("error");
    }
  };

  return (
    <div className="app-container" style={{ display: "flex", height: "100vh" }}>
      <div className={`sidebar ${tasks.length === 0 ? "centered" : "with-tasks"}`}>
        <h1>Olandria's TODO App</h1>

        {alertMessage && (
          <div className={`alert ${alertType}`}>
            {alertMessage}
          </div>
        )}

        <div className="submenu">
          <button onClick={() => window.open("https://github.com/IyanuKwent/ToDoList_Django", "_blank")}>
            Repository
          </button>
          <button onClick={() => window.open("https://backend-fastapi-obja.onrender.com/docs", "_blank")}>
            FastAPI Docs
          </button>
        </div>

        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTask();
            }
          }}
        />
        <button className="add-task" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="todo-column" style={{ flexGrow: 1, padding: "30px", overflowY: "auto" }}>
        <TodoList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
