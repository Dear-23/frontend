import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { getAlerts } from "../services/api"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"

function Analytics() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    getAlerts()
      .then(res => setAlerts(res.data))
      .catch(err => console.error(err))
  }, [])

  // Risk Distribution
  const riskData = [
    {
      name: "High",
      value: alerts.filter(a => a.riskScore >= 80).length
    },
    {
      name: "Medium",
      value: alerts.filter(a => a.riskScore >= 50 && a.riskScore < 80).length
    },
    {
      name: "Low",
      value: alerts.filter(a => a.riskScore < 50).length
    }
  ]

  // Trend per day
  const trendMap = {}

  alerts.forEach(a => {
    const date = new Date(a.createdAt).toLocaleDateString()
    trendMap[date] = (trendMap[date] || 0) + 1
  })

  const trendData = Object.keys(trendMap).map(date => ({
    date,
    count: trendMap[date]
  }))

  const COLORS = ["#ef4444", "#f59e0b", "#22c55e"]

  return (
    <Layout>
      <h1>Analytics</h1>

      <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>
        
        <div style={{ width: "50%", height: 300 }}>
          <h3>Risk Distribution</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={riskData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {riskData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: "50%", height: 300 }}>
          <h3>Alert Trend</h3>
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </Layout>
  )
}

export default Analytics