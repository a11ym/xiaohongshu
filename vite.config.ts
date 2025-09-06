import viteCommonJS from 'vite-plugin-commonjs';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { qrcode } from "vite-plugin-qrcode";
// import babel from 'vite-plugin-babel';

// import { esbuildFlowPlugin } from "@bunchtogether/vite-plugin-flow";


// https://tamagui.dev/docs/intro/installation
const extensions = [
  ".web.tsx",
  ".tsx",
  ".web.ts",
  ".ts",
  ".web.jsx",
  ".jsx",
  ".web.js",
  ".js",
  ".css",
  ".json",
  ".mjs",
];

const development = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: true,
  plugins: [
    react(),
    qrcode(),
    viteCommonJS(),
    // babel({
    //   babelConfig: {
    //     include: [/node_modules\/(react-native|@react-native)/],
    //     plugins: [
    //       [
    //         '@babel/plugin-transform-modules-commonjs',
    //         {
    //           strict: false,
    //           strictMode: false,
    //           allowTopLevelThis: true,
    //         },
    //       ],
    //     ],
    //   },
    // }),
  ],
  define: {
    // https://github.com/bevacqua/dragula/issues/602#issuecomment-1296313369
    global: "window",
    __DEV__: JSON.stringify(development),
    // https://tamagui.dev/docs/intro/installation
    DEV: JSON.stringify(development),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    extensions: extensions,
    alias: {
      "react-native": "react-native-web",
    },
  },
  optimizeDeps: {
    // include: [
    //   'react-native-reanimated',
    //   'react-native-gesture-handler',
    // ],
    // needsInterop: [
    //   'react-native-reanimated', 'react-native-gesture-handler', '@gorhom/bottom-sheet', '@react-native-async-storage/async-storage', '@react-native-vector-icons/feather', '@react-navigation/bottom-tabs', '@react-navigation/drawer', '@react-navigation/elements', '@react-navigation/material-top-tabs', '@react-navigation/native', '@react-navigation/native-stack', 'react-native', 'react-native-modal', 'react-native-safe-area-context'
    // ],
    esbuildOptions: {
      resolveExtensions: extensions,
      // https://github.com/vitejs/vite-plugin-react/issues/192#issuecomment-1627384670
      jsx: "automatic",
      // need either this or the plugin below
      loader: { ".js": "jsx", ".ts": "tsx" },
      // plugins: [
      //   esbuildFlowPlugin(/\.(flow|jsx?)$/, (path) =>
      //     /\.jsx$/.test(path) ? "jsx" : "jsx"
      //   ),
      // ],
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/]
    }
  }
});
