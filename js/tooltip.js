function initializeTooltips() {
    const passionItems = document.querySelectorAll('.passion-item');
    const tooltip = document.getElementById('tooltip');
    
    // Store tooltip content for quick access
    const tooltipContents = {};
    
    document.querySelectorAll('.tooltip-content > div').forEach(content => {
        tooltipContents[content.id] = content.innerHTML;
    });
    
    passionItems.forEach(item => {
        item.addEventListener('mouseenter', showTooltip);
        item.addEventListener('mouseleave', hideTooltip);
    });
    
    function showTooltip(event) {        
        const tooltipId = this.getAttribute('data-tooltip-id');
        
        const content = tooltipContents[tooltipId];
        
        if (!content) {
            console.warn('Tooltip content not found for:', tooltipId);
            return;
        }
        
        // Set tooltip content
        tooltip.innerHTML = content;
        console.log('Content set to tooltip');
        
        // Make tooltip visible FIRST
        tooltip.classList.add('tooltip--active');
        
        // Force a reflow to ensure the element is rendered
        void tooltip.offsetWidth;
        
        // Then position it
        positionTooltip(this, tooltip);
        
        // Add ARIA attributes
        this.setAttribute('aria-describedby', 'tooltip');
        
    }
    
    function hideTooltip() {
        tooltip.classList.remove('tooltip--active');
        this.removeAttribute('aria-describedby');
    }
    
    function positionTooltip(element, tooltip) {
        console.log('Positioning tooltip...');
        const elementRect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        // Reset tooltip classes but keep active
        tooltip.className = 'tooltip tooltip--active';
        
        // Default position (right side)
        let position = {
            top: elementRect.top + window.scrollY + (elementRect.height / 2) - (tooltipRect.height / 2),
            left: elementRect.right + window.scrollX + 10
        };
        
        let placement = 'right';
        
        // Check if tooltip would go off screen on the right
        if (position.left + tooltipRect.width > viewport.width - 20) {
            // Try left side
            position.left = elementRect.left + window.scrollX - tooltipRect.width - 10;
            placement = 'left';
            
            // If still off screen, position below
            if (position.left < 20) {
                position = {
                    top: elementRect.bottom + window.scrollY + 10,
                    left: Math.max(20, elementRect.left + window.scrollX - (tooltipRect.width / 2) + (elementRect.width / 2))
                };
                placement = 'bottom';
            }
        }
        
        // Check if tooltip would go off screen at the top
        if (position.top < 20) {
            position.top = 20;
        }
        
        // Check if tooltip would go off screen at the bottom
        if (position.top + tooltipRect.height > viewport.height - 20) {
            position.top = viewport.height - tooltipRect.height - 20;
        }        
        
        // Apply position
        tooltip.style.top = `${position.top}px`;
        tooltip.style.left = `${position.left}px`;
        
        // Add placement class for arrow positioning
        tooltip.classList.add(`tooltip--${placement}`);
    }
}

// Make sure to call this
document.addEventListener('DOMContentLoaded', function() {
    initializeTooltips();
});