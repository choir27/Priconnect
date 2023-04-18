  import Header from "../components/Header"
  import HeaderAuth from "../components/HeaderAuth"

  const Home = () => {


   
    return (
      <>
      <h1>Draw Connect</h1>
      {localStorage.getItem("id") ? <HeaderAuth/> : <Header/>}
      </>
    )
  }

export default Home