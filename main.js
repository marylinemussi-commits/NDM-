// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Fermer le menu en cliquant sur un lien
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Animation des statistiques
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateValue(entry.target, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    };

    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end;
            }
        };
        window.requestAnimationFrame(step);
    };

    animateStats();

    // Charger les actualités sur la page d'accueil
    loadNewsPreview();
});

// Charger les actualités en aperçu sur la page d'accueil
function loadNewsPreview() {
    const newsPreview = document.getElementById('newsPreview');
    if (!newsPreview) return;

    const news = getNewsData();
    const previewNews = news.slice(0, 3); // Afficher seulement les 3 premières

    newsPreview.innerHTML = previewNews.map(item => `
        <div class="news-card">
            <div class="news-image">
                <i class="fas fa-newspaper"></i>
            </div>
            <div class="news-content">
                <div class="news-date">${formatDate(item.date)}</div>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-excerpt">${item.excerpt}</p>
                <a href="actualites.html" class="news-link">Lire la suite →</a>
            </div>
        </div>
    `).join('');
}

// Données des actualités (à remplacer par une vraie API plus tard)
function getNewsData() {
    return [
        {
            id: 1,
            title: "Nouvelle session d'inscription ouverte",
            excerpt: "Les inscriptions pour la rentrée 2024 sont maintenant ouvertes. Découvrez nos nouvelles formations.",
            date: "2024-01-15",
            category: "Inscription"
        },
        {
            id: 2,
            title: "Journée portes ouvertes",
            excerpt: "Rejoignez-nous le 20 février pour découvrir nos installations et rencontrer nos équipes pédagogiques.",
            date: "2024-01-10",
            category: "Événement"
        },
        {
            id: 3,
            title: "Partenariat avec les entreprises locales",
            excerpt: "Nous sommes fiers d'annoncer de nouveaux partenariats pour l'insertion professionnelle de nos étudiants.",
            date: "2024-01-05",
            category: "Partenariat"
        },
        {
            id: 4,
            title: "Nouveaux équipements technologiques",
            excerpt: "L'établissement s'équipe de nouvelles technologies pour améliorer l'expérience d'apprentissage.",
            date: "2023-12-20",
            category: "Innovation"
        }
    ];
}

// Formater la date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

