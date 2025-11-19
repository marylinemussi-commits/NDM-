# 🔧 Guide rapide : Recréer le fichier CNAME

Si vous avez supprimé le fichier `CNAME` par erreur, voici comment le recréer.

## 📝 Méthode 1 : Via l'interface GitHub (Le plus simple)

1. Allez sur votre dépôt GitHub
2. Cliquez sur **"Add file"** > **"Create new file"**
3. Nommez le fichier : **`CNAME`** (sans extension, tout en majuscules)
4. Dans le contenu du fichier, entrez votre domaine :
   ```
   ndmrp.fr
   ```
   ou
   ```
   www.ndmrp.fr
   ```
5. Cliquez sur **"Commit new file"** en bas de la page

## 📝 Méthode 2 : Via les paramètres GitHub Pages

1. Allez dans **Settings** > **Pages**
2. Dans la section **"Custom domain"**, entrez votre domaine
3. Cliquez sur **"Save"**
4. ✅ GitHub créera automatiquement le fichier `CNAME`

## 📝 Méthode 3 : Créer le fichier localement

Créez un fichier nommé `CNAME` (sans extension) dans votre dossier `ndm-rp-site` avec le contenu suivant :

```
ndmrp.fr
```

Puis uploadez-le sur GitHub.

## ⚠️ Important

- Le fichier `CNAME` doit contenir **uniquement** votre domaine (une seule ligne)
- Pas d'extension de fichier (pas de `.txt` ou autre)
- Utilisez soit `ndmrp.fr` soit `www.ndmrp.fr`, pas les deux
- Le fichier doit être à la racine de votre dépôt

## ✅ Vérification

Après avoir créé le fichier :
1. Attendez 5-10 minutes
2. Vérifiez que votre domaine fonctionne
3. Vérifiez que HTTPS est activé dans Settings > Pages

