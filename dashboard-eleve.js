// Dashboard Élève

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier l'authentification
    if (!protectPage(['eleve'])) {
        return;
    }

    const user = getCurrentUser();
    
    // Afficher le nom de l'utilisateur
    if (user) {
        document.getElementById('userName').textContent = `${user.prenom} ${user.nom}`;
        document.getElementById('eleveName').textContent = user.prenom;
    }

    // Gestion du menu
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.dashboard-section');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            // Retirer active de tous les items et sections
            menuItems.forEach(mi => mi.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Ajouter active au bon item et section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Charger les données
    loadNotes();
    loadDevoirs();
    loadEmploiDuTemps();
    loadCahierTexte();
    loadMessagerie();

    // Recharger les devoirs quand on change de section
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            if (targetSection === 'devoirs') {
                loadDevoirs();
            }
        });
    });
});

// Charger les notes
function loadNotes() {
    const notes = [
        { matiere: 'Mathématiques', note: 16, coefficient: 3, date: '2024-01-15', appreciation: 'Très bien' },
        { matiere: 'Français', note: 14, coefficient: 3, date: '2024-01-12', appreciation: 'Bien' },
        { matiere: 'Histoire', note: 15, coefficient: 2, date: '2024-01-10', appreciation: 'Bien' },
        { matiere: 'SVT', note: 13, coefficient: 2, date: '2024-01-08', appreciation: 'Assez bien' },
        { matiere: 'Anglais', note: 17, coefficient: 2, date: '2024-01-05', appreciation: 'Très bien' },
        { matiere: 'Physique', note: 12, coefficient: 2, date: '2024-01-03', appreciation: 'Assez bien' }
    ];

    const tbody = document.getElementById('notesTableBody');
    if (!tbody) return;

    tbody.innerHTML = notes.map(note => `
        <tr>
            <td><strong>${note.matiere}</strong></td>
            <td><span style="font-size: 1.2rem; font-weight: bold; color: ${getNoteColor(note.note)};">${note.note}/20</span></td>
            <td>${note.coefficient}</td>
            <td>${formatDate(note.date)}</td>
            <td>${note.appreciation}</td>
        </tr>
    `).join('');
}

// Charger les devoirs (depuis les devoirs créés par les professeurs)
function loadDevoirs() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Si pas de classe dans la session, utiliser la classe par défaut
    if (!user.classe) {
        user.classe = '1ère A'; // Classe par défaut pour l'élève de démo
    }

    const devoirs = DevoirsManager.getByEleve(user.id, user.classe);
    const container = document.getElementById('devoirsList');
    if (!container) return;

    // Filtres
    const filterButtons = document.querySelectorAll('.devoirs-filters .filter-btn');
    let currentFilter = 'all';

    filterButtons.forEach(btn => {
        // Retirer les anciens listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            displayDevoirs(devoirs, currentFilter);
        });
    });

    displayDevoirs(devoirs, currentFilter);
}

function displayDevoirs(devoirs, filter) {
    const container = document.getElementById('devoirsList');
    let filteredDevoirs = devoirs;

    if (filter === 'pending') {
        filteredDevoirs = devoirs.filter(d => !d.isSubmitted);
    } else if (filter === 'done') {
        filteredDevoirs = devoirs.filter(d => d.isSubmitted);
    }

    if (filteredDevoirs.length === 0) {
        container.innerHTML = `
            <div class="content-card" style="text-align: center; padding: 40px;">
                <i class="fas fa-clipboard-list" style="font-size: 3rem; color: var(--text-light); margin-bottom: 20px;"></i>
                <p style="color: var(--text-light);">Aucun devoir ${filter === 'pending' ? 'à faire' : filter === 'done' ? 'rendu' : ''} pour le moment.</p>
            </div>
        `;
        return;
    }

    // Créer les éléments manuellement pour pouvoir attacher les événements
    container.innerHTML = '';
    
    filteredDevoirs.forEach(devoir => {
        const daysLeft = getDaysUntil(devoir.dateLimite);
        const isUrgent = daysLeft <= 2 && !devoir.isSubmitted;
        const isExpired = daysLeft < 0;
        
        const devoirCard = document.createElement('div');
        devoirCard.className = `devoir-card ${devoir.isSubmitted ? 'done' : ''} ${isUrgent ? 'urgent' : ''}`;
        
        let headerContent = `
            <div class="devoir-header">
                <div>
                    <span class="devoir-matiere">${devoir.matiere}</span>
                    <div class="devoir-title">${devoir.titre}</div>
                    <p style="color: var(--text-light); margin: 10px 0;">${devoir.description}</p>
                    <p style="color: var(--text-light); font-size: 0.9rem; margin: 5px 0;">
                        <i class="fas fa-chalkboard-teacher"></i> ${devoir.professeurNom || 'Professeur'}
                    </p>
                </div>
                ${isUrgent ? '<span style="color: var(--error-color); font-weight: bold;">URGENT</span>' : ''}
                ${isExpired && !devoir.isSubmitted ? '<span style="color: var(--error-color); font-weight: bold;">EN RETARD</span>' : ''}
            </div>
            <div class="devoir-info">
                <span><i class="fas fa-calendar"></i> À rendre le ${formatDate(devoir.dateLimite)}</span>
                ${daysLeft >= 0 && !devoir.isSubmitted ? `<span><i class="fas fa-clock"></i> ${daysLeft} jour${daysLeft > 1 ? 's' : ''} restant${daysLeft > 1 ? 's' : ''}</span>` : ''}
                ${devoir.isSubmitted ? `
                    <span style="color: var(--success-color);"><i class="fas fa-check"></i> Rendu le ${formatDate(devoir.soumission.submittedAt)}</span>
                    ${devoir.soumission.note ? `<span style="color: var(--primary-color); font-weight: bold;"><i class="fas fa-star"></i> Note: ${devoir.soumission.note}/20</span>` : '<span style="color: var(--text-light);"><i class="fas fa-hourglass-half"></i> En attente de correction</span>'}
                ` : ''}
            </div>
        `;
        
        devoirCard.innerHTML = headerContent;
        
        // Ajouter le bouton de soumission si nécessaire
        if (!devoir.isSubmitted) {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.marginTop = '15px';
            
            const submitButton = document.createElement('button');
            submitButton.className = 'btn btn-primary';
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Rendre le devoir';
            submitButton.addEventListener('click', function() {
                showSubmitDevoirModal(devoir.id);
            });
            
            buttonContainer.appendChild(submitButton);
            devoirCard.appendChild(buttonContainer);
        } else if (devoir.soumission.commentaire) {
            const commentDiv = document.createElement('div');
            commentDiv.style.marginTop = '15px';
            commentDiv.style.padding = '15px';
            commentDiv.style.background = 'var(--bg-light)';
            commentDiv.style.borderRadius = '5px';
            commentDiv.innerHTML = `
                <strong>Commentaire du professeur :</strong>
                <p style="margin-top: 5px;">${devoir.soumission.commentaire}</p>
            `;
            devoirCard.appendChild(commentDiv);
        }
        
        container.appendChild(devoirCard);
    });
}

// Afficher le modal de soumission de devoir
function showSubmitDevoirModal(devoirId) {
    const devoir = DevoirsManager.getAll().find(d => d.id === devoirId);
    if (!devoir) {
        showNotification('Devoir introuvable', 'error');
        return;
    }

    const user = getCurrentUser();
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Rendre le devoir : ${devoir.titre}</h2>
                <button class="modal-close" id="closeModalBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="submitDevoirForm" class="modal-body">
                <div class="form-group">
                    <label><strong>Matière :</strong> ${devoir.matiere}</label>
                </div>
                <div class="form-group">
                    <label><strong>Description :</strong></label>
                    <p style="color: var(--text-light); margin-top: 5px;">${devoir.description}</p>
                </div>
                <div class="form-group">
                    <label for="devoirContenu">Votre travail *</label>
                    <textarea id="devoirContenu" rows="10" required placeholder="Rédigez votre devoir ici..."></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cancelModalBtn">Annuler</button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i> Soumettre
                    </button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Fermer le modal
    document.getElementById('closeModalBtn').addEventListener('click', function() {
        modal.remove();
    });
    
    document.getElementById('cancelModalBtn').addEventListener('click', function() {
        modal.remove();
    });

    // Fermer en cliquant en dehors
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Gérer la soumission
    document.getElementById('submitDevoirForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitDevoir(devoirId);
        modal.remove();
    });
}

// Soumettre un devoir
function submitDevoir(devoirId) {
    const user = getCurrentUser();
    if (!user) return;

    const devoir = DevoirsManager.getAll().find(d => d.id === devoirId);
    const contenu = document.getElementById('devoirContenu').value;

    if (!contenu.trim()) {
        showNotification('Veuillez remplir votre travail', 'error');
        return;
    }

    const soumission = {
        devoirId: devoirId,
        eleveId: user.id,
        eleveNom: `${user.prenom} ${user.nom}`,
        contenu: contenu
    };

    SoumissionsManager.submit(soumission);
    
    document.querySelector('.modal-overlay').remove();
    loadDevoirs();
    showNotification('Devoir soumis avec succès !', 'success');
}

// Fonction utilitaire pour les notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
        color: white;
        border-radius: 5px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Charger l'emploi du temps
function loadEmploiDuTemps() {
    const schedule = {
        'Lundi': [
            { time: '08h00', matiere: 'Mathématiques', salle: '201', prof: 'M. Martin' },
            { time: '09h00', matiere: 'Français', salle: '105', prof: 'Mme Dubois' },
            { time: '10h00', matiere: 'Pause', salle: '', prof: '' },
            { time: '10h15', matiere: 'Histoire', salle: '302', prof: 'M. Bernard' },
            { time: '11h15', matiere: 'Anglais', salle: '205', prof: 'Mme Johnson' },
            { time: '14h00', matiere: 'SVT', salle: '401', prof: 'Mme Laurent' },
            { time: '15h00', matiere: 'Physique', salle: '301', prof: 'M. Durand' }
        ],
        'Mardi': [
            { time: '08h00', matiere: 'Français', salle: '105', prof: 'Mme Dubois' },
            { time: '09h00', matiere: 'Mathématiques', salle: '201', prof: 'M. Martin' },
            { time: '10h00', matiere: 'Pause', salle: '', prof: '' },
            { time: '10h15', matiere: 'EPS', salle: 'Gymnase', prof: 'M. Petit' },
            { time: '11h15', matiere: 'EPS', salle: 'Gymnase', prof: 'M. Petit' },
            { time: '14h00', matiere: 'Histoire', salle: '302', prof: 'M. Bernard' },
            { time: '15h00', matiere: 'Anglais', salle: '205', prof: 'Mme Johnson' }
        ],
        'Mercredi': [
            { time: '08h00', matiere: 'Mathématiques', salle: '201', prof: 'M. Martin' },
            { time: '09h00', matiere: 'SVT', salle: '401', prof: 'Mme Laurent' },
            { time: '10h00', matiere: 'Pause', salle: '', prof: '' },
            { time: '10h15', matiere: 'Français', salle: '105', prof: 'Mme Dubois' },
            { time: '11h15', matiere: 'Physique', salle: '301', prof: 'M. Durand' }
        ],
        'Jeudi': [
            { time: '08h00', matiere: 'Anglais', salle: '205', prof: 'Mme Johnson' },
            { time: '09h00', matiere: 'Histoire', salle: '302', prof: 'M. Bernard' },
            { time: '10h00', matiere: 'Pause', salle: '', prof: '' },
            { time: '10h15', matiere: 'Mathématiques', salle: '201', prof: 'M. Martin' },
            { time: '11h15', matiere: 'Français', salle: '105', prof: 'Mme Dubois' },
            { time: '14h00', matiere: 'SVT', salle: '401', prof: 'Mme Laurent' },
            { time: '15h00', matiere: 'Physique', salle: '301', prof: 'M. Durand' }
        ],
        'Vendredi': [
            { time: '08h00', matiere: 'Physique', salle: '301', prof: 'M. Durand' },
            { time: '09h00', matiere: 'Mathématiques', salle: '201', prof: 'M. Martin' },
            { time: '10h00', matiere: 'Pause', salle: '', prof: '' },
            { time: '10h15', matiere: 'Anglais', salle: '205', prof: 'Mme Johnson' },
            { time: '11h15', matiere: 'Histoire', salle: '302', prof: 'M. Bernard' },
            { time: '14h00', matiere: 'Français', salle: '105', prof: 'Mme Dubois' }
        ]
    };

    const container = document.getElementById('scheduleTable');
    if (!container) return;

    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const times = ['08h00', '09h00', '10h00', '10h15', '11h15', '14h00', '15h00'];

    let html = '<div class="schedule-header">Heure</div>';
    days.forEach(day => {
        html += `<div class="schedule-header">${day}</div>`;
    });

    times.forEach(time => {
        html += `<div class="schedule-time">${time}</div>`;
        days.forEach(day => {
            const cours = schedule[day].find(c => c.time === time);
            if (cours && cours.matiere !== 'Pause') {
                html += `
                    <div class="schedule-cell has-class">
                        <strong>${cours.matiere}</strong>
                        <span>${cours.salle} - ${cours.prof}</span>
                    </div>
                `;
            } else if (cours && cours.matiere === 'Pause') {
                html += '<div class="schedule-cell" style="background: var(--bg-light); text-align: center; color: var(--text-light);">Pause</div>';
            } else {
                html += '<div class="schedule-cell"></div>';
            }
        });
    });

    container.innerHTML = html;
}

// Charger le cahier de texte
function loadCahierTexte() {
    const container = document.getElementById('cahierContainer');
    if (!container) return;

    const cahier = [
        { date: '2024-01-15', matiere: 'Mathématiques', contenu: 'Chapitre 5 : Trigonométrie - Cours sur les fonctions sin et cos' },
        { date: '2024-01-15', matiere: 'Français', contenu: 'Étude du texte : "Les Misérables" de Victor Hugo' },
        { date: '2024-01-14', matiere: 'Histoire', contenu: 'La Révolution française : causes et conséquences' },
        { date: '2024-01-14', matiere: 'SVT', contenu: 'TP : Observation de cellules au microscope' }
    ];

    container.innerHTML = cahier.map(entry => `
        <div class="content-card" style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                <span class="devoir-matiere">${entry.matiere}</span>
                <span style="color: var(--text-light);">${formatDate(entry.date)}</span>
            </div>
            <p style="color: var(--text-dark);">${entry.contenu}</p>
        </div>
    `).join('');
}

// Charger la messagerie
function loadMessagerie() {
    const container = document.getElementById('messagesList');
    if (!container) return;

    const messages = [
        { from: 'M. Martin', subject: 'Devoir de Mathématiques', date: '2024-01-15', read: false },
        { from: 'Mme Dubois', subject: 'Rappel : Dissertation à rendre', date: '2024-01-14', read: true },
        { from: 'Administration', subject: 'Bulletin disponible', date: '2024-01-13', read: true }
    ];

    container.innerHTML = messages.map(msg => `
        <div class="content-card" style="margin-bottom: 15px; ${!msg.read ? 'border-left: 4px solid var(--primary-color);' : ''}">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <strong style="color: var(--text-dark);">${msg.from}</strong>
                    <p style="margin: 5px 0; color: var(--text-dark);">${msg.subject}</p>
                    <span style="color: var(--text-light); font-size: 0.9rem;">${formatDate(msg.date)}</span>
                </div>
                ${!msg.read ? '<span style="background: var(--primary-color); color: white; padding: 4px 8px; border-radius: 10px; font-size: 0.8rem;">Nouveau</span>' : ''}
            </div>
        </div>
    `).join('');
}

// Fonctions utilitaires
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getDaysUntil(dateString) {
    const today = new Date();
    const target = new Date(dateString);
    const diff = target - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getNoteColor(note) {
    if (note >= 16) return '#10b981';
    if (note >= 14) return '#3b82f6';
    if (note >= 12) return '#f59e0b';
    return '#ef4444';
}

