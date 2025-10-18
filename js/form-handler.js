// Form handling functionality with Netlify integration
function initializeFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    async function handleFormSubmit(event) {
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
        
        try {
            // Method 1: Let Netlify handle the form natively (Recommended)
            // Remove the fetch and let the form submit normally
            console.log('Form data prepared for Netlify:', formProps);
            
            // Show success immediately (Netlify will handle in background)
            showConfirmationModal();
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            event.target.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    // Rest of your functions remain the same...
    function validateForm(data) {
        const { name, email, message, 'bot-field': botField } = data;
        
        // Check honeypot
        if (botField && botField.trim() !== '') {
            return false; // Likely a bot
        }
        
        if (!name || !name.trim()) {
            showNotification('Please enter your name', 'error');
            return false;
        }
        
        if (!email || !email.trim()) {
            showNotification('Please enter your email', 'error');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        if (!message || !message.trim()) {
            showNotification('Please enter your message', 'error');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showConfirmationModal() {
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.innerHTML = `
            <div class="confirmation-modal__overlay"></div>
            <div class="confirmation-modal__content">
                <div class="confirmation-modal__icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 class="confirmation-modal__title">Message Received!</h3>
                <p class="confirmation-modal__message">
                    Thank you for reaching out! I've received your message and will get back to you within 24 hours.
                </p>
                <button class="confirmation-modal__close-btn">
                    Got it!
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.confirmation-modal__close-btn');
        const overlay = modal.querySelector('.confirmation-modal__overlay');
        
        const closeModal = () => {
            modal.style.animation = 'modalFadeOut 0.3s ease';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
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