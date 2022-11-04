import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  equipmentList:any[]=[1,1,1,1,1,1,11,1,1,1]
  constructor() { }

  ngOnInit(): void {
  }

}
