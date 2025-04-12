import type React from "react"
import ClientOnlyGuard from "./client-only-guard"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return  <ClientOnlyGuard>
      {children}
    </ClientOnlyGuard>
}

