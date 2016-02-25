#!/bin/bash

cordova plugin add cordova-plugin-x-toast #https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
cordova plugin add cordova-plugin-inappbrowser
cordova plugin add cordova-plugin-social-message
cordova plugin add cordova-plugin-file
cordova plugin add https://github.com/nchutchind/Streaming-Media-Cordova-Plugin.git
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-whitelist
cordova plugin add ionic-plugin-keyboard
cordova plugin add org.apache.cordova.media

npm install gulp --registry=https://registry.npm.taobao.org
npm install gulp-util --registry=https://registry.npm.taobao.org
npm install bower --registry=https://registry.npm.taobao.org
npm install gulp-concat --registry=https://registry.npm.taobao.org
npm install gulp-sass --registry=https://registry.npm.taobao.org
npm install gulp-minify-css  --registry=https://registry.npm.taobao.org
npm install gulp-rename  --registry=https://registry.npm.taobao.org
npm install shelljs  --registry=https://registry.npm.taobao.org
