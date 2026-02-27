import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { getSummary, getAlerts } from "../services/api"

function Dashboard() {

  const [summary, setSummary] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0
  })

  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    getSummary()
      .then(res => setSummary(res.data))
      .catch(err => console.error(err))

    getAlerts()
      .then(res => setAlerts(res.data))
      .catch(err => console.error(err))
  }, [])

  const getRiskLevel = (score) => {
    if (score >= 80) return "High"
    if (score >= 50) return "Medium"
    return "Low"
  }

  return (
    <Layout>

      <h1 style={{ marginBottom: "25px" }}>Dashboard</h1>

      {/* ================= SUMMARY CARDS ================= */}

      <div className="summary-grid">

        <div className="card summary-card">
          <p>Total Alerts</p>
          <h2>{summary.total}</h2>
        </div>

        <div className="card summary-card">
          <p>High Risk</p>
          <h2 style={{ color: "#ef4444" }}>{summary.high}</h2>
        </div>

        <div className="card summary-card">
          <p>Medium Risk</p>
          <h2 style={{ color: "#f59e0b" }}>{summary.medium}</h2>
        </div>

        <div className="card summary-card">
          <p>Low Risk</p>
          <h2 style={{ color: "#22c55e" }}>{summary.low}</h2>
        </div>

      </div>

      {/* ================= RECENT ALERTS ================= */}

      <div style={{ marginTop: "40px" }}>
        <div className="card">

          <h3 style={{ marginBottom: "20px" }}>
            Recent Alerts
          </h3>

          <table>
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Source</th>
                <th>Risk</th>
                <th>Score</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {alerts.slice(0, 5).map(alert => (
                <tr key={alert._id}>
                  <td>{alert.alertId}</td>
                  <td>{alert.source}</td>
                  <td>
                    <span className={`badge ${getRiskLevel(alert.riskScore)}`}>
                      {getRiskLevel(alert.riskScore)}
                    </span>
                  </td>
                  <td>{alert.riskScore}</td>
                  <td>
                    {new Date(alert.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </Layout>
  )
}

export default Dashboard