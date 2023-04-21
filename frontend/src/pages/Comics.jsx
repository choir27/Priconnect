import Assets from "../components/Assets"
import HeaderGuest from "../components/HeaderGuest"
import HeaderAuth from "../components/HeaderAuth"
import {useMemo, useState} from "react"

const Comics = () => {

  const [comics, setComics] = useState([]);
  const [carousel, setCarousel] = useState([]);

  const numOfComics = 10;

  useMemo(()=>{
    const array = [];
    for(let i = 1; i <numOfComics; i++){ 
      const comic = `comic${i}`;
  
      array.push(
      <div key = {i} className = "item">
        <img src = {Assets[comic]} alt = {comic}/>
      </div>
      );
    }
  setComics(array);
  },[]);

  useMemo(()=>{
    const arr = [];
  
    for(let i =1;i < numOfComics; i++) {
      arr.push(<li key = {i} data-target="#myCarousel" data-slide-to={i}></li>)
       }

    setCarousel(arr);
  },[]);

  return (
    <main className = "flex justifyContent column" id = "comics">
      {localStorage.getItem("id") ? <HeaderAuth/> : <HeaderGuest/>}
      <h1 className = "justifyContent flex">Comics</h1>
      <section className = 'flex justifyContent strips'> 
<div id="myCarousel" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
       <li data-target="#myCarousel" data-slide-to="0" className = "active"></li>
    
    {carousel}

   </ol>
       <div className="carousel-inner" role="listbox">

       <div className = "item active">
           <img src = {Assets.comic0} alt = "comic0" />
       </div>
{comics}
</div>

 <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
   <span className="icon-prev" aria-hidden="true"></span>
   <span className="sr-only">Previous</span>
 </a>
 <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
   <span className="icon-next" aria-hidden="true"></span>
   <span className="sr-only">Next</span>
 </a>
</div>
</section>
    </main>
  )
}

export default Comics