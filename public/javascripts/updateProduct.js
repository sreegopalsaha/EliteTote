const imgContainer = document.querySelector('.img-container');
const imgUpdateBtn = document.querySelector('.img-update-btn');
imgUpdateBtn.addEventListener('click', ()=>{
    imgContainer.classList.toggle('hidden');
});