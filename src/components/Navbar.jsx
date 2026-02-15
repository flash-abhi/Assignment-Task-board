import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Board</h1>
      <button
        onClick={logout}
        className="bg-red-500 rounded-2xl font-semibold flex items-center justify-center text-white px-4  py-2 hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
