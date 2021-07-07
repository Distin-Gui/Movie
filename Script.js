
function getMovies(searchText){
	var years = document.getElementById("y");
	
	var yo = years.value;

	let geners = document.getElementById('g');
	var go = geners.value;

	var languages = document.getElementById('l');
	var lo = languages.value;

	var ratings = document.getElementById('r');
	var ro = ratings.value;
	
	if( yo != 0|| go != "all" || lo != "all" || ro != 0){
		axios.get('https://www.omdbapi.com?apikey=a695814a&s='+searchText).then(resp => {
    	console.log(resp.data);
    	let m = resp.data.Search;
		let output = '';

      $.each(m, (index, movie) => {
      	axios.get('https://www.omdbapi.com?apikey=a695814a&i='+movie.imdbID).then(r => {
    	console.log(r.data);
    	let t = r.data;
        if( t.Released == yo){

        	output += `

            <div class="images">
              <img class = "i" src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
              	</div>`;
        }
        if( t.Genre == go ){
        	output += `

            <div class="images">
              <img class = "i" src="${t.Poster}">
              <h5>${t.Title}</h5>
              <a onclick="movieSelected('${t.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
              	</div>`;
        }
        if( t.imdbRating >= ro ){

        	output += `

            <div class="images">
              <img class = "i" src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
              	</div>`;
        }
             }); 
      });

      $('#movies').html(output);
      })
	.catch(err => {
		console.log();
	});	
	}
	else{
		axios.get('https://www.omdbapi.com?apikey=a695814a&s='+searchText).then(resp => {
    	console.log(resp.data);
    	let m = resp.data.Search;
		let output = '';

      $.each(m, (index, movie) => {
        output += `

            <div class="images">
              <img class = "i" src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
              	</div>`;
              
      });

      $('#movies').html(output);
      })
	.catch(err => {
		console.log();
	});	
	}

	
}

function movieSelected(id){
	sessionStorage.setItem('movieId', id);
  	window.location = 'movie.html';
  	return false;
}


  			function getMovie(){
  				let movieId = sessionStorage.getItem('movieId');
  				axios.get('http://www.omdbapi.com?apikey=a695814a&i='+movieId)
    				.then((response) => {
			      console.log(response);
			      let movie = response.data;

			      let output =`
			     		 <table >
			     		 	<tr>
				           		 <th rowspan="8"><img src="${movie.Poster}"> </th>
	    							<td><h2>${movie.Title}</h2></td>
	  												</tr>
  							<tr>
    							<td><strong>Genre:</strong>${movie.Genre}</td>
  												</tr>		
  							<tr>
    							<td><strong>Released:</strong> ${movie.Released}</td>
  												</tr>
  							<tr>
    							<td><strong>Rated:</strong> ${movie.Rated}</td>
  												</tr> 
  							<tr>
    							<td><strong>IMDB Rating:</strong> ${movie.imdbRating}</td>
  												</tr>
  							<tr>
    							<td><strong>Director:</strong> ${movie.Director}</td>
  												</tr>
  							<tr>
    							<td><strong>Writer:</strong> ${movie.Writer}</td>
  												</tr>
  							<tr>
    							<td><strong>Actors:</strong> ${movie.Actors}</td>
  												</tr>							  												  												 																	
			    </table>
				<h3>Plot</h3>${movie.Plot}
			      `;

			      $('#movie').html(output);
			    })
			    .catch((err) => {
			      console.log(err);
			    });
}