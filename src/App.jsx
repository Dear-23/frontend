import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Alerts from "./pages/Alerts"
import AlertDetail from "./pages/AlertDetail"
import Incidents from "./pages/Incidents"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"
import IncidentDetail from "./pages/IncidentDetail"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/alerts/:id" element={<AlertDetail />} />
      <Route path="/incidents" element={<Incidents />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/incidents/:id" element={<IncidentDetail />} />
    </Routes>
  )
}

export default App