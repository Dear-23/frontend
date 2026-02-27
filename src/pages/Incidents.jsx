import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { Link } from "react-router-dom"
import axios from "axios"

function Incidents() {

  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/incidents")
      .then(res => setIncidents(res.data))
      .catch(err => console.error(err))
  }, [])

  const getRiskClass = (risk) => {
    if (!risk) return "Low"
    return risk
  }

  const getStatusClass = (status) => {
    if (!status) return "Open"
    return status
  }

  return (
    <Layout>

      <h1 style={{ marginBottom: "25px" }}>
        Incident Management
      </h1>

      <div className="card">

        <table>
          <thead>
            <tr>
              <th>Incident ID</th>
              <th>Source IP</th>
              <th>Event Type</th>
              <th>Alert Count</th>
              <th>Highest Risk</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {incidents.map(inc => (
              <tr key={inc._id}>

                <td>
                  <Link to={`/incidents/${inc.incidentId}`}>
                    {inc.incidentId}
                  </Link>
                </td>

                <td>{inc.sourceIP}</td>

                <td>{inc.eventType}</td>

                <td>{inc.alerts.length}</td>

                <td>
                  <span className={`badge ${getRiskClass(inc.highestRisk)}`}>
                    {inc.highestRisk}
                  </span>
                </td>

                <td>
                  <span className={`status ${getStatusClass(inc.status)}`}>
                    {inc.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </Layout>
  )
}

export default Incidents