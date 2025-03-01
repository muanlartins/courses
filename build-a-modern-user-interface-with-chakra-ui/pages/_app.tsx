import { ColorModeProvider } from "@/src/components/ui/color-mode";
import { system } from "@/theme";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { AppProps } from "next/app";
import '../styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider value={ system }>
      <ColorModeProvider>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default App;