import { z } from "zod";

export const CreateTransactionSchema = z.object({
	amount: z.coerce.number().positive().multipleOf(0.01),
	note: z.string().optional(),
	date: z.coerce.date(),
	category: z.string(),
	type: z.union([z.literal("expense"), z.literal("income")]),
});

export type CreateTransactionSchemaType = z.infer<
	typeof CreateTransactionSchema
>;
