import { Component, OnInit } from '@angular/core';
import { Distribuidor } from '../../models/distribuidor.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  distribuidor: Distribuidor[] = JSON.parse(localStorage.getItem('distribuidores'));

  constructor() { }

  ngOnInit(): void {
  }

}
