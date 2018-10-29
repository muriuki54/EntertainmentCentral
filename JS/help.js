let toggleBtn = document.querySelector('.toggleBtn'),
    sidebar = document.querySelector('.sidebar');

    //  TOGGLE MENU
toggleBtn.addEventListener('click',() => {
    sidebar.classList.toggle('active')
})