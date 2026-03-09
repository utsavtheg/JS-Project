const openModalBtn = document.querySelector("#openModal");
const modal = document.querySelector("#modal");

function openModal() {
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

openModalBtn.addEventListener("click", openModal);

modal.addEventListener("click", (e)=>{
    if(e.target.classList.contains('modal-overlay') 
        || e.target.closest("#closeModal")) {
        closeModal();
    }
})

document.addEventListener("keydown", (e)=>{

    if(modal.classList.contains('active') && e.key === "Escape") {
        closeModal();        
    }
})