import { z } from 'zod';

const userSchema = z.object({
	id: z.string().uuid(),
	name: z.string().max(50).min(8),
	lastName: z.string().max(50).min(8),
	birthDate: z.string().date().max(new Date('2026-01-01')),
	email: z.string().email().max(50).min(5),
	password: z.string().max(100).min(8),
	phone: z.string().max(10).min(10),
	residence: z.string().max(255).min(20),
	companyName: z.string().max(40).min(10),
	gender: z.string().max(20),
	occpation: z.string().max(50),
});

export function partialUser({ user }) {
	return userSchema.partial().safeParse(user);
}

export function completedUser({ user }) {
	return userSchema.safeParse(user);
}
