import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginForm from "./component/Login";
import { AuthContextProvider } from "./context/AuthContext";
import RegistrationForm from "./component/Register";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="*" element={<p>NOT FOUND</p>} />

            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
