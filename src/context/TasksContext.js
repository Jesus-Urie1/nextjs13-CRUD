"use client";
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const createTask = (title, description) => {
    const newTask = {
      id: uuid(),
      title,
      description,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const filteredTasks = [...tasks].filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const updateTask = (id, title, description) => {
    const updatedTasks = [...tasks].map((task) => {
      if (task.id === id) {
        task.title = title;
        task.description = description;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
