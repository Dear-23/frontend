function Layout({ children }) {
  return (
    <div className="layout">

      <div className="sidebar">
        <h2>SOC</h2>
        <a href="/">Dashboard</a>
        <a href="/alerts">Alerts</a>
        <a href="/incidents">Incidents</a>
        <a href="/analytics">Analytics</a>
        <a href="/settings">Settings</a>
      </div>

      <div className="content">
        {children}
      </div>

    </div>
  )
}

export default Layout