export interface CreateVendor {
	name: string;
	handle?: string;
	logo?: string;
	admin: {
		email: string;
		first_name?: string;
		last_name?: string;
	};
}

export type Vendor = {
	id: string;
	handle: string;
	name: string;
	logo: string | null;
	admins: {
		id: string;
		first_name: string | null;
		last_name: string | null;
		email: string;
		created_at: Date;
		updated_at: Date;
		deleted_at: Date | null;
		vendor_id: string;
	}[];
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
};
