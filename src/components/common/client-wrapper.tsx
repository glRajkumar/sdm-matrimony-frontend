"use client";

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from "@/lib/query-client";
import Instructions from './instructions';

function ClientWrapper({ children }: readOnlyChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Instructions />
    </QueryClientProvider>
  )
}

export default ClientWrapper