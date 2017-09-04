'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');

const Listener      = require('./listener');

const appServer = express();

appServer.use(
    bodyParser.json(
        {
            limit: '6mb'
        }
    )
);

appServer.use(express.static('public'));
appServer.use('/node_modules', express.static('node_modules'));

appServer.post(
    '/start-listening',
    function (req, res) {
        let sourcePath = req.body.sourcePath;
        let destPath = req.body.destinationPath;

        let startResult = Listener.StartListen(sourcePath, destPath);
        if (true !== startResult) {
            return res.status(501).end(startResult);
        }

        return res.end();
    }
);

appServer.get(
    '/stop-listening',
    function (req, res) {
        if (!Listener.StopListen()) {
            return res.status(501).end();
        }

        return res.end();
    }
);

appServer.listen(3333, function () {
    console.log('listening at port: ' + 3333);
});

