document.addEventListener('DOMContentLoaded', () => {
    // Portfolio Data
    const portfolioData = {
        web: {
            title: "Consumer Web Apps",
            projects: [
                {
                    name: "CineSeek",
                    desc: "A dynamic movie discovery web application built with React.js and API integration for seamless content browsing."
                },
                {
                    name: "Travello",
                    desc: "A comprehensive tour and travel booking platform featuring custom UI design and full-stack scheduling capabilities."
                },
                {
                    name: "PlacementIQ",
                    desc: "A highly structured, user-centric professional student placement portal connecting institutions with corporate recruiters."
                }
            ]
        },
        enterprise: {
            title: "Enterprise Solutions",
            projects: [
                {
                    name: "Anganwadi Smart Monitor",
                    desc: "A digitized growth-monitoring and attendance-tracking system designed for ICDS to streamline data collection for child welfare."
                },
                {
                    name: "University Event Management",
                    desc: "A robust administrative and user dashboard system designed to manage large-scale collegiate events and scheduling."
                }
            ]
        },
        ml: {
            title: "Machine Learning Models",
            projects: [
                {
                    name: "Corporate HR Analytics",
                    desc: "An employee turnover prediction engine built with Python and scikit-learn, empowering HR departments to proactively manage workforce retention."
                }
            ]
        }
    };

    // DOM Elements
    const header = document.getElementById('header');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    // Sticky Header Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Modal Interaction Logic
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            const data = portfolioData[category];
            
            if (data) {
                renderModal(data);
                openModal();
            }
        });
    });

    function renderModal(data) {
        let projectsHtml = data.projects.map(project => `
            <div class="project-item">
                <span class="project-name">${project.name}</span>
                <p class="project-desc">${project.desc}</p>
            </div>
        `).join('');

        modalBody.innerHTML = `
            <h3 class="modal-title">${data.title}</h3>
            <div class="project-list">
                ${projectsHtml}
            </div>
        `;
    }

    function openModal() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    closeModal.addEventListener('click', closeModal);

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.portfolio-card, .tech-category, .section-title, .developer-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        revealObserver.observe(el);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
