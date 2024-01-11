import { Button } from "./Button";
import { PaginatedButtonsInterface } from "../middleware/Interfaces";

export default function PaginatedButton(props: PaginatedButtonsInterface) {
  return (
    <div key="buttons" className="paginatedButton flex">
      {Button({
        text: "Show More",
        key: "showMoreButton",
        classNames: "button",
        onClick: () => {
          props.setEndIndex(props.endIndex + props.rowsPerPage);
        },
      })}
    </div>
  );
}
