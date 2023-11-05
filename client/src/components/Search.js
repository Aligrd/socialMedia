import axios from "axios";
import React, { useState } from "react";

const Search = () => {
  const [phrase, setPhrase] = useState("");
  const [isLoading, setIsLoading] = useState(false); //! we make a loading animation inside the div before data get recieved
  const [isRecieved, setIsRecieved] = useState(false); //! we make a div appears under search in navbar and
  const search = () => {
    if (phrase.length === 0) {
      console.log("pls enter a phrase");
      return;
    }
    setIsLoading((prev) => !prev);
    axios
      .post("http://localhost:3001/posts/search", { searchPhrase: phrase })
      .then((response) => {
        console.log(response.data);
        setIsRecieved(true);
        setIsLoading((prev) => !prev);
        // there should be a comment in return if there is a comment with pathern of %phrase% in comment table in mysql
        //! SELECT * FROM comments WHERE title LIKE "%{searchPhrase}%"
      });
  };
  return (
    <div className="flex items-center  w-1/2 h-2/3  pl-64 ">
      <input
        className="text-center py-2 text-stone-800 border border-1 rounded-lg w-3/4"
        type="text"
        placeholder="Search Title..."
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
      />
      <button
        className="text-black bg-blue-200 rounded-lg border border-1 border-red-950 h-max p-1 ml-1 hover:bg-blue-100 "
        onClick={search}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
