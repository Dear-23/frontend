import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alerts");
      setAlerts(res.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  // Summary
  const total = alerts.length;
  const high = alerts.filter(a => a.riskScore >= 40).length;
  const medium = alerts.filter(a => a.riskScore >= 20 && a.riskScore < 40).length;
  const low = alerts.filter(a => a.riskScore < 20).length;

  // Chart Data
  const riskData = [
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low }
  ];

  const actionData = alerts.reduce((acc, alert) => {
    const existing = acc.find(a => a.name === alert.action);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: alert.action, value: 1 });
    }
    return acc;
  }, []);

  // Filter + Search + Sort
  const filteredAlerts = alerts
    .filter(alert => {
      if (filter === "HIGH") return alert.riskScore >= 40;
      if (filter === "MEDIUM") return alert.riskScore >= 20 && alert.riskScore < 40;
      if (filter === "LOW") return alert.riskScore < 20;
      return true;
    })
    .filter(alert =>
      alert.alertId.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>SOC Alert Dashboard</h1>

      {/* Summary Cards */}
      <div style={styles.cardContainer}>
        <Card title="Total Alerts" value={total} color="#3b82f6" />
        <Card title="High Risk" value={high} color="#ff4d4f" />
        <Card title="Medium Risk" value={medium} color="#faad14" />
        <Card title="Low Risk" value={low} color="#52c41a" />
      </div>

      {/* Filter + Search */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search Alert ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button style={styles.button} onClick={() => setFilter("ALL")}>All</button>
          <button style={styles.button} onClick={() => setFilter("HIGH")}>High</button>
          <button style={styles.button} onClick={() => setFilter("MEDIUM")}>Medium</button>
          <button style={styles.button} onClick={() => setFilter("LOW")}>Low</button>
        </div>
      </div>

      {/* Charts */}
      <div style={styles.chartContainer}>
        <div style={styles.chartCard}>
          <h3>Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={riskData} dataKey="value" outerRadius={100}>
                <Cell fill="#ff4d4f" />
                <Cell fill="#faad14" />
                <Cell fill="#52c41a" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <h3>Action Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={actionData} dataKey="value" outerRadius={100}>
                <Cell fill="#3b82f6" />
                <Cell fill="#8b5cf6" />
                <Cell fill="#f97316" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <td>
  <Link
    to={`/alerts/${alert._id}`}
    style={{ color: "#60a5fa", textDecoration: "none" }}
  >
    {alert.alertId}
  </Link>
</td>
        </thead>
        <tbody>
          {filteredAlerts.map(alert => (
            <tr key={alert._id}>
              <td>{alert.alertId}</td>
              <td style={{ fontWeight: "bold", color: "#facc15" }}>
                {alert.riskScore}
              </td>
              <td>{alert.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div style={{ ...styles.card, borderLeft: `6px solid ${color}` }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white"
  },
  title: {
    marginBottom: "40px"
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "40px"
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px"
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px"
  },
  searchInput: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    width: "250px"
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  chartContainer: {
    display: "flex",
    gap: "30px",
    marginBottom: "40px"
  },
  chartCard: {
    flex: 1,
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px"
  },
  table: {
    width: "100%",
    background: "#1e293b",
    borderCollapse: "collapse"
  }
};

export default Dashboard;