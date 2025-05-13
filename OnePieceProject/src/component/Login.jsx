import { useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { authenticate } = useContext(AuthContext);

  function onSubmit(data) {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = storedUsers.find(
        (user) =>
          user.username === data.username && user.password === data.password
      );
      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        authenticate(foundUser);
        toast.success("Welcome aboard, Captain!", {
          position: "top-right",
          closeOnClick: true,
          autoClose: 2000,
        });
      } else {
        toast.error("Wrong map! Try again, matey.");
      }
      reset();
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Stormy seas! Failed to login.");
    }
  }

  function onError(errors) {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  }

  const pirateFont = { fontFamily: "'Pirata One', cursive" };

  const JollyRoger = () => (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      className="mx-auto mb-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Skull */}
      <circle
        cx="30"
        cy="30"
        r="15"
        fill="#fff"
        stroke="#1D3557"
        strokeWidth="2"
      />
      {/* Eyes */}
      <ellipse cx="25" cy="30" rx="2" ry="3" fill="#1D3557" />
      <ellipse cx="35" cy="30" rx="2" ry="3" fill="#1D3557" />
      {/* Smile */}
      <path
        d="M25 38 Q30 42 35 38"
        stroke="#1D3557"
        strokeWidth="2"
        fill="none"
      />
      {/* Crossbones */}
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
          🏴‍☠️ "Set Sail for Egghead Island! Login to your Pirate Crew."
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
            className="space-y-6"
          >
            <h1
              className="text-3xl font-bold text-center text-[#F1FAEE]"
              style={pirateFont}
            >
              Pirate Crew Login
            </h1>

            <div>
              <input
                type="text"
                {...register("username", {
                  required: "Username be required, matey!",
                })}
                placeholder="Pirate Name"
                className="w-full px-4 py-3 border-2 border-[#A8DADC] rounded-md bg-[#1D3557] text-[#F1FAEE] font-semibold"
                style={pirateFont}
              />
            </div>

            <div>
              <input
                type="password"
                {...register("password", {
                  required: "Password be required, matey!",
                })}
                placeholder="Secret Code"
                className="w-full px-4 py-3 border-2 border-[#A8DADC] rounded-md bg-[#1D3557] text-[#F1FAEE] font-semibold"
                style={pirateFont}
              />
            </div>

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
              <span role="img" aria-label="Treasure Chest">
                🪙
              </span>{" "}
              Board the Ship!
            </motion.button>

            <div className="text-center">
              <p className="text-[#F1FAEE]" style={pirateFont}>
                Don't have a crew?{" "}
                <button
                  onClick={() => navigate("/register")}
                  type="button"
                  className="text-[#A8DADC] font-bold hover:underline cursor-pointer"
                  style={pirateFont}
                >
                  Create your Crew!
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
