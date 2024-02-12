import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";

import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Signup";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import ProtectedRoute from "./routing/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import lightBackround from "./assets/background-tubes.jpg";
import darkBackround from "./assets/background-leaves.jpg";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import BlogPost from "./pages/BlogPost/BlogPost";
import ChatBot from "./components/ChatBot/ChatBot";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Pharmacy from "./pages/Pharmacy/Pharmacy";
import Checkout from "./pages/Checkout/Checkout";
import Order from "./pages/Order/Order";
import JoinChat from "./pages/JoinChat/JoinChat";
import Chat from "./pages/Chat/Chat";
import VideoChat from "./pages/VideoChat/VideoChat";

function App() {
  const {
    userInfo,
  } = useSelector((state) => state.user);

  const [darkMode, setDarkMode] = useState(false);
  return (
    <div
      className="App"
      style={{
        backgroundImage: !darkMode
          ? `url(${lightBackround})`
          : `url(${darkBackround})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <BrowserRouter>
        <Header />
        <ChatBot />
        <Routes>
          <Route path="/" element={userInfo?.user_type == 'admin' ? <Dashboard/> : <Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/blog/create" element={<BlogPost />} />
          <Route path="/blog/update/:id" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-reset/:userId/:token" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/verify-account/:userId/:token"
              element={<Profile />}
            />
          </Route>

          <Route path="/joinChat" element={<JoinChat />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/videoChat" element={<VideoChat />} />

          <Route path="/about" element={<About />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
