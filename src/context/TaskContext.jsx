import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  // Load from localStorage safely
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      const savedLog = localStorage.getItem("activityLog");

      if (savedTasks) setTasks(JSON.parse(savedTasks));
      if (savedLog) setActivityLog(JSON.parse(savedLog));
    } catch (error) {
      console.error("Storage error:", error);
    }
  }, []);

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("activityLog", JSON.stringify(activityLog));
  }, [activityLog]);

  // Add Activity
  const addActivity = (message) => {
    const newLog = {
      id: uuidv4(),
      message,
      timestamp: new Date().toLocaleString(),
    };

    setActivityLog((prev) => [newLog, ...prev]);
  };

  // Create Task
  const createTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "Low",
      dueDate: taskData.dueDate || "",
      tags: taskData.tags || [],
      status: "todo",
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
    addActivity(`Task created: ${newTask.title}`);
  };

  // Edit Task
  const editTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    addActivity(`Task edited: ${updatedTask.title}`);
  };

  // Delete Task
  const deleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    addActivity(`Task deleted: ${task?.title}`);
  };
  
  // Move Task
  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };

  // Reset Board
  const resetBoard = () => {
    const confirmReset = window.confirm("Are you sure you want to reset?");
    if (!confirmReset) return;

    setTasks([]);
    setActivityLog([]);
    localStorage.removeItem("tasks");
    localStorage.removeItem("activityLog");
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activityLog,
        createTask,
        editTask,
        moveTask,
        deleteTask,
        resetBoard,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
