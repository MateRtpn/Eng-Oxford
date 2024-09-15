document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = storedUsers.find(user => user.username === username && user.password === password);

            if (user) {
                sessionStorage.setItem('isLoggedIn', true);
                sessionStorage.setItem('username', username);
                window.location.href = 'index.html';
            } else {
                document.getElementById('error-message').textContent = 'Invalid username or password';
                document.getElementById('error-message').style.display = 'block';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // ตรวจสอบข้อมูลการลงทะเบียน
            if (password === confirmPassword) {
                const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
                const userExists = storedUsers.some(user => user.username === username);

                if (!userExists) {
                    storedUsers.push({ username, password });
                    localStorage.setItem('users', JSON.stringify(storedUsers));
                    sessionStorage.setItem('isLoggedIn', true);
                    sessionStorage.setItem('username', username);
                    window.location.href = 'index.html';
                } else {
                    document.getElementById('error-message').textContent = 'Username already exists';
                    document.getElementById('error-message').style.display = 'block';
                }
            } else {
                document.getElementById('error-message').textContent = 'Passwords do not match';
                document.getElementById('error-message').style.display = 'block';
            }
        });
    }

    checkLoginStatus();
});

function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const username = sessionStorage.getItem('username');
    const loginElement = document.querySelector('.login');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (isLoggedIn && username) {
        loginElement.textContent = username;
        dropdownContent.style.display = 'block';
    } else {
        loginElement.textContent = 'Guest';
        dropdownContent.style.display = 'none';
    }
}

function loginAsGuest() {
    sessionStorage.setItem('isLoggedIn', true);
    sessionStorage.setItem('username', 'Guest');
    window.location.href = 'index.html';
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    window.location.href = 'login.html';
}

function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const username = sessionStorage.getItem('username');
    const loginElement = document.querySelector('.login');
    const dropdownContent = document.querySelector('.dropdown-content');
    const loginLink = document.querySelector('.login-link');
    const logoutLink = document.querySelector('.logout-link');

    if (isLoggedIn && username) {
        loginElement.textContent = username;
        dropdownContent.style.display = 'none';
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';
    } else {
        loginElement.textContent = 'Guest';
        dropdownContent.style.display = 'none';
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
    }
}
