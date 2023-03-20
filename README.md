# Lancer l'application :

`cd amu-frontend-eval/clientmanagement`

Lancer `npm install -g @angular/cli` pour installer les libraries nécessaires au bon fonctionnement de l'application.

## L'application a besoin de bootstrap pour fonctionner, il faut donc l'installer.

Lancer `ng run serve` pour lancer le serveur : `http://localhost:4200/`


## Lancer les tests unitaires

Commande `ng test` pour exécuter les tests unitaires.

## Lancer les tests end-to-end

Lancer `npm run cy:open` or `npm run cy:run`







# Evaluation pratique du module IHM Web

Dans cette évaluation, vous allez mettre en oeuvre et un projet d'application frontend de gestion de clients et de factures destiné aux indépendants et aux commerçants.

## Conseils pour le développement

Dans le dossier `cypress/integration` vous trouverez les tests fonctionnels détaillés qui expriment les éléments que l'on doit pouvoir trouver sur la page et les dynamismes attendus ainsi que les URLs qui doivent exister dans votre système de navigation.

Vous pouvez lancer la procédure de tests fonctionnels grâce à `npm run cy:open` (ou `npm run cy:run` pour lancer les tests sans ouvrir de navigateur autoguidé et rester dans la console).

**Attention : dans le fichier `utils.js` de Cypress, prenez soin de faire matcher la variable BASE_URL avec celle que vous choisissez pour ouvrir l'application dans le navigateur ! Changez aussi les informations relatives à SUPABASE**

Ces tests sont par défaut en mode _watch_, ce qui veut dire que vous pouvez développer tout en gardant les tests ouverts et constater de votre avancée dessus.

## Cahier des charges

Vous trouverez ici un [semblant de cahier des charges](./CDC.md) qui vous donnera les fonctionnalités attendues par votre client dans les grandes lignes. Pour les détails, référez vous au fichier de tests fonctionnels cypress ;-)

## Barème et notation

### Tests fonctionnels Cypress : 10 points

Le fait que l'application réponde à 100% aux exigences des tests fonctionnels fournis par la maîtrise d'ouvrage rapporte déjà 10 points sur 20.

### Conception et qualité : 7 points

Une rapide relecture du code fourni permettra de constater de votre conception en termes de refactoring, d'organisation du code, de lisibilité ainsi qu'une présence plus ou moins poussée des tests unitaires. Cette relecture rapportera entre 0 et 7 points en fonction de ces divers critères d'appréciation.

### Présentation : 3 points

Même si le fonctionnel est ici le plus important, une attention donnée à la présentation de l'application créée pourra rapporter encore des points supplémentaires. Aucune contrainte n'est donnée, tout est possible en termes de structure et de design.

## Livrable attendu

Vous devrez envoyer par mail (donné lors du cours) un lien vers un dépôt Git.

En tant que correcteur, je dois pouvoir corriger de cette façon :

```bash
# télécharger votre projet :
git clone url_de_votre_projet

# entrer dans le dossier
cd votre_application

# lancer l'application :
npm run serve

# lancer les tests :
npm run cy:run
# ou
npm run cy:open
```

## Courage !
