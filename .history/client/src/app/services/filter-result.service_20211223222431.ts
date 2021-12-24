import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterResultService {

  private selectedProperty!: any;

  constructor() {
   }

  setSelectedProperty(data: any) {
    this.selectedProperty = data;
  }

  getSelectedPropery() {
    return this.selectedProperty;
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
