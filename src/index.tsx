import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from '@/components/features/navigation/Navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
