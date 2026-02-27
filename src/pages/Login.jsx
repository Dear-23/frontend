import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/dashboard")
  }

  return (
    <div className="login-page">
      <h1>SOC Automation System</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login