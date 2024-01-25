import { ButtonInterface, ButtonLinkInterface } from "../middleware/Interfaces";
import { Link } from "react-router-dom";

export function Button(props: ButtonInterface) {
  return (
    <button
      id={props.id}
      className={props.classNames}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.onClick();
      }}
      key={props.key}
    >
      {props.text}
    </button>
  );
}

export function ButtonLink(props: ButtonLinkInterface) {
  return (
    <Link to={props.domain} className={props.classNames} key={props.key}>
      {props.text}
    </Link>
  );
}
