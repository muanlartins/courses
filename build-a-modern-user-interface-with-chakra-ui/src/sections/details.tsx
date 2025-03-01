import { Button, Checkbox, createListCollection, Field, Fieldset, GridItem, Heading, Input, Select, SimpleGrid, Text, useBreakpointValue, useCheckbox, useSelect, VStack } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/src/components/ui/select";

export default function Details() {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  const shipToBillingAddress = useCheckbox();

  return (
    <VStack colorPalette={"brand"} width={"full"} height={"full"} padding={10} alignItems={"flex-start"} spaceY={10}>
      <VStack spaceY={3} alignItems={"flex-start"}>
        <Heading size={"4xl"}>Your details</Heading>
        <Text>If you already have an account, click here to log in.</Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w={"full"}>
        <GridItem colSpan={colSpan}>
          <Fieldset.Root>
            <Field.Root>
              <Field.Label>First Name</Field.Label>
              <Input variant={"subtle"} placeholder={"John"} />
            </Field.Root>
          </Fieldset.Root>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <Fieldset.Root>
            <Field.Root>
              <Field.Label>Last Name</Field.Label>
              <Input variant={"subtle"} placeholder={"Doe"} />
            </Field.Root>
          </Fieldset.Root>
        </GridItem>
        <GridItem colSpan={2}>
          <Fieldset.Root>
            <Field.Root>
              <Field.Label>Address</Field.Label>
              <Input variant={"subtle"} placeholder={"Blvd. Broken Dreams 21"} />
            </Field.Root>
          </Fieldset.Root>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <Fieldset.Root>
            <Field.Root>
              <Field.Label>City</Field.Label>
              <Input variant={"subtle"} placeholder={"San Francisco"} />
            </Field.Root>
          </Fieldset.Root>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <SelectRoot size={"md"} variant={"subtle"} collection={countries} defaultValue={["USA"]}>
            <SelectLabel>Country</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.items.map((country) => (
                <SelectItem item={country} key={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </GridItem>
        <GridItem colSpan={2}>
          <Checkbox.RootProvider defaultChecked value={shipToBillingAddress}>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>Ship to billing address.</Checkbox.Label>
            </Checkbox.Root>
          </Checkbox.RootProvider>
        </GridItem>
        <GridItem colSpan={2}>
          <Button variant={"primary"} width={"full"}>Place Order</Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

const countries = createListCollection({
  items: [
    { label: 'United States of America', value: 'USA' },
    { label: 'United Arab Emirates', value: 'UAE' },
    { label: 'North Macedonia', value: 'NMK' },
    { label: 'Germany', value: 'DE' }
  ]
});