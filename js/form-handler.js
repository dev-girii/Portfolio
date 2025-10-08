// Form handling functionality
function initializeFormHandler() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);
        
        // Basic validation
        if (!validateForm(formProps)) {
            return;
        }
        
        // Show loading state
        const submitBtn = event.target.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', formProps);
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            event.target.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    function validateForm(data) {
        const { name, email, message } = data;
        
        if (!name.trim()) {
            showNotification('Please enter your name', 'error');
            return false;
        }
        
        if (!email.trim()) {
            showNotification('Please enter your email', 'error');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        if (!message.trim()) {
            showNotification('Please enter your message', 'error');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles for notification
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-left: 4px solid var(--primary);
                    border-radius: 8px;
                    padding: 1rem 1.5rem;
                    box-shadow: var(--shadow-elevated);
                    z-index: 10000;
                    transform: translateX(120%);
                    transition: transform 0.3s ease;
                    max-width: 350px;
                }
                .notification--success {
                    border-left-color: var(--tertiary);
                }
                .notification--error {
                    border-left-color: #ea4335;
                }
                .notification.active {
                    transform: translateX(0);
                }
                .notification__content {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    color: var(--on-surface);
                }
                .notification__content i {
                    font-size: 1.2rem;
                }
                .notification--success .notification__content i {
                    color: var(--tertiary);
                }
                .notification--error .notification__content i {
                    color: #ea4335;
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('active'), 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}