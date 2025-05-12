import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useState, useContext, useEffect } from "react";

const RegistrationForm = () => {
  const { register, handleSubmit, watch } = useForm();
  const { authenticate } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const onSubmit = (data) => {
    try {
      console.log(data);

      if (users.some((u) => u.username === data.username)) {
        toast.error("Username already exists");
        return;
      }

      if (users.some((u) => u.email === data.email)) {
        toast.error("Email already exists");
        return;
      }

      const newUser = {
        email: data.email,
        username: data.username,
        password: data.password,
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setUsers(updatedUsers);

      toast.success("User registered successfully!");
      setTimeout(() => {
        authenticate({ username: newUser.username, email: newUser.email });
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Failed to save user data");
    }
  };
  function onError(errors) {
    Object.values(errors).forEach((error) => {
      toast.error(error.message, { closeOnClick: true });
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen ">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="bg-white border-2  p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Register
          </h1>
          <div className="mb-4">
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
              })}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200 cursor-pointer"
          >
            Register
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-black">
              Already registered?{" "}
              <button
                onClick={() => {
                  navigate("/login");
                }}
                type="button"
                className="text-gray-700 hover:underline font-bold"
              >
                Log in
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
