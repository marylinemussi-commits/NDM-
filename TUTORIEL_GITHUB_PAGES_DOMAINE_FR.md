# 🚀 Guide : Héberger votre site gratuitement sur GitHub Pages avec un domaine .fr

Ce guide vous explique étape par étape comment héberger votre site NDM RP gratuitement sur GitHub Pages et le connecter à un domaine .fr.

## 📋 Prérequis

- Un compte GitHub (gratuit) : [https://github.com/signup](https://github.com/signup)
- Un domaine .fr (8-15€/an) - Optionnel mais recommandé
- Votre site dans le dossier `ndm-rp-site`

---

## 📦 Étape 1 : Créer un dépôt GitHub

### 1.1 Créer un nouveau dépôt

1. Allez sur [https://github.com/new](https://github.com/new)
2. Remplissez les informations :
   - **Repository name** : `ndm-rp-site` (ou le nom que vous voulez)
   - **Description** : "Site web NDM RP"
   - **Visibilité** : Public (obligatoire pour GitHub Pages gratuit)
   - ❌ Ne cochez PAS "Initialize with README"
3. Cliquez sur **"Create repository"**

### 1.2 Uploader votre site sur GitHub

**Option A : Via l'interface GitHub (Simple)**

1. Sur la page de votre nouveau dépôt, cliquez sur **"uploading an existing file"**
2. Glissez-déposez tous les fichiers de votre dossier `ndm-rp-site` :
   - `index.html`
   - `presentation.html`
   - `actualites.html`
   - `contact.html`
   - Dossier `css/`
   - Dossier `js/`
   - Tous les autres fichiers
3. En bas de la page, ajoutez un message : "Initial commit"
4. Cliquez sur **"Commit changes"**

**Option B : Via Git (Recommandé pour les mises à jour)**

Si vous avez Git installé sur votre ordinateur :

```bash
# Ouvrez un terminal dans le dossier ndm-rp-site
cd ndm-rp-site

# Initialisez Git
git init

# Ajoutez tous les fichiers
git add .

# Créez le premier commit
git commit -m "Initial commit - Site NDM RP"

# Ajoutez le dépôt GitHub (remplacez VOTRE_NOM par votre nom d'utilisateur)
git remote add origin https://github.com/VOTRE_NOM/ndm-rp-site.git

# Envoyez les fichiers sur GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 Étape 2 : Activer GitHub Pages

1. Allez sur votre dépôt GitHub
2. Cliquez sur **"Settings"** (en haut à droite)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Sous **"Source"**, sélectionnez :
   - **Branch** : `main` (ou `master`)
   - **Folder** : `/ (root)`
5. Cliquez sur **"Save"**

✅ **Votre site est maintenant en ligne !**

URL : `https://VOTRE_NOM.github.io/ndm-rp-site/`

⚠️ **Note** : Il peut falloir quelques minutes pour que le site soit accessible.

---

## 🎯 Étape 3 : Configurer un domaine .fr personnalisé

### 3.1 Acheter un domaine .fr

**Où acheter un domaine .fr ?**

1. **OVH** : [https://www.ovh.com/fr/domaines/](https://www.ovh.com/fr/domaines/)
   - Prix : ~8-12€/an
   - Interface en français
   - Recommandé pour débutants

2. **Namecheap** : [https://www.namecheap.com/](https://www.namecheap.com/)
   - Prix : ~10-15€/an
   - Interface moderne

3. **Gandi** : [https://www.gandi.net/fr](https://www.gandi.net/fr)
   - Prix : ~12-15€/an
   - Service français

**Exemple de domaine** : `ndmrp.fr`, `ndm-rp.fr`, `ndmrp-education.fr`

### 3.2 Configurer le domaine sur GitHub Pages

1. Dans votre dépôt GitHub, allez dans **Settings > Pages**
2. Dans la section **"Custom domain"**, entrez votre domaine :
   - Exemple : `ndmrp.fr` ou `www.ndmrp.fr`
3. Cliquez sur **"Save"**
4. ✅ GitHub va créer un fichier `CNAME` automatiquement

### 3.3 Configurer les DNS chez votre registrar

Vous devez configurer les DNS de votre domaine pour pointer vers GitHub Pages.

**Configuration DNS à faire chez votre registrar (OVH, Namecheap, etc.) :**

#### Option A : Utiliser un sous-domaine (www.ndmrp.fr)

Ajoutez ces enregistrements DNS :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | VOTRE_NOM.github.io | 3600 |

#### Option B : Utiliser le domaine racine (ndmrp.fr)

Ajoutez ces enregistrements DNS :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | VOTRE_NOM.github.io | 3600 |

**⚠️ Important :** Remplacez `VOTRE_NOM` par votre nom d'utilisateur GitHub.

### 3.4 Activer HTTPS (Automatique)

1. GitHub Pages active automatiquement HTTPS pour les domaines personnalisés
2. Dans **Settings > Pages**, cochez **"Enforce HTTPS"**
3. ⏳ Attendez quelques minutes que le certificat SSL soit généré

---

## 🔄 Étape 4 : Mettre à jour votre site

### Via l'interface GitHub

1. Allez sur votre dépôt
2. Cliquez sur le fichier à modifier
3. Cliquez sur l'icône crayon ✏️
4. Modifiez le fichier
5. Cliquez sur **"Commit changes"**

### Via Git (Recommandé)

```bash
# Dans le dossier ndm-rp-site
cd ndm-rp-site

# Modifiez vos fichiers

# Ajoutez les modifications
git add .

# Créez un commit
git commit -m "Description de vos modifications"

# Envoyez sur GitHub
git push
```

✅ Les modifications seront en ligne en quelques secondes !

---

## 📝 Fichier CNAME (Créé automatiquement)

GitHub crée automatiquement un fichier `CNAME` dans votre dépôt avec votre domaine.

Si vous voulez le créer manuellement :

1. Créez un fichier nommé `CNAME` (sans extension)
2. Mettez-y votre domaine : `ndmrp.fr` ou `www.ndmrp.fr`
3. Commitez le fichier

---

## ✅ Vérification finale

1. ✅ Votre site est accessible sur `https://ndmrp.fr`
2. ✅ HTTPS est activé (cadenas vert)
3. ✅ Le compteur Discord fonctionne
4. ✅ Toutes les pages se chargent correctement

---

## 🐛 Résolution de problèmes

### Le site ne s'affiche pas

- Attendez 5-10 minutes après l'activation de GitHub Pages
- Vérifiez que votre dépôt est **Public**
- Vérifiez que la branche est `main` ou `master`

### Le domaine ne fonctionne pas

- Vérifiez que les DNS sont bien configurés (peut prendre 24-48h)
- Vérifiez que le fichier `CNAME` existe dans votre dépôt
- Vérifiez que le domaine est bien renseigné dans Settings > Pages

### HTTPS ne fonctionne pas

- Attendez quelques heures que le certificat SSL soit généré
- Vérifiez que "Enforce HTTPS" est coché dans Settings > Pages

### Erreur 404 sur certaines pages

- Vérifiez que tous les fichiers sont bien uploadés
- Vérifiez que les chemins des fichiers sont corrects (case-sensitive)

---

## 💡 Astuces

1. **Utilisez `www.ndmrp.fr`** plutôt que `ndmrp.fr` pour éviter les problèmes de DNS
2. **Sauvegardez régulièrement** votre code localement
3. **Testez localement** avant de push sur GitHub
4. **Utilisez des messages de commit clairs** pour suivre vos modifications

---

## 📚 Ressources utiles

- Documentation GitHub Pages : [https://docs.github.com/pages](https://docs.github.com/pages)
- Configuration DNS : [https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
- Support GitHub : [https://support.github.com](https://support.github.com)

---

## 🎉 Félicitations !

Votre site est maintenant hébergé gratuitement sur GitHub Pages avec un domaine .fr personnalisé !

**Récapitulatif :**
- ✅ Hébergement : **100% GRATUIT** (GitHub Pages)
- ✅ Domaine : **8-15€/an** (domaine .fr)
- ✅ HTTPS : **Gratuit et automatique**
- ✅ Mises à jour : **Instantanées**

---

**Besoin d'aide ?** Consultez la documentation GitHub ou créez une issue sur votre dépôt.

