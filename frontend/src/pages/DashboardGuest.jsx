import HeaderGuest from "../components/HeaderGuest"
import RenderDashboardGuest from "../components/RenderDashboardGuest"

const DashboardGuest = () => {
  
  return (
    <main className = "flex column justifyContent" id = "show">
      <HeaderGuest className = {"pages"}/>
      <h1 className = "justifyContent flex">Dashboard</h1>
      <h2 className = "justifyContent flex">Click the image/button to view it!</h2>
        <section className = "posts flex alignItems column">
          <RenderDashboardGuest/>
        </section>
    </main>
  )
}

export default DashboardGuest