// 全域變亮 listCarts
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
// 選取信用卡付款顯示信用卡卡號
document.addEventListener('DOMContentLoaded', function() {
    const creditCardOption = document.getElementById('option1');
    const cashOnDeliveryOption = document.getElementById('option2');
    const cardNumberInput = document.getElementById('cardnumber');

    // 初始化時檢查支付方式選項
    checkPaymentOption();

    // 監聽支付方式選項的變化
    creditCardOption.addEventListener('change', checkPaymentOption);
    cashOnDeliveryOption.addEventListener('change', checkPaymentOption);

    // 根據選擇的支付方式顯示或隱藏信用卡卡號輸入框
    function checkPaymentOption() {
        if (creditCardOption.checked) {
            cardNumberInput.style.display = 'block';
        } else {
            cardNumberInput.style.display = 'none';
        }
    }
});


const checkoutBtn = document.getElementById('checkout');
const orderForm = document.querySelector('.orderform');

checkoutBtn.addEventListener('click', () => {
    // 顯示訂單表單
    orderForm.style.display = 'block';
    // 隱藏結帳按鈕
    checkoutBtn.style.display = 'none';
});

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const cardnumberInput = document.getElementById('cardnumber');
const paymentOK = document.getElementById('paymentOK');
const paymentNO = document.getElementById('paymentNO');

const orderSubmit = document.querySelector('.order-submit');
orderSubmit.addEventListener('click', (event) => {
  event.preventDefault(); // 阻止表單預設的提交行為

  // 檢查表單是否有效
  if (formIsValid()) {
    // 顯示“下單成功”提示
    document.getElementById('paymentOK').style.display = 'block';

    // 1 秒後隱藏“下單成功”提示
    setTimeout(() => {
      document.getElementById('paymentOK').style.display = 'none';
      // 提交表單
      document.querySelector('form').submit();
      // 結帳成功後刪除購物車
      localStorage.removeItem('cart');
    }, 1000);
  } else {
    // 顯示“下單失敗”提示
    document.getElementById('paymentNO').style.display = 'block';

    // 1 秒後隱藏“下單失敗”提示
    setTimeout(() => {
      document.getElementById('paymentNO').style.display = 'none';
    }, 1000);
  }
});

function formIsValid() {
    // 檢查每個輸入欄位是否為空
    if (nameInput.value === '' || phoneInput.value === '' || emailInput.value === '' || addressInput.value === '') {
      return false;
    }

    // 檢查是否選擇了信用卡付款
    const creditCardPayment = document.getElementById('option1').checked;
    if (creditCardPayment && cardnumberInput.value === '') {
      return false;
    }
    return true;
  }
