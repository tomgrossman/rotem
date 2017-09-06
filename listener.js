'use strict';

const fs        = require('fs');
const path      = require('path');

let watcher = null;

exports.StartListen = function (SourcePath, DestPath) {
    if (!fs.existsSync(SourcePath) || !fs.existsSync(DestPath)) {
        return 'path does not exists';
    }

    return fileWatch(SourcePath, DestPath);
};

exports.StopListen = function () {
    if (null !== watcher) {
        watcher.close();
        watcher = null;
    }

    return true;
};

function fileWatch(sourcePath, destPath) {
    moveCurrentFiles(sourcePath, destPath);

    watcher = fs.watch(sourcePath, (eventType, fileName) => {
        return handleMoveFile(sourcePath, destPath, fileName);
    });

    return null !== watcher;
}

function moveCurrentFiles(sourceDir, destDir) {
    fs.readdir(sourceDir, (err, files) => {
        return files.forEach((file) => {
            return handleMoveFile(sourceDir, destDir, file);
        });
    });
}

function handleMoveFile(origDir, destDir, fileName) {
    let filePath = path.join(origDir, fileName);
    let newPath = path.join(destDir, fileName);

    if (!fs.existsSync(filePath)) {
        return true;
    }
    //do here other handling functions (like the txt request)

    return fs.rename(filePath, newPath);
}