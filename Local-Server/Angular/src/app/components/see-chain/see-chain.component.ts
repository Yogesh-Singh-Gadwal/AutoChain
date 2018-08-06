import { Component, OnInit } from '@angular/core';
import { TxnsService} from '../../services/txns.service';

@Component({
  selector: 'app-see-chain',
  templateUrl: './see-chain.component.html',
  styleUrls: ['./see-chain.component.css']
})
export class SeeChainComponent implements OnInit {
blocks:any;
response:String;
  constructor(private TXN:TxnsService) { }

  ngOnInit() {
    this.TXN.toGetChain().subscribe(res=>{
      if(res.success){
       this.blocks=res.msg;
       this.response="This is the updated chain fetched"; 
      }
      else{
        this.response="Error fetching chain";
      }
    });
  }

}
