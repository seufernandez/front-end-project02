const modalOverlay = document.querySelector(".modal-overlay")
const cards = document.querySelectorAll("#play")//pega todos com a classe card

var video
for (let card of cards) {
    card.addEventListener("click", function(){
        const videoId = card.getAttribute("title");//pegando id
        modalOverlay.classList.add("active");
        modalOverlay.querySelector("iframe").src =`https://www.youtube.com/embed/${videoId}`
        console.log(videoId);
    });
}

document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove("active")
    modalOverlay.querySelector("iframe").src = ""


});


