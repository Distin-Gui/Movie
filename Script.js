var pages = 1;
var n = 0;
var o = ``;
var r = ``;
var t = 0;
function setPage(){
	this.n = 0;
	this.t = 0;
	this.o = ``;
	this.r = ``;
	this.pages = 1;
}
function next(searchText){
	this.pages++;
	this.n = 0;
	this.t = 0;
	this.o = ``;
	this.r = ``;
getMovies(searchText);

}
function back(){
	this.n = 0;
	this.t = 0;
	this.o = ``;
	this.r = ``;
	this.pages--;
getMovies(searchText);
}

function display(){
	const d =axios.get('https://www.omdbapi.com?apikey=25f27f98&s=all&r=json&y=2021&type=movie&page='+this.pages);
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

		var years = document.getElementById('y');
		var yo = years.value;

		let geners = document.getElementById('g');
		var go = geners.value;

		var languages = document.getElementById('l');
		var lo = languages.value;

		var ratings = document.getElementById('r');
		var ro = ratings.value;
	
	if( yo != 0|| go != "all" || lo != "all" || ro != 0){
		if( yo != 0){
		filterYear(searchText);
		}
		else if( go != "all"){
			filterGenre(searchText);
		}
		else if( ro != 0){
			filterRating(searchText);
		}
		else if( yo != 0 && ro != 0){
		filterYearRating(searchText);
		}
		else if( yo != 0 && go != "all"){
		filterYearGenre(searchText);
		}	
		else if( ro != 0 && go != "all"){
			filterRatingGenre(searchText);
		}
		else if ( yo != 0 && go != "all" && ro != 0){
			filter(searchText);
		}
		
	}
	else{
		const s = axios.get('https://www.omdbapi.com?apikey=25f27f98&s=*'+searchText+'*&type=movie&page='+this.pages);
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
		console.log(err);
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
function pageSelected(id){
		sessionStorage.setItem('page', id);
  	window.location = 'movie.html';
  	return false;
}

function getMovie(){
		let movieId = sessionStorage.getItem('movieId');
  	const m = axios.get('http://www.omdbapi.com?apikey=25f27f98&i='+movieId)
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

function filterRating(searchText){

			var rating = document.getElementById('r');
			var ro = rating.value;
			const s =axios.get('https://www.omdbapi.com?apikey=a695814a&s=*'+searchText+'&type=movie&page='+this.pages);
			s.then(resp => {
    	console.log(resp.data);
    		let m = resp.data.Search;
      	$.each(m, (index, movie) => {
      	if( this.n == this.t ){
      			this.r += `<tr>`+ this.o + `</tr>`;
      			this.t += 5;
      			this.o = ``;
      	}
      	const b = axios.get('https://www.omdbapi.com?apikey=a695814a&i='+movie.imdbID);
      	b.then(	response => {
      		console.log(response.data);
      		var t = response.data;
			    if( t.imdbRating >= ro ){
        				this.o += `
				            <td class = "td"> 
				            <table class = "table">
				            <tr class = "tr"><td class = "td">
				              <img class = "i" src="${movie.Poster}"> <td> </tr>
				             <tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
				              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
				              	</td> </tr> </table> </td>`;
				              	this.n++;
						}
			if( this.r == ""){
							let result = '<td class = "not"><h3>Movieis not found</h3></td>';
					    $('#movies').html(result);
					}
				else{
							if(this.n == 10 ){
								$('#movies').html(this.r);
								}
							else if( this.n < 10){
								this.pages++;
								filterYear(searchText);
							}
				}
				
								})
      	
						});

		})

		.catch(err => {
		console.log(err);
		  let result = '<td class = "not"><h3>Movieis not found</h3></td>';
    	$('#movies').html(result);
	});

}


function filterYear(searchText){

			var years = document.getElementById("y");
			var yo = years.value;
			const s =axios.get('https://www.omdbapi.com?apikey=a695814a&s=*'+searchText+'&type=movie&page='+this.pages);
			s.then(resp => {
    	console.log(resp.data);
    		let m = resp.data.Search;
      	$.each(m, (index, movie) => {
      	if( this.n == this.t ){
      			this.r += `<tr>`+ this.o + `</tr>`;
      			this.t += 5;
      			this.o = ``;
      	}
				if( movie.Year == yo){
						this.o += `
						<td class = "td"> 
						<table class = "table">
						<tr class = "tr" ><td class = "td">
						  <img class = "i" src="${movie.Poster}"> <td> </tr>
						<tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
						  <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
						  	</td> </tr> </table> </td>`;
						this.n++;
				}

				var ys = yo.split("-");
				for( var i = ys[0]; i <= ys[1]; i++ ){
						if( movie.Year == i){
						    this.o += `
								<td class = "td"> 
								<table class = "table">
								<tr class = "tr" ><td class = "td">
								  <img class = "i" src="${movie.Poster}"> <td> </tr>
								<tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
								  <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
								  </td> </tr> </table> </td>`;
						 		this.n++;
						 		break;	
				     }

								  }
				if( this.r == ""){
							let result = '<td class = "not"><h3>Movieis not found</h3></td>';
					    $('#movies').html(result);
			}
		else{
					if(this.n == 10 ){
						$('#movies').html(this.r);
						}
					else if( this.n < 10){
						this.pages++;
						filterYear(searchText);
					}
				}
						});
		})
		.catch(err => {
		console.log(err);
		  let result = '<td class = "not"><h3>Movieis not found</h3></td>';
    	$('#movies').html(result);
	});

}

function filterGenre(searchText){
			var genre = document.getElementById('g');
			var go = genre.value;
			const s =axios.get('https://www.omdbapi.com?apikey=25f27f98&s=*'+searchText+'&type=movie&page='+this.pages);
			s.then(resp => {
    	console.log(resp.data);
    		let m = resp.data.Search;
      	$.each(m, (index, movie) => {
      	if( this.n == this.t ){
      			this.r += `<tr>`+ this.o + `</tr>`;
      			this.t += 5;
      			this.o = ``;
      	}
      	const b = axios.get('https://www.omdbapi.com?apikey=25f27f98&i='+movie.imdbID);
      	b.then(	response => {
      		console.log(response.data);
      		let t = response.data;
			    const ge = t.Genre.split(" ");

	        for( var i = 0 ;  i < ge.length ; i++){

     		  		if( ge[i].toLowerCase() == go.toLowerCase() ){
        		  			this.o += `
				            <td class = "td"> 
				            <table class = "table">
				            <tr class = "tr"><td class = "td">
				              <img class = "i" src="${movie.Poster}"> <td> </tr>
				            <tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
				              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
					              	</td> </tr> </table> </td>`;
				              	this.n++;
				              	break;
	        		  			}
	        		  		}
	        		  	
			if( this.r == ""){
							let result = '<td class = "not"><h3>Movieis not found</h3></td>';
					    $('#movies').html(result);
					}
				else{
							if(this.n == 10 ){
								$('#movies').html(this.r);
								}
							else if( this.n < 10){
								this.pages++;
								filterYear(searchText);
							}
				}
				
								})
      	
						});

		})

		.catch(err => {
		console.log(err);
		  let result = '<td class = "not"><h3>Movieis not found</h3></td>';
    	$('#movies').html(result);
	});
}

function filterYearGenre(searchText){
			var years = document.getElementById('y');
			var yo = years.value;

			var genre =  document.getElementById('g');
			var go = genre.value;

			var f = [];

			const s =axios.get('https://www.omdbapi.com?apikey=a695814a&s=*'+searchText+'&type=movie&page='+this.pages);
			s.then(resp => {
    	console.log(resp.data);
    		let m = resp.data.Search;
      	$.each(m, (index, movie) => {
      	if( this.n == this.t ){
      			this.r += `<tr>`+ this.o + `</tr>`;
      			this.t += 5;
      			this.o = ``;
      	}
				if( movie.Year == yo){
						f.push(movie.imdbID);
						this.n++;
				}

				var ys = yo.split("-");
				for( var i = ys[0]; i <= ys[1]; i++ ){
						if( movie.Year == i){
						    f.push(movie.imdbID);
						 		this.n++;
						 		break;	
				     }

								  }
				while ( f.length !=  0){
				const b = axios.get('https://www.omdbapi.com?apikey=a695814a&i='+f.shift());
      	b.then(	response => {
      		console.log(response.data);
      		let t = response.data;
			    const ge = t.Genre.split(" ");

	        for( var i = 0 ;  i < ge.length ; i++){

     		  		if( ge[i].toLowerCase() == go){
        		  			this.o += `
				            <td class = "td"> 
				            <table class = "table">
				            <tr class = "tr"><td class = "td">
				              <img class = "i" src="${movie.Poster}"> <td> </tr>
				            <tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
				              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
					              	</td> </tr> </table> </td>`;
				              	this.n++;
				              	break;
	        		  			}
	        		  		}

		if( this.r == ""){
							let result = '<td class = "not"><h3>Movieis not found</h3></td>';
					    $('#movies').html(result);
			}
		else{
					if(this.n == 10 ){
						$('#movies').html(this.r);
						}
					else if( this.n < 10){
						this.pages++;
						filterYear(searchText);
					}
				}
						});
      }
      	})

		})
		.catch(err => {
		console.log(err);
		  let result = '<td class = "not"><h3>Movieis not found</h3></td>';
    	$('#movies').html(result);
	});
}
function filterYearRating(searchText){
			var years = document.getElementById('y');
			var yo = years.value;

			var rate =  document.getElementById('r');
			var ro = rate.value;
			var f = [];

			const s =axios.get('https://www.omdbapi.com?apikey=a695814a&s=*'+searchText+'&type=movie&page='+this.pages);
			s.then(resp => {
    	console.log(resp.data);
    		let m = resp.data.Search;
      	$.each(m, (index, movie) => {
      	if( this.n == this.t ){
      			this.r += `<tr>`+ this.o + `</tr>`;
      			this.t += 5;
      			this.o = ``;
      	}
				if( movie.Year == yo){
						f.push(movie.imdbID);
						this.n++;
				}

				var ys = yo.split("-");
				for( var i = ys[0]; i <= ys[1]; i++ ){
						if( movie.Year == i){
						    f.push(movie.imdbID);
						 		this.n++;
						 		break;	
				     }

								  }
				while ( f.length !=  0){
				const b = axios.get('https://www.omdbapi.com?apikey=a695814a&i='+f.shift());
      	b.then(	response => {
      		console.log(response.data);
      		let t = response.data;
			    if( t.imdbRating >= ro ){
        				this.o += `
				            <td class = "td"> 
				            <table class = "table">
				            <tr class = "tr"><td class = "td">
				              <img class = "i" src="${movie.Poster}"> <td> </tr>
				             <tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
				              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
				              	</td> </tr> </table> </td>`;
				              	this.n++;
						}

		if( this.r == ""){
							let result = '<td class = "not"><h3>Movieis not found</h3></td>';
					    $('#movies').html(result);
			}
		else{
					if(this.n == 10 ){
						$('#movies').html(this.r);
						}
					else if( this.n < 10){
						this.pages++;
						filterYear(searchText);
					}
				}
						});
      }
      	})

		})
		.catch(err => {
		console.log(err);
		  let result = '<td class = "not"><h3>Movieis not found</h3></td>';
    	$('#movies').html(result);
	});
}

function filterRatingGnere(searchText){
			var genre = document.getElementById('g');
			var go = genre.value;

			var rate =  document.getElementById('r');
			var ro = rate.value;
			var f = [];

			const s =axios.get('https://www.omdbapi.com?apikey=a695814a&s=*'+searchText+'&type=movie&page='+this.pages);
			s.then(resp => {
    	console.log(resp.data);
    		let m = resp.data.Search;
      	$.each(m, (index, movie) => {
      	if( this.n == this.t ){
      			this.r += `<tr>`+ this.o + `</tr>`;
      			this.t += 5;
      			this.o = ``;
      	}
					const c = axios.get('https://www.omdbapi.com?apikey=a695814a&i'+movie.imdbID);
      		c.then(	response => {
      			console.log(response);
      		let a = response.data;
      		const ge = a.Genre.split(" ");

					        for( var i = 0 ;  i < ge.length ; i++){
				     		  		if( ge[i].toLowerCase() == go){
				        		  			f.push(movie.imdbID);
								              	this.n++;
								              	break;
					        		  			}
					        }
					      });
				while ( f.length !=  0){
				const b = axios.get('https://www.omdbapi.com?apikey=a695814a&i='+f.shift());
      	b.then(	resp => {
      		console.log(resp.data);
      		let t = resp.data;
			    if( t.imdbRating >= ro ){
        				this.o += `
				            <td class = "td"> 
				            <table class = "table">
				            <tr class = "tr"><td class = "td">
				              <img class = "i" src="${movie.Poster}"> <td> </tr>
				             <tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
				              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
				              	</td> </tr> </table> </td>`;
				              	this.n++;
						}
						});
					}

		if( this.r == ""){
							let result = '<td class = "not"><h3>Movieis not found</h3></td>';
					    $('#movies').html(result);
			}
		else{
					if(this.n == 10 ){
						$('#movies').html(this.r);
						}
					else if( this.n < 10){
						this.pages++;
						filterYear(searchText);
					}
				}
						
      	})

		})
		.catch(err => {
		console.log(err);
		  let result = '<td class = "not"><h3>Movieis not found</h3></td>';
    	$('#movies').html(result);
	});
}
function filter(searchText){
	var years = document.getElementById('y');
			var yo = years.value;

			var genre =  document.getElementById('g');
			var go = genre.value;

			var f = [];
			var fg = [];

			const s =axios.get('https://www.omdbapi.com?apikey=a695814a&s=*'+searchText+'&type=movie&page='+this.pages);
			s.then(resp => {
    	console.log(resp.data);
    		let m = resp.data.Search;
      	$.each(m, (index, movie) => {
      	if( this.n == this.t ){
      			this.r += `<tr>`+ this.o + `</tr>`;
      			this.t += 5;
      			this.o = ``;
      	}
				if( movie.Year == yo){
						f.push(movie.imdbID);
						this.n++;
				}

				var ys = yo.split("-");
				for( var i = ys[0]; i <= ys[1]; i++ ){
						if( movie.Year == i){
						    fg.push(movie.imdbID);
						 		this.n++;
						 		break;	
				     }

								  }
				while( fg.length != 0){
				const c = axios.get('https://www.omdbapi.com?apikey=a695814a&i='+fg.shift());
      		c.then(	response => {
      			console.log(response.data);
      			let a = response.data;
      			const ge = a.Genre.split(",");
									document.write(ge);

					        for( var i = 0 ;  i < ge.length ; i++){
				     		  		if( ge[i].toLowerCase() == go){
				     		  							f.push(movie.imdbID);
								              	this.n++;
								              	break;
					        		  			}
					        }
					      });
      	}
				while ( f.length !=  0){
				const b = axios.get('https://www.omdbapi.com?apikey=a695814a&i='+f.shift);
      	b.then(	respo => {
      		console.log(respo.data);
      		let t = resp.data;
			    if( t.imdbRating >= ro ){
        				this.o += `
				            <td class = "td"> 
				            <table class = "table">
				            <tr class = "tr"><td class = "td">
				              <img class = "i" src="${movie.Poster}"> <td> </tr>
				             <tr class = "tr"><td class = "td"> <h5>${movie.Title}</h5>
				              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="MovieDetails.html">Movie Details</a>
				              	</td> </tr> </table> </td>`;
				              	this.n++;
									}
								});
	       		}

		if( this.r == ""){
							let result = '<td class = "not"><h3>Movieis not found</h3></td>';
					    $('#movies').html(result);
			}
		else{
					if(this.n == 10 ){
						$('#movies').html(this.r);
						}
					else if( this.n < 10){
						this.pages++;
						filterYear(searchText);
					}
				}
      	})

		})
		.catch(err => {
		console.log(err);
		  let result = '<td class = "not"><h3>Movieis not found</h3></td>';
    	$('#movies').html(result);
	});
}