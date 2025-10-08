// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initializeNavigation();
    initializeTooltips();
    initializeFormHandler();
    initializeCounterAnimation();
});

// Counter animation for stats
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-card__number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

function showProjectDetails(projectId) {
    // You can implement a modal or expandable section
    alert(`No Source Code & Live Demo Available for this ${projectId} project.`);
}