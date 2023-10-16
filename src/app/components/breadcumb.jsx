"use client";

import unslugify from "@/utils/unslugify";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react";

import color from "@/const/color";
import { Link } from "@chakra-ui/next-js";

export default function BreadcumbComponent() {
  const pathname = usePathname();
  const filteredPath = pathname.split("/").filter((segment) => segment !== "");
  const [containerWidth, setContainerWidth] = useState(0);
  const breadcrumbContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (breadcrumbContainerRef.current) {
        setContainerWidth(breadcrumbContainerRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateLastItemMaxWidth = () => {
    let totalWidth = 0;

    for (let i = 0; i < filteredPath.length - 1; i++) {
      const breadcrumb = breadcrumbContainerRef.current?.querySelector(`#breadcrumb-${i}`);
      if (breadcrumb) {
        totalWidth += breadcrumb.offsetWidth;
      }
    }

    const lastItemMaxWidth = containerWidth - totalWidth - 90;
    return Math.max(lastItemMaxWidth, 0);
  };

  const lastItemMaxWidth = calculateLastItemMaxWidth();

  return (
    <div ref={breadcrumbContainerRef}>
      <Breadcrumb spacing="1" separator={<ChevronRightIcon color="gray.500" />} fontWeight="thin" px={4}>
        <BreadcrumbItem>
          <Link prefetch={false} href={"/"} _hover={{ textDecoration: "underline" }} color={`${color.MAIN_COLOR}.500`} fontWeight={"medium"}>
            Home
          </Link>
        </BreadcrumbItem>
        {filteredPath.map((path, index) => {
          const isLastItem = index === filteredPath.length - 1;

          return (
            <BreadcrumbItem key={index} isCurrentPage={isLastItem} id={`breadcrumb-${index}`} maxW={{ base: isLastItem ? `${lastItemMaxWidth}px` : "200px", md: "unset" }}>
              <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow={"ellipsis"}
                fontWeight={isLastItem ? "thin" : "medium"}
                maxWidth={isLastItem ? "full" : "unset"}
                flexShrink={isLastItem ? 0 : 1}
                color={isLastItem ? "black" : `${color.MAIN_COLOR}.500`}
                _hover={{ textDecoration: isLastItem ? "none" : "underline" }}
              >
                {isLastItem ? (
                  path
                ) : (
                  <Link href={`/${path}`} prefetch={false}>
                    {path}
                  </Link>
                )}
              </Text>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </div>
  );
}
