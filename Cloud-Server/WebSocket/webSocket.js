var WebSocket = require('ws')

var p2p_port = process.env.p2p_port || 6009

var initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

var peersArray = module.exports.socket = [];



module.exports.initP2PServer = () => {

    var server = new WebSocket.Server({ port: p2p_port });
    server.on('connection', ws => {
        initConnection(ws);
        

        ws.on("close", function (conn) {
            //console.log(Object.keys(ws));

            if (peersArray.length != 0) {
                peersArray.forEach(function (ele, ind) {
                    if (ele.conIP == ws.conIP) {
                        peersArray.splice(ind, 1)
                        console.log(ind)
                    }
                })
            }

            console.log("close : " + ws.conIP);
        });

        ws.on("error", function (e) {

            if (peersArray.length != 0) {
                peersArray.forEach(function (ele, ind) {
                    if (ele.conIP == ws.conIP) {
                        peersArray.splice(ind, 1)
                        console.log(ind)
                    }
                })
            }

            console.log("error handle : " + ws.conIP);

        })



    })
    console.log('listening websocket on :' + p2p_port);
}


var initConnection = (ws) => {
    ws.conIP = ws._socket.remoteAddress.split(":")[3];
    peersArray.push(ws);

};



var initMessageHandler = (ws) => {

    ws.on('message', (data) => {

        console.log("Message In:");
        const msg = JSON.parse(data)
        console.log(msg.event)
    })

    console.log("message handler setup");


}



module.exports.connectToPeers = (newPeers) => {

    newPeers.forEach(function (peer) {

        var ws = new WebSocket(peer)
        ws.on('open', () => initConnection(ws));
        ws.on('error', () => {
            console.log("connection fail")
        });
    });

};


var write = (ws, message) =>
    ws.send(JSON.stringify(message));

module.exports.brodcast = (message) => peersArray.forEach(socket => write(socket, message));
module.exports.connectToPeers(initialPeers);

