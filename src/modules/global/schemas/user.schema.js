import { z } from 'zod';

const userSchema = z.object({
	id: z.string().uuid(),
	name: z.string().max(50).min(5),
	lastname: z.string().max(50).min(5),
	// birth_date: z.string().date(),
	email: z.string().email().max(50).min(5),
	password: z.string().max(100).min(8),
	phone: z.string().max(10).min(10),
	residence: z.string().max(255).min(10),
	company_name: z.string().max(40),
	gender: z.string().max(20),
	occupation: z.string().max(50),
});

const resetPasswordSchema = z.object({
	password: z.string().max(100).min(8),
	confirm_password: z.string().max(100).min(8),
});

export function partialUser({ user }) {
	return userSchema.partial().safeParse(user);
}

export function completedUser({ user }) {
	return userSchema.safeParse(user);
}

export function completedPasssword({ password }) {
	return resetPasswordSchema.safeParse(password);
}
