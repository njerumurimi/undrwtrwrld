import { ContentSection } from '../components/content-section'
import { AccountForm } from './account-form'
import { type AuthUser } from 'wasp/auth';
import { useRedirectHomeUnlessUserIsAdmin } from '../../../useRedirectHomeUnlessUserIsAdmin'

export function AccountSettingsPage({ user }: { user: AuthUser }) {

  if (user) {
    useRedirectHomeUnlessUserIsAdmin({ user });
  }

  return (
    <ContentSection
      title='Account'
      desc='Update your account settings. Set your preferred language and
          timezone.'
    >
      <AccountForm />
    </ContentSection>
  )
}
