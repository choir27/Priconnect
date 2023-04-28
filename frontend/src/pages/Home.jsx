  import HeaderGuest from "../components/HeaderGuest"
  import HeaderAuth from "../components/HeaderAuth"

  const Home = () => {
   
    return (
      <main className = "flex column justifyContent">
        {localStorage.getItem("id") ? <HeaderAuth/> : <HeaderGuest/>}
 
        <div className = "flex justifyContent">
          <section className = "about">
            <h2 className =  "flex justifyContent">Create customizable posts and see what others have posted in the Dashboard!</h2>
          </section>
        </div>

      </main>
    )
}

export default Home