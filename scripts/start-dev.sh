#!/bin/bash

# Check if nginx is running
if brew services list | grep nginx | grep started >/dev/null; then
    echo "Nginx is running, will not execute start NGINX command..."
else
    echo "Nginx is not running, starting..."
    brew services start nginx
fi

# Run npm scripts
npm run server &
npm run swagger-ui &
npm run client