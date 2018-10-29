let toggleBtn = document.querySelector('.toggleBtn'),
            sidebar = document.querySelector('.sidebar'),
            movieDetails = document.querySelector('.movieDetails'),
            plot = document.querySelector('.plot');
        //  TOGGLE MENU
        toggleBtn.addEventListener('click',() => {
            sidebar.classList.toggle('active')
        })

    function showSingle() {
    let singleMovie = JSON.parse(sessionStorage.getItem('movie'));

    axios({
        method: 'get',
        url: 'https://www.omdbapi.com/?i='+singleMovie.id+'&apikey=7b4fc861'
    }).then((single) => {
        movieDetails.innerHTML += `
    <div class="singlePoster">
    <img src="${single.data.Poster}">
    </div>
    <div class="singleDetails">
    <h2>${single.data.Title}</h2>
    <div class="singleCard">
    <h2>Movie Details </h2>
    <ul>
    <li>Year Released: ${single.data.Year}</li>
    <li>Genre: ${single.data.Genre}</li>
    <li>Director: ${single.data.Director}</li>
    <li>Actors: ${single.data.Actors}</li>
    <li>Language: ${single.data.Language}</li>
    <li>IMDb Rating: ${single.data.Rating}</li>
    </ul>
    </div>
    </div>
    `;

    plot.innerHTML += `
    <div class="single">
    <div class="singlePlot">
    <h3><u>Plot</u></h3>
    <p>${single.data.Plot}</p>    
    </div>
    </div>
    <div class="actionBtn">
    <button class="btn" onclick = "addList()">Add To List</button>  
    <a href="index.html" class="btn">Go to search</a>    
    </div>
    `;
    }).catch((err) => {
        alert(err)
    })
}
showSingle();

    function addList() {
        let saveMovie = JSON.parse(sessionStorage.getItem('movie'));

        console.log(saveMovie);
        if(localStorage.getItem('savedMovie') == null) {
            let savedMovie = [];
            savedMovie.push(saveMovie);
            localStorage.setItem('savedMovie',JSON.stringify(savedMovie));

        } else {
            let savedMovie = JSON.parse(localStorage.getItem('savedMovie'));
            savedMovie.push(saveMovie);
            localStorage.setItem('savedMovie',JSON.stringify(savedMovie));
        } 
    }



    