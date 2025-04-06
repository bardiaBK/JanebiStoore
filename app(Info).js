let iconCart = document.querySelector('.icon-cart');
let closecart = document.querySelector('.close')
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.infobuy');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let infobuy = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showcart')
})

closecart.addEventListener('click', () => {
    body.classList.toggle('showcart')
})


const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('things');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <p class="left-p">توضیحات</p>
                <p class="left-p">${product.price}<br> <del>500,000</del></p>
                <div class="info-btn-">
                <button class="info-btn">افزودن به سبد خرید</button>
            </div>
            <img src="${product.image}" alt="" class="right-img">
            <h1 class="right-h">${product.name}</h1>
            <h2 class="right-h">برای ایفون 13</h2>
        `;
            listProductHTML.appendChild(newProduct);
        })
}
}

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1

        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('things');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                 <div class="image-2">
                     <img src="${info.image}">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalprice">
                        ${info.price}
                    </div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">></span>
                    </div>
                `
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus'
        }
        changeQuantity(product_id, type)
    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id)
    if(positionItemInCart >= 0){
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
            break;

            default:
                let valuechange = carts[positionItemInCart].quantity - 1;
                if(valuechange > 0){
                    carts[positionItemInCart].quantity = valuechange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
            }
        }
    addCartToMemory();
    addCartToHTML();    
}
const initApp = () => {
    fetch('products(Info).json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})
initApp()