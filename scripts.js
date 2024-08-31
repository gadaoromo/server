
 /*
document.getElementById('lotteryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userNumbers = document.getElementById('userNumbers').value.split(',').map(Number);
    if (userNumbers.length !== 6 || userNumbers.some(num => num < 1 || num > 49 || isNaN(num))) {
        alert('Please enter exactly 6 valid numbers between 1 and 49.');
        return;
    }

    const lotteryNumbers = [];
    while (lotteryNumbers.length < 6) {
        const num = Math.floor(Math.random() * 49) + 1;
        if (!lotteryNumbers.includes(num)) {
            lotteryNumbers.push(num);
        }
    }

    const matchedNumbers = userNumbers.filter(num => lotteryNumbers.includes(num));
    document.getElementById('result').innerText = `Lottery Numbers: ${lotteryNumbers.join(', ')}\nYour Numbers: ${userNumbers.join(', ')}\nMatched Numbers: ${matchedNumbers.join(', ')}`;
});


function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('lottery-form').style.display='none';
    document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('lottery-form').style.display='block';
    document.getElementById('register-form').style.display = 'none';
}
function login()
{
    document.getElementById('lottery-form').style.display='block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
}




let currentUser = null;

function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Dummy login validation
    if (username === 'user' && password === 'password') {
        currentUser = {
            username: 'user',
            userId: '12345',
            gender: 'Male',
            deposit: 100,
            balance: 50
        };
        showProfile();
    } else {
        alert('Invalid login credentials');
    }
}

function register(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Dummy registration
    currentUser = {
        username: username,
        userId: '12345',
        gender: 'Male',
        deposit: 100,
        balance: 50
    };
    showProfile();
}

function showProfile() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('profile-form').style.display = 'block';
    document.getElementById('lottery-form').style.display = 'none';

    document.getElementById('profile-username').innerText = currentUser.username;
    document.getElementById('profile-userid').innerText = currentUser.userId;
    document.getElementById('profile-gender').innerText = currentUser.gender;
    document.getElementById('profile-deposit').innerText = currentUser.deposit;
    document.getElementById('profile-balance').innerText = currentUser.balance;
}

function logout() {
    currentUser = null;
    document.getElementById('profile-form').style.display = 'none';
    document.getElementById('lottery-form').style.display = 'block';
    //showLoginForm();
}

document.getElementById('lotteryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userNumbers = document.getElementById('userNumbers').value.split(',').map(Number);
    if (userNumbers.length !== 6 || userNumbers.some(num => num < 1 || num > 49 || isNaN(num))) {
        alert('Please enter exactly 6 valid numbers between 1 and 49.');
        return;
    }

    const lotteryNumbers = [];
    while (lotteryNumbers.length < 6) {
        const num = Math.floor(Math.random() * 49) + 1;
        if (!lotteryNumbers.includes(num)) {
            lotteryNumbers.push(num);
        }
    }

    const matchedNumbers = userNumbers.filter(num => lotteryNumbers.includes(num));
    document.getElementById('result').innerText = `Lottery Numbers: 
    ${lotteryNumbers.join(', ')}\nYour Numbers: ${userNumbers.join(', ')}\nMatched Numbers: 
    ${matchedNumbers.join(', ')}`;
  
});

*/

let currentUser = null;

function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            showProfile();
        } else {
            alert(data.message);
        }
    });
}

function register(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const gender = 'Male'; // You can add a gender input field if needed

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, gender })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            showProfile();
        } else {
            alert(data.message);
        }
    });
}

function showProfile() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('profile-form').style.display = 'block';
    document.getElementById('lottery-form').style.display = 'block';

    document.getElementById('profile-username').innerText = currentUser.username;
    document.getElementById('profile-userid').innerText = currentUser.userId;
    document.getElementById('profile-gender').innerText = currentUser.gender;
    document.getElementById('profile-deposit').innerText = currentUser.deposit;
    document.getElementById('profile-balance').innerText = currentUser.balance;
}

function logout() {
    currentUser = null;
    document.getElementById('profile-form').style.display = 'none';
    document.getElementById('lottery-form').style.display = 'none';
    showLoginForm();
}

document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('registerForm').addEventListener('submit', register);

document.getElementById('lotteryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userNumbers = document.getElementById('userNumbers').value.split(',').map(Number);
    if (userNumbers.length !== 6 || userNumbers.some(num => num < 1 || num > 49 || isNaN(num))) {
        alert('Please enter exactly 6 valid numbers between 1 and 49.');
        return;
    }

    const lotteryNumbers = [];
    while (lotteryNumbers.length < 6) {
        const num = Math.floor(Math.random() * 49) + 1;
        if (!lotteryNumbers.includes(num)) {
            lotteryNumbers.push(num);
        }
    }

    const matchedNumbers = userNumbers.filter(num => lotteryNumbers.includes(num));
    document.getElementById('result').innerText = `Lottery Numbers: 
    ${lotteryNumbers.join(', ')}\nYour Numbers: ${userNumbers.join(', ')}\nMatched Numbers: 
    ${matchedNumbers.join(', ')}`;
});
