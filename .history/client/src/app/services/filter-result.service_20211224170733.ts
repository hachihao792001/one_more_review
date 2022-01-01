import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterResultService {

  selectedProperty!: any;

  constructor(private http:HttpClient) {
   }

  setSelectedProperty(data: any) {
    this.selectedProperty = data;
  }

  getSelectedPropery():Observable<any>  {
    return this.http.get(this.selectedProperty);
  }

  // return listfilm
  getFilterResultList() {
    return [
      {
        id: 1,
        name: 'Spiderman - Homecoming',
        poster:
          'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
      },
      {
        id: 1,
        name: 'Spiderman - Homecoming',
        poster:
          'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
      },
      {
        id: 1,
        name: 'Spiderman - Homecoming',
        poster:
          'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
      },
      {
        id: 1,
        name: 'Spiderman - Homecoming',
        poster:
          'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
      },
      {
        id: 1,
        name: 'Spiderman - Homecoming',
        poster:
          'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
      },
      {
        id: 1,
        name: 'Spiderman - Homecoming',
        poster:
          'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
      },
      {
        id: 1,
        name: 'Spiderman - Homecoming',
        poster:
          'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
      },
      {
        id: 1,
        name: 'Spiderman - Homecoming',
        poster:
          'https://gamek.mediacdn.vn/133514250583805952/2021/11/17/photo-1-1637118381839432740223.jpg',
      },
    ];
  }
}
