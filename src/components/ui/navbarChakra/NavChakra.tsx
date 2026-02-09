import {
  Box,
  Flex,
  Stack,
  HStack,
  Heading,
  Container,
  Icon,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { useSelector } from "react-redux";

import DropDownMenu from "./DropDownMenu";
import type { ICartItem } from "@/interface";
export default function NavBarChakra() {
  const { open, onOpen, onClose } = useDisclosure();
  const linkColor = "#6d28d9";
  const cartSelector = useSelector((state: ICartItem) => state.cart.cartItems);
  // const mobileHoverBg = useColorModeValue('gray.100', 'gray.700');
  // {useColorMode().colorMode === 'light' ? 'white' : 'gray.800'}
  return (
    <Box
      as="header"
      position={"sticky"}
      top="0"
      width="full"
      zIndex="55"
      bg="darkgray"
      boxShadow="md"
      px={4}
      mb={1}
    >
      <Container>
        <Flex h={14} align="center" justify="space-between">
          <HStack gap={3}>
            {/* Mobile Menu Button */}
            <IconButton
              aria-label="Toggle Menu"
              display={{ base: "block", sm: "none" }}
              onClick={open ? onClose : onOpen}
              variant="ghost"
            >
              <HiMenuAlt2 />
            </IconButton>

            {/* Logo */}
            <Link to={"/"}>
              <Heading size="md" cursor="pointer">
                <Flex align="center">
                  <Icon as={GoChevronLeft} color={linkColor} mr={1} />
                  <Text fontWeight="bold">
                    E-
                    <Box as="span" color={linkColor} ml={1}>
                      Store
                    </Box>
                  </Text>
                  <Icon as={GoChevronRight} color={linkColor} ml={1} />
                </Flex>
              </Heading>
            </Link>

            {/* navbar menu */}
            <Box display={{ base: "none", sm: "block" }}>
              <ul className="flex flex-row justify-content-center gap-4 cursor-pointer">
                <li>
                  <Link to="/about">About</Link>
                </li>

                <li>
                  <Link to="/signIn-Up">Login</Link>
                </li>
              </ul>
            </Box>

            {/* Desktop Dropdown */}
            </HStack>

          {/* favorite */}
          <Box display={{ base: "block" }}>
            {cartSelector.length > 0 ? <DropDownMenu /> : null}
          </Box>
        </Flex>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <Box pb={4} display={{ base: "block", sm: "none" }}>
          <Stack as="nav" gap={1}>
            {/* card on mobile view */}
            {/* {cartItems.map((item) => (
              <Stack>
                <HStack>
                  <img
                    alt="tania andrew"
                    src={item.images[0]}
                    className="relative inline-block h-10 w-10 rounded-full object-cover object-center"
                  />
                  <Text fontWeight="bold">{item.brand}</Text>
                  <Text fontSize="sm" color="gray.600">
                    ${item.price}
                  </Text>
                  X: {item.quantity}
                  <CloseButton
                    colorPalette="red"
                    size={"2xs"}
                    variant="subtle"
                    borderRadius={"lg"}
                    onClick={() => dispatch(removeFromCart(item))}
                  />
                </HStack>
              </Stack>
              // </Link>
            ))} */}
            <ul className="flex flex-col justify-content-center gap-4 cursor-pointer">
              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/signIn-Up">Login</Link>
              </li>
            </ul>
            {/* <DropDownMenu /> */}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
