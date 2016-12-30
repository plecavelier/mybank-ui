MyBank UI
==========

Interface utilisateur pour gérer les comptes bancaires, les opérations et les catégories de l'application MyBank.
Cette interface s'appuie sur l'API REST [MyBank API][1].

Technologies
------------

Cette application s'appuie sur [Angular 2][2].

Pré-requis
----------

* NPM
* PHP (pour le déploiement)
* Composer (pour le déploiement)

Installation
------------

Faire un clone du dépôt et se positionner dans le répertoire créé :

    $ git clone https://github.com/plecavelier/mybank-ui.git
    $ cd mybank-ui

Lancer l'installation avec NPM :

    $ npm install

Faire une copie du fichier `src/environments/environment.ts.dist` dans `src/environments/environment.ts` et modifier les paramètres si nécessaire.

Lancer le serveur HTTP avec la commande suivante :

    $ npm run ng serve

Tests
-----

Accéder à l'URL `http://127.0.0.1:4200` à partir de votre navigateur, la page de connexion devrait s'afficher.

Tentez de vous connecter avec un utilisateur enregistré sur l'[API MyBank][1]. Si une erreur inattendue survient, assurez-vous que l'API est bien démarrée et que l'URL est correctement spécifiée dans le fichier `src/environments/environment.ts`.


Déploiement
-----------

L'outil [Deployer][4] est utilisé pour effectuer les déploiements de l'application.

Copier le fichier `servers.yml.dist` vers `servers.yml` et renseigner les paramètres des différents environnements de déploiement (cf. [section Servers de la doc de Deployer][6]).

Créer les différents fichiers de configuration Angular `src/environments/environment.env.ts` correspondant à chaque environnement de déploiement en dupliquant le fichier `src/environments/environment.ts.dist`.

Par exemple, si vous avez le fichier `servers.yml` suivant :

    test:
      host: 0.0.0.0
      user: username
      password: password
      stage: test
      deploy_path: /var/www/html/mybank-ui-test

    production:
      host: 0.0.0.0
      user: username
      password: password
      stage: test
      deploy_path: /var/www/html/mybank-ui-test

Vous devez créer et compléter les fichiers `src/environments/environment.test.ts` et `src/environments/environment.prod.ts`.

Installer ensuite [Deployer][4] avec Composer :

    $ composer install

Pour finir, lancer le déploiement avec la commande suivante :

    $ vendor/bin/dep deploy environment -vvv

Le paramètre `environment` doit correspondre à une clé de votre fichier `servers.yml`.

Crédits
-------

Créé par [Pierre Lecavelier][3]. 

[1]: https://github.com/plecavelier/mybank-api.git
[2]: https://angularjs.org/
[3]: http://pierre.crashdump.net
[4]: https://deployer.org/
[6]: https://deployer.org/docs/servers
