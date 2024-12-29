"use client";

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from "@/lib/query-client";

function ClientWrapper({ children }: readOnlyChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default ClientWrapper