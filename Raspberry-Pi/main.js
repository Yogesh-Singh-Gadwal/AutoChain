//var md5 = require('md5');
//var ReverseMd5 = require('reverse-md5')
const REQ = require('request');
const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
var i = 0;

const server_Addr  = "http://WRITE LOCAL SERVER IP HERE"
var itemsArray=[];

// Set an Event handler for becons
scanner.onadvertisement = (ad) => {
i+=1;
var uuid=ad.iBeacon.uuid
itemsArray.push(uuid);
console.log("the uuid is "+uuid+"  |uuid hash is "+hash)
if(i==9999999999999){

  uniqueArray = itemsArray.filter(function(elem, pos) {
    return itemsArray.indexOf(elem) == pos;
});

  var option={
    uri:server_Addr+"/item/additem",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({list:uniqueArray})
  }
  REQ.post(option,(err,Res,body)=>{
    var inbound = JSON.parse(body)
    i=0;
    if(inbound.success){
      console.log("Data successfully sent");
    }else{
      console.log("Error sending data");
    }
  })
}

};
// Start scanning
scanner.startScan().then(() => {
  console.log('Started to scan')
}).catch((error) => {
  console.error(error);
});