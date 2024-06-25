"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	CreditCardIcon,
	LayoutGrid,
	LogOutIcon,
	Menu,
	PieChartIcon,
	WalletCardsIcon,
} from "lucide-react";
import SideNav from "./SideNav";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MobileNav() {
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
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side={"left"}>
				<SheetHeader>
					<div className='items-center mx-auto pt-5'>
						<Logo />
					</div>
				</SheetHeader>
				<div>
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
						<SignOutButton />
						<LogOutIcon />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
