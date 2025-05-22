// Button functionality script
document.addEventListener('DOMContentLoaded', function() {
    // Add minimize buttons to all sections that need them
    addMinimizeButtons();
    
    // Initialize button functionality
    initializeButtons();
    
    // Initialize the widget toggle button
    initializeWidgetToggle();
});

function addMinimizeButtons() {
    // Target all containers that should have minimize buttons
    const containers = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .benefits .container');
    
    containers.forEach(container => {
        // Check if container already has a minimize button
        if (!container.querySelector('.minimize-btn')) {
            // Create new button
            const button = document.createElement('button');
            button.className = 'minimize-btn';
            button.innerHTML = '×';
            button.title = 'Minimize';
            
            // Insert at the beginning of the container
            container.insertBefore(button, container.firstChild);
        }
    });
}

function initializeButtons() {
    // Select all minimize buttons
    const buttons = document.querySelectorAll('.minimize-btn');
    
    buttons.forEach(button => {
        // Skip the widget toggle button as it has special handling
        if (button.id === 'widget-toggle-btn') return;
        
        button.addEventListener('click', function() {
            // Find parent container
            const container = this.parentElement;
            
            // Toggle minimized class
            if (container.classList.contains('minimized')) {
                container.classList.remove('minimized');
                this.innerHTML = '\u00d7';
                this.title = 'Minimize';
            } else {
                container.classList.add('minimized');
                this.innerHTML = '\u25a1';
                this.title = 'Restore';
            }
        });
    });
}

function initializeWidgetToggle() {
    const toggleBtn = document.getElementById('widget-toggle-btn');
    if (!toggleBtn) return;
    
    const widgetForm = document.querySelector('.widget-form');
    const widgetFooter = document.querySelector('.widget-footer');
    
    toggleBtn.addEventListener('click', function() {
        // Toggle visibility of form and footer
        if (widgetForm) {
            widgetForm.style.display = widgetForm.style.display === 'none' ? 'block' : 'none';
        }
        
        if (widgetFooter) {
            widgetFooter.style.display = widgetFooter.style.display === 'none' ? 'block' : 'none';
        }
        
        // Change button text
        if (widgetForm && widgetForm.style.display === 'none') {
            this.innerHTML = '\u25a1';
            this.title = 'Show Widget';
        } else {
            this.innerHTML = '\u00d7';
            this.title = 'Hide Widget';
        }
    });
}
