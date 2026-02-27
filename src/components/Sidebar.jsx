import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">SOC</h2>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/alerts">Alerts</Link>
      <Link to="/incidents">Incidents</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/settings">Settings</Link>
    </div>
  )
}

export default Sidebar