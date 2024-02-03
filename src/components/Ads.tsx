import { useEffect, useState } from "react";
import { Assets } from "../middleware/Assets";

export default function Comics() {
  const [comics, setComics] = useState<React.JSX.Element[]>([]);
  const [carousel, setCarousel] = useState<React.JSX.Element[]>([]);

  const numOfComics = 10;

  useEffect(() => {
    const array = [];
    for (let i = 0; i < numOfComics; i++) {
      const comic = `comic${i}`;

      array.push(
        <div key={i} className={`carousel-item${i === 0 ? " active" : ""}`}>
          <a rel="noreferrer" target="_blank" href={Assets[comic]}>
            <img className="d-block w-100" src={Assets[comic]} alt={comic} />
          </a>
        </div>,
      );
    }

    setComics(array);
  }, []);

  useEffect(() => {
    const arr = [];

    for (let i = 1; i < numOfComics; i++) {
      arr.push(<li key={i} data-target="#myCarousel" data-slide-to={i}></li>);
    }

    setCarousel(arr);
  }, []);

  return (
    <section id="comics">
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li
            data-target="#myCarousel"
            data-slide-to="0"
            className="active"
          ></li>
          {carousel}
        </ol>

        <div className="carousel-inner">{comics}</div>

        <a
          className="carousel-control-prev"
          href="#myCarousel"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>

        <a
          className="carousel-control-next"
          href="#myCarousel"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </section>
  );
}
