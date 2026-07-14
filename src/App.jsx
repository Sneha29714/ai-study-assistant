import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Home";
import Summary from "./pages/Summary";
import Flashcard from "./pages/Flashcard";
import Quiz from "./pages/Quiz";
import MyNotes from "./pages/MyNotes";

function App() {
    useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route 
          path="/my-notes" 
          element={<MyNotes />} 
        />

        <Route
          path="/summary/:id"
          element={<Summary />}
        />

        <Route
          path="/flashcard/:id"
          element={<Flashcard />}
        />

        <Route
          path="/quiz/:id"
          element={<Quiz />}
        />        

      </Routes>
    </BrowserRouter>
  );
}

export default App;