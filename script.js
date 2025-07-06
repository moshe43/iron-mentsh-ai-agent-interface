// Webhook URL - Replace with your actual Pipedream webhook URL
const WEBHOOK_URL = 'https://eo1t8nbql9lyw2b.m.pipedream.net';

// Get form elements
const form = document.getElementById('dataForm');
const responseDiv = document.getElementById('response');

// Add form submit event listener
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    responseDiv.innerHTML = 'Sending data...';
    responseDiv.className = 'response-area loading';
    
    // Disable form
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    try {
        // Send data to webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.text();
            responseDiv.innerHTML = `✅ Success!\n\nData sent successfully\nResponse: ${result}`;
            responseDiv.className = 'response-area success';
            
            // Reset form
            form.reset();
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerHTML = `❌ Error!\n\nFailed to send data:\n${error.message}`;
        responseDiv.className = 'response-area error';
    } finally {
        // Re-enable form
        submitButton.disabled = false;
    }
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add input validation feedback
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidation);
    });
});

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing validation classes
    input.classList.remove('valid', 'invalid');
    
    // Basic validation
    if (input.required && !value) {
        input.classList.add('invalid');
        return false;
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.classList.add('invalid');
            return false;
        }
    }
    
    input.classList.add('valid');
    return true;
}

function clearValidation(e) {
    const input = e.target;
    input.classList.remove('valid', 'invalid');
}