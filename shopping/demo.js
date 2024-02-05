let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// 查詢欄位打開關閉功能
let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () =>{
    search.classList.toggle('active');
    cart.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
}
// 購物欄打開關閉
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('.closeCart');

document.querySelector('#cart-icon').onclick = () =>{
    cart.classList.toggle('active');
    search.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
    closeCart.addEventListener('click',()=>{
    cart.classList.remove('active');
})
    
}
// 使用者登入打開關閉
let user = document.querySelector('.user');

document.querySelector('#user-icon').onclick = () =>{
    user.classList.toggle('active');
    cart.classList.remove('active');
    search.classList.remove('active');
    navbar.classList.remove('active');

    // 預設打開登入畫面
    loginContainer.style.display = "block";
    newUserContainer.style.display = "none";
    // 隱藏錯誤訊息 (使用迴圈處理 NodeList)
    const emailErrors = document.querySelectorAll('.email-error');
    const passErrors = document.querySelectorAll('.password-error');
    const cpassErrors = document.querySelectorAll('.cpassword-error');

    emailErrors.forEach(error => {
        error.classList.remove('invalid');
    });

    passErrors.forEach(error => {
        error.classList.remove('invalid');
    });

    cpassErrors.forEach(error => {
        error.classList.remove('invalid');
    });

    // 重置所有表單
    forms.forEach(form => {
        form.reset();
    });
}
// 菜單打開關閉
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () =>{
    navbar.classList.toggle('active');
    cart.classList.remove('active');
    search.classList.remove('active');
    user.classList.remove('active');
}
// 導覽類顯示
let header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});
// 滑鼠移入
header.addEventListener('mouseenter', () => {
    header.classList.add('shadow');
  });
  
  // 滑鼠移出
  header.addEventListener('mouseleave', () => {
    header.classList.remove('shadow');
  });

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
const buyButtons = document.querySelectorAll('.btn');

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
    }
    reloadCart();
}
// 購物車內容
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
                    <div class="count">${value.quantity}</div>
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
    if (newQuantity == 0) {
      delete listCarts[key];  
    } else {
      listCarts[key].quantity = newQuantity;
    }
    reloadCart();
  }
//   刪除物件功能
  function removeItem(key) {
    delete listCarts[key];
    reloadCart();
}

// 判斷要不要顯示滾動條
window.onload = function () {
    var cart = document.querySelector('.cart');

    // 當內容發生變化時檢查是否需要顯示滾動條
    cart.addEventListener('DOMSubtreeModified', function () {
        checkOverflow();
    });

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

// 搜索功能
const searchInput = document.querySelector('.search-box input');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.item');

    items.forEach((item) => {
        const itemName = item.querySelector('.title').textContent.toLowerCase();
        if (itemName.includes(searchText)) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    });
});
// 重置搜索功能
window.addEventListener('load', () => {
    const searchInput = document.querySelector('.search-box input');
    searchInput.value = '';
  
    const items = document.querySelectorAll('.item');
    items.forEach((item) => {
      item.classList.remove('hide');
    });
  });



// Swiper使用方式
var swiper = new Swiper(".new-arrival", {
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 1,
        },
    },
});
// 請登入功能
let forms = document.querySelectorAll("form");
let emailInputs = document.querySelectorAll(".email");
let passInputs = document.querySelectorAll('.password');
let cpassInputs = document.querySelectorAll('.cpassword');

// 確認郵件
function checkEmail(emailInput) {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const errorSpan = emailInput.parentElement.querySelector('.email-error');
    if (!emailInput.value.match(emailPattern)) {
        errorSpan.classList.add('invalid');
        return false;
    } else {
        errorSpan.classList.remove('invalid');
        return true;
    }
}


// 確認密碼
function createPass(passInput) {
    // 防禦性編程，確保 passInput 不為 null
    const passwordInput = document.querySelector('.password');
    if (!passwordInput) {
      console.error('密碼輸入框元素不存在');
      return false;
    }
  
    const passPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    const errorSpan = passInput.parentElement.querySelector('.password-error');
  
    if (!passInput.value.match(passPattern)) {
      errorSpan.classList.add('invalid');
      return false;
    } else {
      errorSpan.classList.remove('invalid');
      return true;
    }
  }

function confirmPass(passInput, cpassInput) {
    const errorSpan = document.querySelector('.cpassword-error');

    // 防禦性編程，確保 passInput 和 cpassInput 不為 null
    if (!passInput || !cpassInput) {
        console.error("passInput or cpassInput is null");
        return false;
    }

    if (passInput.value !== cpassInput.value || cpassInput.value === '') {
        errorSpan.classList.add('invalid');
        return false;
    } else {
        errorSpan.classList.remove('invalid');
        return true;
    }
}
// 登入按鈕
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', (e) => {
    e.preventDefault(); // 防止默認表單提交行為

    const emailInput = document.querySelector('.user-log .email');
    const passInput = document.querySelector('.user-log .password');
    const eyeIcon = document.querySelector('.fa-eye-slash');


    // 執行相應的驗證功能
    const isEmailValid = checkEmail(emailInput);
    const isPassValid = createPass(passInput);

    if (isEmailValid && isPassValid) {
        // 登入成功
        alert('登入成功');
    }
});
// 註冊按鈕
const signBtn = document.querySelector('.sign-btn');
signBtn.addEventListener('click', (e) => {
  e.preventDefault(); // 防止默認表單提交行為

    const emailInput = document.querySelector('.new-user .email');
    const passInput = document.querySelector('.new-user .password');
    const cpasswordInput = document.querySelector('.new-user .cpassword');

    // 執行相應的驗證功能
    const isEmailValid = checkEmail(emailInput);
    const isPassValid = createPass(passInput);
    const isConfirmPassValid = confirmPass(passInput, cpasswordInput);
    



    if (isEmailValid && isPassValid && isConfirmPassValid) {
        // 登入成功
        alert('註冊成功');
    }
});

// 密碼顯示隱藏
const eyeIcons = document.querySelectorAll('.fa-eye-slash');

eyeIcons.forEach(eyeIcon => {
    eyeIcon.addEventListener('click', () => {
        const passwordInput = eyeIcon.parentElement.querySelector('.password');
        const cpasswordInput = eyeIcon.parentElement.querySelector('.cpassword');
        
        if (passwordInput.type === 'password') {
            eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
            passwordInput.type = 'text';
        } else {
            eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
            passwordInput.type = 'password';
        }
    });
});


let loginContainer = document.getElementById("user-login-container");
let newUserContainer = document.querySelector(".new-user");

// 假設你有一個點擊事件處理函式
document.querySelector("a[href='#registration']").onclick = () => {
    // 切換顯示狀態
    loginContainer.style.display = "none";
    newUserContainer.style.display = "block";

};
// 註冊按鈕的登入帳號按鈕
document.querySelector('.sign-login').onclick = () => {
    newUserContainer.style.display = "none";
    loginContainer.style.display = "block";
    
    const emailErrors = document.querySelectorAll('.email-error');
    const passErrors = document.querySelectorAll('.password-error');
    const cpassErrors = document.querySelectorAll('.cpassword-error');

    emailErrors.forEach(error => {
        error.classList.remove('invalid');
    });

    passErrors.forEach(error => {
        error.classList.remove('invalid');
    });

    cpassErrors.forEach(error => {
        error.classList.remove('invalid');
    });

    // 重置所有表單
    forms.forEach(form => {
        form.reset();
    });
};