# Site Éducatif NDM RP

Site web moderne et responsive pour l'établissement éducatif NDM RP.

## 📁 Structure du projet

```
ndm-rp-site/
├── index.html          # Page d'accueil
├── presentation.html   # Présentation de l'établissement
├── formations.html     # Catalogue des formations
├── actualites.html     # Actualités et news
├── contact.html        # Page de contact avec formulaire
├── css/
│   └── style.css       # Styles principaux
├── js/
│   ├── main.js         # Scripts principaux
│   ├── formations.js   # Gestion des formations
│   ├── actualites.js   # Gestion des actualités
│   └── contact.js       # Gestion du formulaire de contact
└── README.md           # Ce fichier
```

## 🚀 Fonctionnalités

- ✅ **Page d'accueil** avec hero section et statistiques animées
- ✅ **Présentation** de l'établissement avec valeurs et mission
- ✅ **Catalogue de formations** avec filtres par catégorie
- ✅ **Actualités** avec système de modales
- ✅ **Formulaire de contact** fonctionnel
- ✅ **Design responsive** pour mobile, tablette et desktop
- ✅ **Navigation intuitive** avec menu mobile
- ✅ **Animations** et effets visuels modernes

## 🎨 Technologies utilisées

- HTML5
- CSS3 (avec variables CSS et Grid/Flexbox)
- JavaScript (Vanilla JS)
- Font Awesome (icônes)
- Design moderne et professionnel

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à :
- 📱 Smartphones (320px+)
- 📱 Tablettes (768px+)
- 💻 Ordinateurs (1024px+)

## 🛠️ Installation locale

1. Téléchargez ou clonez ce dossier
2. Ouvrez `index.html` dans votre navigateur
3. C'est tout ! Aucune dépendance requise.

## 📝 Personnalisation

### Modifier les couleurs

Éditez les variables CSS dans `css/style.css` :

```css
:root {
    --primary-color: #2563eb;    /* Couleur principale */
    --secondary-color: #1e40af;  /* Couleur secondaire */
    --accent-color: #3b82f6;      /* Couleur d'accent */
}
```

### Modifier les formations

Éditez le tableau `formationsData` dans `js/formations.js`

### Modifier les actualités

Éditez la fonction `getNewsData()` dans `js/main.js` et `js/actualites.js`

### Modifier les informations de contact

Éditez les informations dans `contact.html` et `index.html` (footer)

## 🌐 Hébergement

### 🆓 Option 1 : Hébergement 100% GRATUIT (Recommandé)

Consultez le fichier **`TUTORIEL_HEBERGEMENT_GRATUIT.md`** pour un guide complet sur l'hébergement gratuit.

**Solution rapide (5 minutes) :**
1. Allez sur **https://www.netlify.com**
2. Créez un compte gratuit
3. Glissez-déposez votre dossier `ndm-rp-site`
4. ✅ Votre site est en ligne : `votre-site.netlify.app`

### 🌍 Option 2 : Avec domaine .fr

**Avec GitHub Pages :**
- Consultez le fichier **`TUTORIEL_GITHUB_PAGES_DOMAINE_FR.md`** pour un guide complet avec GitHub Pages + domaine .fr
- **Coût :** 8-15€/an pour le domaine (hébergement 100% gratuit)

**Avec Netlify :**
- Consultez le fichier **`TUTORIEL_HEBERGEMENT_FR.md`** pour un guide complet avec Netlify + domaine .fr
- **Coût :** 8-15€/an pour le domaine (hébergement 100% gratuit)

### Options rapides :

1. **Netlify** (100% Gratuit) ⭐ Recommandé
   - Glissez-déposez le dossier sur netlify.com
   - HTTPS automatique
   - Support de domaines personnalisés

2. **GitHub Pages** (100% Gratuit) ⭐ Avec domaine .fr
   - Uploadez sur GitHub
   - Activez GitHub Pages
   - URL : `votre-nom.github.io/ndm-rp-site`
   - **Guide complet :** `TUTORIEL_GITHUB_PAGES_DOMAINE_FR.md`

3. **Vercel** (100% Gratuit)
   - Interface moderne
   - Déploiement rapide

## 📧 Contact

Pour toute question ou personnalisation, consultez le tutoriel d'hébergement ou contactez le support.

## 📄 Licence

Ce site est créé pour l'établissement NDM RP. Tous droits réservés.

---

**Créé avec ❤️ pour NDM RP**

