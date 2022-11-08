import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { newEquipment } from 'src/app/shared/models/newEquipment.model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(private http: HttpClient) {}

  private url: string = environment.API_URL;

  getAllEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.url}/api/equipment`);
  }

  createEquipment(newEquip: newEquipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.url}/api/equipment`, newEquip);
  }

  deleteEquipment(id: string): Observable<any>{
    return this.http.delete<any>(`${this.url}/api/equipment/${id}`)
  }

  updateEquipment(id: string, equipment: Equipment): Observable<any>{
    return this.http.put<any>(`${this.url}/api/equipment/${id}`, equipment)
  }
}
