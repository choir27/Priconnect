import HeaderAuth from "../components/HeaderAuth"
import RenderDashboard from "../components/RenderDashboard"

const DashboardAuth = () => {
  return (
    <main className = "flex column justifyContent" id = "show">
      <HeaderAuth className = {"pages"}/>
      <h1 className = "justifyContent flex">Dashboard</h1>
      <h2 className = "justifyContent flex">Click the image/link to view the post!</h2>
        <section className = "posts flex alignItems column">
          <RenderDashboard/>
        </section>
    </main>
  )
}

export default DashboardAuth