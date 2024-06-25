import clsx from "clsx";

type BoundedProps = {
	as?: React.ElementType;
	className?: string;
	children: React.ReactNode;
};

export default function Bounded({
	as: Comp = "section",
	className,
	children,
	...props
}: BoundedProps) {
	return (
		<Comp className={clsx("px-4 py-4 md:px-6 lg:py-6", className)} {...props}>
			<div className='container mx-auto max-w-7xl'>{children}</div>
		</Comp>
	);
}
