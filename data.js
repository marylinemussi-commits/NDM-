// Système de données partagé pour l'ENT (simule une base de données)

// Structure de données pour les devoirs
function initDataStorage() {
    if (!localStorage.getItem('ent_devoirs')) {
        localStorage.setItem('ent_devoirs', JSON.stringify([]));
    }
    if (!localStorage.getItem('ent_soumissions')) {
        localStorage.setItem('ent_soumissions', JSON.stringify([]));
    }
    if (!localStorage.getItem('ent_notes')) {
        localStorage.setItem('ent_notes', JSON.stringify([]));
    }
    if (!localStorage.getItem('ent_cahier_texte')) {
        localStorage.setItem('ent_cahier_texte', JSON.stringify([]));
    }
    if (!localStorage.getItem('ent_messages')) {
        localStorage.setItem('ent_messages', JSON.stringify([]));
    }
}

// Gestion des devoirs
const DevoirsManager = {
    // Créer un devoir (professeur)
    create: function(devoir) {
        initDataStorage();
        const devoirs = JSON.parse(localStorage.getItem('ent_devoirs'));
        const newDevoir = {
            id: Date.now().toString(),
            ...devoir,
            createdAt: new Date().toISOString(),
            statut: 'actif'
        };
        devoirs.push(newDevoir);
        localStorage.setItem('ent_devoirs', JSON.stringify(devoirs));
        return newDevoir;
    },

    // Obtenir tous les devoirs
    getAll: function() {
        initDataStorage();
        return JSON.parse(localStorage.getItem('ent_devoirs'));
    },

    // Obtenir les devoirs pour une classe
    getByClasse: function(classe) {
        const devoirs = this.getAll();
        return devoirs.filter(d => d.classe === classe && d.statut === 'actif');
    },

    // Obtenir les devoirs pour un élève
    getByEleve: function(eleveId, classe) {
        const devoirs = this.getByClasse(classe);
        return devoirs.map(devoir => {
            const soumission = SoumissionsManager.getByDevoirAndEleve(devoir.id, eleveId);
            return {
                ...devoir,
                soumission: soumission || null,
                isSubmitted: !!soumission
            };
        });
    },

    // Obtenir les devoirs créés par un professeur
    getByProfesseur: function(profId) {
        const devoirs = this.getAll();
        return devoirs.filter(d => d.professeurId === profId);
    },

    // Supprimer un devoir
    delete: function(devoirId) {
        const devoirs = this.getAll();
        const updated = devoirs.map(d => 
            d.id === devoirId ? { ...d, statut: 'supprime' } : d
        );
        localStorage.setItem('ent_devoirs', JSON.stringify(updated));
    },

    // Mettre à jour un devoir
    update: function(devoirId, updates) {
        const devoirs = this.getAll();
        const updated = devoirs.map(d => 
            d.id === devoirId ? { ...d, ...updates } : d
        );
        localStorage.setItem('ent_devoirs', JSON.stringify(updated));
    }
};

// Gestion des soumissions de devoirs
const SoumissionsManager = {
    // Soumettre un devoir (élève)
    submit: function(soumission) {
        initDataStorage();
        const soumissions = JSON.parse(localStorage.getItem('ent_soumissions'));
        const existing = soumissions.find(s => 
            s.devoirId === soumission.devoirId && s.eleveId === soumission.eleveId
        );
        
        if (existing) {
            // Mettre à jour la soumission existante
            const updated = soumissions.map(s => 
                s.id === existing.id ? { ...s, ...soumission, updatedAt: new Date().toISOString() } : s
            );
            localStorage.setItem('ent_soumissions', JSON.stringify(updated));
            return { ...existing, ...soumission };
        } else {
            // Nouvelle soumission
            const newSoumission = {
                id: Date.now().toString(),
                ...soumission,
                submittedAt: new Date().toISOString(),
                statut: 'soumis'
            };
            soumissions.push(newSoumission);
            localStorage.setItem('ent_soumissions', JSON.stringify(soumissions));
            return newSoumission;
        }
    },

    // Obtenir les soumissions d'un devoir
    getByDevoir: function(devoirId) {
        initDataStorage();
        const soumissions = JSON.parse(localStorage.getItem('ent_soumissions'));
        return soumissions.filter(s => s.devoirId === devoirId);
    },

    // Obtenir la soumission d'un élève pour un devoir
    getByDevoirAndEleve: function(devoirId, eleveId) {
        initDataStorage();
        const soumissions = JSON.parse(localStorage.getItem('ent_soumissions'));
        return soumissions.find(s => s.devoirId === devoirId && s.eleveId === eleveId);
    },

    // Noter une soumission (professeur)
    grade: function(soumissionId, note, commentaire) {
        const soumissions = JSON.parse(localStorage.getItem('ent_soumissions'));
        const updated = soumissions.map(s => 
            s.id === soumissionId ? { 
                ...s, 
                note: note, 
                commentaire: commentaire,
                noteAt: new Date().toISOString(),
                statut: 'note'
            } : s
        );
        localStorage.setItem('ent_soumissions', JSON.stringify(updated));
    }
};

// Gestion du cahier de texte
const CahierTexteManager = {
    create: function(entry) {
        initDataStorage();
        const entries = JSON.parse(localStorage.getItem('ent_cahier_texte'));
        const newEntry = {
            id: Date.now().toString(),
            ...entry,
            createdAt: new Date().toISOString()
        };
        entries.push(newEntry);
        localStorage.setItem('ent_cahier_texte', JSON.stringify(entries));
        return newEntry;
    },

    getByClasse: function(classe) {
        initDataStorage();
        const entries = JSON.parse(localStorage.getItem('ent_cahier_texte'));
        return entries.filter(e => e.classe === classe).sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
};

// Initialiser au chargement
initDataStorage();

