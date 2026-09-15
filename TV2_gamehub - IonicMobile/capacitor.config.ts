import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = 
{
  appId: "com.tv2.gamehub.mobile",
  appName: "TV2 GameHub Mobile",
  webDir: "dist",
  server: 
  {
    androidScheme: "https"
  }
};

export default config;
