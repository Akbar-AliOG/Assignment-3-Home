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
  
    //console.log("data: " + JSON.stringify(movieData, null, 2));
    console.log("size: " + movieData.data.results.length)
    if (movieData.data.results.length < 1) {
      return;
    }

    //for (let movie of movieData.data.results) {
      let movie = movieData.data.results[0];
      console.log("movie: " + movie)
      const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
          api_key: "8d992bf093d92b23f2529662f9291664",
          append_to_response: "videos",
        }
      });
  
      //const trailer = extraData.data.videos.results.filter((video) => video.type === "Trailer").at(0).key;
      const p = document.createElement('p');
      p.setAttribute('id','para1')
      const img = document.createElement('img');
      const iframe = document.createElement('iframe');
      const h1 =document.createElement("h1")
  
      p.innerHTML = `${movie.title} -- ${movie.release_date} -- ${movie.overview}`;
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      h1.innerHTML = `${extraData.data.original_title}`
      //iframe.src = `https://www.youtube.com/embed/${trailer}`


  
      datatag.append(h1);
      datatag.append(p);
      datatag.append(img);
      //document.body.append(iframe);
    //}
  };