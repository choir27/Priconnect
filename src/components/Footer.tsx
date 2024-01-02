import { CommentLike } from "../middleware/Interfaces";

export default function Footer(props: CommentLike) {
  const currentDate = new Date();

  return (
    <footer className="flex justifyBetween" id={props.id}>
      <section>
        <h2>Citations/Source/Credits</h2>
        <h3>
          Princess Connect! Re:Dive - Puchi Connect (Mock Ads section) Artist:
          Yuurei Doushi
        </h3>
        <h3>
          Princess Connect! Re:Dive - Puchi Connect (Mock Ads section)
          Translations: Kinsei
        </h3>
      </section>

      <section>
        <ul className="flex justifyAround icons">
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://twitter.com/choir241"
              className="fa-brands fa-twitter"
            >
              <p className="displayNone">Twitter</p>
            </a>
          </li>

          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/richard-choir/"
              className="fa-brands fa-linkedin"
            >
              <p className="displayNone">LinkedIn</p>
            </a>
          </li>

          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/225kh_drw/?hl=en"
              className="fa-brands fa-instagram"
            >
              <p className="displayNone">Instagram</p>
            </a>
          </li>

          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/choir27"
              className="fa-brands fa-github"
            >
              <p className="displayNone">Github</p>
            </a>
          </li>
        </ul>

        <small>
          Priconnect &copy; {currentDate.getFullYear()}. All rights are reserved
        </small>
      </section>
    </footer>
  );
}
