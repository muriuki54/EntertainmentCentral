let toggleBtn = document.querySelector('.toggleBtn'),
    sidebar = document.querySelector('.sidebar'),
    search = document.querySelector('.search'),
    submitBtn = document.querySelector('.submitBtn'),
    form = document.querySelector('form'),
    cards = document.querySelector('.cards'),
    movieDetails = document.querySelector('.movieDetails'),
    plot = document.querySelector('.plot'),
    showSaved = document.querySelector('#showSaved'),
    savedDetails = document.querySelector('.savedDetails');


//HERO SECTION IMAGE SLIDER
let i = 0; //Start point
let images = [];

//images list
images[0] = '../posters/poster5.jpg';
images[1] = '../posters/poster7.jpg';
images[2] = '../posters/poster8.jpg';
images[3] = '../posters/poster9.jpg';



//Change img
function changeImg() {

    if(i < images.length - 1){
        i++
    } else {
        i = 0;
    }

    document.slide.src = images[i];

   setTimeout("changeImg()", 4000);
}

changeImg();


//  TOGGLE MENU
toggleBtn.addEventListener('click',() => {
    sidebar.classList.toggle('active')
})

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
        alert(err)
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
            <button class="btn left" onclick="">Remove</btn>
            </div>
            </div>
        `;
             
        }).then((data) => {
            console.log(data)
        }).catch((err) => {
           console.log(err)
        })
    }   
}



// function savedQuery(id){
//     window.location = 'movie.html';
//     sessionStorage.removeItem('movie');
//     sessionStorage.setItem('id',id);
    

//     axios({
//         method: 'get',
//         url: ' http://www.omdbapi.com/?i='+id+'&apikey=7b4fc861'
//     }).then((single) => {
//         movieDetails.innerHTML += `
//     <div class="singlePoster">
//     <img src="${single.data.Poster}">
//     </div>
//     <div class="singleDetails">
//     <h2>${single.data.Title}</h2>
//     <div class="singleCard">
//     <h2>Movie Details </h2>
//     <ul>
//     <li>Year Released: ${single.data.Year}</li>
//     <li>Genre: ${single.data.Genre}</li>
//     <li>Director: ${single.data.Director}</li>
//     <li>Actors: ${single.data.Actors}</li>
//     <li>Language: ${single.data.Language}</li>
//     <li>IMDb Rating: ${single.data.Rating}</li>
//     </ul>
//     </div>
//     </div>
//     `;

//     plot.innerHTML += `
//     <div class="single">
//     <div class="singlePlot">
//     <h3><u>Plot</u></h3>
//     <p>${single.data.Plot}</p>    
//     </div>
//     </div>
//     <div class="actionBtn">
//     <button class="btn" onclick = "addList()">Add To List</button>   
//     <button class="btn">Download Torrent</button>   
//     <a href="index.html" class="btn">Go to search</a>    
//     </div>
//     `;
//     }).catch((err) => {
//         console.log(err)
//     })
// }





