import { ContentSection } from '../components/content-section'
import { AppearanceForm } from './appearance-form'
import { type AuthUser } from 'wasp/auth';
import { useRedirectHomeUnlessUserIsAdmin } from '../../../useRedirectHomeUnlessUserIsAdmin'

export function AppearanceSettingsPage({ user }: { user: AuthUser }) {

  if (user) {
    useRedirectHomeUnlessUserIsAdmin({ user });
  }

  return (
    <ContentSection
      title='Appearance'
      desc='Customize the appearance of the app. Automatically switch between day
          and night themes.'
    >
      <AppearanceForm />
    </ContentSection>
  )
}
