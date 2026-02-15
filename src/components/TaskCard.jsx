import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
const TaskCard = ({ task }) => {
  const { deleteTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDate, setEditedDate] = useState(task.dueDate);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleUpdate = () => {
    editTask({
      ...task,
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDate,
    });
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 p-3 rounded shadow border"
    >
      <div {...listeners} {...attributes} className="cursor-move">
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>

        <div className="text-xs mt-2 space-y-1">
          <p className="font-semibold">
            Due-Date:{" "}
            <span className="font-normal bg-red-100 px-2 rounded border border-red-300">
              {task.dueDate}
            </span>
          </p>
          <p className="font-semibold">
            Priority:{" "}
            <span
              className={`${task.priority === "high" ? "text-red-600" : task.priority === "medium" ? "text-yellow-600" : "text-green-600"} font-semibold`}
            >
              {task.priority}
            </span>
          </p>
          <p className="font-semibold">
            Created At :{" "}
            <span className="font-normal">
              {new Date(task.createdAt).toLocaleString()}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="mt-3 text-blue-500 px-2  py-1 border border-blue-300 rounded-md hover:text-white hover:bg-blue-500 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="mt-3 text-red-500 px-2 py-1 border border-red-300 rounded-md hover:text-white hover:bg-red-500 text-sm"
        >
          Delete
        </button>
      </div>
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-30 flex items-center cursor-default justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="font-semibold mb-4">Edit Task</h2>
            <input
              className="w-full border p-2 mb-3"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <input
              type="date"
              name="dueDate"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <select
              name="priority"
              value={task.priority}
              onChange={(e) => editTask({ ...task, priority: e.target.value })}
              className="w-full border my-2 p-2 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={task.tags.join(", ")}
              onChange={(e) =>
                editTask({
                  ...task,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                })
              }
              className="w-full border p-2 mb-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                className="hover:text-white border bg-red-100 py-1 px-2 rounded-md  hover:bg-red-500 border-red-300 cursor-pointer"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="hover:bg-blue-500 hover:text-white border bg-blue-100 border-blue-300 px-3 cursor-pointer py-1 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
