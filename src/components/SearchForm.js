import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchText } = useGlobalContext();
  const searchValue = React.useRef("");
  
  React.useEffect(()=>{
    searchValue.current.focus()
  },[])

  return (
    <section className="section search">
      <form className="search-form" onSubmit = {(e)=>e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="name">find your drinks</label>
          <input
            ref={searchValue}
            onChange={() => setSearchText(searchValue.current.value)}
            type="text"
            id="name"
          ></input>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
