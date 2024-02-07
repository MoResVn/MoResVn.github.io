// 載入時從 localStorage 中獲取商品資料
window.onload = function () {
    const productsJSON = localStorage.getItem('cart');
    if (productsJSON) {
        const listCarts = JSON.parse(productsJSON);
        reloadCart(listCarts);
    }
};

// 購物車內容
function reloadCart(listCarts) {
    const list = document.getElementById('list');
    const total = document.getElementById('total');
    const quantity = document.getElementById('quantity');

    list.innerHTML = '';
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
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                <i class="fa fa-sharp fa-solid fa-trash-can" onclick="removeItem(${key})"></i>
            </div>
            `;
            list.appendChild(newDiv);
        }
    });
    total.innerText = `總計： $${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
}

// 結帳
const checkoutBtn = document.getElementById('checkout');
checkoutBtn.addEventListener('click', () => {
    // 這裡可以寫入結帳的程式碼

    // 結帳完成後，清除 localStorage 中的商品資料
    localStorage.removeItem('cart');
});