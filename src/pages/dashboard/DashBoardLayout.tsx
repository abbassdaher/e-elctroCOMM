import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Drawer,
  IconButton,
  useDisclosure,
  DrawerContent,
  Button,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { FaBell } from "react-icons/fa";
import { AiOutlineTeam, AiOutlineHome } from "react-icons/ai";
import { BsFolder2, BsCalendarCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";
import { useColorMode } from "../../components/ui/color-mode";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isCreateProduct } from "../../redux/Slices/createProductSlice";
// import { useCreateProductMutation } from "../../redux/RTKQuery/ProductsList";

export default function DashboardLayout() {
  const { open, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  // const handleCreateProduct = (state) => {state.createProduct = true;};

  return (
    <Box
      as="section"
      bg={colorMode === "light" ? "gray.50" : "gray.700"}
      minH="100vh"
      ml={{ base: 0, lg: 60, md: 60 }}
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />

      <Drawer.Root open={open} onOpenChange={onClose} placement={"start"}>
        <Drawer.Positioner>
          <Drawer.Body>
            <DrawerContent>
              <SidebarContent borderRight="none" />
            </DrawerContent>
          </Drawer.Body>
        </Drawer.Positioner>
      </Drawer.Root>
      {/*  */}
      <Box transition=".3s ease">
        {/* navbar */}
        <Flex
          as="header"
          align="center"
          justifyContent={{ base: "space-between", md: "flex-end " }}
          w="full"
          px="4"
          borderBottomWidth="1px"
          borderColor={colorMode === "light" ? "inherit" : "gray.700"}
          bg={colorMode === "light" ? "white" : "gray.800"}
          boxShadow="sm"
          h="20"
          gap={2}
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={() => onOpen()}
            size="md"
          >
            <FiMenu />
          </IconButton>
          {/* create post button */}
          <Button
            color="#fff"
            rounded="md"
            bg="#3b49df"
            _hover={{ bg: "#323ebe" }}
            onClick={() => {
              dispatch(isCreateProduct(true));
            }}
          >
            Create a product
          </Button>
          {/* avatart */}
          <Flex align="center">
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <Avatar.Root size="sm" key="sm" cursor={"pointer"}>
              <Avatar.Fallback name="avatar" />
              <Avatar.Image src="https://avatars2.githubusercontent.com/u/37842853?v=4" />
            </Avatar.Root>
          </Flex>
        </Flex>
        {/* Layout */}
        <Box
          // as="main"
          p={0}
          minH="25rem"
          // width={"100%"}
          bg={colorMode === "light" ? "auto" : "gray.800"}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ ...props }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      // pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={colorMode === "light" ? "white" : "gray.800"}
      borderColor={colorMode === "light" ? "inherit" : "gray.700"}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      {/* header */}
      <Flex px="4" py="5" align="center">
        <Icon as={RiFlashlightFill} h={8} w={8} />
        <Text
          fontSize="2xl"
          ml="2"
          color={colorMode === "light" ? "brand.500" : "white"}
          fontWeight="semibold"
        >
          Administrator
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="md"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem
          icon={AiOutlineHome}
          OnClickHandler={() => {
            console.log("dashboard");
          }}
        >
          <Link to="/dashboardLayout">Dashboard</Link>
        </NavItem>
        <NavItem
          icon={AiOutlineTeam}
          OnClickHandler={() => {
            console.log("products");
          }}
        >
          <Link to="/dashboardLayout/products">Products</Link>
        </NavItem>
        <NavItem
          icon={BsFolder2}
          OnClickHandler={() => {
            console.log("categories");
          }}
        >
          <Link to="/dashboardLayout/categories">Categories</Link>
        </NavItem>
        <NavItem
          icon={BsCalendarCheck}
          OnClickHandler={() => {
            console.log("calendar");
          }}
        >
          <Link to="/dashboardLayout/calendar">Calendar</Link>
        </NavItem>
      </Flex>
    </Box>
  );
};

const NavItem = (props: {
  icon: React.ElementType;
  children: React.ReactNode;
  OnClickHandler: () => void;
}) => {
  const { colorMode } = useColorMode();
  const color = colorMode === "light" ? "gray.600" : "gray.300";

  const { icon, children, OnClickHandler } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={colorMode === "light" ? "inherit" : "gray.400"}
      _hover={{
        bg: colorMode === "light" ? "gray.100" : "gray.900",
        color: colorMode === "light" ? "gray.900" : "gray.200",
      }}
      onClick={OnClickHandler}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};
