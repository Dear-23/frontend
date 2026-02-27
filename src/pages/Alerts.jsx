import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import { getAlerts } from "../services/api"

function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  useEffect(() => {
    getAlerts()
      .then(res => setAlerts(res.data))
      .catch(err => console.error(err))
  }, [])

  // 🎯 Filter Logic
  const filteredAlerts = alerts.filter(alert => {

    const matchSearch =
      alert.alertId.toLowerCase().includes(search.toLowerCase())

    let matchFilter = true

    if (filter === "High") matchFilter = alert.riskScore >= 80
    else if (filter === "Medium")
      matchFilter = alert.riskScore >= 50 && alert.riskScore < 80
    else if (filter === "Low") matchFilter = alert.riskScore < 50

    return matchSearch && matchFilter
  })

  // 🎯 Status Logic
  const getStatus = (alert) => {
    if (alert.action === "Escalate") return "Escalated"
    if (alert.action === "Review") return "Open"
    return "Closed"
  }

  const getRiskLevel = (score) => {
    if (score >= 80) return "High"
    if (score >= 50) return "Medium"
    return "Low"
  }

  return (
    <Layout>
      <h1>Alert Management</h1>

      {/* 🔎 Search + Filter */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search Alert ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Risk</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>Source</th>
            <th>Risk</th>
            <th>Score</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {filteredAlerts.map(alert => (
            <tr key={alert._id}>
              <td>
                <Link to={`/alerts/${alert.alertId}`}>
                  {alert.alertId}
                </Link>
              </td>

              <td>{alert.source}</td>

              {/* 🟢 Risk Badge */}
              <td>
                <span className={`badge ${getRiskLevel(alert.riskScore)}`}>
                  {getRiskLevel(alert.riskScore)}
                </span>
              </td>

              <td>{alert.riskScore}</td>

              {/* 🟢 Status */}
              <td>
                <span className={`status ${getStatus(alert)}`}>
                  {getStatus(alert)}
                </span>
              </td>

              <td>
                {new Date(alert.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Alerts