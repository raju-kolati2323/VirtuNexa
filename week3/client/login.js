const SERVER_LINK = 'https://plant-care-pbf7.onrender.com';
const LOGIN_API = `${SERVER_LINK}/api/login`;

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('errorMessage');

  try {
    const response = await fetch(LOGIN_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem('authToken', result.token);
      alert('Login successful!');
      window.location.href = 'schedule.html';
    } else {
      throw new Error(result.message || 'Login failed');
    }
  } catch (err) {
    errorMessage.textContent = err.message;
    errorMessage.classList.remove('d-none');
  }
});
