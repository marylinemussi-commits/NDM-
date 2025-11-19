# 🔧 Corriger les erreurs 404 sur GitHub Pages

## ❌ Problème identifié

Vos fichiers CSS et JS retournent une erreur 404 :
- `style.css` → 404 Not Found
- `main.js` → 404 Not Found  
- `discord-widget.js` → 404 Not Found

L'URL montre : `https://marylinemussi-committhub.io/NDM-/css/style.css`

## ✅ Solution : Vérifier la structure sur GitHub

### Étape 1 : Vérifier la structure de votre dépôt GitHub

1. Allez sur votre dépôt GitHub : `https://github.com/marylinemussi-commits/NDM-`
2. Vérifiez que la structure est **exactement** comme ça :

```
NDM-/
├── index.html          ← À la racine
├── presentation.html   ← À la racine
├── actualites.html     ← À la racine
├── contact.html        ← À la racine
├── login.html          ← À la racine
├── css/                ← Dossier à la racine
│   ├── style.css
│   ├── login.css
│   └── dashboard.css
└── js/                 ← Dossier à la racine
    ├── main.js
    ├── discord-widget.js
    └── ...
```

### Étape 2 : Vérifier que les dossiers CSS et JS existent

1. Sur GitHub, cliquez sur votre dépôt
2. Vérifiez qu'il y a bien un dossier `css` (cliquez dessus)
3. Vérifiez qu'il y a bien un dossier `js` (cliquez dessus)
4. **Si les dossiers n'existent pas**, il faut les créer

### Étape 3 : Uploader les fichiers manquants

**Si le dossier `css/` n'existe pas :**

1. Cliquez sur **"Add file"** > **"Create new file"**
2. Dans le nom du fichier, tapez : `css/style.css`
3. GitHub créera automatiquement le dossier `css/`
4. Copiez-collez le contenu de votre fichier `style.css` local
5. Cliquez sur **"Commit new file"**

**Répétez pour tous les fichiers CSS :**
- `css/style.css`
- `css/login.css`
- `css/dashboard.css`

**Répétez pour tous les fichiers JS :**
- `js/main.js`
- `js/discord-widget.js`
- `js/actualites.js`
- `js/contact.js`
- `js/auth.js`
- `js/data.js`
- `js/login.js`
- Et tous les autres fichiers JS

### Étape 4 : Méthode rapide - Uploader tout le dossier

**Option A : Via l'interface GitHub (Recommandé)**

1. Allez sur votre dépôt GitHub
2. Cliquez sur **"Add file"** > **"Upload files"**
3. Glissez-déposez le dossier `css/` entier depuis votre ordinateur
4. Glissez-déposez le dossier `js/` entier depuis votre ordinateur
5. Cliquez sur **"Commit changes"**

**Option B : Via Git (Si vous avez Git installé)**

```bash
# Dans le dossier ndm-rp-site
cd ndm-rp-site

# Vérifiez que tous les fichiers sont là
git status

# Ajoutez tous les fichiers
git add .

# Créez un commit
git commit -m "Ajout des fichiers CSS et JS"

# Envoyez sur GitHub
git push
```

### Étape 5 : Vérifier que ça fonctionne

1. Attendez 2-3 minutes
2. Allez sur votre site : `https://marylinemussi-commits.github.io/NDM-/`
3. Ouvrez la console (F12)
4. Vérifiez que les fichiers se chargent maintenant (plus d'erreurs 404)

## 🔍 Vérification de la structure

Sur GitHub, votre dépôt doit ressembler à ça :

```
📁 NDM-/
  📄 index.html
  📄 presentation.html
  📄 actualites.html
  📄 contact.html
  📄 login.html
  📁 css/
    📄 style.css
    📄 login.css
    📄 dashboard.css
  📁 js/
    📄 main.js
    📄 discord-widget.js
    📄 actualites.js
    📄 contact.js
    📄 auth.js
    📄 data.js
    📄 login.js
    📄 dashboard-admin.js
    📄 dashboard-eleve.js
    📄 dashboard-parent.js
    📄 dashboard-prof.js
```

## ⚠️ Erreurs courantes

### ❌ Les fichiers sont dans un sous-dossier

Si vos fichiers sont dans `NDM-/ndm-rp-site/css/`, ils ne seront pas trouvés.

**Solution :** Déplacez tous les fichiers à la racine du dépôt.

### ❌ Les dossiers s'appellent différemment

Si vos dossiers s'appellent `CSS/` ou `Css/` au lieu de `css/`, ça ne fonctionnera pas (Linux est sensible à la casse).

**Solution :** Renommez les dossiers en minuscules : `css/` et `js/`

### ❌ Les fichiers HTML sont dans un sous-dossier

Si `index.html` est dans `NDM-/ndm-rp-site/index.html`, GitHub Pages ne le trouvera pas.

**Solution :** Déplacez `index.html` à la racine : `NDM-/index.html`

## ✅ Checklist de vérification

- [ ] Le dossier `css/` existe à la racine du dépôt
- [ ] Le fichier `css/style.css` existe
- [ ] Le dossier `js/` existe à la racine du dépôt
- [ ] Le fichier `js/main.js` existe
- [ ] Le fichier `js/discord-widget.js` existe
- [ ] Tous les fichiers HTML sont à la racine
- [ ] GitHub Pages est activé dans Settings > Pages
- [ ] Le site se charge sans erreur 404 dans la console

## 🚀 Solution rapide : Re-uploader tout

Si rien ne fonctionne, la solution la plus simple :

1. **Supprimez tous les fichiers** de votre dépôt GitHub (sauf `.git` si vous utilisez Git)
2. **Re-uploadez tous les fichiers** de votre dossier `ndm-rp-site` local
3. **Assurez-vous** que la structure est exactement la même
4. **Attendez 5-10 minutes**
5. **Testez** votre site

---

**Après avoir corrigé, votre site devrait s'afficher correctement avec tous les styles !** 🎨

