import { auth } from "@clerk/nextjs/server";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	auth().protect();

	return (
		<div>
			<div className='fixed md:w-64 hidden md:block'>
				<SideNav />
			</div>
			<div className='md:ml-64'>
				<DashboardHeader />
				{children}
			</div>
		</div>
	);
}
