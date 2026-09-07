window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    if (splash) {
        setTimeout(() => {
            splash.style.transform = 'translateY(-100%)';
        }, 2200);
    }
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 80);
    }
});

const sections = document.querySelectorAll('section, div[id]');
const navLinks = document.querySelectorAll('.nav-link, .mobile-links a');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== "") {
            link.classList.add('active');
        }
    });
});

const burger = document.getElementById('burger');
const closePanel = document.getElementById('closePanel');
const sidePanel = document.getElementById('sidePanel');

if (burger && sidePanel) {
    burger.addEventListener('click', () => sidePanel.classList.add('active'));
}

if (closePanel && sidePanel) {
    closePanel.addEventListener('click', () => sidePanel.classList.remove('active'));
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            if (sidePanel) sidePanel.classList.remove('active');
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = { threshold: 0.1 };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-text, .hero-desc, .hero-cta, .service-block, .lux-card, .gallery-item, .blog-card, .test-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "1s cubic-bezier(0.4, 0, 0.2, 1)";
    revealObserver.observe(el);
});

const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const speed = 100; 
    const increment = target / speed;

    const updateCount = () => {
        const count = +counter.innerText;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => startCounter(counter));
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-grid-modern, .stats-row');
if (statsContainer) {
    counterObserver.observe(statsContainer);
}
const filterTriggers = document.querySelectorAll('.filter-trigger');
const masonryItems = document.querySelectorAll('.masonry-item');

filterTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        // تغيير الزر النشط
        filterTriggers.forEach(t => t.classList.remove('active'));
        trigger.classList.add('active');

        const filterKey = trigger.getAttribute('data-filter');

        masonryItems.forEach(item => {
            // إخفاء وإظهار مع أنيميشن بسيط
            if (filterKey === 'all' || item.classList.contains(filterKey)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});