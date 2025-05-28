import { z } from 'zod';

export const VendorContactInformationSchema = z.object({
	firstName: z.string().min(1, 'First Name is required'),
	lastName: z.string().min(1, 'Last Name is required'),
	email: z.string().email('Invalid email address').min(1, 'Email is required'),
});

export const VendorAddressSchema = z.object({
	id: z.string().uuid().optional(), // Add id for stable keys
	streetAddressLine1: z.string().optional(),
	streetAddressLine2: z.string().optional(),
	city: z.string().min(1, 'City is required'),
	stateProvince: z.string().min(1, 'State/Province is required'),
	postalCode: z.string().min(1, 'Postal Code is required'),
	country: z.string().min(1, 'Country is required'),
	latitude: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
	longitude: z
		.number()
		.min(-180)
		.max(180, 'Longitude must be between -180 and 180'),
});

export const VendorActivationFormSchema = z.object({
	contact: VendorContactInformationSchema,
	addresses: z
		.array(VendorAddressSchema)
		.min(1, 'At least one address is required'),
});

export type VendorContactInformation = z.infer<
	typeof VendorContactInformationSchema
>;
export type VendorAddress = z.infer<typeof VendorAddressSchema>;
export type VendorActivationForm = z.infer<typeof VendorActivationFormSchema>;

export type VendorAccount = {
	id: string;
	name: string;
	handle: string;
	status: 'Pending Validation' | 'Active' | 'Rejected';
	contact: VendorContactInformation;
	addresses: VendorAddress[];
	createdAt: string;
	updatedAt: string;
};
