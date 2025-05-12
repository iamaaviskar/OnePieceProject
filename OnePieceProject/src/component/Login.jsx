import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { authenticate, user } = useContext(AuthContext);

  function onSubmit(data) {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = storedUsers.find(
        (user) =>
          user.username === data.username && user.password === data.password
      );
      console.log("Found user", foundUser);

      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        authenticate(foundUser);
        toast.success("Login successful!", {
          position: "top-right",
          closeOnClick: true,
          autoClose: 2000,
        });
      } else {
        toast.error("Invalid username or password.");
      }

      reset();
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Failed to login");
    }
  }

  function onError(errors) {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  }

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col justify-center items-center min-h-screen space-y-2">
        <button
          type="button"
          disabled={!user}
          onClick={() => user && navigate("/")}
          className={`w-full ${user ? "bg-blue-600" : "bg-gray-500"} ${
            user ? "hover:bg-blue-700" : "bg-gray-600"
          }  text-white py-2 transition duration-200 cursor-pointer fixed top-0 left-0 z-10`}
        >
          Go home
        </button>
        <form
          className="bg-white border-2 p-8 rounded-xl shadow-lg w-full max-w-md"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h1>
          <div className="mb-4">
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
              })}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200 cursor-pointer"
          >
            Login
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-black">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  navigate("/register");
                }}
                type="button"
                className="text-gray-700 hover:underline font-bold"
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
