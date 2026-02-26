import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import AlertDetail from "./pages/AlertDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/alerts/:id" element={<AlertDetail />} />
    </Routes>
  );
}

export default App;