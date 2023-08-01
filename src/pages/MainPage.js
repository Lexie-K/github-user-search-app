import React from "react";
import SearchUser from "../components/SearchUser/SearchUser";
import ShowUsers from "../components/ShowUsers/ShowUsers";


const MainPage = () => {
  return (
    <>
    <header>
      <h1>Github User Finder</h1>
    </header>
    <SearchUser />
    <ShowUsers />
  </>
  );
};

export default MainPage;
