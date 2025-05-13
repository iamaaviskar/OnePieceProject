import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";

const RegistrationForm = () => {
  const { register, handleSubmit, watch } = useForm();
  const { authenticate } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const pirateFont = { fontFamily: "'Pirata One', cursive" };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const onSubmit = (data) => {
    try {
      if (users.some((u) => u.username === data.username)) {
        toast.error("This pirate name be taken already!");
        return;
      }

      if (users.some((u) => u.email === data.email)) {
        toast.error("This message in a bottle already arrived!");
        return;
      }

      if (data.password !== data.confirmPassword) {
        toast.error("The secret codes don't match, matey!");
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

      toast.success("Welcome to the crew, matey!");
      setTimeout(() => {
        authenticate({ username: newUser.username, email: newUser.email });
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Stormy seas! Failed to register.");
    }
  };

  function onError(errors) {
    Object.values(errors).forEach((error) => {
      toast.error(error.message, { closeOnClick: true });
    });
  }

  const JollyRoger = () => (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      className="mx-auto mb-2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="30"
        cy="30"
        r="15"
        fill="#fff"
        stroke="#1D3557"
        strokeWidth="2"
      />
      <ellipse cx="25" cy="30" rx="2" ry="3" fill="#1D3557" />
      <ellipse cx="35" cy="30" rx="2" ry="3" fill="#1D3557" />
      <path
        d="M25 38 Q30 42 35 38"
        stroke="#1D3557"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="8"
        y="28"
        width="44"
        height="4"
        rx="2"
        fill="#fff"
        stroke="#1D3557"
        strokeWidth="2"
        transform="rotate(20 30 30)"
      />
      <rect
        x="8"
        y="28"
        width="44"
        height="4"
        rx="2"
        fill="#fff"
        stroke="#1D3557"
        strokeWidth="2"
        transform="rotate(-20 30 30)"
      />
    </svg>
  );

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#1D3557] via-[#457B9D] to-[#A8DADC]">
        <motion.div
          className="absolute top-8 text-[#F1FAEE] font-bold bg-[#1D3557] bg-opacity-80 px-6 py-3 rounded-xl shadow-lg border-2 border-[#457B9D]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={pirateFont}
        >
          🏴‍☠️ "Join our mighty pirate crew! Register to set sail!"
        </motion.div>

        <motion.div
          className="bg-[#457B9D] border-4 border-[#A8DADC] p-8 rounded-3xl shadow-2xl w-full max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, delay: 0.5 }}
        >
          <JollyRoger />

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-4"
          >
            <h1
              className="text-3xl font-bold text-center text-[#F1FAEE] mb-6"
              style={pirateFont}
            >
              Join the Crew!
            </h1>

            <input
              type="text"
              {...register("username", {
                required: "Pirate name be required!",
              })}
              placeholder="Pirate Name"
              className="w-full px-4 py-3 border-2 border-[#A8DADC] rounded-md bg-[#1D3557] text-[#F1FAEE] font-semibold"
              style={pirateFont}
            />

            <input
              type="email"
              {...register("email", {
                required: "Message bottle address be required!",
              })}
              placeholder="Message Bottle Address"
              className="w-full px-4 py-3 border-2 border-[#A8DADC] rounded-md bg-[#1D3557] text-[#F1FAEE] font-semibold"
              style={pirateFont}
            />

            <input
              type="password"
              {...register("password", {
                required: "Secret code be required!",
              })}
              placeholder="Secret Code"
              className="w-full px-4 py-3 border-2 border-[#A8DADC] rounded-md bg-[#1D3557] text-[#F1FAEE] font-semibold"
              style={pirateFont}
            />

            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your secret code!",
              })}
              placeholder="Confirm Secret Code"
              className="w-full px-4 py-3 border-2 border-[#A8DADC] rounded-md bg-[#1D3557] text-[#F1FAEE] font-semibold"
              style={pirateFont}
            />

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-[#457B9D] to-[#A8DADC] text-[#1D3557] font-bold py-3 rounded-xl shadow-lg border-2 border-[#F1FAEE]"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 8px 24px #A8DADC",
              }}
              style={pirateFont}
            >
              🏴‍☠️ Join the Crew!
            </motion.button>

            <div className="text-center mt-4">
              <p className="text-[#F1FAEE]" style={pirateFont}>
                Already a pirate?{" "}
                <button
                  onClick={() => navigate("/login")}
                  type="button"
                  className="text-[#A8DADC] font-bold hover:underline cursor-pointer"
                  style={pirateFont}
                >
                  Board the Ship!
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default RegistrationForm;
