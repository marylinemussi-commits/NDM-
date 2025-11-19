// Configuration Discord
// Lien d'invitation Discord
const DISCORD_INVITE_CODE = 'txcdR2Nk9h'; // Code d'invitation extrait de https://discord.gg/txcdR2Nk9h

// Variable pour stocker l'ID du serveur (sera récupéré automatiquement)
let DISCORD_SERVER_ID = null;

// Fonction pour récupérer l'ID du serveur à partir du code d'invitation
async function fetchServerIdFromInvite() {
    if (DISCORD_SERVER_ID) {
        return DISCORD_SERVER_ID; // Déjà récupéré
    }

    try {
        // Récupérer les informations de l'invitation pour obtenir l'ID du serveur
        const response = await fetch(`https://discord.com/api/invites/${DISCORD_INVITE_CODE}?with_counts=true`);
        
        if (!response.ok) {
            throw new Error('Impossible de récupérer les informations du serveur');
        }
        
        const data = await response.json();
        
        // L'ID du serveur (guild) est dans data.guild.id
        if (data.guild && data.guild.id) {
            DISCORD_SERVER_ID = data.guild.id;
            return DISCORD_SERVER_ID;
        }
        
        throw new Error('ID du serveur non trouvé dans la réponse');
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID du serveur:', error);
        return null;
    }
}

// Fonction pour récupérer le nombre de membres Discord
async function fetchDiscordMembers() {
    // D'abord, récupérer l'ID du serveur si nécessaire
    const serverId = await fetchServerIdFromInvite();
    
    if (!serverId) {
        console.warn('Impossible de récupérer l\'ID du serveur Discord');
        return null;
    }

    try {
        // Utilisation de l'API Discord Widget (pas besoin de token)
        // Cette API retourne seulement les membres en ligne
        const response = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`);
        
        if (!response.ok) {
            if (response.status === 404) {
                // Si le widget n'est pas activé, utiliser l'API d'invitation pour obtenir le nombre approximatif
                const inviteResponse = await fetch(`https://discord.com/api/invites/${DISCORD_INVITE_CODE}?with_counts=true`);
                if (inviteResponse.ok) {
                    const inviteData = await inviteResponse.json();
                    // Utiliser approximate_member_count si disponible
                    return inviteData.approximate_member_count || inviteData.approximate_presence_count || null;
                }
                throw new Error('Widget Discord non activé et impossible de récupérer les données via l\'invitation');
            }
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Le nombre de membres en ligne (l'API Widget ne retourne que ceux-là)
        // Pour obtenir le nombre total, on essaie d'utiliser l'API d'invitation
        const onlineCount = data.members ? data.members.length : (data.presence_count || 0);
        
        // Essayer de récupérer le nombre total via l'API d'invitation
        try {
            const inviteResponse = await fetch(`https://discord.com/api/invites/${DISCORD_INVITE_CODE}?with_counts=true`);
            if (inviteResponse.ok) {
                const inviteData = await inviteResponse.json();
                // Utiliser approximate_member_count pour le nombre total de membres
                return inviteData.approximate_member_count || onlineCount;
            }
        } catch (e) {
            // Si l'API d'invitation échoue, utiliser le nombre en ligne
        }
        
        return onlineCount;
    } catch (error) {
        console.error('Erreur lors de la récupération des membres Discord:', error);
        return null;
    }
}

// Fonction pour mettre à jour l'affichage du compteur
function updateDiscordCounter(count) {
    const counterElement = document.getElementById('discord-member-count');
    if (counterElement) {
        if (count !== null && count >= 0) {
            counterElement.textContent = count.toLocaleString('fr-FR');
            counterElement.parentElement.parentElement.classList.remove('error');
        } else {
            counterElement.textContent = '...';
            counterElement.parentElement.parentElement.classList.add('error');
        }
    }
}

// Fonction pour initialiser le widget Discord
async function initDiscordWidget() {
    // Vérifier si l'élément existe sur la page
    const counterElement = document.getElementById('discord-member-count');
    if (!counterElement) {
        return; // Pas de widget Discord sur cette page
    }

    // Récupérer le nombre de membres au chargement
    const memberCount = await fetchDiscordMembers();
    updateDiscordCounter(memberCount);
    
    // Mettre à jour toutes les 30 secondes (temps réel)
    setInterval(async () => {
        const newCount = await fetchDiscordMembers();
        if (newCount !== null) {
            const currentElement = document.getElementById('discord-member-count');
            if (currentElement) {
                // Récupérer le nombre actuel (en enlevant les espaces de formatage)
                const currentText = currentElement.textContent.replace(/\s/g, '');
                const currentCount = parseInt(currentText.replace(/\D/g, '')) || 0;
                
                if (newCount !== currentCount) {
                    // Animation lors du changement
                    updateDiscordCounter(newCount);
                    
                    // Animation de transition
                    currentElement.style.transform = 'scale(1.2)';
                    currentElement.style.transition = 'transform 0.3s ease';
                    setTimeout(() => {
                        currentElement.style.transform = 'scale(1)';
                    }, 300);
                }
            }
        }
    }, 30000); // Mise à jour toutes les 30 secondes
}

// Initialiser le widget quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    initDiscordWidget();
});

