#!/bin/bash
set -e

echo clean...
rm -rf build/*

echo copy deps...
cp index.html build/

echo build ts...
tsc -b

echo DONE.
