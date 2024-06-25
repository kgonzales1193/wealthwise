"use server";

import prisma from "@/lib/prisma";
import {
	CreateTransactionSchema,
	CreateTransactionSchemaType,
} from "@/schema/transaction";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateTransaction(form: CreateTransactionSchemaType) {
	const parsedBody = CreateTransactionSchema.safeParse(form);
	if (!parsedBody.success) {
		throw new Error(parsedBody.error.message);
	}

	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const { amount, category, date, note, type } = parsedBody.data;
	const categoryRow = await prisma.category.findFirst({
		where: {
			userId: user.id,
			name: category,
		},
	});
	if (!categoryRow) {
		throw new Error("Category not found");
	}

	// NOTE: don't be confused between $transaction (prisma) and prisma.transaction(table)
	await prisma.$transaction([
		//Create user transaction
		prisma.transaction.create({
			data: {
				userId: user.id,
				amount,
				date,
				note: note || "",
				type,
				category: categoryRow.name,
				categoryIcon: categoryRow.icon,
			},
		}),

		//Update aggregates table.

		prisma.monthOverview.upsert({
			where: {
				userId_day_month_year: {
					userId: user.id,
					day: date.getUTCDate(),
					month: date.getUTCMonth(),
					year: date.getUTCFullYear(),
				},
			},
			create: {
				userId: user.id,
				day: date.getUTCDate(),
				month: date.getUTCMonth(),
				year: date.getUTCFullYear(),
				expense: type === "expense" ? amount : 0,
				income: type === "income" ? amount : 0,
			},
			update: {
				expense: {
					increment: type === "expense" ? amount : 0,
				},
				income: {
					increment: type === "income" ? amount : 0,
				},
			},
		}),

		// Update Year aggregate table
		prisma.yearOverview.upsert({
			where: {
				userId_month_year: {
					userId: user.id,
					month: date.getUTCMonth(),
					year: date.getUTCFullYear(),
				},
			},
			create: {
				userId: user.id,
				month: date.getUTCMonth(),
				year: date.getUTCFullYear(),
				expense: type === "expense" ? amount : 0,
				income: type === "income" ? amount : 0,
			},
			update: {
				expense: {
					increment: type === "expense" ? amount : 0,
				},
				income: {
					increment: type === "income" ? amount : 0,
				},
			},
		}),
	]);
}
