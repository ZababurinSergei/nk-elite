#!/bin/bash

# Work project shell start file
# Emscripten SDK...

if [ ! -d ./node_modules ]; then
    npm install
fi

cd examples

if [ ! -d ./node_modules ]; then
    npm install
fi

npm run start

cd ..

exit 0
