import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="bg-blue-600 w-full py-4 shadow-lg">
        <div className="container mx-auto text-white flex justify-between items-center px-5">
          <h1 className="text-xl font-bold">My Awesome App</h1>
          {user && (
            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto p-5">
        {user && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-3">
              Welcome back, {user.username}!
            </h2>
            <p className="text-gray-700 mb-5">
              Explore your dashboard, manage your settings, or just vibe around.
              🎉
            </p>
            <button
              className="bg-blue-500 text-white p-3 rounded-lg shadow hover:bg-blue-600"
              onClick={() => alert("Navigating to dashboard...")}
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-3 w-full text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My Awesome App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
