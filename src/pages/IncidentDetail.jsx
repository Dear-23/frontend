import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Layout from "../components/Layout"
import axios from "axios"

function IncidentDetail() {

  const { id } = useParams()
  const [incident, setIncident] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/incidents/${id}`)
      .then(res => setIncident(res.data))
      .catch(err => console.error(err))
  }, [id])

  const closeIncident = () => {
    axios.put(`http://localhost:5000/api/incidents/${id}/close`)
      .then(res => setIncident(res.data))
      .catch(err => console.error(err))
  }

  if (!incident) return <Layout><h2>Loading...</h2></Layout>

  return (
    <Layout>

      <h1 style={{ marginBottom: "25px" }}>
        Incident Detail: {incident.incidentId}
      </h1>

      <div className="detail-grid">

        {/* LEFT PANEL */}
        <div className="card">
          <h3>Incident Overview</h3>

          <p><strong>Source IP:</strong> {incident.sourceIP}</p>
          <p><strong>Event Type:</strong> {incident.eventType}</p>
          <p><strong>Alert Count:</strong> {incident.alerts.length}</p>

          <p>
            <strong>Highest Risk:</strong>{" "}
            <span className={`badge ${incident.highestRisk}`}>
              {incident.highestRisk}
            </span>
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className={`status ${incident.status}`}>
              {incident.status}
            </span>
          </p>

          {incident.status === "Open" && (
            <button onClick={closeIncident}>
              Close Incident
            </button>
          )}

        </div>

        {/* RIGHT PANEL */}
        <div className="card">
          <h3>Alerts in this Incident</h3>

          <table>
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Risk</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {incident.alerts.map(alert => (
                <tr key={alert._id}>
                  <td>{alert.alertId}</td>
                  <td>
                    <span className={`badge ${alert.riskLevel}`}>
                      {alert.riskLevel}
                    </span>
                  </td>
                  <td>{alert.riskScore}</td>
                  <td>{alert.action}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>

    </Layout>
  )
}

export default IncidentDetail