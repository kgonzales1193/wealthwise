import { ModeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import { MobileNav } from "./DashboardMobileNav";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Logo from "@/components/Logo";

export default function DashboardHeader() {
	return (
		<div className='p-5 shadow-sm border-b flex justify-between'>
			<div>
				<Breadcrumb className='hidden md:flex'>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href='/'>Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className='md:hidden flex items-center gap-4'>
					<MobileNav />
					<Logo />
				</div>
			</div>
			<div className='flex items-center gap-4'>
				<ModeToggle />
				<UserButton />
			</div>
		</div>
	);
}
