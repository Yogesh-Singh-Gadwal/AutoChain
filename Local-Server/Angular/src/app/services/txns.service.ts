import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import "rxjs/add/operator/map";
import { headersToString } from '../../../node_modules/@types/selenium-webdriver/http';


@Injectable()
export class TxnsService {

  constructor(private http:Http) { }

getRequestsFromCloud(body){
  const header = new Headers();
  header.append("Content-Type","application/json");
  return this.http
  .post("http://127.0.0.1:4000/txn/getrequestsfromcloud",body,{headers:header})
  .map(res=>res.json());
}

getLocalItems(){
  return this.http
  .get("http://127.0.0.1:4000/item/getitems")
  .map(res=>res.json());
}

getRequestFromLocal(){
  return this.http
  .get("http://127.0.0.1:4000/txn/getrequestsfromlocal")
  .map(res=>res.json()); 
}

getConfirmationsFromCloud(body){
  const header = new Headers();
  header.append("Content-Type","application/json");
  return this.http
  .post("http://127.0.0.1:4000/txn/getconfirmationsfromcloud",body,{headers:header})
  .map(res=>res.json());
}

getAcceptedConfirmationsFromLocal(){
  return this.http
  .get("http://127.0.0.1:4000/txn/getconfirmationsfromlocal")
  .map(res=>res.json());
}

getAcceptedRequestFromLocal(){
  return this.http
  .get("http://127.0.0.1:4000/txn/getacceptedrequestsfromlocal")
  .map(res=>res.json());
}

onAccepting(body){
 console.log(body);
  const header = new Headers();
  header.append("Content-Type","application/json");
  return this.http
  .post("http://127.0.0.1:4000/txn/onaccept",body,{headers:header})
  .map(res=>res.json());
}

onRejecting(body){
  const header = new Headers();
  header.append("Content-Type","application/json");
  return this.http
  .post("http://127.0.0.1:4000/txn/onreject",body,{headers:header})
  .map(res=>res.json());
}

makeRequest(body){
  const header = new Headers();
  header.append("Content-Type","application/json");
  return this.http
  .post("http://127.0.0.1:4000/txn/makeReqs",body,{headers:header})
  .map(res=>res.json());
}

toGetUUID(body){
  const header = new Headers();
  header.append("Content-Type","application/json");
  return this.http
  .post("http://127.0.0.1:4000/txn/getuuid",body,{headers:header})
  .map(res=>res.json());
}

toGetChain(){
  return this.http
  .get("http://127.0.0.1:4000/item/getchain")
  .map(res=>res.json());
}

findUUID(uuid){
  let payload = {
    uuid:uuid
  }
  const header = new Headers();
  header.append("Content-Type","application/json");
  return this.http
  .post("http://127.0.0.1:4000/txn/finduuid",payload,{headers:header})
  .map(res=>res.json()); 
}
}
