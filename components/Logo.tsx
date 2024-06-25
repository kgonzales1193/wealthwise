import { PiggyBank } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<Link href='/' className='flex items-center gap-2'>
			<Image src='/logo.svg' width={30} height={30} alt='logo' />
			<p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-2xl lg:text-4xl font-bold leading-tight tracking-tighter text-transparent'>
				Wealth Wise
			</p>
		</Link>
	);
}
