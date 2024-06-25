"use client";

import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

import {
	ChevronDown,
	CreditCardIcon,
	LayoutGrid,
	LogOutIcon,
	PieChartIcon,
	WalletCardsIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function SideNav() {
	const menuList = [
		{
			id: 1,
			name: "Dashboard",
			icon: LayoutGrid,
			path: "/dashboard",
		},
		{
			id: 2,
			name: "Accounts",
			icon: WalletCardsIcon,
			path: "/dashboard/accounts",
		},
		{
			id: 3,
			name: "Categories",
			icon: PieChartIcon,
			path: "/dashboard/categories",
		},

		{
			id: 4,
			name: "Transactions",
			icon: CreditCardIcon,
			path: "/dashboard/transactions",
		},
	];
	const path = usePathname();
	useEffect(() => {}, [path]);
	return (
		<div className='h-screen p-5 border shadow-sm'>
			<div className='flex items-center justify-center gap-2'>
				<Image src='/logo.svg' alt='logo' width={40} height={40} />
				<h3 className='font-semibold text-xl'>Wealth Wise</h3>
			</div>
			<div className='mt-5'>
				{menuList.map((menu, index) => (
					<Link href={menu.path} key={index}>
						<h2
							className={`flex gap-2 items-center text-gray-500 mb-2 dark:text-primary font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-orange-100 hover:bg-opacity-30 transition-all duration-300 ease-in-out ${
								path === menu.path &&
								"text-primary bg-orange-200 bg-opacity-50 "
							}`}>
							<menu.icon />
							{menu.name}
						</h2>
					</Link>
				))}
			</div>
			<div className='fixed bottom-10 flex gap-2 items-center group'>
				<LogOutIcon className='h-5 w-5 text-muted-foreground' />
				<SignOutButton />
			</div>
		</div>
	);
}
