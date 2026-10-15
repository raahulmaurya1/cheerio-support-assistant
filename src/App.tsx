import { AppShell } from "./components/AppShell";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
