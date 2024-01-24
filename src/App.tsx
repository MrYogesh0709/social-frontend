import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./page/Auth/Auth";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import ResetPassword from "./page/ResetPassword/ResetPassword";
import Home from "./page/Home/Home";
import PostDetails from "./page/PostDetails/PostDetails";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import CreatePost from "./page/createPost/CreatePost";
import EditPost from "./page/editPost/EditPost";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer autoClose={2000} position="bottom-left" />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/edit/:postId" element={<EditPost />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
