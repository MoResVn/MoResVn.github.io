// 購物欄位功能應用
// 商品物件
let products = [
    {
        id: 1,
        name: '番茄披薩',
        image:'foot.png',
        price: 120
    },
    {
        id: 2,
        name: '海鮮披薩',
        image:'foot1.png',
        price: 150
    },
    {
        id: 3,
        name: '火腿披薩',
        image:'foot2.png',
        price: 120
    },
    {
        id: 4,
        name: '綜合披薩',
        image:'foot3.png',
        price: 120
    },
    {
        id: 5,
        name: '藍色T-shirt',
        image:'shirt.png',
        price: 200
    },
    {
        id: 6,
        name: '白色T-shirt',
        image:'shirt1.png',
        price: 240
    },
];

// 所有產品
let listCarts = [];
function initApp(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item', 'hide');
        newDiv.innerHTML = `
            <div class="box">
            <img src="image/${value.image}"/>
            <div class="content">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
                </div>
            <i class="fa fa-sharp fa-solid fa-cart-shopping" onclick="addToCart(${key})"></i>
            </div>
            `;
        list.appendChild(newDiv);
    })
}
initApp();

// 獲取所有購買按鈕
const buyButtons = document.querySelectorAll('.new-arrival .box .btn');

// 為每個按鈕添加點擊事件
buyButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // 獲取按鈕上的 data-id 屬性值
        const productId = button.getAttribute('data-id');

        addToCart(productId);
    });
});

// 添加到購物車
function addToCart(key){
    if(listCarts[key] == null){
        listCarts[key] = products[key];
        listCarts[key].quantity = 1;
        saveCartToLocalStorage();
    }
    reloadCart();
}
// 重新載入購物車內容
function reloadCart() {
    listCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    
    listCarts.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += 1;
            

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div class="name">${value.name}</div>
                <div>$${(value.price * value.quantity).toLocaleString()}</div>
                <div class="cartdiv">
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <input class="quantity-input" type="number" value="${value.quantity}" onchange="changeQuantity(${key}, this.value)">
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    <i class="fa fa-sharp fa-solid fa-trash-can" onclick="removeItem(${key})"></i>
                </div>
            `;
            listCart.appendChild(newDiv);
        }
    });
    total.innerText = `總計： $${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
}
// 按鈕+ -功能
function changeQuantity(key, newQuantity) {
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity == 0) {
      delete listCarts[key];  
    } else {
      listCarts[key].quantity = newQuantity;
    }
    saveCartToLocalStorage();
    reloadCart();
  }
//   刪除物件功能
  function removeItem(key) {
    delete listCarts[key];
    saveCartToLocalStorage();
    reloadCart();
}
// 將購物車內容存儲到本地存儲
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(listCarts));
}

// 從本地存儲中加載購物車內容
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        listCarts = JSON.parse(savedCart);
        reloadCart();
    }
}

// 在頁面載入時加載購物車內容
window.onload = function () {
    loadCartFromLocalStorage();

    var cart = document.querySelector('.cart');

    // 創建一個 MutationObserver 實例，並指定 callback 函數
    var observer = new MutationObserver(function (mutationsList, observer) {
        for(var mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                checkOverflow();
                break;
            }
        }
    });

    // 開始觀察 .cart 元素及其子節點的變化
    observer.observe(cart, { childList: true, subtree: true });

    // 初次載入時檢查是否需要顯示滾動條
    checkOverflow();

    // 顯示隱藏滾動條
    function checkOverflow() {
        if (cart.scrollHeight > cart.clientHeight) {
            cart.style.overflowY = 'scroll';
        } else {
            cart.style.overflowY = 'hidden';
        }
    }
};
