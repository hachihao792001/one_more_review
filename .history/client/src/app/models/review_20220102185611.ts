export interface Review {
	_id: string; 
    name: string; // file name
    email: string,
	date: string; // ngay viet review nay
	rating: Number; // diem danh gia
    author: string; // id cua User viet cai review nay
}
