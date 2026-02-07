import { useAuth } from "@/context/auth.context";
import { fonts } from "@/themes/fonts";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useEffect, useMemo } from "react";

interface Props {
  children: ReactNode;
}

function AppBootstrap({ children }: Props) {
  const [fontsLoaded] = useFonts(fonts);

  const { loading: authLoading } = useAuth();

  const isAppReady = useMemo(
    () => fontsLoaded && !authLoading,
    [fontsLoaded, authLoading],
  );

  useEffect(() => {
    if (isAppReady) SplashScreen.hideAsync();
  }, [isAppReady]);

  if (!isAppReady) return null;

  return children;
}

export default AppBootstrap;
