import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AlertDetail() {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [verification, setVerification] = useState(null);

  useEffect(() => {
    fetchAlert();
  }, []);

  const fetchAlert = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/alerts/${id}`);
      setAlert(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const verifyIntegrity = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/alerts/${id}/verify`
      );
      setVerification(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!alert) return <div style={styles.loading}>Loading...</div>;

  const riskColor =
    alert.riskScore >= 40
      ? "#ff4d4f"
      : alert.riskScore >= 20
      ? "#faad14"
      : "#52c41a";

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Alert Investigation</h1>

      {/* Main Info Card */}
      <div style={styles.card}>
        <h2>{alert.alertId}</h2>
        <p><b>Action:</b> {alert.action}</p>
        <p><b>Created:</b> {new Date(alert.createdAt).toLocaleString()}</p>
      </div>

      {/* Risk Indicator */}
      <div style={styles.card}>
        <h3>Risk Score</h3>
        <div style={styles.riskBarContainer}>
          <div
            style={{
              ...styles.riskBar,
              width: `${Math.min(alert.riskScore * 2, 100)}%`,
              backgroundColor: riskColor
            }}
          />
        </div>
        <h2 style={{ color: riskColor }}>{alert.riskScore}</h2>
      </div>

      {/* Raw Data */}
      <div style={styles.card}>
        <h3>Alert Data</h3>
        <p><b>Severity:</b> {alert.severity}</p>
        <p><b>Asset Criticality:</b> {alert.assetCriticality}</p>
        <p><b>User Privilege:</b> {alert.userPrivilege}</p>
        <p><b>Frequency:</b> {alert.frequency}</p>
        <p><b>Off Hour:</b> {alert.offHour ? "Yes" : "No"}</p>
      </div>

      {/* Integrity Section */}
      <div style={styles.card}>
        <h3>Integrity Verification</h3>
        <p style={{ wordBreak: "break-all" }}>
          <b>Stored Hash:</b> {alert.hash}
        </p>

        <button style={styles.button} onClick={verifyIntegrity}>
          Verify Integrity
        </button>

        {verification && (
          <div style={{ marginTop: "15px" }}>
            <p>
              Status:{" "}
              <b
                style={{
                  color: verification.isValid ? "#52c41a" : "#ff4d4f"
                }}
              >
                {verification.isValid ? "VALID" : "TAMPERED"}
              </b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#0f172a",
    minHeight: "100vh",
    padding: "40px",
    color: "white"
  },
  title: {
    marginBottom: "30px"
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  riskBarContainer: {
    background: "#334155",
    height: "20px",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "10px"
  },
  riskBar: {
    height: "100%"
  },
  button: {
    padding: "10px 20px",
    background: "#3b82f6",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
    marginTop: "10px"
  },
  loading: {
    color: "white",
    padding: "40px"
  }
};

export default AlertDetail;