import Logo from "@/components/Logo";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<div>{children}</div>
		</div>
	);
}
