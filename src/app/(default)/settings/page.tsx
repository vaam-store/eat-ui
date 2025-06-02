import { AuthWrapper } from '@vaa/components/auth/auth-wrapper';
import { SettingContent } from '@vaa/components/settings/setting-content';
import { Suspense } from 'react';

export default function SettingsPage() {
	return (
		<Suspense>
			<AuthWrapper>
				<SettingContent />
			</AuthWrapper>
		</Suspense>
	);
}
