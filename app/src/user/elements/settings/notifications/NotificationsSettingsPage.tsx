import { ContentSection } from '../components/content-section'
import { NotificationsForm } from './notifications-form'

export function NotificationsSettingsPage() {
  return (
    <ContentSection
      title='Notifications'
      desc='Configure how you receive notifications.'
    >
      <NotificationsForm />
    </ContentSection>
  )
}
