"use client";

import { Button, Stack } from "@chakra-ui/react";

import color from "@/const/color";

export default function MobileBookingCard({ product, quantity, handleQuantityChange, handleIncrement, handleDecrement }) {
  return (
    <Stack display={{ base: "flex", lg: "none" }} position={"fixed"} bottom={"0"} w={"full"} h={"auto"} zIndex={"10"} p={"4"} bg={"white"} direction={"col"} shadow={"0px -2px 13px 0px #efdfde"}>
      <Button
        w={"full"}
        border={"1px"}
        borderColor={`${color.MAIN_COLOR}.500`}
        backgroundColor={"white"}
        color={`${color.MAIN_COLOR}.500`}
        _hover={{ color: `${color.MAIN_COLOR}.700`, borderColor: `${color.MAIN_COLOR}.700` }}
        _active={{ background: `${color.MAIN_COLOR}.50` }}
        fontWeight={"bold"}
      >
        Buy
      </Button>
      <Button w={"full"} backgroundColor={`${color.MAIN_COLOR}.500`} color={"white"} _hover={{ backgroundColor: `${color.MAIN_COLOR}.700` }} _active={{ color: `${color.MAIN_COLOR}.50` }} fontWeight={"bold"}>
        Add to cart
      </Button>
    </Stack>
  );
}
