import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [skills, setSkills] = useState(() => JSON.parse(localStorage.getItem("skills")) || []);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem("logs")) || []);
  const [skillInput, setSkillInput] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [logInput, setLogInput] = useState("");

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [skills, tasks, logs]);

  const addSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, done: false }]);
      setTaskInput("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const addLog = () => {
    if (logInput.trim()) {
      const today = new Date().toLocaleDateString();
      setLogs([{ date: today, text: logInput }, ...logs]);
      setLogInput("");
    }
  };

  const deleteLog = (index) => {
    setLogs(logs.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard">
      <h1>📊 Skill & Work Tracker</h1>

      <div className="grid">
        {/* Skills */}
        <div className="card">
          <h2>🚀 Skills</h2>
          <div className="input-row">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="e.g., React"
            />
            <button onClick={addSkill}>Add</button>
          </div>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>
                {skill}
                <button onClick={() => removeSkill(index)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tasks */}
        <div className="card">
          <h2>🧑‍💻 Work Tasks</h2>
          <div className="input-row">
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="e.g., Fix login bug"
            />
            <button onClick={addTask}>Add</button>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className={task.done ? "done" : ""}>
                <span onClick={() => toggleTask(index)}>{task.text}</span>
                <button onClick={() => deleteTask(index)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Logs */}
        <div className="card log-card">
          <h2>📅 Daily Logs</h2>
          <textarea
            value={logInput}
            onChange={(e) => setLogInput(e.target.value)}
            placeholder="Write what you worked on today..."
          ></textarea>
          <button onClick={addLog}>Add Log</button>
          <div className="logs">
            {logs.map((log, index) => (
              <div key={index} className="log-entry">
                <strong>{log.date}:</strong> {log.text}
                <button onClick={() => deleteLog(index)}>❌</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
