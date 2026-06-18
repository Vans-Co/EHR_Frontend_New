import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/authStore";

function App() {
  const restoreSession = useAuthStore(
    (state) => state.restoreSession
  );

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return <AppRoutes />;
}

export default App;