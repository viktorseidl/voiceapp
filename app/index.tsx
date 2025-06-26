import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const prepare = async () => {
      try {
        const network = await SecureStore.getItemAsync("network");
        if (network) {
          setRedirectTo("/home");
        } else {
          setRedirectTo("/network");
        }
      } catch (e) {
        console.warn("SecureStore error:", e);
        setRedirectTo("/network"); // fallback
      } finally {
        await SplashScreen.hideAsync(); // hide splash when done
      }
    };

    prepare();
  }, []);

  if (redirectTo === null) return null; // Still showing splash screen
  return <Redirect href={redirectTo} />;
}
