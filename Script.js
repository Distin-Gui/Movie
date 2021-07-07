function getMovie(searchText){
	axios.get('https://www.omdbapi.com?apikey=a695814a&s='+searchText).then(resp => {

    console.log(resp.data);
    let m = resp.data.Search;
	let output = '';
	var track = 0;
      $.each(m, (index, movie) => {
        output += `
            <div class="images">
              <img class = "i" src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
              	</div>`;
              
      });

      $('#movies').html(output);


})
	.catch(err => {
		console.log();
	});
}

