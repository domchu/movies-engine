let loaderWrapper = document.querySelector(".loader-wrapper");
let searchContent = document.querySelector(".search-content");
let modeBtn = document.querySelector(".mode");
let nav = document.querySelector(".nav")
let pageContainer = document.querySelector(".page-container");
let icon = document.getElementsByClassName("icon");
let links = document.getElementsByClassName("link")
let movieInfo = document.getElementsByClassName("movie-info");
let searchContainer = document.querySelector(".search-container")
   let searchBtn = document.querySelector(".search")
let closeBtn = document.querySelector(".fa-times");
let userLocation = document.querySelector(".user-location")
let userLocationtext = document.querySelector(".user-location-temp")
let deg = document.querySelector(".deg");
let moonIcon = document.querySelector(".fa-moon")
let comingSoon = document.querySelector(".coming-soon")
let weatherDiv = document.querySelector(".weather")
let loaderDot = document.getElementsByClassName("loader-dot")
modeBtn.addEventListener("click",function () {

  for (let index = 0; index < icon.length; index++) {
   icon[index].classList.toggle("lightmode")
    
  }

  for (let index = 0; index < loaderDot.length; index++) {
   
    loaderDot[index].classList.toggle("backchange")
    
  }

  console.log(loaderDot);
  // loaderDot.classList.toggle("backchange")
  comingSoon.classList.toggle("lightmode")
  moonIcon.classList.toggle("fa-sun")
  searchBtn.classList.toggle("box-light")
  deg.classList.toggle("lightmode");
  weatherDiv.classList.toggle("box-light")
// userLocationtext.classList.toggle("box-light")

  console.log(icon.length);
  nav.classList.toggle("lightmode");
  pageContainer.classList.toggle("lightmode")
  // icon.classList.toggle("lightmode")
for (let index = 0; index < links.length; index++) {
links[index].classList.toggle("lightmode")  
}

 for (let index = 0; index < movieInfo.length; index++) {
  movieInfo[index].classList.toggle("lightmode")
   
 }
})

function viewTrailer(event) {
      let id = event.target.id
  console.log("view trailer was clicked" + id);

    fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_2pfeso55/${id}`).then((data)=>{return data.json()}).then((res)=>{
      console.log(res);
      let videoId = res.videoId;
      let trailerDiv = document.querySelector(".trailer"+id)
      trailerDiv.innerHTML = `<iframe width="300" height="200" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

    })

 } 
document.addEventListener( 'DOMContentLoaded', function () {
    var main = new Splide( '.splide', {
      type       : 'fade',
      cover      : true,
      rewind     : false,
      pagination : false,
      fixedHeight : 550,
      width:"1000vw",
      heightRatio: 0.5,
    
    } );
  
    var thumbnails = new Splide( '#thumbnail-slider', {
      fixedWidth  : 100,
      fixedHeight : 60,
      gap         : 20,
      rewind      : true,
   
      autoplay    : true,
      cover       : true,
      isNavigation: true,
      pauseOnHover: true,
      pauseOnFocus: true,
      
      breakpoints : {
        600: {
          fixedWidth : 60,
          fixedHeight: 44,
        },
      },
    } );
  
    main.sync( thumbnails );
    main.mount();
    thumbnails.mount();
  } );

  let apiKey = "2b0f1e93168e7f090b4956334fcedbdd";
  let apiKey2 = "k_2pfeso55";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((location)=>{
let lat = location.coords.latitude;
let long = location.coords.longitude
        console.log(long,lat);

let api = `https://api.darksky.net/forecast/${apiKey}/${lat},${long}`;

fetch(api).then((data)=>{
  return  data.json()
}).then((detail)=>{

    let loader = document.querySelector(".loader");
    console.log(detail);
let temp = detail.currently.temperature;
let location = detail.timezone;

temp = Math.floor((temp - 32) * 5/9);



console.log(temp,location);

let userLocationTemp = document.querySelector(".user-location-temp")

loader.style.display = "none";
userLocation.textContent = location;
userLocationTemp.textContent = temp;
deg.style.display = "block";
})
    })}

    let newMoviesContainer = document.querySelector(".new-movies-container");
let newMovies = "https://imdb-api.com/en/API/ComingSoon/k_2pfeso55";

if (localStorage.getItem("comingsoon") == null) {
    fetch(newMovies).then((data)=>{
        return  data.json()
      }).then((res)=>{
          console.log(res.items);
       let fetchedNewMovies = res.items;
       localStorage.setItem("comingsoon",JSON.stringify(fetchedNewMovies))
      let theNewMovies = localStorage.getItem("comingsoon");
       theNewMovies = fetchedNewMovies.map((r)=>{
           return ` 
            <div class="newmovie">
           <div class="movie-img">
      <img class="movie-image" src=${r.image} />
           </div>
           <div class="movie-info">
      <h4>title: ${r.fullTitle}</h4>
      <p>genres: ${r.genres}</p>
      <p>duration: ${r.runtimeStr}</p>
      <p>release date:${r.releaseState}</p>
      <p>stars: ${r.stars}</p>
      <p>${r.plot}</p>
           </div>
       </div>`
       })
       newMoviesContainer.innerHTML = `${theNewMovies}` 
      })
      console.log("a call was made");
}
else {

    let theNewMovies = JSON.parse(localStorage.getItem("comingsoon"));
    console.log(theNewMovies);
  let newMoviesFromStorage =  theNewMovies.map((r)=>{
        return ` 
         <div class="newmovie">
        <div class="movie-img">
   <img class="movie-image" src=${r.image} />
        </div>
        <div class="movie-info">
   <h4>Title: ${r.fullTitle}</h4>
   <p>genres: ${r.genres}</p>
   <p>duration: ${r.runtimeStr}</p>
   <p>release date:${r.releaseState}</p>
   <p>stars: ${r.stars}</p>
   <p>${r.plot}</p>
        </div>
    </div>`
    })
    newMoviesContainer.innerHTML = `${newMoviesFromStorage}` 
   }



   document.addEventListener("keyup", function (e) {
    if (e.code === "Enter"  && searchBtn === document.activeElement) {
      console.log("enter is working");
      searchContainer.style.display = "block";
      let searchValue = searchBtn.value;

      let searchMovieApi = `https://imdb-api.com/en/API/SearchMovie/${apiKey2}/${searchValue}`;
      fetch(searchMovieApi).then((data)=>{
      return data.json();
      }).then((res)=>{

        let loader = document.querySelector(".lds-spinner");

        loader.style.display = "none";
        loaderWrapper.style.height = 0;

        console.log(res);
        let searchTitle = res.expression;
      
        
      
      

        let searchResult = res.results;
      let returnedResults = searchResult.map((r)=>{
      let imbdId = r.id
          return `<div class="search-content-results">
          <div class="search-content-results-image">
              <img src=${r.image} />
          </div>
          <div class="search-content-results-info">
              <h3>${searchTitle}</h3>
              <button id=${imbdId}  onclick=viewTrailer(event) class="viewtrailer">View trailer</button>
              <div class="trailer${imbdId}"></div>
            
             
          </div>
      </div>`
        })

  
      
        searchContent.innerHTML = `${returnedResults}`
      
      })
    }
    
  });


  closeBtn.addEventListener("click",function () {
    searchContainer.style.display = "none";

    let loader = document.querySelector(".lds-spinner");

  loader.style.display = "inline-block"
  })


let hamburgerBtn = document.querySelector(".hamburger");
let navLi = document.getElementsByClassName("nav-li")

hamburgerBtn.addEventListener("click",()=>{

  for (let index = 0; index < navLi.length; index++) {
  navLi[index].classList.toggle("display")
    
  }

})