import { ContentSection } from '../components/content-section'
import { AccountForm } from './account-form'

export function AccountSettingsPage() {
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
