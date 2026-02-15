import { useTasks } from "../context/TaskContext";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import Navbar from "./../components/Navbar";
import ActivityLog from "../components/ActivityLog";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { useState } from "react";
import TaskCard from "../components/TaskCard";
const Board = () => {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const { tasks, moveTask } = useTasks();
  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    //  console.log("active:", active?.id);
    // console.log("over:", over?.id);
    if (!over) {
      setActiveTask(null);
      return;
    }
    moveTask(active.id, over.id);
    setActiveTask(null);
  };

  let filteredTasks = [...tasks].filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()),
  );

  if (priorityFilter !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === priorityFilter,
    );
  }

  if (sortOrder === "asc") {
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  if (sortOrder === "desc") {
    filteredTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }

  const todo = filteredTasks.filter((task) => task.status === "todo");
  const doing = filteredTasks.filter((task) => task.status === "doing");
  const done = filteredTasks.filter((task) => task.status === "done");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <TaskForm />
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4 items-center">
          {/* search functionality */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-64"
          />
          {/* filter by priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* Sort by date */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="none">No Sorting</option>
            <option value="asc">Due Date high</option>
            <option value="desc">Due Date low</option>
          </select>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4">
            <Column title="Todo" tasks={todo} id="todo" />
            <Column title="Doing" tasks={doing} id="doing" />
            <Column title="Done" tasks={done} id="done" />
          </div>
          <DragOverlay>
            {activeTask ? (
              <div className="opacity-80">
                <TaskCard task={activeTask} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
        <ActivityLog />
      </div>
    </>
  );
};

export default Board;
