import { Outlet } from 'react-router-dom'
import { getCookie } from '../../lib/cookies'
import { cn } from '../../lib/utils'
import { LayoutProvider } from '../../admin-dashboard/context/layout-provider'
import { SearchProvider } from '../../admin-dashboard/context/search-provider'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../layout/app-sidebar'
import { SkipToMain } from '../skip-to-main'
import * as React from 'react'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  return (
    <SearchProvider>
      <LayoutProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SkipToMain />
          <AppSidebar />
          <SidebarInset
            className={cn(
              // Set content container, so we can use container queries
              '@container/content',

              // If layout is fixed, set the height
              // to 100svh to prevent overflow
              'has-[[data-layout=fixed]]:h-svh',

              // If layout is fixed and sidebar is inset,
              // set the height to 100svh - spacing (total margins) to prevent overflow
              'peer-data-[variant=inset]:has-[[data-layout=fixed]]:h-[calc(100svh-(var(--spacing)*4))]'
            )}
          >
            {children ?? <Outlet />}
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  )
}
