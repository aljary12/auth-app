import Routes from "@/routes";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { AuthProvider } from "./context/auth.context";
import AppBootstrap from "./screens/app-bootstrap";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function App() {
  return (
    <AuthProvider>
      <AppBootstrap>
        <Routes />
      </AppBootstrap>
    </AuthProvider>
  );
}

export default App;
