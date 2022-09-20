export interface IPagination {
	total: number;
	per_page: number;
	page: number;
	from: number;
	to: number;
}

export interface IAddData {
	first_name: string;
	last_name: string;
	middle_name: string;
	email: string;
	iin_bin: number;
	password: any;
	role_id: string;
}

export interface IEditData {
	first_name: string;
	last_name: string;
	middle_name: string;
	email: string;
	iin_bin: number;
	password: any;
	role_id: string;
}
