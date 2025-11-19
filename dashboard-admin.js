// Dashboard Admin
document.addEventListener('DOMContentLoaded', function() {
    if (!protectPage(['admin'])) return;
    
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = `${user.prenom} ${user.nom}`;
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
            document.getElementById(targetSection).classList.add('active');
        });
    });
});

