// Main JavaScript File - TechFlow Solutions

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form Validation and Submission
    const forms = ['#loginForm', '#registerForm', '#contactForm'];

    forms.forEach(formSelector => {
        const form = document.querySelector(formSelector);
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const formData = new FormData(this);
                const data = Object.fromEntries(formData);

                // Basic validation
                if (formSelector === '#registerForm') {
                    if (data.password !== data.confirmPassword) {
                        showNotification('Passwords do not match!', 'error');
                        return;
                    }
                    if (!data.terms) {
                        showNotification('Please accept the terms of service', 'error');
                        return;
                    }
                }

                // Simulate form submission
                showLoadingState(this);

                setTimeout(() => {
                    hideLoadingState(this);
                    if (formSelector === '#loginForm') {
                        showNotification('Login successful! Redirecting...', 'success');
                        setTimeout(() => window.location.href = 'index.html', 1500);
                    } else if (formSelector === '#registerForm') {
                        showNotification('Account created successfully! Please check your email.', 'success');
                        setTimeout(() => window.location.href = 'login.html', 2000);
                    } else {
                        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                        this.reset();
                    }
                }, 1500);
            });
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .member-card, .service-card, .portfolio-item').forEach(el => {
        observer.observe(el);
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        // Add background when scrolled
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
});

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease-in-out;
        max-width: 350px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
        default:
            notification.style.backgroundColor = '#3b82f6';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span style="margin-right: 8px;">⏳</span>Processing...';
        submitBtn.style.opacity = '0.7';
    }
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        // Restore original text based on form type
        if (form.id === 'loginForm') {
            submitBtn.textContent = 'Sign In';
        } else if (form.id === 'registerForm') {
            submitBtn.textContent = 'Create Account';
        } else if (form.id === 'contactForm') {
            submitBtn.textContent = 'Send Message';
        }
    }
}

// Add scrolled class to navbar
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .navbar {
        transition: all 0.3s ease-in-out;
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

// This block enables HTML component inclusion via the custom attribute "component-html".
// Example: <div component-html="filename.html"></div>
// This div element will fetch and include the content of components/filename.html

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[component-html]").forEach(async el => {
        const file = el.getAttribute("component-html");
        try {
            const res = await fetch(`/components/${file}`);
            if (!res.ok) throw new Error("404 not found");
            el.innerHTML = await res.text();
        } catch (e) {
            el.innerHTML = `<p style="color:red;">Could not load ${file}</p>`;
        }

        // Very confusing code adding the class "active" to the current page's link in the navbar. (Which highlights it with blue btw)
        // View components/navbar.html to see how the navbar is structured
        if (file === "navbar.html") {
            let nav = Array.from(
                el.querySelector(".navbar")
                    .querySelector(".nav-container")
                    .querySelector(".nav-menu")
                    .children
            ).find(element => {
                return element.firstChild.href.split("/").pop() === window.location.pathname.split("/").pop()
            }).firstChild.classList.add("active");
        }

        if (file === "lesson_sidebar.html") {
            const uri = window.location.pathname.split("/");
            const currentLesson = uri.pop();
            const course = uri.pop();
            fetch("/courses.json")
                .then(res => res.json())
                .then(files => {
                    let count = 1;
                    files[course].forEach(lesson => {
                        document.getElementById("videoList").innerHTML +=  
                            `<a href="${lesson}.html" style="text-decoration: none; color: inherit;">
                                <div class="video${currentLesson === lesson + ".html" ? " active": ""}" >Lesson ${count}</div>
                            </a>`
                        count += 1;
                    });
                    
                });
            
        }
    });

});


document.head.appendChild(style);

function memberCardClickEffect(link) {
    window.open(link, "_blank");
}