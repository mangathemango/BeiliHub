const sideBar = document.getElementById('toggleSidebar');
const videoList = document.getElementById('videoList');
/*const arrow = toggle.querySelector('.arrow');*/

sideBar.addEventListener('click', () => {
    document.querySelectorAll(".video").forEach(element => {
        if (!element.classList.contains("active")) {
            element.classList.toggle('hidden')
        }
    })
})