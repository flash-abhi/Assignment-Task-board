import { useTasks } from "../context/TaskContext";
const ActivityLog = () => {
  const { activityLog, resetBoard } = useTasks();

  return (
    <div className="mt-8 bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold">Activity Log</h2>
        <button
          onClick={resetBoard}
          className="text-sm border border-red-200 hover:text-white hover:bg-red-500 py-1 px-2 rounded-md bg-red-50 text-red-500"
        >
          Reset Board
        </button>
      </div>

      {activityLog.length === 0 && (
        <p className="text-sm text-gray-400">No activity yet</p>
      )}

      <ul className="space-y-2 text-sm">
        {activityLog.map((log) => (
          <li key={log.id}>
            {log.message} —{" "}
            <span className="text-gray-400">{log.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
