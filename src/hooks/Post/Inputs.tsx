import {
  TextBoxInputInterface,
  SearchInputInterface,
} from "../../middleware/Interfaces";

export function TextBoxInput(props: TextBoxInputInterface) {
  return (
    <textarea
      placeholder={props.placeholder}
      minLength={1}
      maxLength={1000}
      onChange={(e) => props.setChange(e.target.value)}
      name={props.name}
      rows={props.rows}
      cols={props.cols}
      className={props.classNames}
    />
  );
}

export function SearchInput(props: SearchInputInterface) {
  return (
    <input
      placeholder="Find Post/User"
      minLength={1}
      maxLength={1000}
      onChange={(e) => props.setSearchValue(e.target.value)}
      type="search"
      name="search"
      value={props.searchValue}
    />
  );
}
