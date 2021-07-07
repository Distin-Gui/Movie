function getMovie(searchText){
	axios.get('https://www.omdbapi.com?s='+searchText).then(resp => {

    console.log(resp.data);
})
	.catch(err => {
		console.log();
	});
}