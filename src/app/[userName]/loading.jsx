"use client";

import { Flex, Box, Skeleton, Image, Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel } from "@chakra-ui/react";

function LoadingUserPage() {
  return (
    <>
      <Flex w={"full"} px={"4"}>
        <Flex gap={"2"} height={"5"}>
          <Skeleton width={"auto"}>
            <Box>Home</Box>
          </Skeleton>
          <Skeleton width={"4"}></Skeleton>
          <Skeleton width={"auto"}>
            <Box>Some long username</Box>
          </Skeleton>
        </Flex>
      </Flex>
      <Flex py={"3"} w="full" px={"2"}>
        <Skeleton w={"full"} height={"64"} rounded="md"></Skeleton>
      </Flex>

      <Tabs position="relative" variant="unstyled" size={"md"} colorScheme="black">
        <TabList borderBottom={"1px"} borderColor={"gray.200"}>
          <Tab fontWeight={"semibold"}>
            <Skeleton w={"90px"} h={"18px"} />
          </Tab>
          <Tab fontWeight={"semibold"}>
            <Skeleton w={"90px"} h={"18px"} />
          </Tab>
        </TabList>
        <TabIndicator mt="-2px" height="3px" bg="green.500" />
        <TabPanels>
          <TabPanel>
            <Flex mt={"1"} w={"full"} justifyContent="center" direction={"row"} alignContent={"start"} flexWrap={"wrap"} gap={"2"}>
              {Array(24)
                .fill("")
                .map((_, i) => (
                  <Box key={i} className={"card-product"}>
                    <Box bg={"white"} w={{ base: "full", sm: "48" }} h={"auto"} rounded="sm" shadow="sm" position="relative">
                      <Skeleton roundedTop="sm" w={"full"} h={"48"} />
                      <Box p={"2"}>
                        <Flex direction={"column"} justifyContent="space-between" alignContent="center" gap={"2"} h={"4.5em"}>
                          <Flex direction={"column"} gap={"1"}>
                            <Skeleton h={"2.5"}></Skeleton>
                            <Skeleton h={"2.5"}></Skeleton>
                            <Skeleton h={"2.5"}></Skeleton>
                          </Flex>
                          <Flex justifyContent={"space-between"}>
                            <Skeleton w={"20"} h={"2"}></Skeleton>
                            <Skeleton w={"12"} h={"2"}></Skeleton>
                          </Flex>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex gap={2} direction={"column"}>
              <Skeleton w={"full"} h={"18px"} />
              <Skeleton w={"full"} h={"18px"} />
              <Skeleton w={"full"} h={"18px"} />
              <Skeleton w={"full"} h={"18px"} />
              <Skeleton w={"full"} h={"18px"} />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default LoadingUserPage;
