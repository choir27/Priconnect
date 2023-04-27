import HeaderGuest from "../components/HeaderGuest"
import HeaderAuth from "../components/HeaderAuth"
import ComicStrip from "../components/ComicStrip"

const Comics = () => {
  return (
    <main className = "flex justifyContent column" id = "comics">
      {localStorage.getItem("id") ? <HeaderAuth/> : <HeaderGuest/>}
      <h1 className = "justifyContent flex">Comics</h1>
      <section className = "flex justifyContent strips"> 
        <ComicStrip/>
      </section>
    </main>
  )
}

export default Comics