import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Summary from "./pages/Summary";
import Flashcard from "./pages/Flashcard";
import Quiz from "./pages/Quiz";

function App() {
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