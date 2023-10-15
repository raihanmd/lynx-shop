"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, Text, Button } from "@chakra-ui/react";

import color from "@/const/color";

const textStyles = {
  WebkitLineClamp: 10,
  lineClamp: 10,
  WebkitBoxOrient: "vertical",
  boxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

function ProductTabs({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) setShowReadMoreButton(textRef.current.scrollHeight !== textRef.current.clientHeight);
  }, []);

  return (
    <Tabs position="relative" variant="unstyled" size={"sm"} colorScheme="black">
      <TabList borderBottom={"1px"} borderColor={"gray.200"}>
        <Tab fontWeight={"semibold"}>Description</Tab>
        <Tab fontWeight={"semibold"}>Information</Tab>
      </TabList>

      <TabIndicator mt="-2px" height="3px" bg={`${color.MAIN_COLOR}.500`} />
      <TabPanels pt={1}>
        <TabPanel>
          {/* //! masih cara ngakalin!! */}
          <pre ref={textRef} className="hidden" style={isExpanded ? { overflow: "hidden", display: "-webkit-box" } : textStyles}>
            {product.productDescription}
          </pre>
          {showReadMoreButton ? (
            <>
              <pre style={isExpanded ? { overflow: "hidden", display: "-webkit-box" } : textStyles}>{product.productDescription}</pre>
              <Button variant={"link"} color={`${color.MAIN_COLOR}.500`} onClick={() => setIsExpanded((prev) => !prev)}>
                {isExpanded ? "Read Less" : "Read More"}
              </Button>
            </>
          ) : (
            <Text>{product.productDescription}</Text>
          )}
        </TabPanel>
        <TabPanel>
          <Text>{product.ownerShopDescription || "User shop description"}</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ProductTabs;
