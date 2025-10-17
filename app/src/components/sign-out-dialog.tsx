import { useNavigate, useLocation } from 'react-router-dom'
import { ConfirmDialog } from './confirm-dialog'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = () => {
    // If Wasp auth client is available, call logout/reset via dynamic import
    try {
      // @ts-ignore: dynamic import of wasp client auth may not have types in this environment
      void import('wasp/client/auth').then((mod) => {
        try { mod.logout?.() } catch { }
      })
    } catch { }
    // Preserve current location for redirect after sign-in
    const currentPath = `${location.pathname}${location.search}`
    navigate('/sign-in', { replace: true, state: { redirect: currentPath } })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Sign out'
      desc='Are you sure you want to sign out? You will need to sign in again to access your account.'
      confirmText='Sign out'
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
