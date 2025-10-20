import { useSearchParams, useNavigate } from 'react-router-dom'
import { ConfigDrawer } from '../../components/config-drawer'
import { Header } from '../../layout/header'
import { Main } from '../../layout/main'
import { ProfileDropdown } from '../../components/profile-dropdown'
import { Search } from '../../components/search'
import { ThemeSwitch } from '../../components/theme-switch'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersProvider } from './components/users-provider'
import { UsersTable } from './components/users-table'
import { users } from './data/users'
import { type AuthUser } from 'wasp/auth';
import { useRedirectHomeUnlessUserIsAdmin } from '../../useRedirectHomeUnlessUserIsAdmin'

export function UsersPage({ user }: { user: AuthUser }) {

  if (user) {
    useRedirectHomeUnlessUserIsAdmin({ user });
  }

  const [searchParams, setSearchParams] = useSearchParams()
  const reactNavigate = useNavigate()

  // Build a lightweight "search" record out of URLSearchParams.
  const search: Record<string, unknown> = {}
  for (const key of Array.from(searchParams.keys())) {
    const vals = searchParams.getAll(key)
    if (vals.length > 1) {
      search[key] = vals.map((v) => {
        try { return JSON.parse(v) } catch { return v }
      })
    } else {
      const v = vals[0]
      if (v === undefined) continue
      try { search[key] = JSON.parse(v) } catch { search[key] = v }
    }
  }

  const navigate = (to: any) => {
    if (!to) return
    if (typeof to === 'string') {
      reactNavigate(to)
      return
    }
    const nextSearch = to.search ?? to
    const params = new URLSearchParams()
    Object.entries(nextSearch || {}).forEach(([k, v]) => {
      if (v === undefined || v === null) return
      if (Array.isArray(v)) {
        v.forEach((vv) => params.append(k, typeof vv === 'string' ? vv : JSON.stringify(vv)))
      } else if (typeof v === 'object') {
        params.set(k, JSON.stringify(v))
      } else {
        params.set(k, String(v))
      }
    })
    setSearchParams(params)
  }
  return (
    <UsersProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <UsersTable data={users} />
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
