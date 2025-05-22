document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlider && testimonialCards.length > 0) {
        let currentIndex = 0;
        
        // Function to update slider position
        function updateSlider() {
            testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Event listeners for prev/next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
                updateSlider();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                updateSlider();
            });
        }
        
        // Auto slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            updateSlider();
        }, 5000);
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if it's just '#'
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Form submission handling
    const demoForm = document.getElementById('demo-form');
    
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const hotel = document.getElementById('hotel').value;
            
            if (!name || !email || !hotel) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = demoForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                demoForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your demo request has been received. Our team will contact you shortly.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // Booking widget date validation
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        // Set min date to today
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formatDate = date => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        checkInInput.min = formatDate(today);
        checkOutInput.min = formatDate(tomorrow);
        
        // Default values
        checkInInput.value = formatDate(today);
        checkOutInput.value = formatDate(tomorrow);
        
        // Update checkout min date when checkin changes
        checkInInput.addEventListener('change', function() {
            const newMinDate = new Date(this.value);
            newMinDate.setDate(newMinDate.getDate() + 1);
            
            checkOutInput.min = formatDate(newMinDate);
            
            // If checkout is now earlier than checkin + 1, update it
            if (new Date(checkOutInput.value) <= new Date(this.value)) {
                checkOutInput.value = formatDate(newMinDate);
            }
        });
    }

    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            // Hide on scroll down, show on scroll up
            if (scrollTop > lastScrollTop) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('sticky');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add CSS for active nav item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100; // Adjust for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`nav ul li a[href*="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`nav ul li a[href*="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    });

    // Booking widget toggle
    const bookingWidget = document.querySelector('.booking-widget');
    
    if (bookingWidget) {
        const widgetHeader = bookingWidget.querySelector('.widget-header');
        
        widgetHeader.addEventListener('click', function() {
            bookingWidget.classList.toggle('collapsed');
        });
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'widget-close';
        closeBtn.innerHTML = '×';
        widgetHeader.appendChild(closeBtn);
        
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            bookingWidget.classList.add('hidden');
        });
    }
});
