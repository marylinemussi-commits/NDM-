// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const formData = {
                nom: document.getElementById('nom').value,
                email: document.getElementById('email').value,
                telephone: document.getElementById('telephone').value,
                sujet: document.getElementById('sujet').value,
                message: document.getElementById('message').value
            };

            // Validation
            if (!formData.nom || !formData.email || !formData.sujet || !formData.message) {
                showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            // Simuler l'envoi (à remplacer par un vrai appel API)
            showMessage('Envoi en cours...', 'success');
            
            // Simuler un délai d'envoi
            setTimeout(() => {
                // Ici, vous pouvez ajouter un appel API réel
                // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
                
                showMessage('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
                contactForm.reset();
                
                // Sauvegarder dans le localStorage pour la démo
                saveContactMessage(formData);
            }, 1500);
        });
    }

    // Vérifier si une formation est sélectionnée dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const formationId = urlParams.get('formation');
    if (formationId && document.getElementById('sujet')) {
        document.getElementById('sujet').value = 'formation';
        document.getElementById('message').value = `Bonjour,\n\nJe suis intéressé(e) par la formation n°${formationId}.\n\nPourriez-vous me fournir plus d'informations ?\n\nMerci.`;
    }
});

// Afficher un message
function showMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;

    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Masquer le message après 5 secondes pour les messages de succès
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Sauvegarder le message de contact (pour la démo)
function saveContactMessage(data) {
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
        ...data,
        date: new Date().toISOString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

