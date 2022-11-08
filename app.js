const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};  

const getMovies1 = async () => {
  let datatag = document.getElementById("datatag");
  datatag.innerHTML = "";
  let selectedMovie = document.getElementById("mainselect");
  console.log("selected movie: " + selectedMovie.value);
  const movieData = await getData("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "8d992bf093d92b23f2529662f9291664",
      query: selectedMovie.value,
    }
  });

  
  console.log("size: " + movieData.data.results.length)
  if (movieData.data.results.length < 1) {
    return;
  }

  
    let movie = movieData.data.results[0];
    console.log("movie: " + movie)
    const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
      params: {
        api_key: "8d992bf093d92b23f2529662f9291664",
        append_to_response: "videos",
      }
    });

    // Making Variables
    const title = document.createElement("h1")
    const release_date = document.createElement("h2")
    const website = document.createElement("h3")
    const runtime = document.createElement("h2")
    const budget = document.createElement("h3")
    const revenue = document.createElement("h3")
    const popularity = document.createElement("h3")
    const vote_average = document.createElement("h3")
    const vote_count = document.createElement("h3")
    const tagline = document.createElement("h3")
    const overview = document.createElement('h4');
    const iframe = document.createElement('iframe'); 
    const img = document.createElement('img');
    const trailer = extraData.data.videos.results.filter((video) => video.type === "Trailer").at(0).key;
    
    
    // Giving HTML TAGS
    title.setAttribute('id','title')
    release_date.setAttribute('id','release_date')
    website.setAttribute('id','website')
    runtime.setAttribute('id','runtime')
    budget.setAttribute('id','budget')
    revenue.setAttribute('id','revenue')
    popularity.setAttribute('id','popularity')
    vote_average.setAttribute('id','vote_average')
    vote_count.setAttribute('id','vote_count')
    tagline.setAttribute('id','tagline')
    overview.setAttribute('id','overview')
    iframe.setAttribute('id','trailer')
    img.setAttribute('id','image') 
    

    
    // Data Storage 
    title.innerHTML = `${extraData.data.original_title}`
    release_date.innerHTML = `Release Date: ${movie.release_date}`
    website.innerHTML= `Website: ${extraData.data.homepage}`
    runtime.innerHTML = `Runtime: ${extraData.data.runtime} minutes`
    budget.innerHTML = ` Budget: $${extraData.data.budget}`
    revenue.innerHTML = `Revenue: $${extraData.data.revenue}`
    popularity.innerHTML = `Popularity: ${extraData.data.popularity}`
    vote_average.innerHTML = `Vote Average: ${extraData.data.vote_average} stars`
    vote_count.innerHTML = `Vote Count: ${extraData.data.vote_count} people`
    tagline.innerHTML = `Tagline: "${extraData.data.tagline}"`
    overview.innerHTML = `Overview: ${movie.overview}`;
    iframe.src = `https://www.youtube.com/embed/${trailer}`
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  
    // Adding to the DOM
    datatag.append(img);
    datatag.append(title);
    datatag.append(release_date);
    datatag.append(overview);
    datatag.append(website);
    datatag.append(runtime);
    datatag.append(budget);
    datatag.append(revenue);
    datatag.append(popularity);
    datatag.append(vote_average);
    datatag.append(vote_count);
    datatag.append(tagline);
    datatag.append(iframe);
  
};