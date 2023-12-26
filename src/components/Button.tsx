import { ButtonInterface } from "../middleware/Interfaces";

export function Button(props: ButtonInterface) {
  return (
    <button
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
