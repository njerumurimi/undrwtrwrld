import { ContentSection } from '../components/content-section'
import { DisplayForm } from './display-form'
import { type AuthUser } from 'wasp/auth';
import { useRedirectHomeUnlessUserIsAdmin } from '../../../useRedirectHomeUnlessUserIsAdmin'

export function DisplaySettingsPage({ user }: { user: AuthUser }) {

  if (user) {
    useRedirectHomeUnlessUserIsAdmin({ user });
  }

  return (
    <ContentSection
      title='Display'
      desc="Turn items on or off to control what's displayed in the app."
    >
      <DisplayForm />
    </ContentSection>
  )
}
