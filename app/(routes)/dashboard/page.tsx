import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateTransactionDialog from "./_components/CreateTransactionDialog";
import Overview from "@/app/(routes)/dashboard/_components/Overview";
import History from "./_components/History";

export default async function Dashboard() {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const userSettings = await prisma.userSettings.findUnique({
		where: {
			userId: user.id,
		},
	});

	if (!userSettings) {
		redirect("/wizard");
	}

	return (
		<div className='h-full'>
			<div className='border-b bg-card'>
				<div className='container flex flex-wrap items-center justify-between gap-6 py-8'>
					<p className='text-3xl font-bold'>Hello, {user.firstName}! 👋</p>
					<div className='flex items-center gap-3'>
						<CreateTransactionDialog
							trigger={
								<Button
									variant={"outline"}
									className='border-emerald-500 bg-emerald-200  hover:bg-emerald-300 dark:bg-emerald-950 dark:hover:bg-emerald-700'>
									New Income
								</Button>
							}
							type='income'
						/>
						<CreateTransactionDialog
							trigger={
								<Button
									variant={"outline"}
									className='border-rose-500 bg-rose-200  hover:bg-rose-300 dark:bg-rose-950 dark:hover:bg-rose-700'>
									New Expense
								</Button>
							}
							type='expense'
						/>
					</div>
				</div>
			</div>
			<Overview userSettings={userSettings} />
			<History userSettings={userSettings} />
		</div>
	);
}
