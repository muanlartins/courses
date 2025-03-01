import { AspectRatio, Button, Heading, HStack, Image, Separator, Stack, Text, VStack } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";

export default function Cart() {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <VStack width={"full"} height={"full"} padding={10} alignItems={"flex-start"} spaceY={6} background={bgColor}>
      <VStack spaceY={3} alignItems={"flex-start"}>
        <Heading size={"4xl"}>Your cart</Heading>
        <Text display={"flex"} alignItems={"center"} height={"1.5rem"}> 
          If the price is too hard on your eyes,{' '}
          <Button onClick={toggleColorMode} padding={1} variant={"plain"} size={"xl"}>try changing the theme.</Button>
        </Text>
      </VStack>
      <HStack spaceX={6} alignItems={"center"} width={"full"}>
        <AspectRatio ratio={1} width={24}>
          <Image src="/images/skateboard.jpg" alt="Skateboard" />
        </AspectRatio>
        <Stack
          spaceY={0}
          width={"full"}
          display={"flex"}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <VStack width={"full"} spaceY={0} alignItems={"flex-start"}>
            <Heading size={"xl"}>Penny board</Heading>
            <Text color={secondaryTextColor}>PNYCOMP27541</Text>
          </VStack>
          <Heading size={"sm"} textAlign={"end"}>
            $119.00
          </Heading>
        </Stack>
      </HStack>
      <VStack spaceY={4} alignItems={"stretch"} width={"full"}>
        <HStack justifyContent={"space-between"}>
          <Text color={secondaryTextColor}>Subtotal</Text>
          <Heading size={"sm"}>$119.00</Heading>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text color={secondaryTextColor}>Shipping</Text>
          <Heading size={"sm"}>$19.99</Heading>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text color={secondaryTextColor}>Taxes (estimated)</Text>
          <Heading size={"sm"}>$23.80</Heading>
        </HStack>
      </VStack>
      <Separator width={"full"} />
      <HStack justifyContent={"space-between"} width={"full"}>
        <Text color={secondaryTextColor}>Total</Text>
        <Heading size={"lg"}>$162.79</Heading>
      </HStack>
    </VStack>
  )
}