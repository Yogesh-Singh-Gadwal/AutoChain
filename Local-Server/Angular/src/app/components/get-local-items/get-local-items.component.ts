import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TxnsService } from '../../services/txns.service'

@Component({
  selector: 'app-get-local-items',
  templateUrl: './get-local-items.component.html',
  styleUrls: ['./get-local-items.component.css']
})
export class GetLocalItemsComponent implements OnInit {
  notify: String;
  items: any;

  constructor(private router: Router, private TXN: TxnsService) { }

  ngOnInit() {
setInterval(this.getItems(),1000*10);
  }

  getItems() {
    this.TXN.getLocalItems().subscribe(res => {
      if (res.success) {
        this.items = res.msg
        this.notify="These are the Items currently present in your stock."
      }
      else{
        this.notify="Error fetching items"
      }
    });
  }
}
