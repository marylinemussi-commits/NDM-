# Tutoriel : Héberger votre site NDM RP en .fr

Ce guide vous explique étape par étape comment héberger votre site éducatif NDM RP avec un nom de domaine en .fr.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Étape 1 : Acheter un nom de domaine .fr](#étape-1--acheter-un-nom-de-domaine-fr)
3. [Étape 2 : Choisir un hébergeur](#étape-2--choisir-un-hébergeur)
4. [Étape 3 : Préparer les fichiers du site](#étape-3--préparer-les-fichiers-du-site)
5. [Étape 4 : Uploader les fichiers](#étape-4--uploader-les-fichiers)
6. [Étape 5 : Configurer le nom de domaine](#étape-5--configurer-le-nom-de-domaine)
7. [Étape 6 : Configurer les DNS](#étape-6--configurer-les-dns)
8. [Étape 7 : Vérifier et tester](#étape-7--vérifier-et-tester)
9. [Options avancées](#options-avancées)
10. [Dépannage](#dépannage)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir :
- ✅ Les fichiers de votre site (dossier `ndm-rp-site`)
- ✅ Une adresse email valide
- ✅ Une carte bancaire pour l'achat du domaine .fr (8-15€/an)
- ⚠️ **Note** : L'hébergement peut être 100% GRATUIT (voir [TUTORIEL_HEBERGEMENT_GRATUIT.md](TUTORIEL_HEBERGEMENT_GRATUIT.md))
- ✅ Environ 30 minutes devant vous

---

## Étape 1 : Acheter un nom de domaine .fr

### 1.1 Choisir un registraire de domaine

Voici les principaux registraires français pour les domaines .fr :

- **OVH** (https://www.ovh.com) - Recommandé pour les débutants
- **Gandi** (https://www.gandi.net) - Interface simple
- **Namecheap** (https://www.namecheap.com) - Bon marché
- **1&1 IONOS** (https://www.ionos.fr) - Offres complètes

### 1.2 Vérifier la disponibilité

1. Allez sur le site du registraire choisi
2. Dans le champ de recherche, tapez votre nom de domaine souhaité (ex: `ndmrp.fr` ou `ndm-rp.fr`)
3. Vérifiez la disponibilité

**Conseil** : Choisissez un nom court, facile à retenir et représentatif de votre établissement.

### 1.3 Acheter le domaine

1. Ajoutez le domaine au panier
2. Complétez le processus d'achat
3. **Important pour .fr** : Vous devrez fournir :
   - Votre identité (nom, prénom)
   - Votre adresse postale
   - Votre numéro de téléphone
   - Une pièce d'identité peut être demandée

**Prix moyen** : 8-15€/an pour un domaine .fr

---

## Étape 2 : Choisir un hébergeur

### 2.1 Options d'hébergement

#### ⭐ Option A : Hébergement 100% GRATUIT (Recommandé)

**Netlify** (Recommandé - 100% Gratuit)
- ✅ **100% GRATUIT** pour toujours
- ✅ Facile à utiliser (drag & drop en 2 minutes)
- ✅ HTTPS automatique
- ✅ CDN inclus (site rapide)
- ✅ 100 Go de bande passante/mois
- ✅ Support de domaines personnalisés (.fr)
- 📖 **Guide détaillé** : Voir [TUTORIEL_HEBERGEMENT_GRATUIT.md](TUTORIEL_HEBERGEMENT_GRATUIT.md)

**GitHub Pages** (100% Gratuit)
- ✅ **100% GRATUIT** pour toujours
- ✅ HTTPS automatique
- ✅ Intégration Git
- ✅ URL : `votre-nom.github.io/ndm-rp-site`

**Vercel** (100% Gratuit)
- ✅ **100% GRATUIT**
- ✅ Déploiement ultra-rapide
- ✅ Interface moderne

#### Option B : Hébergement payant (optionnel)

**OVH** (https://www.ovh.com)
- ✅ Hébergement web à partir de 2,99€/mois
- ✅ Support en français
- ✅ Bonne performance
- ✅ Compatible avec les domaines .fr

**1&1 IONOS**
- ✅ Offres complètes (domaine + hébergement)
- ✅ À partir de 1€/mois (première année)
- ✅ Support client

### 2.2 Notre recommandation

Pour un site éducatif comme NDM RP, nous recommandons fortement :
1. **Netlify (GRATUIT)** - La solution la plus simple et rapide
2. **GitHub Pages (GRATUIT)** - Si vous voulez apprendre Git
3. **Hébergement payant** - Seulement si vous avez des besoins spécifiques

💡 **Conseil** : Commencez avec Netlify gratuit, vous pourrez toujours ajouter un domaine .fr plus tard !

---

## Étape 3 : Préparer les fichiers du site

### 3.1 Vérifier la structure

Assurez-vous que votre dossier `ndm-rp-site` contient :

```
ndm-rp-site/
├── index.html
├── presentation.html
├── formations.html
├── actualites.html
├── contact.html
├── css/
│   └── style.css
└── js/
    ├── main.js
    ├── formations.js
    ├── actualites.js
    └── contact.js
```

### 3.2 Optimiser les fichiers (optionnel)

- Compresser les images si vous en ajoutez
- Vérifier que tous les liens fonctionnent
- Tester le site localement en ouvrant `index.html` dans un navigateur

---

## Étape 4 : Uploader les fichiers

### Option A : Avec Netlify (Recommandé - Gratuit)

#### 4.1 Créer un compte Netlify

1. Allez sur https://www.netlify.com
2. Cliquez sur "Sign up" (Inscription)
3. Inscrivez-vous avec votre email ou via GitHub

#### 4.2 Déployer le site

**Méthode 1 : Drag & Drop (la plus simple)**

1. Connectez-vous à Netlify
2. Sur la page d'accueil, trouvez la section "Sites"
3. Glissez-déposez votre dossier `ndm-rp-site` dans la zone de déploiement
4. Attendez quelques secondes
5. Netlify vous donnera une URL temporaire (ex: `random-name-123.netlify.app`)

**Méthode 2 : Via Git (plus professionnel)**

1. Créez un compte GitHub (https://github.com)
2. Créez un nouveau repository
3. Uploadez vos fichiers sur GitHub
4. Dans Netlify, cliquez sur "New site from Git"
5. Connectez votre repository GitHub
6. Netlify déploiera automatiquement votre site

#### 4.3 Obtenir l'URL de votre site

Après le déploiement, Netlify vous donnera :
- Une URL temporaire : `votre-site-123.netlify.app`
- Vous pourrez la personnaliser dans les paramètres

### Option B : Avec un hébergeur classique (OVH, IONOS, etc.)

#### 4.1 Accéder à votre espace client

1. Connectez-vous à votre espace client hébergeur
2. Trouvez la section "Fichiers" ou "Gestionnaire de fichiers"
3. Ouvrez le dossier `www` ou `public_html`

#### 4.2 Uploader les fichiers

**Via l'interface web :**
1. Utilisez l'outil de gestion de fichiers de votre hébergeur
2. Uploadez tous les fichiers de `ndm-rp-site`
3. Assurez-vous que `index.html` est à la racine

**Via FTP (FileZilla) :**
1. Téléchargez FileZilla (https://filezilla-project.org)
2. Récupérez vos identifiants FTP dans votre espace client
3. Connectez-vous avec FileZilla
4. Uploadez tous les fichiers dans le dossier `www` ou `public_html`

---

## Étape 5 : Configurer le nom de domaine

### 5.1 Avec Netlify

1. Dans Netlify, allez dans votre site
2. Cliquez sur "Domain settings"
3. Cliquez sur "Add custom domain"
4. Entrez votre domaine (ex: `ndmrp.fr`)
5. Suivez les instructions pour configurer les DNS

### 5.2 Avec un hébergeur classique

1. Dans votre espace client, trouvez "Domaines" ou "Gestion des domaines"
2. Ajoutez votre domaine .fr
3. Si le domaine est acheté ailleurs, vous devrez le transférer ou configurer les DNS

---

## Étape 6 : Configurer les DNS

### 6.1 Comprendre les DNS

Les DNS (Domain Name System) permettent de faire le lien entre votre nom de domaine et votre hébergement.

### 6.2 Configuration avec Netlify

1. Dans Netlify, allez dans "Domain settings" > "DNS"
2. Netlify vous donnera des enregistrements DNS à configurer :
   - **Type A** : `185.199.108.153` (ou autre IP fournie)
   - **Type CNAME** : `votre-site.netlify.app`

3. Allez dans votre registraire de domaine (OVH, Gandi, etc.)
4. Trouvez la section "DNS" ou "Zone DNS"
5. Modifiez les enregistrements :
   - **A** : `@` → IP fournie par Netlify
   - **CNAME** : `www` → `votre-site.netlify.app`

### 6.3 Configuration avec un hébergeur classique

Si votre domaine et hébergement sont chez le même fournisseur (ex: OVH), la configuration est souvent automatique.

Si le domaine est ailleurs :
1. Récupérez les serveurs DNS de votre hébergeur (ex: `ns1.ovh.net`, `ns2.ovh.net`)
2. Dans votre registraire de domaine, modifiez les serveurs DNS
3. Attendez la propagation (24-48h)

### 6.4 Types d'enregistrements DNS courants

- **A** : Pointe vers une adresse IP (ex: `185.199.108.153`)
- **CNAME** : Pointe vers un autre nom de domaine (ex: `www` → `votre-site.netlify.app`)
- **MX** : Pour les emails (si vous avez un service email)

---

## Étape 7 : Vérifier et tester

### 7.1 Attendre la propagation DNS

La propagation DNS peut prendre de quelques minutes à 48 heures. En général, c'est entre 1 et 4 heures.

### 7.2 Vérifier la propagation

Utilisez ces outils en ligne :
- https://dnschecker.org
- https://www.whatsmydns.net

Tapez votre domaine et vérifiez que les DNS pointent bien vers votre hébergeur.

### 7.3 Tester votre site

1. Ouvrez votre navigateur
2. Tapez votre domaine (ex: `https://ndmrp.fr`)
3. Vérifiez que toutes les pages fonctionnent :
   - Page d'accueil
   - Présentation
   - Formations
   - Actualités
   - Contact

### 7.4 Vérifier le HTTPS

- Netlify active automatiquement le HTTPS (certificat SSL)
- Pour les hébergeurs classiques, activez le SSL dans votre espace client (gratuit avec Let's Encrypt)

---

## Options avancées

### Ajouter un email professionnel

Avec votre domaine `ndmrp.fr`, vous pouvez créer des emails comme `contact@ndmrp.fr` :

1. **Avec OVH** : Ajoutez un plan email (environ 1€/mois)
2. **Avec Google Workspace** : Solution professionnelle (payante)
3. **Avec Zoho Mail** : Solution gratuite pour les petits volumes

### Optimiser les performances

- Activer la mise en cache
- Compresser les images
- Utiliser un CDN (Content Delivery Network)
- Minifier le CSS et JavaScript

### Ajouter Google Analytics

Pour suivre les visiteurs de votre site :

1. Créez un compte Google Analytics
2. Ajoutez le code de suivi dans toutes vos pages HTML (avant `</head>`)

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Dépannage

### Le site ne s'affiche pas

1. **Vérifiez les DNS** : Utilisez dnschecker.org
2. **Vérifiez les fichiers** : Assurez-vous que `index.html` est bien uploadé
3. **Videz le cache** : Ctrl+F5 dans votre navigateur
4. **Attendez** : La propagation DNS peut prendre du temps

### Erreur 404 (Page non trouvée)

- Vérifiez que tous les fichiers sont bien uploadés
- Vérifiez les chemins des fichiers (CSS, JS, images)
- Assurez-vous que les liens dans le HTML sont corrects

### Le HTTPS ne fonctionne pas

- Avec Netlify : Attendez quelques minutes, c'est automatique
- Avec un hébergeur classique : Activez le certificat SSL dans votre espace client

### Les modifications ne s'affichent pas

- Videz le cache du navigateur (Ctrl+F5)
- Vérifiez que les fichiers ont bien été uploadés
- Attendez quelques minutes (mise en cache)

---

## Résumé rapide

### Option Gratuite (Recommandée) :
1. ✅ Créez un compte Netlify (gratuit)
2. ✅ Glissez-déposez votre dossier `ndm-rp-site`
3. ✅ C'est fait ! Site en ligne : `votre-site.netlify.app`
4. ⚙️ (Optionnel) Ajoutez un domaine .fr (8-15€/an)

### Option avec domaine .fr :
1. ✅ Achetez un domaine .fr (OVH, Gandi, etc.) - 8-15€/an
2. ✅ Choisissez Netlify (gratuit) comme hébergeur
3. ✅ Uploadez vos fichiers sur Netlify
4. ✅ Configurez les DNS pour pointer vers Netlify
5. ✅ Attendez la propagation (1-4h)
6. ✅ Testez votre site

📖 **Pour un guide 100% gratuit détaillé** : Consultez [TUTORIEL_HEBERGEMENT_GRATUIT.md](TUTORIEL_HEBERGEMENT_GRATUIT.md)

---

## Support

Si vous rencontrez des problèmes :

1. Consultez la documentation de votre hébergeur
2. Contactez le support de votre hébergeur
3. Vérifiez les forums communautaires

---

## Coûts estimés

### Option 1 : 100% Gratuit (Recommandé)
| Service | Coût |
|---------|------|
| Hébergement Netlify | **GRATUIT** |
| Domaine .fr | Optionnel (8-15€/an) |
| **Total** | **0€** (ou 8-15€/an avec domaine) |

### Option 2 : Avec hébergement payant
| Service | Coût |
|---------|------|
| Domaine .fr | 8-15€/an |
| Hébergement OVH | 2,99-10€/mois |
| Email professionnel | 1-5€/mois (optionnel) |
| **Total** | **36-135€/an** |

💡 **Recommandation** : Utilisez Netlify gratuit + domaine .fr = **8-15€/an seulement** !

---

**Félicitations !** Votre site NDM RP est maintenant en ligne avec un nom de domaine .fr professionnel ! 🎉

Pour toute question, n'hésitez pas à consulter la documentation de votre hébergeur ou à contacter leur support.

