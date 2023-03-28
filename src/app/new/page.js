"use client";
import { useEffect, useState } from "react";
import { useTasks } from "@/context/TasksContext";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const router = useRouter();
  const { tasks, createTask, updateTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      updateTask(params.id, task.title, task.description);
    } else {
      createTask(task.title, task.description);
    }
    router.push("/");
  };

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      setTask(taskFound);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Write a title"
        onChange={handleChange}
        value={task.title}
      />
      <textarea
        name="description"
        placeholder="Write a description"
        onChange={handleChange}
        value={task.description}
      />
      <button>Save</button>
    </form>
  );
};

export default Page;
