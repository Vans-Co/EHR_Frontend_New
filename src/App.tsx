import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { realtime } from "./services/realtime.service";
import { useAuthStore } from "./store/authStore";

function App() {
  const restoreSession = useAuthStore(
    (state) => state.restoreSession
  );
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    if (!accessToken) return;
    realtime.connect(accessToken);
    return () => realtime.disconnect();
  }, [accessToken]);

  return <AppRoutes />;
}

export default App;