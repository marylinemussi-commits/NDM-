// Système d'authentification pour l'ENT NDM RP

// Données des utilisateurs (en production, cela viendrait d'un serveur)
const users = {
    // Élève
    'eleve001': {
        id: 'eleve001',
        identifiant: 'eleve001',
        password: 'eleve123',
        nom: 'Dupont',
        prenom: 'Lucas',
        role: 'eleve',
        classe: '1ère A',
        email: 'lucas.dupont@ndmrp.fr'
    },
    // Professeur
    'prof001': {
        id: 'prof001',
        identifiant: 'prof001',
        password: 'prof123',
        nom: 'Martin',
        prenom: 'Sophie',
        role: 'professeur',
        matiere: 'Mathématiques',
        email: 'sophie.martin@ndmrp.fr'
    },
    // Parent
    'parent001': {
        id: 'parent001',
        identifiant: 'parent001',
        password: 'parent123',
        nom: 'Dupont',
        prenom: 'Marie',
        role: 'parent',
        enfants: ['eleve001'],
        email: 'marie.dupont@ndmrp.fr'
    },
    // Admin
    'admin': {
        id: 'admin',
        identifiant: 'admin',
        password: 'admin123',
        nom: 'Admin',
        prenom: 'Système',
        role: 'admin',
        email: 'admin@ndmrp.fr'
    }
};

// Fonction de connexion
function login(identifiant, password) {
    const user = Object.values(users).find(u => u.identifiant === identifiant);
    
    if (!user) {
        return { success: false, message: 'Identifiant incorrect' };
    }
    
    if (user.password !== password) {
        return { success: false, message: 'Mot de passe incorrect' };
    }
    
    // Sauvegarder la session
    const sessionData = {
        id: user.id,
        identifiant: user.identifiant,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        email: user.email,
        classe: user.classe || null,
        matiere: user.matiere || null,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    
    return { success: true, user: sessionData };
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('userSession');
    window.location.href = 'login.html';
}

// Vérifier si l'utilisateur est connecté
function isAuthenticated() {
    const session = localStorage.getItem('userSession');
    return session !== null;
}

// Obtenir l'utilisateur actuel
function getCurrentUser() {
    const session = localStorage.getItem('userSession');
    if (!session) return null;
    
    try {
        return JSON.parse(session);
    } catch (e) {
        return null;
    }
}

// Vérifier le rôle de l'utilisateur
function hasRole(role) {
    const user = getCurrentUser();
    return user && user.role === role;
}

// Rediriger selon le rôle
function redirectByRole() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    switch (user.role) {
        case 'eleve':
            window.location.href = 'dashboard-eleve.html';
            break;
        case 'professeur':
            window.location.href = 'dashboard-prof.html';
            break;
        case 'parent':
            window.location.href = 'dashboard-parent.html';
            break;
        case 'admin':
            window.location.href = 'dashboard-admin.html';
            break;
        default:
            window.location.href = 'login.html';
    }
}

// Protéger une page (rediriger si non connecté)
function protectPage(allowedRoles = []) {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    
    const user = getCurrentUser();
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Obtenir les comptes de démonstration
function getDemoAccounts() {
    return {
        eleve: { identifiant: 'eleve001', password: 'eleve123' },
        professeur: { identifiant: 'prof001', password: 'prof123' },
        parent: { identifiant: 'parent001', password: 'parent123' },
        admin: { identifiant: 'admin', password: 'admin123' }
    };
}

