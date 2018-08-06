import { Component, OnInit } from '@angular/core';
import {TxnsService} from '../../services/txns.service';

@Component({
  selector: 'app-get-uuid',
  templateUrl: './get-uuid.component.html',
  styleUrls: ['./get-uuid.component.css']
})
export class GetUuidComponent implements OnInit {

  constructor(private TXN:TxnsService) { }
name:String;
type:String;
zone:String;
response:String;
  ngOnInit() {
  }

  submit(){
    let body = {
      productName:this.name,
      type:this.type,
      zone:this.zone
    }
    this.TXN.toGetUUID(body).subscribe(res=>{
      this.response=res.msg;
    })
  }
}
