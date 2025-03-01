import Cart from "@/src/sections/cart";
import Details from "@/src/sections/details";
import { Container, Flex } from "@chakra-ui/react";

export default function IndexPage() {
  return (
    <Container maxWidth={"container.xl"} padding={0}>
      <Flex height={{ base: 'auto', md: "100vh" }} paddingY={[0, 10, 20]} direction={{ base: 'column-reverse', md: 'row' }}>
        <Details />
        <Cart />
      </Flex>
    </Container>
  );
}
