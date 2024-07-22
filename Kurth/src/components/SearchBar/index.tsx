import { useState } from "react";
import "./style.scss";

type Props = {
  onSearch: Function;
};

export default function SearchBar({ onSearch }: Props) {
  const [text, setText] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    onSearch(text);
  }

  function handleChange(event: any) {
    setText(event.target.value);
  }

  return (
    <div className="wrapper-explore-form">
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          type="search"
          placeholder="Search"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
