const shareBtn = document.querySelector('.share-btn');
const shareOptions = document.querySelector('.share-option');

shareBtn.addEventListener('click', () => {
    shareOptions.classList.toggle('active');
})