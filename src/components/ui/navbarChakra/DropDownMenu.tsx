import {
  Stack,
  Link,
  Text,
  Icon,
  HStack,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Popover,
  Float,
  Circle,
  CloseButton,
  ScrollArea,
  Box,
} from "@chakra-ui/react";

import { FaChevronDown } from "react-icons/fa";
import { useColorModeValue } from "../color-mode";
import { LuShoppingBasket } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import type { ICartItem, IProduct } from "@/interface";
import { removeFromCart } from "../../../redux/Redusers";
// import { Link } from "react-router-dom";

const DropDownMenu = () => {
  const linkColor = "#6d28d9";
  const { open, onOpen, onClose } = useDisclosure();
  const cartItems = useSelector((state: ICartItem) => state.cart.cartItems);

  return (
    <Stack direction="row" gap={4}>
      <Popover.Root
        open={open}
        onOpenChange={() => (open ? onClose() : onOpen())}
      >
        <PopoverTrigger>
          <HStack
            cursor="pointer"
            role="group"
            aria-haspopup="menu"
            // bg={"blue"}
          >
            <Box position="relative">
              <Float>
                <Circle
                  size="5"
                  bg="white"
                  color="red"
                  opacity={0.5}
                  fontSize={"sm"}
                >
                  {cartItems.length}
                </Circle>
              </Float>
              <Link
                href="#"
                p={1}
                fontSize={{ sm: "md", md: "lg" }}
                fontWeight="bold"
                color={useColorModeValue("gray.600", "gray.200")}
                _groupHover={{ color: linkColor }}
                _hover={{ textDecoration: "none" }}
              >
                <LuShoppingBasket />
              </Link>
            </Box>
            <Icon
              as={FaChevronDown}
              h={5}
              w={5}
              transition="transform 0.25s ease-in-out"
              transform={open ? "rotate(180deg)" : "rotate(0deg)"}
              _groupHover={{ color: linkColor }}
              color={linkColor}
            />
          </HStack>
        </PopoverTrigger>

        <Popover.Positioner>
          <PopoverContent
            border="solid"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow="lg"
            p={4}
            rounded="lg"
            minW="xs"
            placeContent={"end"}
          >
            <Stack>
              {/* {menuData.map((item) => (
                <DropDownItem key={item.id} {...item} linkColor={linkColor} />
              ))} */}
              <ScrollArea.Root height="9.5rem">
                <ScrollArea.Viewport>
                  <ScrollArea.Content spaceY="1" textStyle="sm" mr={3} p={2}>
                    {cartItems.map((item) => (
                      <DropDownItem
                        key={item.id}
                        {...item}
                        linkColor={linkColor}
                      />
                    ))}
                  </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar>
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
              </ScrollArea.Root>
            </Stack>
          </PopoverContent>
        </Popover.Positioner>
      </Popover.Root>
    </Stack>
  );
};

const DropDownItem = ({
  title,
  description,
  linkColor,
  images,
  price,
  quantity,
  id,
}: IProduct) => {
  const dispatch = useDispatch();
  return (
    <Link
      // href={href}
      p={2}
      rounded="md"
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        color: linkColor,
        textDecoration: "none",
      }}
    >
      <Stack gap={0}>
        <HStack position={"relative"}>
          <img
            alt="tania andrew"
            src={images[0]}
            className="relative inline-block h-10 w-10 rounded-full object-cover object-center"
          />
          <Stack>
            <Text fontWeight="medium">{title}</Text>
            <Text fontSize="sm" opacity={0.8} lineClamp="2">
              {description}
            </Text>
            {/* qty + price */}
            <div className="flex flex-col gap-1 ml-4">
              <p className="text-slate-500 text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 mr-1 text-slate-400"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
                  />
                  <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                  <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                  <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                </svg>
                {quantity} x {price}
              </p>
            </div>
          </Stack>
          <CloseButton
            colorPalette="red"
            size={"2xs"}
            variant="subtle"
            borderRadius={"lg"}
            position={"absolute"}
            top="-4"
            right="-3"
            onClick={() => dispatch(removeFromCart({ id }))}
          />
        </HStack>
      </Stack>
    </Link>
  );
};

export default DropDownMenu;
