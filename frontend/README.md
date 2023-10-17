# my.smallbra.in

Welcome to the README for this personal web page.

## 1. Requirements

### 1.1 Storage Server

#### Requirements:

- nginx ^1.25.2

### 1.2 Backend

#### Package Requirements:

- axios ^1.5.0
- bcryptjs ^2.4.3
- cors ^2.8.5
- dotenv ^16.0.3
- express ^4.18.2
- express-async-handler ^1.2.0
- helmet ^7.0.0
- jsonwebtoken ^9.0.0
- lodash ^4.17.21
- mongoose ^6.9.1
- multer ^1.4.5-lts.1
- node-fetch ^3.3.2
- swagger-ui-express ^5.0.0
- yaml ^2.3.2

### 1.3 Frontend

#### Package Requirements:

- @blueprintjs/core ^5.0.0
- @blueprintjs/icons ^5.0.0
- @blueprintjs/select ^5.0.0
- @blueprintjs/table ^5.0.0
- @craco/craco ^7.1.0
- axios ^1.3.2
- dotenv ^16.3.1
- lodash ^4.17.21
- markdown-to-jsx ^7.1.9
- postcss-flexbugs-fixes ^5.0.2
- prismjs ^1.29.0
- process ^0.11.10
- react ^18.2.0
- react-dom ^18.2.0
- react-icons ^4.11.0
- react-modal ^3.16.1
- react-router-dom ^6.8.1
- react-scripts 5.0.1
- react-syntax-highlighter ^15.5.0

## 2. Setting Up

### 2.1 nginx Storage Server & `storage` folder

You need this to store for markdown files which you upload. See example.static_files.nginx for the configuration. Make sure you have nginx installed.

#### 2.1.1 Install nginx

Install `nginx` per your system.

```shell
# Install nginx
brew install nginx

# Make a dir called 'storage' and create a nginx configuration file.
mkdir <project_root_folder>/storage
touch static_files.nginx
```

Copy the `example.static_files.nginx` content over to `static_files.nginx` and adjust the settings per your preferences. After, find your default `nginx.conf` file. Find the nginx directory on your system and open the file. At the end of the `nginx.conf` file, add this line:

```shell
# path/to/nginx/nginx.conf
...
include <project_root_folder>/storage/static_files.nginx
```

Adding this line will include the configuration file for nginx. The configuration will be included in usage upon nginx booting up.

```shell
brew services start nginx
# use `brew services restart nginx` if already running
```

It should be working now. Go to the server that `static_files.nginx` is being listened to on and see if an nginx server is active. Create an `.env` file at the project's root folder and copy the template from `<project_root_folder>/env.example`. Set the `STORAGE_PORT` to whatever is being listened to in the `static_files.nginx` config.

This `.env` will serve as the environment file for the backend.

### 2.2 Backend - Express and MongoDB

#### 2.2.1 MongoDB set up

Install MongoDB on your system. Make sure you create a collection and update the `.env` at the project root directory so the URI is pointed at your running MongoDB database.

#### 2.2.2 Install npm packages for backend

```
npm i <project_root_folder>/package.json
```

This should install all of the required packages. Update any other corresponding in the `.env`.

#### 2.2.3 Set up the OpenAPI UI

Since `swagger-ui-express` has been installed, you can go to `<project_root_folder>/documentation/api/swaggerUIOpts.js`. Update the corresponding variables for swagger in the `.env` file.

### 2.3 Frontend - React App

#### 2.3.1 Install npm packages for frontend

```
npm i <project_root_folder>/frontend/package.json
```

This uses create-react-app, so make sure to modify the `craco.config.js` in the `frontend` directory per your preferences. Do the same for the `.env` file that you need to create. You can refer to `<project_root_folder>/frontend/env.example` for the frontend's template.

### 2.4 Boot Servers

When finishing, you can use the script in `<project_root_folder>/scripts/start-dev.sh` and boot the (1) storage server, (2) express server, (3) OpenAPI UI server, and (4) the react frontend application. The MongoDB server will need to be booted up separately or you can modify the script to encapsulate checking and ensuring the MongoDB server has been booted.

```shell
bash <project_root_folder>/scripts/start-dev.sh
```

Look at `<project_root_folder>/package.json` to see the commands behind the `npm run` aliases that are being used in teh `start-dev.sh` script.

## 3. Notable Features

### 3.1 Swagger UI

- Comprehensive account of endpoints, their HTTP methods, query string parameter options, and response schemas.
  - The `swaggerUIOpts.js` file includes a method for retrieving a JWT and auto-authorize the client to test API endpoints that require admin. To disable this, and to instead get a JWT manually by registering or logging in a user who has more rights, go to the `.env` file at the project root and set this variable as such: `PRESET_SWAGGER_BEARER_AUTH=false`

### 3.2 Frontend

- **Listing Pages**
  - Pagination for listing pages
- **Detail Pages**
  - Blog Articles rendered from authored Markdown files
  - Portfolio detail pages include preview tabs for media and lightboxes
  - Clicking on category and tags will open a search query for the given tag to find results with the same overlapping properties
- **Search Omnibar** for public pages
  - filtering with text prefixes (e.g., title:\<query\> or category:\<query\> or tag:\<query\>, etc.)
  - filtering by type (i.e., blog or portfolio)
  - sorting (i.e., ascending, descending, oldest, newest)
  - syntax highlighting on search results
  - pagination for search yields uses infinite scrolling
  - includes hotkeys `⌘ + K` or `Ctrl + K` to open the search bar
- **Admin CMS**
  - Includes an Admin CMS where the owner can do CRUD operations for blog, portfolio, and resume content, found at the `/auth` path, where GitHub OAuth can be used or the user can simply register their email and password.
  - Blog articles uploaded take in a markdown file that will then be rendered via `markdown-to-jsx`. Files are automatically stored on the server.
  - Markdown files for Blog articles and resume documents can be edited within the CMS.
  - Listing of content displayed as a table with editable cells. More detailed editing can occur by clicking on the edit button, opening a side drawer to modify more of a target item's field.

## License

See `<project_root_folder>/LICENSE`
