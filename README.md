# README

## Membres du groupe

| NOM | Prénom |
| --- | ------ |
| LOPES | Anthony   |
| SAUVAGE | Thomas   |
---

## 🛠️ Installation locale

### **1. Cloner le projet**

```bash
git clone git@github.com:cactusninjaa/rendu-ci-cd.git
cd rendu-ci-cd
```

### **2. Installer les dépendances**

```bash
cd packages/client
npm install

cd packages/server
npm install
```

### **3. Lancer le backend**

```bash
cd packages/server
npm run dev
```

### **4. Lancer le frontend**

```bash
cd packages/client
npm run dev
```

---

## 🌐 Services déployés

### **Frontend déployé**

📍 URL : **https://client-gamma-coral.vercel.app/**

### **Backend déployé (Render)**

📍 URL : **https://todo-back-kedj.onrender.com/**

---

## CI/CD Pipeline

### **1. CI **

Déclenché sur push dans `packages/server`.

* Installation des dépendances
* Tests unitaires
* Test coverage
* Lint des commits (commitlint)
* Build serveur
* Upload des artefacts
* Notification Discord

### **2. CD **

Déclenché :

* sur `push` dans `main`
* sur `tag` (déploiement automatique)

Étapes :

* Build d’image Docker (multi-arch)
* Push **uniquement** si c’est un tag
* Scan Trivy en PR
* Déploiement backend via Render Deploy Hook
* Notification Discord

### **3. Audits de sécurité**

Déclenché sur modifications dans client ou serveur.

* `npm audit` avec seuil `high`
* Notification Discord

---

## 🐳 Stratégie Docker & Tagging

Lors de création d’un **tag Git**, deux images sont poussées sur Docker Hub :

```
<user>/<project>:<tag>
<user>/<project>:latest
```

Exemple :

```
myuser/myapp:v1.0.2
myuser/myapp:latest
```

---

## 🔁 Stratégie de rollback

Si la version **v1.0.2** est buggée, rollback possible via :

### **1. Redeploy Render en utilisant l’image précédente**

Il suffit d'appeler manuellement l’URL du deploy hook avec :

```
imgURL=<user>/<project>:v1.0.1
```

### **2. Ou pousser un tag Git vers l’ancienne version**

```bash
git tag v1.0.1-rollback v1.0.1
git push origin v1.0.1-rollback
```

Cela relance automatiquement la pipeline CD.

### Pourquoi ça marche ?

* Chaque version taguée a **sa propre image Docker immuable**.
* Le `latest` peut être écrasé, mais les tags versionnés ne changent jamais.

---

## 📦 Informations supplémentaires

* Notifications centralisées via workflow `notify.yml`
* Usage de `docker/buildx` pour préparer le multi-arch
* Cache Buildx pour accélérer les builds

---
## Notifications Discord 
<img width="1039" height="856" alt="Screenshot 2025-12-11 at 16 22 22" src="https://github.com/user-attachments/assets/5cac979b-af18-42b1-8b2e-8061a729e2d9" />

---
## Sentry
<img width="1468" height="1050" alt="Screenshot 2025-12-09 at 15 55 56" src="https://github.com/user-attachments/assets/9870bb63-010e-401c-9e12-b28a312ccacf" />
