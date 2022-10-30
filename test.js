const test = async () => {
  let res = await axios.get("https://api.themoviedb.org/3/movie/436270?api_key=8d992bf093d92b23f2529662f9291664&language=en-US");

  console.log(res);
  
  let name = document.createElement("p");
  
  name.innerHTML = `${res.data.overview}`;
  
  console.log(name)
}

test();
