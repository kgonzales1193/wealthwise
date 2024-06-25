"use client";

import Link from "next/link";
import Bounded from "./Bounded";
import Logo from "./Logo";
import { ModeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
	const { user, isSignedIn } = useUser();
	return (
		<Bounded as='header' className='border-b shadow-sm backdrop-blur-sm mb-2'>
			<div className='flex justify-between'>
				<Logo />
				<div className='flex gap-4 items-center justify-center'>
					<ModeToggle />

					{isSignedIn ? (
						<>
							<Link href={"/dashboard"}>
								<Button size={"sm"}>Dashboard</Button>
							</Link>
							<UserButton />
						</>
					) : (
						<Link href='/sign-in'>
							<Button size='sm'>Get Started</Button>
						</Link>
					)}
				</div>
			</div>
		</Bounded>
	);
}
