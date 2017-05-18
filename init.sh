#!/bin/bash

npm i --save babel-core webpack webpack-dev-server
npm i --save-dev babel-loader babel-preset-es2015 babel-preset-react
npm i --save bignumber.js react react-dom
npm i --save oo7 oo7-parity oo7-react parity-reactive-ui

echo "All installed."

# Additional stuff for CSS bundling.
#npm i --save-dev style-loader css-loader
# { test: /\.css$/, use: [ { loader: "style-loader", options: { sourceMap: true } }, { loader: "css-loader"} ] },
#import '../style.css';
