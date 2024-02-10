// 定义全局变量 listCarts
let listCarts = [];

// 載入時從 localStorage 中獲取商品資料
window.onload = function () {
    loadCartFromLocalStorage(); // 加载购物车内容
};

// 購物車內容
function reloadCart() {
    const list = document.getElementById('list');
    const total = document.getElementById('total');
    const quantity = document.getElementById('quantity');

    list.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    let totalQuantity = 0;
    
    listCarts.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += 1;
            totalQuantity += value.quantity;

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
            list.appendChild(newDiv);
        }
    });
    total.innerText = `總計： $${totalPrice.toLocaleString()}`;
    quantity.innerText = `總數量：${totalQuantity}`;
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

// 刪除物件功能
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

// 結帳
const checkoutBtn = document.getElementById('checkout');
checkoutBtn.addEventListener('click', () => {
    // 這裡可以寫入結帳的程式碼

    // 結帳完成後，清除 localStorage 中的商品資料
    localStorage.removeItem('cart');
});
