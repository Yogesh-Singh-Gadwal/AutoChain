import { Component, OnInit } from '@angular/core';
import {TxnsService} from '../../services/txns.service'

@Component({
  selector: 'app-find-uuid',
  templateUrl: './find-uuid.component.html',
  styleUrls: ['./find-uuid.component.css']
})
export class FindUuidComponent implements OnInit {

  uuid:String;
  response:String;

  constructor(private TXN:TxnsService) { }

  ngOnInit() {
  }
find(){
  this.TXN.findUUID(this.uuid).subscribe(res=>{
    // let inbound = JSON.parse(res);
    if(res.msg.success){
      this.response = "Currently "+this.uuid+" is with "+ res.msg.msg.to
    }else
    this.response="Error finding UUID"
  
  
    // this.response=JSON.stringify(res.msg)
  })
}

}
