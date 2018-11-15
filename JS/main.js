

window.addEventListener('load',() =>{
    
})

let toggleBtn = document.querySelectorAll('.toggleBtn'),
    sidebar = document.querySelectorAll('.sidebar'),
    search = document.querySelector('.search'),
    submitBtn = document.querySelector('.submitBtn'),
    form = document.querySelector('form'),
    cards = document.querySelector('.cards'),
    movieDetails = document.querySelector('.movieDetails'),
    plot = document.querySelector('.plot'),
    showSaved = document.querySelector('#showSaved'),
    savedDetails = document.querySelector('.savedDetails');

// window.addEventListener('load',() => {
//     console.log(toggleBtn)
// })

 //  TOGGLE MENU
 for (let i = 0;i < toggleBtn.length;i++){
    toggleBtn[i].addEventListener('click',() => {
        for (let i = 0;i < sidebar.length;i++){
            sidebar[i].classList.toggle('active');
            sidebar[i].addEventListener('click',() => {
                sidebar[i].classList.remove('active');
            })
        }
    })
 }  

//SEARCH FIELDS
form.addEventListener('submit',searchQuery);

function searchQuery(e){
    e.preventDefault();
    let searchValue = search.value;
   
    if(searchValue != ''){
    axios({
        method: 'get',
        url: ' https://www.omdbapi.com/?s='+searchValue+'&apikey=7b4fc861'
    }).then((res) => {
        response = res.data.Search

        for (var i = 0; i < response.length;i++){
           // console.log(response[i]);

            //OUTPUT TO THE SCREEN
            cards.innerHTML += `
            <div class="card">
            <img src="${response[i].Poster}">
            <h2>${response[i].Title}</h2>
            <h3>${response[i].Year}</h3>
            <button class="btn movieBtn" onclick="getMovie('${response[i].imdbID}','${response[i].Title}')">Check out</button>
            </div>
            `;
        }

    }).catch((err) => {
        console.log(err);
        alert('Sorry we could not find a match')
    })
} else {
    alert('Please Enter a value');
    return false;
}

form.reset();
search.addEventListener('click',()=> {
    cards.innerHTML = '';
})

}

function getMovie(id,title) {
    console.log(id)
    console.log(title)

     let movie ={
             title: title,
             id: id
     }
    sessionStorage.setItem('movie',JSON.stringify(movie));
    window.location = 'movie.html';
}

function showSingle() {
    let singleMovie = JSON.parse(sessionStorage.getItem('movie'));

    axios({
        method: 'get',
        url: 'https://www.omdbapi.com/?i='+singleMovie.id+'&plot=full&type&apikey=7b4fc861'
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
    <li>Year(s) Released: ${single.data.Year}</li>
    <li>Type: ${single.data.Type}</li>
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
    <button class="btn" id="add" onclick = "addList()">Add To List</button>  
    <a href="index.html" class="btn remove">Home</a>    
    </div>
    `;
    }).catch((err) => {
        console.log(err)
    })
}

    function addList(e) {
        let saveMovie = JSON.parse(sessionStorage.getItem('movie'));

        console.log(saveMovie);
        if(localStorage.getItem('savedMovie') == null) {
            let savedMovie = [];
            savedMovie.unshift(saveMovie);
            localStorage.setItem('savedMovie',JSON.stringify(savedMovie));

        } else {
            let savedMovie = JSON.parse(localStorage.getItem('savedMovie'));
            savedMovie.push(saveMovie);
            localStorage.setItem('savedMovie',JSON.stringify(savedMovie));
        } 
        addBtn =  document.getElementById('add');
        addBtn.style.background = '#1ede9e';
        addBtn.innerHTML = 'Added succesfully';
        addBtn.style.color = '#fff';

        // alreadySaved = JSON.parse(localStorage.getItem('savedMovie'));
        // for(var i = 0; i < alreadySaved.length;i++){
        //     if(alreadySaved[i] == JSON.parse(sessionStorage.getItem('movie'))){
        //         addBtn.innerHTML= 'Already Saved';
        //     }
        // }
    }


function displaySaved () {
    let savedMovie = JSON.parse(localStorage.getItem('savedMovie'));
   
    for (var i = 0; i < savedMovie.length; i++){

        axios({
            method: 'get',
            url: ' https://www.omdbapi.com/?i='+savedMovie[i].id+'&apikey=7b4fc861'
        }).then((data) => {

            showSaved.innerHTML += `
            <div class="savedDetails" style="background-image:url(${data.data.Poster})">
            <div class="innerDetails">
            <h1 class="left">${data.data.Title}</h1>
            <button class="btn left" onclick="viewMovie('${data.data.imdbID}','${data.data.Title}')">Check out</button>
            <button class="btn left" onclick="removeMovie('${data.data.imdbID}')">Remove</btn>
            </div>
            </div>
        `;
             
        }).catch((err) => {
           console.log(err)
        })
    }   
}

function viewMovie(id,title) {
    if(sessionStorage.getItem('movie') !== null){
        sessionStorage.removeItem('movie');
    }

    let movie = {
        id: id,
        title: title
    }
    sessionStorage.setItem('movie',JSON.stringify(movie));
    window.location = 'movie.html';
    console.log(movie);
    showSingle();
}

function removeMovie(id){
    let savedMovie = JSON.parse(localStorage.getItem('savedMovie'));
    for(var i = 0; i < savedMovie.length; i++){
        if(savedMovie[i].id == id ){
            savedMovie.splice(i,1);
        }
    }

    localStorage.setItem('savedMovie',JSON.stringify(savedMovie));
    showSaved.innerHTML = '';
    displaySaved();
}