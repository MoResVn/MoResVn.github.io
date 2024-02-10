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

// user
// 請登入功能
let forms = document.querySelectorAll("form");
let emailInputs = document.querySelectorAll(".email");
let passInputs = document.querySelectorAll('.password');
let cpassInputs = document.querySelectorAll('.cpassword');

let otp_val;
// 信箱驗證功能
function sendOTP() {
    const emailInput = document.querySelector('.new-user .email');
    // 檢查郵件格式是否有效
    if (!checkEmail(emailInput)) {
        return false; // 如果郵件格式無效，退出函數
    }

    // 生成驗證碼
    otp_val = Math.floor(Math.random() * 10000);
    let emailBody = `<h2>您的驗證碼是：</h2>${otp_val}`;

    // 發送郵件
    Email.send({
        SecureToken: "8085a14c-dcad-412f-a8e0-d3186703761c",
        To: emailInput.value,
        From: "dragon172113@gmail.com",
        Subject: "Email OTP",
        Body: emailBody
    }).then(message => {
        if (message === "OK") {
            alert('驗證碼已發送到您的郵箱：' + emailInput.value);
            return window.otp_val;
        } else {
            alert('傳送失敗');
            return false;
        } 
    });
}


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
// 檢查再次輸入密碼
function confirmPass(passInput, cpassInput) {
    const errorSpan = document.querySelector('.cpassword-error');

    // 確保 passInput 和 cpassInput 不為 null
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


    // 執行相應的驗證功能
    const isEmailValid = checkEmail(emailInput);
    const isPassValid = createPass(passInput);

    if (isEmailValid && isPassValid) {
        // 檢查是否已成功註冊
        const userDataJSON = localStorage.getItem('userData');
        if (userDataJSON) {
            const userData = JSON.parse(userDataJSON);
            if (userData.email === emailInput.value && userData.password === passInput.value) {
                // 登入成功
                alert('登入成功');
            } else {
                // 帳號或密碼錯誤
                alert('帳號或密碼錯誤');
            }
        } else {
            // 尚未註冊
            alert('尚未註冊');
        }
    }
});
// 註冊按鈕
const signBtn = document.querySelector('.sign-btn');
signBtn.addEventListener('click', (e) => {
  e.preventDefault(); // 防止默認表單提交行為

    const emailInput = document.querySelector('.new-user .email');
    const passInput = document.querySelector('.new-user .password');
    const cpasswordInput = document.querySelector('.new-user .cpassword');

    const otp_inp = document.getElementById('otp-inp');
    // 驗證驗證碼
    

    // 執行相應的驗證功能
    const isEmailValid = checkEmail(emailInput);
    const isPassValid = createPass(passInput);
    const isConfirmPassValid = confirmPass(passInput, cpasswordInput);


    
    if (isEmailValid && isPassValid && isConfirmPassValid && parseInt(otp_inp.value) === otp_val) {
        // 如果所有條件都符合，則註冊成功
        alert('註冊成功');
        
        // 將註冊資料儲存到本地存儲中
        const userData = {
            email: emailInput.value,
            password: passInput.value
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    } else {
        // 否則顯示相應的錯誤信息
        alert('註冊失敗，請確認您的驗證碼');
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
            if (cpasswordInput) { // 檢查 cpasswordInput 是否存在
                cpasswordInput.type = 'text';
            }
        } else {
            eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
            passwordInput.type = 'password';
            if (cpasswordInput) { // 檢查 cpasswordInput 是否存在
                cpasswordInput.type = 'password';
            }
        }
    });
});


let loginContainer = document.getElementById("user-login-container");
let newUserContainer = document.querySelector(".new-user");

// 點擊註冊帳號功能
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

