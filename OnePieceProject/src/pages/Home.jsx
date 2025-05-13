import { useContext, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const pirateFontStyle = { fontFamily: "'Pirata One', cursive" };

const cards = [
  {
    title: "Characters",
    description:
      "One Piece is a wild, heartwarming pirate adventure about chasing dreams, forging unbreakable bonds, and finding freedom on the high seas.",
    img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/02/strawhat-pirates.jpg",
    link: "/characters",
    colors: {
      gradient: "from-blue-900 to-teal-900",
      shadow: "shadow-blue-500/40",
      border: "border-blue-500/30",
      buttonBg: "bg-yellow-500",
      buttonHover: "hover:bg-yellow-400",
      text: "text-black",
    },
  },
  {
    title: "Locations",
    description:
      "One Piece is a wild journey through strange islands, epic battles, and unforgettable adventures on the quest for the ultimate treasure.",
    img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/11/Wano-country-one-piece.jpg",
    link: "/locations",
    colors: {
      gradient: "from-purple-900 to-indigo-900",
      shadow: "shadow-purple-500/40",
      border: "border-purple-500/30",
      buttonBg: "bg-green-500",
      buttonHover: "hover:bg-green-400",
      text: "text-black",
    },
  },
  {
    title: "Episodes",
    description:
      "One Piece episodes deliver nonstop adventure, heartfelt moments, and epic battles that keep the journey exciting and unpredictable.",
    img: "https://preview.redd.it/ss3dlqgtfgq71.jpg?width=736&format=pjpg&auto=webp&s=276c3045533b4f91bad2583fe75649fa97e9a6a2",
    link: "/episodes",
    colors: {
      gradient: "from-pink-900 to-purple-900",
      shadow: "shadow-pink-500/40",
      border: "border-pink-500/30",
      buttonBg: "bg-pink-500",
      buttonHover: "hover:bg-pink-400",
      text: "text-black",
    },
  },
];

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [hoverIndex, setHoverIndex] = useState(null);

  const dots = useMemo(() => {
    const count = window.innerWidth < 640 ? 8 : 15;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
    }));
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/12/one-piece-egghead-island-feature-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* Header */}
      <header className="w-full relative flex justify-between items-center pt-6 sm:pt-8 px-4 sm:px-8 z-10">
        <h1
          className="text-xl sm:text-2xl font-bold text-[#F1FAEE]"
          style={pirateFontStyle}
        >
          🏴‍☠️ Egghead Research Lab
        </h1>
        {user && (
          <div className="flex items-center space-x-3">
            <span
              className="text-sm sm:text-base text-[#F1FAEE]"
              style={pirateFontStyle}
            >
              {user.username.toUpperCase()}
            </span>
            <button
              onClick={logout}
              className="text-xs sm:text-sm bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-lg transition duration-200 active:scale-95"
            >
              Abandon Ship!
            </button>
          </div>
        )}
      </header>

      {/* Pirate Greeting */}
      <motion.div
        className="mt-6 sm:mt-10 px-4 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p
          className="inline-block bg-black/30 backdrop-blur-sm text-white text-sm sm:text-base px-4 py-2 rounded-full shadow-md"
          style={pirateFontStyle}
        >
          ⚓ Ahoy,{" "}
          <span className="text-[#F1FAEE]">{user?.username || "Mugiwara"}</span>
          ! Welcome aboard the <span className="italic">Going Merry</span>!
        </p>
      </motion.div>

      {/* Floating Dots */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute bg-[#A8DADC] rounded-full shadow-md"
          style={{ width: dot.size, height: dot.size }}
          initial={{ x: `${dot.x}vw`, y: `${dot.y}vh`, opacity: 0.8 }}
          animate={{
            y: [`${dot.y}vh`, `${dot.y - 10}vh`, `${dot.y}vh`],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12 px-4 max-w-7xl mx-auto w-full">
        {cards.map((card, idx) => (
          <Link to={card.link} key={idx}>
            <div
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              className={`group relative overflow-hidden rounded-2xl border ${
                card.colors.border
              } bg-gradient-to-br ${card.colors.gradient} ${
                card.colors.shadow
              } transform transition-transform duration-300 ${
                hoverIndex === idx ? "scale-105" : ""
              }`}
            >
              <div className="h-48 sm:h-60 w-full relative">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-white/10 px-4 py-1 rounded-md backdrop-blur-md border border-white/20 shadow-inner">
                  <span
                    className="text-white text-sm font-semibold tracking-wide"
                    style={pirateFontStyle}
                  >
                    {card.title}
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  {card.title}
                </h2>
                <p className="text-gray-300 mb-6 text-sm">{card.description}</p>
                <button
                  className={`inline-block ${card.colors.buttonBg} ${card.colors.text} text-sm sm:text-base py-2 px-4 sm:px-6 rounded-full font-bold transition-colors duration-300 ${card.colors.buttonHover} active:scale-95`}
                >
                  View {card.title}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
