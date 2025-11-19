// Dashboard Professeur
document.addEventListener('DOMContentLoaded', function() {
    if (!protectPage(['professeur'])) return;
    
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = `${user.prenom} ${user.nom}`;
        document.getElementById('profName').textContent = `${user.prenom} ${user.nom}`;
    }
    
    // Gestion du menu
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.dashboard-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            menuItems.forEach(mi => mi.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
                // Charger les données si nécessaire
                if (targetSection === 'devoirs') {
                    loadProfDevoirs();
                }
            }
        });
    });

    // Charger les devoirs au chargement
    loadProfDevoirs();
});

// Charger les devoirs du professeur
function loadProfDevoirs() {
    const user = getCurrentUser();
    if (!user) return;

    const devoirs = DevoirsManager.getByProfesseur(user.id);
    const container = document.getElementById('profDevoirsList');
    if (!container) return;

    if (devoirs.length === 0) {
        container.innerHTML = `
            <div class="content-card" style="text-align: center; padding: 40px;">
                <i class="fas fa-clipboard-list" style="font-size: 3rem; color: var(--text-light); margin-bottom: 20px;"></i>
                <p style="color: var(--text-light);">Aucun devoir créé pour le moment.</p>
                <button class="btn btn-primary" onclick="showCreateDevoirModal()" style="margin-top: 20px;">
                    <i class="fas fa-plus"></i> Créer votre premier devoir
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = devoirs.map(devoir => {
        const soumissions = SoumissionsManager.getByDevoir(devoir.id);
        const dateLimite = new Date(devoir.dateLimite);
        const isExpired = dateLimite < new Date();
        
        return `
            <div class="devoir-card ${isExpired ? 'done' : ''}" style="margin-bottom: 20px;">
                <div class="devoir-header">
                    <div>
                        <span class="devoir-matiere">${devoir.matiere}</span>
                        <div class="devoir-title">${devoir.titre}</div>
                        <p style="color: var(--text-light); margin: 10px 0;">${devoir.description}</p>
                    </div>
                    <div style="text-align: right;">
                        ${isExpired ? '<span style="color: var(--text-light);">Terminé</span>' : '<span style="color: var(--success-color);">Actif</span>'}
                    </div>
                </div>
                <div class="devoir-info">
                    <span><i class="fas fa-door-open"></i> ${devoir.classe}</span>
                    <span><i class="fas fa-calendar"></i> À rendre le ${formatDate(devoir.dateLimite)}</span>
                    <span><i class="fas fa-file-alt"></i> ${soumissions.length} soumission(s)</span>
                </div>
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button class="btn btn-secondary" onclick="viewSoumissions('${devoir.id}')">
                        <i class="fas fa-eye"></i> Voir les soumissions
                    </button>
                    <button class="btn btn-secondary" onclick="editDevoir('${devoir.id}')">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn" style="background: var(--error-color); color: white;" onclick="deleteDevoir('${devoir.id}')">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Afficher le modal de création de devoir
function showCreateDevoirModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Créer un nouveau devoir</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="createDevoirForm" class="modal-body">
                <div class="form-group">
                    <label for="devoirTitre">Titre du devoir *</label>
                    <input type="text" id="devoirTitre" required placeholder="Ex: Exercices de trigonométrie">
                </div>
                <div class="form-group">
                    <label for="devoirMatiere">Matière *</label>
                    <input type="text" id="devoirMatiere" required placeholder="Ex: Mathématiques">
                </div>
                <div class="form-group">
                    <label for="devoirClasse">Classe *</label>
                    <select id="devoirClasse" required>
                        <option value="">Sélectionner une classe</option>
                        <option value="1ère A">1ère A</option>
                        <option value="1ère B">1ère B</option>
                        <option value="Terminale A">Terminale A</option>
                        <option value="Terminale B">Terminale B</option>
                        <option value="2nde A">2nde A</option>
                        <option value="2nde B">2nde B</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="devoirDescription">Description *</label>
                    <textarea id="devoirDescription" rows="4" required placeholder="Détails du devoir..."></textarea>
                </div>
                <div class="form-group">
                    <label for="devoirDateLimite">Date limite *</label>
                    <input type="date" id="devoirDateLimite" required>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Annuler</button>
                    <button type="submit" class="btn btn-primary">Créer le devoir</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Définir la date minimale à aujourd'hui
    const dateInput = document.getElementById('devoirDateLimite');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Gérer la soumission du formulaire
    document.getElementById('createDevoirForm').addEventListener('submit', function(e) {
        e.preventDefault();
        createDevoir();
    });
}

// Créer un devoir
function createDevoir() {
    const user = getCurrentUser();
    if (!user) return;

    const devoir = {
        titre: document.getElementById('devoirTitre').value,
        matiere: document.getElementById('devoirMatiere').value,
        classe: document.getElementById('devoirClasse').value,
        description: document.getElementById('devoirDescription').value,
        dateLimite: document.getElementById('devoirDateLimite').value,
        professeurId: user.id,
        professeurNom: `${user.prenom} ${user.nom}`
    };

    DevoirsManager.create(devoir);
    
    // Fermer le modal
    document.querySelector('.modal-overlay').remove();
    
    // Recharger la liste
    loadProfDevoirs();
    
    // Message de succès
    showNotification('Devoir créé avec succès ! Les élèves peuvent maintenant le voir.', 'success');
}

// Voir les soumissions d'un devoir
function viewSoumissions(devoirId) {
    const soumissions = SoumissionsManager.getByDevoir(devoirId);
    const devoir = DevoirsManager.getAll().find(d => d.id === devoirId);
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Soumissions - ${devoir.titre}</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${soumissions.length === 0 ? 
                    '<p style="text-align: center; color: var(--text-light); padding: 40px;">Aucune soumission pour le moment.</p>' :
                    soumissions.map(s => `
                        <div class="content-card" style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                                <div>
                                    <strong>${s.eleveNom || 'Élève'}</strong>
                                    <p style="color: var(--text-light); margin: 5px 0;">Soumis le ${formatDate(s.submittedAt)}</p>
                                </div>
                                ${s.note ? `<span style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color);">${s.note}/20</span>` : ''}
                            </div>
                            <div style="background: var(--bg-light); padding: 15px; border-radius: 5px; margin: 10px 0;">
                                <p>${s.contenu}</p>
                            </div>
                            ${!s.note ? `
                                <div style="margin-top: 15px;">
                                    <input type="number" id="note_${s.id}" placeholder="Note /20" min="0" max="20" step="0.5" style="width: 100px; padding: 8px; margin-right: 10px;">
                                    <textarea id="comment_${s.id}" placeholder="Commentaire..." rows="2" style="width: 100%; margin-top: 10px; padding: 8px;"></textarea>
                                    <button class="btn btn-primary" onclick="gradeSoumission('${s.id}')" style="margin-top: 10px;">
                                        <i class="fas fa-check"></i> Noter
                                    </button>
                                </div>
                            ` : `
                                <div style="margin-top: 10px; padding: 10px; background: var(--bg-light); border-radius: 5px;">
                                    <strong>Commentaire :</strong>
                                    <p>${s.commentaire || 'Aucun commentaire'}</p>
                                </div>
                            `}
                        </div>
                    `).join('')
                }
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Noter une soumission
function gradeSoumission(soumissionId) {
    const note = parseFloat(document.getElementById(`note_${soumissionId}`).value);
    const commentaire = document.getElementById(`comment_${soumissionId}`).value;
    
    if (!note || note < 0 || note > 20) {
        showNotification('Veuillez entrer une note valide entre 0 et 20', 'error');
        return;
    }
    
    SoumissionsManager.grade(soumissionId, note, commentaire);
    showNotification('Note enregistrée avec succès !', 'success');
    
    // Recharger la modal
    const soumissions = JSON.parse(localStorage.getItem('ent_soumissions'));
    const soumission = soumissions.find(s => s.id === soumissionId);
    if (soumission) {
        document.querySelector('.modal-overlay').remove();
        viewSoumissions(soumission.devoirId);
    }
}

// Supprimer un devoir
function deleteDevoir(devoirId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce devoir ?')) {
        DevoirsManager.delete(devoirId);
        loadProfDevoirs();
        showNotification('Devoir supprimé avec succès', 'success');
    }
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

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

