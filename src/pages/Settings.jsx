import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { getConfig, updateConfig } from "../services/api"

function Settings() {

  const [config, setConfig] = useState(null)

  useEffect(() => {
    getConfig()
      .then(res => setConfig(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleChange = (e) => {
    setConfig({
      ...config,
      [e.target.name]: Number(e.target.value)
    })
  }

  const handleSave = () => {
    updateConfig(config)
      .then(() => alert("Config Updated!"))
      .catch(err => console.error(err))
  }

  if (!config) return <Layout><h2>Loading...</h2></Layout>

  return (
    <Layout>
      <h1>Risk Configuration</h1>

      <div className="card">

        <h3>Weights</h3>

        <label>Severity Weight</label>
        <input
          type="number"
          name="severityWeight"
          value={config.severityWeight}
          onChange={handleChange}
        />

        <label>Asset Weight</label>
        <input
          type="number"
          name="assetWeight"
          value={config.assetWeight}
          onChange={handleChange}
        />

        <label>Privilege Weight</label>
        <input
          type="number"
          name="privilegeWeight"
          value={config.privilegeWeight}
          onChange={handleChange}
        />

        <label>Frequency Weight</label>
        <input
          type="number"
          name="frequencyWeight"
          value={config.frequencyWeight}
          onChange={handleChange}
        />

        <h3>Thresholds</h3>

        <label>High Threshold</label>
        <input
          type="number"
          name="thresholdHigh"
          value={config.thresholdHigh}
          onChange={handleChange}
        />

        <label>Medium Threshold</label>
        <input
          type="number"
          name="thresholdMedium"
          value={config.thresholdMedium}
          onChange={handleChange}
        />

        <br /><br />
        <button onClick={handleSave}>Save</button>

      </div>
    </Layout>
  )
}

export default Settings