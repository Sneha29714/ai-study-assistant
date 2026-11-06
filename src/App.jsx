import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Home";
import Summary from "./pages/Summary";
import Flashcard from "./pages/Flashcard";
import Quiz from "./pages/Quiz";
import MyNotes from "./pages/MyNotes";
import Progress from "./pages/Progress";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
    const location=useLocation();

    useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(err));
  }, []);

      const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <>
            {!isAuthPage && <Navbar />}
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/my-notes" element={<MyNotes />} />
                    <Route path="/summary/:id" element={<Summary />} />
                    <Route path="/flashcard/:id" element={<Flashcard />} />
                    <Route path="/quiz/:id" element={<Quiz />} />
                    <Route path="/progress" element={<Progress />} />
                </Route>
            </Routes>   
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;