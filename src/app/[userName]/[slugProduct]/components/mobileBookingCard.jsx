"use client";

import toRupiah from "@develoka/angka-rupiah-js";
import FlyingButton from "react-flying-item";
import { useRef, useState } from "react";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, useDisclosure, Text, Flex, Image, Input } from "@chakra-ui/react";

import color from "@/const/color";
import { useUserContext } from "@/context/UserContext";
import { fetchPOST } from "@/utils/fetchPOST";

export default function MobileBookingCard({ product, quantity, handleQuantityChange, handleIncrement, handleDecrement }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const btnRef = useRef();
  const user = useUserContext();

  const onAddCart = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const addCartResponse = await fetchPOST("/api/cart", { idUser: user.id, idProduct: product.productId, quantityProduct: quantity }, { component: "client" });

      console.log(addCartResponse);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

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
      <Button ref={btnRef} onClick={onOpen} w={"full"} backgroundColor={`${color.MAIN_COLOR}.500`} color={"white"} _hover={{ backgroundColor: `${color.MAIN_COLOR}.700` }} _active={{ color: `${color.MAIN_COLOR}.50` }} fontWeight={"bold"}>
        Add to cart
      </Button>
      <CartDrawer
        loading={loading}
        onAddCart={onAddCart}
        product={product}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        btnRef={btnRef}
        quantity={quantity}
        handleQuantityChange={handleQuantityChange}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </Stack>
  );
}

const CartDrawer = ({ loading, onAddCart, product, isOpen, onOpen, onClose, btnRef, quantity, handleQuantityChange, handleIncrement, handleDecrement }) => {
  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Choose booking amount</DrawerHeader>

        <DrawerBody>
          <Flex gap={"5"} direction={"column"} w={"full"}>
            <Flex gap={"3"} align={"center"}>
              <Image rounded="md" alt={`product of ${product.productName}`} src={product.productImage} fit="cover" align="center" w="52" h="52" />
              <Flex direction={"column"} gap={"3"}>
                <Text fontWeight={"semibold"} fontSize="lg" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" w="full">
                  {toRupiah(product.productPrice, { floatingPoint: 0 })}
                </Text>
                <Flex w={"full"} align="start" gap={"2"} direction={"column"}>
                  <Flex align="center" border={"1px"} borderColor={"gray.300"} rounded={"md"}>
                    <Button roundedRight={"none"} size="xs" onClick={handleDecrement} isDisabled={quantity <= 1 || loading} color={`${color.MAIN_COLOR}.500`} fontSize={"md"}>
                      -
                    </Button>
                    <Input
                      border="none"
                      padding="0"
                      margin="0"
                      value={quantity}
                      onChange={handleQuantityChange}
                      type="number"
                      min="0"
                      max={product.productQuantity}
                      textAlign="center"
                      width="35px"
                      height="auto"
                      fontSize="sm"
                      isRequired
                      isDisabled={loading}
                      _hover={{ borderColor: "none" }}
                      _focus={{ borderColor: "none", boxShadow: "none" }}
                    />
                    <Button roundedLeft={"none"} size="xs" onClick={handleIncrement} isDisabled={quantity >= product.productQuantity || loading} color={`${color.MAIN_COLOR}.500`} fontSize={"md"}>
                      +
                    </Button>
                  </Flex>
                  <Text fontSize="sm">In Stock: {product.productQuantity > 100000 ? "100k+" : product.productQuantity}</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justify={"space-between"}>
              <Text fontSize={"xl"} color={"black"}>
                Subtotal
              </Text>
              <Flex fontSize="xl" fontWeight={"bold"} lineHeight="tight" color={"orange.500"}>
                <Text>{toRupiah(product.productPrice * quantity, { floatingPoint: 0 })}</Text>
              </Flex>
            </Flex>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <form onSubmit={onAddCart} style={{ width: "100%" }}>
            <Button
              isLoading={loading}
              loadingText="Adding..."
              type="submit"
              w={"full"}
              backgroundColor={`${color.MAIN_COLOR}.500`}
              color={"white"}
              _hover={{ backgroundColor: `${color.MAIN_COLOR}.700` }}
              _active={{ color: `${color.MAIN_COLOR}.50` }}
              fontWeight={"bold"}
            >
              <FlyingButton src={product.productImage} targetTop={"-200%"} targetLeft={"100%"} flyingItemStyling={{ borderRadius: "1rem", width: "8rem" }} animationDuration={1.5}>
                <Text fontWeight={"bold"}>Add to cart</Text>
              </FlyingButton>
            </Button>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
