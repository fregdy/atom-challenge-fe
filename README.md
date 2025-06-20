# Description

Project para manejo de tareas utilizando [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.
y desplegado a traves de Firebase Hosting, el backend lo puedes encontrar [aqui](https://github.com/fregdy/atom-challenge-be)

## Project setup

Es necesario instalar `angular-cli `y `firebase tools`
```bash
$ npm install
$ firebase login # si no lo has hecho
$ firebase init # seleccionando functions y firestore
```

## Development server

Para empezar el servidor de desarrollo ejecutar

```bash
ng serve
```

Una vez ejecutado se puede navegar a `http://localhost:4200/`. La aplicacion automaticamente aplicara los cambios en el codigo

## Code scaffolding

Puede generar codigo usando el siguiente comando (como ejemplo `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Generate Api Client code

Para actualizar el api client actualiza el archivo `openapi.json` y ejecuta el comando:
```bash
npm run generate-api-client
```
## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Deployment

Para el despliegue es necesario los siguientes commandos:
```bash
ng build --configuration production ## build eficiente y con variables de produccion.
firebase deploy # para montar la aplicacion en firebase hsoting
```


## Design Decisions and Trade-off

- Por facilidad y tiempo decidi usar localstorage para almacenar token, pero lo ideal seria usar http-only cookies para evitar ataques XSS.
- Se utilizo Guards para proteger las urls de la aplicacion en caso de no tener un token.
- Se utilizo http inteceptors para automaticamente setar el token de seguridad enlos servicios que lo requerian.
- Se utilizo environments para facilmente cambiar el backend a utilizar.
- Se implemento `ng-openapi-gen`, con el objetivo de generar los clientes typscript para utilizar los types correcto y facilitar la communicacion entre los dos BE y FE.
- Por facilidad el despliegue lo hice manualmente con `firebase deploy` pero perfectamente se podria configurar github para que cuando se cree un PR se corran los test, y una vez se haga el merge se despliegue directamente a firebase.
