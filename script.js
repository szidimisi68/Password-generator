document.getElementById('length').addEventListener('input', updateLength);
document.getElementById('generateBtn').addEventListener('click', generatePassword);

function updateLength() {
    const length = document.getElementById('length').value;
    document.getElementById('lengthVal').innerText = length;
}

function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    
    let charSet = '';
    if (includeUppercase) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charSet += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charSet += '0123456789';
    if (includeSymbols) charSet += '!@#$%^&*()_+[]{}|;:,.<>?';

    if (charSet === '') {
        document.getElementById('password').value = 'Please select options';
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }
    
    document.getElementById('password').value = password;
    updateStrengthIndicator(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
}

function updateStrengthIndicator(length, uppercase, lowercase, numbers, symbols) {
    const strengthIndicator = document.getElementById('strength-indicator');
    let strength = 0;
    
    if (length >= 8) strength += 1;
    if (length >= 12) strength += 1;
    if (uppercase) strength += 1;
    if (lowercase) strength += 1;
    if (numbers) strength += 1;
    if (symbols) strength += 1;
    
    strengthIndicator.style.width = `${(strength / 6) * 100}%`;
    strengthIndicator.style.backgroundColor = getStrengthColor(strength);
}

function getStrengthColor(strength) {
    switch (strength) {
        case 1: 
        case 2: return '#ff4c4c';  // Weak
        case 3: 
        case 4: return '#ffaf4c';  // Moderate
        case 5: return '#ffd24c';  // Strong
        case 6: return '#4caf50';  // Very Strong
        default: return '#444';    // Very Weak
    }
}

function copyPassword() {
    const password = document.getElementById('password');
    password.select();
    document.execCommand('copy');
}