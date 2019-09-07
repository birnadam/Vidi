
// import React from "react";
// import "./style.css";

// const Movies = () => {
//     return (
//         <div>
//             <h1>Movies</h1>
//         </div>
//     )
// }

// export default Movies;

import React from "react";
import List from "./List";
import "./style.css"

const moviesList = {
  upcoming: {
    apiCall: "upcoming",
    header: "Upcoming"
  },
  topRated: {
    apiCall: "top_rated",
    header: "Top Rated"
  },
  action: {
    apiCall: 28,
    header: "Action"
  },
  adventure: {
    apiCall: 12,
    header: "Adventure"
  },
  animation: {
    apiCall: 16,
    header: "Animation"
  },
  comedy: {
    apiCall: 35,
    header: "Comedy"
  },
  crime: {
    apiCall: 80,
    header: "Crime"
  },
  drama: {
    apiCall: 18,
    header: "Drama"
  },
  documentary: {
    apiCall: 99,
    header: "Documentary"
  },
  romance: {
    apiCall: 10749,
    header: "Romance"
  }
};

const Movies = () => {
  return (
    <div id="page">
      <div id="movies" className="pageMovies">
        <div className="page-header clearfix">
          <span>Movie Explorer</span>
        </div>
        <div className="movies-body scroll-hijack">
          {Object.keys(moviesList).map((item, i) => (
            <div key={i}>
              <List heading={moviesList[item].header} apiCall={moviesList[item].apiCall} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;