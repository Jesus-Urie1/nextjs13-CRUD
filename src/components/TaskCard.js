import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TasksContext";
import { toast } from "react-hot-toast";
export const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();
  const router = useRouter();
  return (
    <div
      style={{ background: "#202020", color: "white" }}
      onClick={() => router.push(`/edit/${task.id}`)}
    >
      <h1>{task.title}</h1>
      <button
        onClick={(e) => {
          e.stopPropagation();
          window.confirm("Are you sure you want to delete this task?") &&
            deleteTask(task.id);
          toast.success("Task deleted");
        }}
      >
        Delete
      </button>
      <p>{task.description}</p>
    </div>
  );
};
