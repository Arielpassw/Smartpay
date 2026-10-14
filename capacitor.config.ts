import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SmartPay',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000, // Tiempo que se muestra la imagen (2 segundos)
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      showSpinner: false,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
    }
  }
};

export default config;