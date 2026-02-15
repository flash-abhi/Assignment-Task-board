import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
const Column = ({ title, tasks, id }) => {
  // console.log(id);
  const { setNodeRef } = useDroppable({
    id: id,
  });
  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-lg min-h-[400px]shadow p-4 w-1/3"
    >
      <h2
        className={`font-semibold ${title === "Todo" ? "text-blue-500" : title === "Doing" ? "text-yellow-500" : "text-green-500"} text-lg mb-4`}
      >
        {title}
      </h2>

      <div className="space-y-3">
        {tasks.length === 0 && (
          <p className="text-sm text-gray-400">No tasks</p>
        )}

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
