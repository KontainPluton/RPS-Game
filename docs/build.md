# Build & Tests

### Utiliser l'application en local sur votre machine sans docker:

1. `git clone https://github.com/KontainPluton/RPS-Game`
2. Se placer dans le dossier root du projet
3. `npm install`
4. `npm start`
5. Dans votre navigateur préféré, tapper l'adresse `http://localhost:3000`
6. Explorer librement l'application 😄

---

### Utiliser l'application en local sur votre machine avec docker:

##### Build l'image en local

1. `docker build -t rps-game .`

##### Run l'image avec le dépôt docker hub

1. `docker run -p3000:3000 quentinbialota/rps-game:latest`

##### Run l'image avec l'image build localement

1. `docker run -p3000:3000 rps-game`

---

### Lancer les tests sur votre machine

Afin de tester les différentes fonctionnalités de l'application, nous avons fait le choix d'utiliser JEST.

Pour lancer ces tests sur votre machine, vous pouvez utiliser la commande suivante:

1. `npm test`