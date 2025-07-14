const loginButton = document.getElementById('loginbutton');
const registerButton = document.getElementById('registerbutton');
const statusMessage = document.getElementById('statusmsg');


function showMessage(msg, isSuccess = true) {
    statusMessage.textContent = msg;
    statusMessage.style.color = isSuccess ? 'green' : 'red';
}


loginButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showMessage('Please enter both username and password', false);
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            showMessage(`Login successful! Welcome, ${data.username}`);
            localStorage.setItem('token', data.token);
        } else {
            showMessage(`Login failed: ${data.message}`, false);
        }
    } catch (err) {
        console.error('Login error:', err);
        showMessage('Something went wrong while logging in', false);
    }
});


registerButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showMessage('Please enter both username and password', false);
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            showMessage('Registration successful! You can now log in.');
        } else {
            showMessage(`Registration failed: ${data.message}`, false);
        }
    } catch (err) {
        console.error('Register error:', err);
        showMessage('Something went wrong while registering', false);
    }
});
