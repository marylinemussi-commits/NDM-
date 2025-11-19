// Charger les actualités au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadAllNews();
});

// Charger toutes les actualités
function loadAllNews() {
    const newsList = document.getElementById('newsList');
    if (!newsList) return;

    const news = getNewsData();

    if (news.length === 0) {
        newsList.innerHTML = '<p style="text-align: center; padding: 2rem;">Aucune actualité pour le moment.</p>';
        return;
    }

    newsList.innerHTML = news.map(item => `
        <div class="news-card">
            <div class="news-image">
                <i class="fas fa-newspaper"></i>
            </div>
            <div class="news-content">
                <div class="news-date">
                    <i class="far fa-calendar"></i> ${formatDate(item.date)}
                    <span style="margin-left: 1rem; background: var(--primary-color); color: white; padding: 3px 10px; border-radius: 15px; font-size: 0.8rem;">
                        ${item.category}
                    </span>
                </div>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-excerpt">${item.excerpt}</p>
                <a href="#" class="news-link" onclick="showNewsDetail(${item.id}); return false;">Lire la suite →</a>
            </div>
        </div>
    `).join('');
}

// Afficher le détail d'une actualité
function showNewsDetail(id) {
    const news = getNewsData();
    const item = news.find(n => n.id === id);
    
    if (!item) return;

    // Créer une modale pour afficher le détail
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;

    modal.innerHTML = `
        <div style="background: white; max-width: 600px; width: 100%; border-radius: 10px; padding: 2rem; position: relative; max-height: 90vh; overflow-y: auto;">
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" 
                    style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-light);">
                &times;
            </button>
            <div style="margin-bottom: 1rem; color: var(--text-light);">
                <i class="far fa-calendar"></i> ${formatDate(item.date)}
                <span style="margin-left: 1rem; background: var(--primary-color); color: white; padding: 3px 10px; border-radius: 15px; font-size: 0.8rem;">
                    ${item.category}
                </span>
            </div>
            <h2 style="margin-bottom: 1rem; color: var(--text-dark);">${item.title}</h2>
            <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 1rem;">${item.excerpt}</p>
            <p style="color: var(--text-light); line-height: 1.8;">
                ${getFullNewsContent(item.id)}
            </p>
        </div>
    `;

    document.body.appendChild(modal);

    // Fermer en cliquant en dehors
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Obtenir le contenu complet d'une actualité
function getFullNewsContent(id) {
    const contents = {
        1: "Les inscriptions pour la rentrée 2024 sont maintenant ouvertes. Nous proposons une large gamme de formations adaptées aux besoins du marché. Nos conseillers sont à votre disposition pour vous accompagner dans votre projet d'orientation. N'hésitez pas à nous contacter pour plus d'informations ou pour prendre rendez-vous.",
        2: "Nous vous invitons à notre journée portes ouvertes le 20 février 2024 de 9h à 17h. Cette journée sera l'occasion de découvrir nos installations modernes, rencontrer nos équipes pédagogiques, échanger avec nos étudiants et assister à des présentations de nos formations. Inscription recommandée.",
        3: "Nous sommes ravis d'annoncer de nouveaux partenariats stratégiques avec des entreprises locales et nationales. Ces partenariats permettront à nos étudiants de bénéficier de stages de qualité, d'opportunités d'alternance et d'une meilleure insertion professionnelle.",
        4: "L'établissement a investi dans de nouveaux équipements technologiques de pointe pour améliorer l'expérience d'apprentissage. Salles multimédias, laboratoires équipés, espaces collaboratifs : tout est mis en œuvre pour votre réussite."
    };
    return contents[id] || "Contenu complet de l'actualité...";
}

// Utiliser les fonctions du fichier main.js
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

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

