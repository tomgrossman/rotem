'use strict';

const fs        = require('fs');
const path      = require('path');

let sourcePath = path.join(__dirname, 'source_path'); //default
let destPath = path.join(__dirname, 'dest_path'); //default
let activated = false;
let started = false;

exports.StartListen = function (SourcePath, DestPath) {
    if (!fs.existsSync(SourcePath) || !fs.existsSync(DestPath)) {
        return 'path does not exists';
    }

    sourcePath = SourcePath;
    destPath = DestPath;
    activated = true;

    if (!started) {
        return fileWatch();
    }

    return true;
};

exports.StopListen = function () {
    activated = false;

    return true;
};

function fileWatch() {
    started = true;
    fs.watch(sourcePath, function (eventType, fileName) {
        let filePath = path.join(sourcePath, fileName);
        let newPath = path.join(destPath, fileName);

        if (!activated || !fs.existsSync(filePath)) {
            return true;
        }

        return handleMoveFile(filePath, newPath);
    });

    return true;
}

function handleMoveFile(origPath, newPath) {
    //do here other handling functions (like the txt request)

    return fs.rename(origPath, newPath);
}