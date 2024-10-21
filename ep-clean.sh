#!/bin/bash

# Project's example shell clean file
# Emscripten SDK...

export BUILDDIR=build

if [ -d $BUILDDIR ]; then
    rm -r -d ./$BUILDDIR
fi

if [ -d ./node_modules ]; then
    rm -r -d ./node_modules
fi

cd examples

export SOURCEDIR=src/this/free-queue
export KEEPFILE1=free-queue.js
export KEEPFILE2=free-queue-sab.js

find $SOURCEDIR -type f -not -name $KEEPFILE1 -not -name $KEEPFILE2 -delete

if [ -d ./node_modules ]; then
    rm -r -d ./node_modules
fi

if [ -d ./dist ]; then
    rm -r -d ./dist
fi

cd ..

cd src

export DIR=`pwd`
sh ./automake.sh clean

cd ..

echo Example project: Clean completed...

exit 0