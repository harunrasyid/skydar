import { VStack } from "@chakra-ui/react";

import { styles } from "./App.style";
import { Map } from "@/components/Map/Map";

function App() {
  return (
    <VStack css={styles.page}>
      <Map />
    </VStack>
  );
}

export default App;
