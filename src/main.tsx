import { StrictMode } from 'react'
import './index.css'
import App from './components/App/App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
   <StrictMode>
  <QueryClientProvider client={queryClient}>
   <App />
    </QueryClientProvider>
    </StrictMode>,
)