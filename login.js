// Gestion de la page de connexion

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const demoButtons = document.querySelectorAll('.demo-btn');
    
    // Si déjà connecté, rediriger
    if (isAuthenticated()) {
        redirectByRole();
        return;
    }
    
    // Gestion du formulaire de connexion
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const identifiant = document.getElementById('identifiant').value.trim();
            const password = document.getElementById('password').value;
            
            // Réinitialiser le message d'erreur
            errorMessage.classList.remove('show');
            errorMessage.textContent = '';
            
            // Validation
            if (!identifiant || !password) {
                showError('Veuillez remplir tous les champs');
                return;
            }
            
            // Tentative de connexion
            const result = login(identifiant, password);
            
            if (result.success) {
                // Connexion réussie
                const remember = document.getElementById('remember').checked;
                if (remember) {
                    localStorage.setItem('rememberMe', 'true');
                }
                
                // Rediriger selon le rôle
                redirectByRole();
            } else {
                showError(result.message);
            }
        });
    }
    
    // Gestion des boutons de démonstration
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            const demoAccounts = getDemoAccounts();
            const account = demoAccounts[role];
            
            if (account) {
                document.getElementById('identifiant').value = account.identifiant;
                document.getElementById('password').value = account.password;
                
                // Soumettre automatiquement le formulaire après un court délai
                setTimeout(() => {
                    loginForm.dispatchEvent(new Event('submit'));
                }, 300);
            }
        });
    });
    
    // Fonction pour afficher les erreurs
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        
        // Masquer après 5 secondes
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
    
    // Remplir les identifiants si "se souvenir" est activé
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
        const savedIdentifiant = localStorage.getItem('savedIdentifiant');
        if (savedIdentifiant) {
            document.getElementById('identifiant').value = savedIdentifiant;
        }
    }
});

