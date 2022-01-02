export interface Review {
	_id: string; 
	name: string; // file name
	date: string; // ngay viet review nay
	rating: boolean; // diem danh gia
    author: string; // id cua User viet cai review nay
}
