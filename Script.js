var pages = 1;
function next(searchText){
	this.pages++;
getMovies(searchText);

}
function back(){
	this.pages--;
getMovies(searchText);
}
function buttons(){
	document.getElementById('button').hidden = false;
}
function display(){
	const d =axios.get('https://www.omdbapi.com?apikey=a695814a&s=*&r=json&y=2021&type=movie&page='+this.pages);
	d.then(resp => {
    	console.log(resp.data);
    	let m = resp.data.Search;
    	let output = '';
    	let result = '';
    	var track = 4;
      $.each(m, (index, movie) => {
      	    	
				      	if( index == track){

      		output += `
            <td class = "td"> 
            <table class = "table">
            <tr><td class = "td">
              <img class = "i" src="${movie.Poster}"> <td> </tr>
             <tr><td class = "td"> <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
              	</td> </tr> </table> </td>`;
      		result += `<tr>`+output+`</tr>`;
      		track += index+1;
      		output = '';
      	}
      	else{

        output += `
            <td class = "td"> 
            <table class = "table">
            <tr><td class = "td">
              <img class = "i" src="${movie.Poster}"> <td> </tr>
             <tr><td class = "td"> <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
              	</td> </tr> </table> </td>`;
              }
            });
        		   $('#movies').html(result);
      })

	.catch(err => {
		console.log();
	});	
}
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


		const s =axios.get('https://www.omdbapi.com?apikey=a695814a&s=*'+searchText+'&type=movie&page='+this.pages);
		s.then(resp => {
    	console.log(resp.data);
    		let m = resp.data.Search;
      	let output = '';
      $.each(m, (index, movie) => {
      			var count = 0;
			    if( yo != 0 ){ 
			    	 if( movie.Year == yo){
				        	output += `
							            <td class = "td"> 
							            <table class = "table">
							            <tr class = "tr" ><td class = "td">
							              <img class = "i" src="${movie.Poster}"> <td> </tr>
							             <tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
							              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
							              	</td> </tr> </table> </td>`;
				              	count =	1;
				              	
								        }
						else{
							count = -1;
						}
		      	  var ys = yo.split("-");
				    	for( var i = ys[0]; i <= ys[1]; i++ ){
				        if( movie.Year == i){
				        	output += `
							            <td class = "td"> 
							            <table class = "table">
							            <tr class = "tr" ><td class = "td">
							              <img class = "i" src="${movie.Poster}"> <td> </tr>
							             <tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
							              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
							              	</td> </tr> </table> </td>`;
				              	count =	1;
				              	break;
				              	
								        }
						else{
							count = -1;
						}

								    }
		
				}
				 const a = axios.get('http://www.omdbapi.com?apikey=a695814a&i='+movie.imdbID);
    			a.then((response) => {
			    let t = response.data;
			    if( go != "all"){
	        		  	const ge = t.Genre.split(",");
	        		  	        		
	        		  	for( var i = 0 ;  i < ge.length ; i++){

	        		  		if( ge[i].toLowerCase() == go &&  count == 0 ){
	        		  			output += `
					            <td class = "td"> 
					            <table class = "table">
					            <tr class = "tr"><td class = "td">
					              <img class = "i" src="${movie.Poster}"> <td> </tr>
					             <tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
					              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
					              	</td> </tr> </table> </td>`;
				              	count = 2;
				              	break;
	        		  			}
	        		  			else if (ge[i].toLowerCase() == go &&  count == 1){
												count = 2;
				              	break;
	        		  			}
	        		  		else{
	        		  			count = -1;
	        		  			}
	        		  		}
        		  	
        			}
        		 if( t.imdbRating >= ro  ){
        		 	if( count == 0 ){
        				output += `
				            <td class = "td"> 
				            <table class = "table">
				            <tr class = "tr"><td class = "td">
				              <img class = "i" src="${movie.Poster}"> <td> </tr>
				             <tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
				              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
				              	</td> </tr> </table> </td>`;
							              }

					}
					if( output == ""){
						let result = '<td class = "not"><h3>Movieis not found</h3></td>';
    				$('#movies').html(result);

					}
					else{
					$('#movies').html(output);
				}
        		   
        			});
        			

             });
         
      })
	.catch(err => {
		console.log();
		  let result = '<td class = "not"><h3>Movieis not found</h3></td>';
    	$('#movies').html(result);
	});	
	}
	else{

		const s = axios.get('https://www.omdbapi.com?apikey=a695814a&s=*'+searchText+'*&type=movie&page='+this.pages);
		s.then(resp => {
    	console.log(resp.data);
    	let m = resp.data.Search;		
    	let output = '';
    	let result = '';
    	var track = 4;
      $.each(m, (index, movie) => {
      	if( index == track){
      		output += `
            <td class = "td"> 
            <table class = "table">
            <tr><td class = "td">
              <img class = "i" src="${movie.Poster}"> <td> </tr>
             <tr><td class = "td"> <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
              	</td> </tr> </table> </td>`;
      		result += `<tr>`+output+`</tr>`;
      		track += index+1;
      		output = '';
      	}
      	else{
        output += `
            <td class = "td"> 
            <table class = "table">
            <tr><td class = "td">
              <img class = "i" src="${movie.Poster}"> <td> </tr>
             <tr><td class = "td"> <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
              	</td> </tr> </table> </td>`;
              }


      });

        		   $('#movies').html(result);
       		  
        		 
      })

	.catch(err => {
		console.log();
		let result = '<td class = "not"><h3>Movieis not found</h3></td>';
    $('#movies').html(result);
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
  				const m = axios.get('http://www.omdbapi.com?apikey=a695814a&plot=full&i='+movieId)
    				m.then((response) => {
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