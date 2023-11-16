import { QueryClientProvider } from "@tanstack/react-query"
import { apiClient } from "../shared/api/api-client"

export const App: React.FC = () => {
  return <QueryClientProvider client={apiClient}>null</QueryClientProvider>
}