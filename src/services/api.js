import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

export const getSummary = () => API.get("/alerts/analytics/summary")
export const getAlerts = () => API.get("/alerts")
export const getAlertById = (id) => API.get(`/alerts/${id}`)
export const getConfig = () => API.get("/config")
export const updateConfig = (data) => API.put("/config", data)