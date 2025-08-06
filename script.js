document.addEventListener('DOMContentLoaded', () => {

    const menuBar = document.querySelector('.fa-bars');
    const navLinkMenu = document.querySelector('nav');  

    menuBar.addEventListener('click', () => {
        navLinkMenu.classList.toggle('open-menu');
        menuBar.classList.toggle('fa-xmark');

    });
    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const menuToggle = document.getElementById('menu-toggle');
    const navUl = document.getElementById('nav-links');

    function showSection(targetId, suppressHashUpdate = false) {
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            // Scroll to the top of the new section
            // targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Simpler scroll to top of page for general navigation
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            }
        });

        if (!suppressHashUpdate) {
            if (window.location.hash !== `#${targetId}`) {
                try {
                    history.pushState(null, '', `#${targetId}`);
                } catch (e) {
                    window.location.hash = targetId;
                }
            }
        }
    }

    let initialTarget = 'home';
    if (window.location.hash) {
        const hashTarget = window.location.hash.substring(1);
        if (document.getElementById(hashTarget) && document.querySelector(`.nav-link[data-target="${hashTarget}"]`)) {
            initialTarget = hashTarget;
        } else {
            history.replaceState(null, '', '#home');
        }
    }
    showSection(initialTarget, true);

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.dataset.target;
            showSection(targetId);

            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '&#9776;';
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (event.target.matches('.nav-link-inline')) {
            event.preventDefault();
            const targetId = event.target.dataset.target;
            if (targetId) {
                showSection(targetId);
                window.scrollTo({ top: 0, behavior: 'smooth' });

                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '&#9776;';
                }
            }
        }
    });

    window.addEventListener('popstate', (event) => {
        let targetIdFromHash = 'home';
        if (window.location.hash) {
            const hashTarget = window.location.hash.substring(1);
            if (document.getElementById(hashTarget) && document.querySelector(`.nav-link[data-target="${hashTarget}"]`)) {
                targetIdFromHash = hashTarget;
            } else {
                history.replaceState(null, '', '#home');
                targetIdFromHash = 'home';
            }
        }
        showSection(targetIdFromHash, true);
    });

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            const isExpanded = navUl.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded.toString());
            if (isExpanded) {
                menuToggle.innerHTML = '&times;';
            } else {
                menuToggle.innerHTML = '&#9776;';
            }
        });
    }

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            formStatus.textContent = 'Sending...';
            formStatus.className = 'form-status-message';
            formStatus.style.display = 'block';

            setTimeout(() => {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;

                if (name && email && message) {
                    formStatus.textContent = 'Message sent successfully! (Simulation)';
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Please fill out all required fields. (Simulation)';
                    formStatus.classList.add('error');
                }

                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);

            }, 1500);
        });
    }
});

// Floating search bar functionality for site-wide navigation
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('site-search-form');
    const input = document.getElementById('site-search-input');

    if (form && input) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = input.value.trim().toLowerCase();
            if (!query) return;

            // Simple navigation: scroll to first section whose heading or content matches the query
            const sections = document.querySelectorAll('section.content-section');
            let found = false;
            sections.forEach(section => {
                if (found) return;
                const text = section.innerText.toLowerCase();
                if (text.includes(query)) {
                    // Hide all, show this
                    document.querySelectorAll('section.content-section').forEach(s => s.classList.remove('active'));
                    section.classList.add('active');
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    found = true;
                }
            });
            if (!found) {
                alert('No results found for: ' + query);
            }
        });
    }
});
// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    navLinks.style.display = expanded ? 'none' : 'flex';
});

// Mobile dropdown toggle
document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
        }
    });
});

// Toggle Dark Mode
document.getElementById('toggleDarkMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Live Search Filter
document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll('.research-card');

  cards.forEach(card => {
    const title = card.querySelector('h2').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();

    if (title.includes(query) || description.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
