# 🔧 Dépannage : Site qui ne s'affiche pas correctement sur GitHub Pages

## Problèmes courants et solutions

### ❌ Problème 1 : Le CSS ne se charge pas (site sans style)

**Symptômes :** Le site s'affiche mais sans couleurs, sans mise en page, texte noir sur fond blanc.

**Solutions :**

#### Solution A : Vérifier que les fichiers sont bien uploadés

1. Allez sur votre dépôt GitHub
2. Vérifiez que le dossier `css/` existe
3. Vérifiez que le fichier `css/style.css` existe
4. Si les fichiers manquent, uploadez-les

#### Solution B : Vérifier les chemins dans les fichiers HTML

Les chemins doivent être **relatifs** depuis la racine :

```html
<!-- ✅ CORRECT -->
<link rel="stylesheet" href="css/style.css">
<script src="js/main.js"></script>

<!-- ❌ INCORRECT -->
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="./css/style.css">
```

#### Solution C : Vider le cache du navigateur

1. Appuyez sur `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
2. Ou ouvrez en navigation privée

#### Solution D : Vérifier la structure des dossiers

Votre dépôt doit avoir cette structure :

```
votre-depot/
├── index.html
├── presentation.html
├── actualites.html
├── contact.html
├── css/
│   ├── style.css
│   ├── login.css
│   └── dashboard.css
├── js/
│   ├── main.js
│   ├── discord-widget.js
│   └── ...
└── ...
```

### ❌ Problème 2 : GitHub Pages n'est pas activé

**Symptômes :** Le site ne s'affiche pas du tout, erreur 404.

**Solution :**

1. Allez dans **Settings** > **Pages**
2. Vérifiez que la source est bien configurée :
   - **Branch** : `main` (ou `master`)
   - **Folder** : `/ (root)`
3. Cliquez sur **Save**
4. Attendez 5-10 minutes

### ❌ Problème 3 : Les liens ne fonctionnent pas

**Symptômes :** Les liens entre les pages donnent une erreur 404.

**Solution :**

Vérifiez que tous les liens utilisent des chemins relatifs :

```html
<!-- ✅ CORRECT -->
<a href="presentation.html">Présentation</a>
<a href="contact.html">Contact</a>

<!-- ❌ INCORRECT -->
<a href="/presentation.html">Présentation</a>
```

### ❌ Problème 4 : Le domaine personnalisé ne fonctionne pas

**Symptômes :** Le site fonctionne sur `votre-nom.github.io` mais pas sur votre domaine.

**Solution :**

1. Vérifiez que le fichier `CNAME` existe dans votre dépôt
2. Vérifiez que le fichier contient uniquement votre domaine (une ligne)
3. Vérifiez les DNS chez votre registrar
4. Attendez 24-48h pour la propagation DNS

### ❌ Problème 5 : Le JavaScript ne fonctionne pas

**Symptômes :** Les animations, le compteur Discord, etc. ne fonctionnent pas.

**Solution :**

1. Ouvrez la console du navigateur (F12)
2. Vérifiez s'il y a des erreurs
3. Vérifiez que tous les fichiers JS sont bien uploadés
4. Vérifiez les chemins dans les balises `<script>`

---

## 🔍 Vérification étape par étape

### Étape 1 : Vérifier que GitHub Pages est activé

1. Allez sur votre dépôt
2. Cliquez sur **Settings**
3. Cliquez sur **Pages** dans le menu de gauche
4. Vérifiez que c'est bien configuré

### Étape 2 : Vérifier la structure des fichiers

1. Allez sur votre dépôt
2. Vérifiez que tous les fichiers sont présents
3. Vérifiez que les dossiers `css/` et `js/` existent

### Étape 3 : Tester le site

1. Allez sur `https://VOTRE_NOM.github.io/ndm-rp-site/`
2. Ouvrez la console (F12)
3. Vérifiez s'il y a des erreurs 404 pour les fichiers CSS/JS

### Étape 4 : Vérifier les chemins

Ouvrez `index.html` sur GitHub et vérifiez que les chemins sont :

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/main.js"></script>
```

---

## 🚀 Solution rapide : Re-uploader les fichiers

Si rien ne fonctionne, re-uploadez tous les fichiers :

1. Allez sur votre dépôt GitHub
2. Supprimez tous les fichiers (sauf `.git` si vous utilisez Git)
3. Re-uploadez tous les fichiers de votre dossier `ndm-rp-site`
4. Vérifiez que la structure est correcte
5. Attendez 5-10 minutes

---

## 📞 Besoin d'aide ?

Si le problème persiste :

1. Vérifiez la console du navigateur (F12) pour les erreurs
2. Vérifiez les onglets **Network** et **Console** dans les outils développeur
3. Partagez les erreurs que vous voyez

---

## ✅ Checklist de vérification

- [ ] GitHub Pages est activé dans Settings > Pages
- [ ] Tous les fichiers sont uploadés
- [ ] Le dossier `css/` existe avec `style.css`
- [ ] Le dossier `js/` existe avec tous les fichiers JS
- [ ] Les chemins dans les fichiers HTML sont relatifs (sans `/` au début)
- [ ] Le fichier `index.html` est à la racine du dépôt
- [ ] Le cache du navigateur a été vidé
- [ ] Le site fonctionne sur `votre-nom.github.io/ndm-rp-site/`

