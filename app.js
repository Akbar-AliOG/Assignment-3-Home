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
  
      
      const p = document.createElement('p');
      p.setAttribute('id','para1') 
      const img = document.createElement('img');
      const iframe = document.createElement('iframe');
      const h1 = document.createElement("h1")
      const h2 = document.createElement("h2")
      const h3 = document.createElement("h3")
      const webpage = document.createElement("a")
      
      h1.innerHTML = `${extraData.data.original_title}`
      h2.innerHTML = `${movie.release_date}--${movie.vote_average}--${extraData.data.runtime}`
      h3.innerHTML = `${extraData.data.budget}--${extraData.data.revenue}--${extraData.data.popularity}`
      p.innerHTML = `${movie.overview}`;
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      
      datatag.append(h1);
      datatag.append(h2);
      datatag.append(h3)
      datatag.append(p);
      datatag.append(img);
      
    
  };