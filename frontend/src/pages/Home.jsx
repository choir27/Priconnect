  import Header from "../components/HomeGuest"
  import HeaderAuth from "../components/HomeAuth"

  const Home = () => {


   
    return (
      <main className = "flex column justifyContent">
      {localStorage.getItem("id") ? <HeaderAuth/> : <Header/>}
      </main>
    )
  }

export default Home