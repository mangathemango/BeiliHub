const sideBar = document.getElementById('toggleSidebar');
const videoList = document.getElementById('videoList');
const arrow = document.getElementById('arrow');
const desc = document.getElementById('video-desc');
const descBody = document.getElementById('video-desc-body');
const descArrow= document.getElementById('downArrow');
/*const arrow = toggle.querySelector('.arrow');*/

sideBar.addEventListener('click', () => {
    document.querySelectorAll(".video").forEach(element => {
        if (!element.classList.contains("active")) {
            element.classList.toggle('hidden')
        }
    })
    arrow.classList.toggle('flipped')
})

desc.addEventListener('click', () => {
    console.log("NIGGER")
    descBody.classList.toggle('video-desc-body-collapsed')
    descArrow.classList.toggle('flippedVertical')
})
