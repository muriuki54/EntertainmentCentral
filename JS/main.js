let toggleBtn = document.querySelector('.toggleBtn'),
    sidebar = document.querySelector('.sidebar'),
    search = document.querySelector('.search'),
    submitBtn = document.querySelector('.submitBtn'),
    form = document.querySelector('form'),
    cards = document.querySelector('.cards');


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
        url: ' http://www.omdbapi.com/?s='+searchValue+'&apikey=7b4fc861'
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


