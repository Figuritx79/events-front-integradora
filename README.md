# Integradora eventos :skull_and_crossbones:

## Descripcion del proyecto

Proyecto integrador del 5to cuatrimestre

## Indice

- [Prerrequisitos](#prerrequisitos)
- [Instalacion, configuracion y ejecucions](#iniciar-proyecto)
- [Trabajar con git](#trabajar-con-git)
- [Estructura de proyecto](#estructura-del-proyecto)
- [Librerias/dependencias](#libreriasdependencias)
- [Extenciones recomendas](#extensiones-recomendadas)

# Prerrequisitos

- Node >= 18.20.4[Download Node.js](https://nodejs.org/es/download)
- Npm (Ya viene con node.js)

# Iniciar proyecto

Instalar dependencias:

> [!NOTE]
> Si llegas a borrar el node_modules no pasa nada, solo vuelve a descargar las dependecias :relaxed:

```bash
npm i
# OR
pnpm i
```

Para correr el servidor :

```bash
npm run dev
# OR
pnpm run dev
```

Cuando termines de de editar un `fichero/archivo` por favor corre el siguente comando:

```bash
npm run lint
```

> [!IMPORTANT]
> Por favor de correr ese comando cuando termines de editar archivo

# Trabajar con git

Primero lo que necesitas hacer es descargar tu rama(ya esta en el repo remoto) y para hacerlo, realiza lo siguiente:

```bash
git checkout -b {nombreDeTuRama} origin/{nombreDeTuRama}
# Ejemplo
git checkout -b enrique origin/enrique
git pull
```

> [!NOTE]
> Todas las ramas las tienen el github, favor de cuando hagan este paso nombren sus ramas igual a la del repo remoto(github)

## Como debo trabajar?

Cuando ya hayas hecho la descarga del proyecto y tambien hayas creado tu rama (como sugeri en el punto anterior)
deberas quedarte **siempre** en tu rama, para no generar conflictos en la rama principal(main). Para cambiar de rama se hace lo siguente:

```bash
git switch {nombreRama}
#Ejemplo
git switch enrique
```

## Que hago cuando quiera subir cambios?

Cuando quieras hacer cambios al repo hay dos opciones subir los cambios como ya saben o hacer una pull request. Lo recomendable seria hacer una pull request pero solo suban sus cambios a su rama de la siguiente forma:

```bash
#Tiene que estar en tu rama para hacer esto
git push -u origin {nombreRama}
#Ejemplo
git push -u origin enrique
```

Cuando tus cambios esten arriba en tu rama, deberar realizar una [**Pull request**](#pull-request)

## Pull request

<!-- Falta completar -->

# Estructura del proyecto

```bash
src/
└── modules/
    ├── admin/
    │   ├── components/
    │   ├── pages/
    ├── adminEvents/
    │   ├── components/
    │   ├── pages/
    ├── auth/
    │   ├── components/
    │   ├── pages/
    ├── events/
        ├── components/
        ├── pages/
```

Esta sera la estructura que seguira el proyecto, se parace bastante a la que ocupamos en back. Partimos de la carpeta src donde tendremo el codigo fuente, dentro de **src** tenemos la carpeta modules(esta carpeta representa los modulos del proyecto o caracteristicas) y dentro tenemos las caracteristicas del proyecto com adminEventos, auth(autenticacion),etc cada una cuenta con su apartado de componentes,etc . Esto es para tener bien estrucuturado el proyecto. Si llegamos a tener otro modulo o caractistica tendremos que crear otra carpeta con el nombre del modulo junto con sus carpetas correspondientes.

**Si falta algun modulo por favor decirlo y lo agregamos.**

> [!IMPORTANT]
> Faltan algunas carpetas dentro de cada modulo, solo puse las principales o las que me acorde
> [!NOTE]
> Dentro de algunas carpetas encontraras un archivo example.jsx. No es importante, si quieres reenombralo esta bien

# Librerias/Dependencias

> [!NOTE]
> Si hay otra dependencia que nos pueda servir, favor de comentarlo :smiley_cat:

- React
- Lucid
- Heroui/Nextui
- Tailwind css
- React router

# Extensiones recomendadas

- [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)
- [Auto rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [Console Ninja](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja)
- [Env](https://marketplace.visualstudio.com/items?itemName=IronGeek.vscode-env)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Image Preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)
