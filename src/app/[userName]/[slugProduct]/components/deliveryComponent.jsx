"use client";

import toRupiah from "@develoka/angka-rupiah-js";
import { useState, useEffect } from "react";
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaShippingFast } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";

import PostageModal from "./postageModal";
import { fetchPOST } from "@/utils/fetchPOST";

export const DeliveryComponent = ({ city, origin, destination, weight }) => {
  const [postage, setPostage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [regulerPrice, setRegulerPrice] = useState(null);
  const [etd, setEtd] = useState("...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPOST("/api/rajaongkir/cost", { origin, destination, weight }, { component: "client" });
        if (result.statusCode !== 200) throw Error(result.payload);
        setPostage(result.payload);
        setRegulerPrice(result.payload.POS[0].cost[0].value);
        setEtd(result.payload.POS[0].cost[0].etd.split(" ")[0]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box px={"3"}>
      <Heading fontSize={"xl"} fontWeight={"bold"}>
        Delivery
      </Heading>
      <Flex direction={"column"} pt={"2"}>
        <Flex gap={"2"} align={"baseline"}>
          <Icon as={SlLocationPin} transform={"translateY(1px)"} />
          <Text>
            Deliver from <span style={{ fontWeight: "bold" }}>{city}</span>
          </Text>
        </Flex>
        <Flex gap={"2"} align={"baseline"}>
          <Icon as={FaShippingFast} transform={"translateY(2px)"} />
          <Flex w={"full"} direction={"column"}>
            <Text>Postage Regular {regulerPrice ? toRupiah(regulerPrice, { formal: false, symbol: "IDR" }) : "....."}</Text>
            <Flex justify={{ sm: "space-between" }} w={"full"} direction={{ base: "column", sm: "row" }}>
              <Text color={"gray.500"}>Etd delivery {etd + " day"}</Text>
              <PostageModal postage={postage} weight={weight} city={city} isLoading={loading} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
