import HeaderGuest from "../components/HeaderGuest"
import HeaderAuth from "../components/HeaderAuth"
import ComicStrip from "../components/ComicStrip"

const Comics = () => {
  return (
    <main className = "flex justifyContent column" id = "comics">
      {localStorage.getItem("id") ? <HeaderAuth/> : <HeaderGuest/>}
      <h1 className = "justifyContent flex">Comics</h1>
      <section className = "flex justifyContent strips column alignItems">
        <h3>Artist: YuureiDoushi</h3>
        <h3>Translations: Kinsei</h3> 
        <ComicStrip/>
      </section>
    </main>
  )
}

export default Comics