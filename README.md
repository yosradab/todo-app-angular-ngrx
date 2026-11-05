# Todo App — Angular 19 + NgRx

Application de gestion de tâches développée en **2 heures** pour un **test technique**, avec Angular 19 (composants standalone), **NgRx** pour la gestion d'état et Bootstrap pour l'interface.

## Fonctionnalités

- **Connexion simulée** par e-mail (pas de backend)
- **Route protégée** : la page `/tasks` est accessible uniquement après connexion (`AuthGuard`)
- **Gestion des tâches** : ajouter, modifier, supprimer, marquer comme terminée
- **Tâches propres à chaque utilisateur** (filtrées par e-mail)
- **Déconnexion** : vide les tâches et redirige vers la connexion
- Interface responsive avec Bootstrap 5

## Gestion d'état avec NgRx

| Fichier | Rôle |
|---|---|
| `task.actions.ts` | Actions : `addTask`, `updateTask`, `deleteTask`, `toggleTaskCompletion`, `clearTasks` |
| `task.reducer.ts` | Mise à jour immuable de l'état des tâches |
| `task.selectors.ts` | Sélection des tâches de l'utilisateur connecté |
| `task.effects.ts` | Squelette prêt pour les effets (appels API à venir) |

## Stack technique

| Élément | Technologie |
|---|---|
| Framework | Angular 19 (standalone, rendu serveur SSR) |
| État | NgRx Store |
| UI | Bootstrap 5, SCSS |
| Tests | Jasmine, Karma |

## Structure

```
src/app/
├── auth/            # Connexion simulée, service et guard d'authentification
├── tasks/
│   ├── store/       # Actions, reducer, selectors NgRx
│   ├── task-form/   # Formulaire d'ajout et d'édition
│   ├── task-list/   # Liste des tâches
│   └── models/      # Interface Task
├── app.routes.ts    # Routes (login, tasks)
└── app.config.ts    # Configuration standalone (store, router)
```

## Lancer le projet

Prérequis : Node.js 18.19+ ou 20+, Angular CLI 19.

```bash
git clone https://github.com/yosradab/todo-app-angular-ngrx.git
cd todo-app-angular-ngrx
npm install
npm start          # ng serve → http://localhost:4200
```

Tests unitaires :

```bash
npm test
```

## Auteur

**Yosra Dab** — Ingénieure logiciel Full Stack · [Portfolio](https://yosradab.vercel.app) · [GitHub](https://github.com/yosradab) · [LinkedIn](https://linkedin.com/in/yosradab)
