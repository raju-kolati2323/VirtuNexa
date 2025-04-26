const SERVER_LINK = 'https://plant-care-pbf7.onrender.com';
const REG_API = `${SERVER_LINK}/api/registration`;

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  const errorMessage = document.getElementById('regErrorMessage');

  try {
    const response = await fetch(REG_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Registration successful!');
      window.location.href = 'index.html';
    } else {
      throw new Error(result.message || 'Registration failed');
    }
  } catch (err) {
    errorMessage.textContent = err.message;
    errorMessage.classList.remove('d-none');
  }
});
