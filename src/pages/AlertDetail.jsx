import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Layout from "../components/Layout"
import { getAlertById } from "../services/api"

function AlertDetail() {

  const { id } = useParams()
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    getAlertById(id)
      .then(res => setAlert(res.data))
      .catch(err => console.error(err))
  }, [id])

  const getRiskLevel = (score) => {
    if (score >= 80) return "High"
    if (score >= 50) return "Medium"
    return "Low"
  }

  const getStatus = (action) => {
    if (action === "Escalate") return "Escalated"
    if (action === "Review") return "Open"
    return "Closed"
  }

  if (!alert) return <Layout><h2>Loading...</h2></Layout>

  return (
    <Layout>

      <h1 style={{ marginBottom: "30px" }}>
        Alert Detail: {alert.alertId}
      </h1>

      <div className="detail-grid">

        {/* LEFT PANEL */}
        <div className="card">

          <h3>Risk Assessment</h3>

          <div className="risk-score">
            {alert.riskScore}
          </div>

          <p>
            <span className={`badge ${getRiskLevel(alert.riskScore)}`}>
              {getRiskLevel(alert.riskScore)}
            </span>
          </p>

          <p>
            <span className={`status ${getStatus(alert.action)}`}>
              {getStatus(alert.action)}
            </span>
          </p>

          <p><strong>Action:</strong> {alert.action}</p>
          <p><strong>Created:</strong> {new Date(alert.createdAt).toLocaleString()}</p>

        </div>

        {/* RIGHT PANEL */}
        <div className="card">

          <h3>Technical Details</h3>

          <p><strong>MITRE Technique:</strong> {alert.techniqueId}</p>
          <p><strong>Tactic:</strong> {alert.tactic}</p>
          <p><strong>Source IP:</strong> {alert.sourceIP || "-"}</p>
          <p><strong>Destination IP:</strong> {alert.destinationIP || "-"}</p>

          <p style={{ marginTop: "15px" }}>
            <strong>Hash:</strong><br />
            <code className="hash-box">{alert.hash}</code>
          </p>

        </div>

      </div>

    </Layout>
  )
}

export default AlertDetail