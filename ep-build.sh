#!/bin/bash

# Project's example shell build file
# Emscripten SDK...

export BUILDDIR=build

export CC=emcc
export EMCCFLAGS="-s MODULARIZE=1 -s EXPORT_ES6=1 -s SINGLE_FILE=0 -s TOTAL_MEMORY=200MB -s ALLOW_MEMORY_GROWTH=0 -s EXPORTED_RUNTIME_METHODS=['ccall','cwrap'] -s INVOKE_RUN=0 -O3"

if [ -d $BUILDDIR ]; then
    rm -r -d ./$BUILDDIR
fi

cd examples

export SOURCEDIR=src/this/free-queue
export KEEPFILE1=free-queue.js
export KEEPFILE2=free-queue-sab.js

find $SOURCEDIR -type f -not -name $KEEPFILE1 -not -name $KEEPFILE2 -delete

if [ -d ./dist ]; then
    rm -r -d ./dist
fi

cd ..

if [ ! -d ./$BUILDDIR ]; then
    mkdir -p ./$BUILDDIR
fi

cd src

export DIR=`pwd`
sh ./build.sh

cd ..

if [ ! -d ./node_modules ]; then
    npm install
fi

cd examples

if [ ! -d ./src/this/free-queue ]; then
    mkdir ./src/this/free-queue
fi

cp ../$BUILDDIR/*.* ./src/this/free-queue

if [ ! -d ./node_modules ]; then
    npm install
fi

#npm run start

cd ..

exit 0
