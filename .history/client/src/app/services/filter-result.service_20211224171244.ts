import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterResultService {
  private subject = new Subject();
  public obsForComponent = this.subject.asObservable();
  
  setSelectedProperty(condition: any){
      this.subject.next(condition) // Sets the new Observable value that can be listened in components 
  }
  selectedProperty!: any;

  constructor(private http:HttpClient) {
   }



  getSelectedPropery():Observable<any>  {
    return this.http.get(this.subject);
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
