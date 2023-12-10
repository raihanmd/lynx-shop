"use client";

import { Suspense } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, Popover, PopoverContent, PopoverTrigger, Stack, Text, Box, Icon, Flex, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Badge } from "@chakra-ui/react";

const Cart = () => {
  return (
    <Stack direction={"row"} spacing={"4"} align={"center"}>
      <Box key={"Cart"}>
        <Popover trigger={"click"}>
          <PopoverTrigger>
            <Flex p={"1"} shadow={"full"} rounded={"full"} justify={"center"} align={"center"} _hover={{ cursor: "pointer" }} pos={"relative"}>
              <Icon as={AiOutlineShoppingCart} boxSize={"6"} color={"black"} />
              <Box w={"3"} h={"3"} rounded={"full"} bg={"red.500"} pos={"absolute"} top={"0"} right={"0"} borderColor={"white"} borderWidth={"medium"} />
            </Flex>
          </PopoverTrigger>
          <Suspense fallback={<LoadingPopoverCategories />}>
            <PopoverContent border={0} boxShadow={"lg"} bg={"white"} p={3} rounded={"xl"} minW={"xs"} color={"black"}>
              <PopoverArrow />
              <PopoverHeader>Cart</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Text>Hello</Text>
              </PopoverBody>
            </PopoverContent>
          </Suspense>
        </Popover>
      </Box>
    </Stack>
  );
};

const DesktopSubNav = ({ name }) => {
  return (
    <Link href={`/category/${name.toLowerCase()}`} role={"group"} display={"block"} py={2} px={3} rounded={"md"} _hover={{ bg: "green.50" }}>
      <Stack direction={"row"} align={"center"} color={"black"}>
        <Text fontSize={"sm"} transition={"all .3s ease"} _groupHover={{ color: "green.500" }} fontWeight={200}>
          {name}
        </Text>
      </Stack>
    </Link>
  );
};

const LoadingPopoverCategories = () => {
  return (
    <PopoverContent border={0} boxShadow={"lg"} bg={"white"} p={3} rounded={"xl"} minW={"xs"} color={"black"}>
      <Stack direction={"row"} align={"center"} color={"black"} py={2} px={3} rounded={"md"}>
        <Text fontSize={"sm"} transition={"all .3s ease"} fontWeight={200}>
          Loading...
        </Text>
      </Stack>
    </PopoverContent>
  );
};

export default Cart;
