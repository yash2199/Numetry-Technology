document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    const fullName = document.getElementById('fullName').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const fullNameRegex = /^[a-zA-Z\s]{5,}$/;
    const mobileRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Full Name Validation
    if (!fullNameRegex.test(fullName)) {
        isValid = false;
        document.getElementById('fullNameError').textContent = 'Full Name must be at least 5 characters long and contain only letters and spaces.';
    } else {
        document.getElementById('fullNameError').textContent = '';
    }

    // Mobile No Validation
    if (!mobileRegex.test(mobile)) {
        isValid = false;
        document.getElementById('mobileError').textContent = 'Mobile number must be 10 digits long.';
    } else {
        document.getElementById('mobileError').textContent = '';
    }

    // Email Validation
    if (!emailRegex.test(email)) {
        isValid = false;
        document.getElementById('emailError').textContent = 'Invalid email address.';
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Username Validation
    if (!usernameRegex.test(username)) {
        isValid = false;
        document.getElementById('usernameError').textContent = 'Username must be at least 5 characters long and contain only letters and numbers.';
    } else {
        document.getElementById('usernameError').textContent = '';
    }

    // Password Validation
    if (!passwordRegex.test(password)) {
        isValid = false;
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long, contain at least one letter and one number.';
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    if (isValid) {
        alert('Registration Successful');
        // Here you can write code to submit the form data to the server
    }
});
