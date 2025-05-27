interface AuthPageHeaderProps {
	title: string;
}

export function AuthPageHeader({ title }: AuthPageHeaderProps) {
	return (
		<header className="flex flex-col justify-center">
			<h1 className="text-2xl text-bold">{title}</h1>
		</header>
	);
}
