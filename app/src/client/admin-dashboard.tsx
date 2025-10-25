import { Outlet } from 'react-router-dom'
import { getCookie } from '../admin/lib/cookies'
import { cn } from '../admin/lib/utils'
import { LayoutProvider } from '../admin/context/layout-provider'
import { SearchProvider } from '../admin/context/search-provider'
import { DirectionProvider } from '../admin/context/direction-provider'
import { SidebarInset, SidebarProvider } from '../admin/components/ui/sidebar'
import { AppSidebar } from '../admin/layout/app-sidebar'
import { SkipToMain } from '../admin/components/skip-to-main'
import React from 'react'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AdminDashboardLayout({ children }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  return (
    <DirectionProvider>
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
    </DirectionProvider>
  )
}
