import { VStack, Spinner, Box } from "@chakra-ui/react";
import styles from "../styles/loader.module.css";

const Loading = () => {
  return (
    <VStack
      h={"80vh"}
      justifyContent={"center"}
      w={"100%"}
      alignItems={"center"}
      className={styles.backdrop}
    >
      <div className={styles.loader}></div>
    </VStack>
  );
};

export { Loading };
