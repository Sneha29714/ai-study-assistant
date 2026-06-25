import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Summary from "./pages/Summary";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;