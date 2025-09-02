const sideBar = document.getElementById('toggleSidebar');
const videoList = document.getElementById('videoList');
const arrow = document.getElementById('arrow')
/*const arrow = toggle.querySelector('.arrow');*/

sideBar.addEventListener('click', () => {
    document.querySelectorAll(".video").forEach(element => {
        if (!element.classList.contains("active")) {
            element.classList.toggle('hidden')
        }
    })
    arrow.classList.toggle('flipped')
})