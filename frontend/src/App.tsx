import { useState, useEffect } from "react";


const API_URL = "http://localhost:5000/api/tasks";

function App() {
  interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const loadTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(!title.trim()){
      return;
    }

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    setTitle("");
    setDescription("");
    loadTasks();
  }


  const toggleTask = async(task: { _id: any; completed: any; }) => {
    await fetch(`${API_URL}/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });
    loadTasks();
  }

  const deleteTask = async(id: any) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    loadTasks();
  }

  return (
    <>
      <h1 className="text-red-500 text-2xl">Task Manager</h1>

      <form onSubmit={createTask}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Add Task</button>
      </form>

      <div className="mt-4">
        {tasks.map((task) => (
          <div key={task._id} className="flex items-center gap-2">
            <div>
              <h3 className={task.completed ? "completed" : ""}>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <button onClick={() => toggleTask(task)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
