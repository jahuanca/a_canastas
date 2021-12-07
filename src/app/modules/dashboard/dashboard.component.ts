import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isCollapsed = false;
  public href: string = "";
  lastHref: string='';

  constructor(private router: Router, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.href = this.router.url;
    let cadenas=this.href.split('/') as string[];
    
    this.lastHref=cadenas.pop();
  }

  cerrarSesion(){
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: '¿Desea cerrar sesión?',
      nzOkText: 'OK',
      nzOnOk: ()=>{
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      nzCancelText: 'Cancel'
    });
  }

}
