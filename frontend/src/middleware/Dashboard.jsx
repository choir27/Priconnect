import DashboardGuest from "../pages/DashboardGuest"
import DashboardAuth from "../pages/DashboardAuth"

const Dashboard = () => {
    
    return (
        localStorage.getItem("id") ? <DashboardAuth/> : <DashboardGuest/>
    )
}

export default Dashboard