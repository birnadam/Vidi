const config = require("../../config");

const mongoose = require("mongoose");
const db = require("../../models");

const Moment = require("moment");
const axios = require("axios");
const imageRoot = "https://image.tmdb.org/t/p/w500";

// mongoose.connect("mongodb://localhost/chatdb", { useNewUrlParser: true });   // may not have to use this here, or add the process.env stuff (see root index.js)

//DO not call unless you are prepared
const movieCompiler = async () => {
  let page = 1;
  let maxPage = 1000;
  let release_date_lower = 2010; //changeable when data is ready
  let release_date_current = Moment(Date.now()).format("YYYY/MM/DD");

  for (page; page<maxPage; page++) {

    let movieURL = `https://api.themoviedb.org/3/discover/movie?api_key=dadbb348c7503427d5277348f42629dc&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&release_date.gte=${release_date_lower}&release_date.lte=${release_date_current}`

    let movieData = await axios.get(movieURL);
      
        // console.log(res.data);
        maxPage = movieData.data.total_pages
        // console.log(maxPage);
        
        let pageArray = movieData.data.results;

        // for (let i = 0; i < pageArray.length; i++) {
        let mongooseArray = await pageArray.map(page => {
          let mongooseObj = {}
          // movie_id
          mongooseObj.movie_id = page.id
          // title
          mongooseObj.title = page.title
          // poster_path
          mongooseObj.poster_path = page.poster_path ? imageRoot + page.poster_path : undefined
          // backdrop_path
          mongooseObj.backdrop_path = page.backdrop_path ? imageRoot + page.backdrop_path : undefined
          // release_date
          mongooseObj.release_date = page.release_date
          // vote_average
          mongooseObj.vote_average = page.vote_average
          // overview
          mongooseObj.overview = page.overview
          // runtime
          // revenue
          // tagline
          // genre
          // homepage
          // console.log(mongooseObj);
          return mongooseObj
        })
        console.log(mongooseArray);
        db.Movie.create(mongooseArray);
    }
}


const showCompiler = async () => {
  let page = 1;
  let maxPage = 1000;
  // let release_date_lower = 2010; //changeable when data is ready
  // let release_date_current = Moment(Date.now()).format("YYYY/MM/DD");
  
  for (page; page<maxPage; page++) {

    let showURL = `https://api.themoviedb.org/3/discover/tv?api_key=dadbb348c7503427d5277348f42629dc&language=en-US&sort_by=first_air_date.desc&include_video=false&page=${page}&language=en-US&timezone=America%2FNew_York&include_null_first_air_dates=false`

  let showData = await axios.get(showURL)
      // console.log(res.data);
      maxPage = showData.data.total_pages

      let pageArray = showData.data.results;

      // for (let i = 0; i < pageArray.length; i++) {
      let mongooseArray = await pageArray.map(page => {
        let mongooseObj = {}
        // show_id
        mongooseObj.show_id = page.id
        // original_name
        mongooseObj.original_name = page.original_name
        // next_episode_to_air
        // last_air_date
        // overview
        mongooseObj.overview = page.overview
        // poster_path
        mongooseObj.poster_path = page.poster_path ? imageRoot + page.poster_path : undefined
        // backdrop_path
        mongooseObj.backdrop_path = page.backdrop_path ? imageRoot + page.backdrop_path : undefined
        // popularity
        mongooseObj.popularity = page.popularity
        // genre 
        // number of episodes
        // number of seasons
        // status
        // average votes
        mongooseObj.vote_average = page.vote_average
        // homepage
        return mongooseObj;
      })
      console.log(mongooseArray);
      db.Show.create(mongooseArray);

    }
}


// showCompiler();
// movieCompiler();

module.exports = {};