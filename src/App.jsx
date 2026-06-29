import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Home";
import Summary from "./pages/Summary";
import Flashcard from "./pages/Flashcard";
import Quiz from "./pages/Quiz";

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
          path="/summary"
          element={<Summary />}
        />

        <Route
          path="/flashcard"
          element={<Flashcard />}
        />

        <Route
          path="/quiz"
          element={<Quiz />}
        />        

      </Routes>
    </BrowserRouter>
  );
}

export default App;