import { Button } from '@vaa/components/button';
import { Section } from '@vaa/components/section/section';
import { Text } from '@vaa/components/text/text';
import { Title } from '@vaa/components/text/title';
import Link from 'next/link';

export function HomeBecomeChef() {
	return (
		<div className="bg-primary py-6 text-primary-content md:py-12 md:py-8">
			<Section className="flex flex-col items-center gap-4 md:gap-8">
				<Title className="text-2xl md:text-4xl">
					Start Cooking & Earning Today!
				</Title>

				<Text className="max-w-md text-center">
					Share your culinary passion with your community and earn money doing
					what you love
				</Text>

				<div className="flex w-full max-w-lg flex-col items-center">
					<Button
						size="lg"
						as={Link}
						variant="fill"
						href="/vendors/activate"
						color="neutral"
					>
						Become vendor
					</Button>
				</div>
			</Section>
		</div>
	);
}
