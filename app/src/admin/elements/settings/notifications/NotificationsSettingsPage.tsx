import { ContentSection } from '../components/content-section'
import { NotificationsForm } from './notifications-form'
import { type AuthUser } from 'wasp/auth';
import { useRedirectHomeUnlessUserIsAdmin } from '../../../useRedirectHomeUnlessUserIsAdmin'

export function NotificationsSettingsPage({ user }: { user: AuthUser }) {

  if (user) {
    useRedirectHomeUnlessUserIsAdmin({ user });
  }

  return (
    <ContentSection
      title='Notifications'
      desc='Configure how you receive notifications.'
    >
      <NotificationsForm />
    </ContentSection>
  )
}
