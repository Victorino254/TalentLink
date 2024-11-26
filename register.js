document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            alert('Registration successful! Please login.');
            window.location.href = '/index.html';
        } else {
            const data = await response.json();
            alert(data.message || 'Registration failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    }
});