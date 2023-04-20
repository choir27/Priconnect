  import Header from "../components/HomeGuest"
  import HeaderAuth from "../components/HomeAuth"

  const Home = () => {


   
    return (
      <main className = "flex column justifyContent">
      {localStorage.getItem("id") ? <HeaderAuth/> : <Header/>}
 
      <div className = "flex justifyContent">
      <section className = "about">
      <h2 className =  "flex justifyContent">Create customizable posts and see what others have posted in the Dashboard!</h2>
      </section>
      </div>

      </main>
    )
  }

export default Home