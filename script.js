const productContainers = [...document.querySelectorAll('.Pro-Text')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const perBtn = [...document.querySelectorAll('.per-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    perBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})