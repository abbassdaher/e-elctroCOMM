import type { IProduct } from "@/interface";
import { addToCart } from "../redux/Redusers";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  For,
  HStack,
  Image,
  RatingGroup,
  Stack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";

function ProductInfo() {
  const product = useSelector(
    (state: { clickedOnProduct: { product: IProduct } }) =>
      state.clickedOnProduct.product
  );
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Card.Root
        flexDirection="row"
        overflow="hidden"
        maxW="xxl"
        justifyContent={"Center"}
        mb="10"
      >
        <Image
          objectFit="contain"
          maxW="200px"
          src={product.images && product.images[0]}
          alt="Caffe Latte"
        />
        <Box>
          <Card.Body>
            <Card.Title mb="2">{product.title}</Card.Title>
            <Card.Description>{product.description}</Card.Description>
            <HStack mt="4">
              {product.tags &&
                product.tags.map((tag: string) => (
                  <Badge key={tag} variant="subtle" colorScheme="green">
                    {tag}
                  </Badge>
                ))}
            </HStack>
            <Card.Title
              color={
                product.availabilityStatus === "In Stock" ? "green" : "red"
              }
            >
              {product.availabilityStatus}
            </Card.Title>
          </Card.Body>
          <Card.Footer>
            price: ${product.price}{" "}
            <Button
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              Add To Cart
            </Button>{" "}
            <RatingGroup.Root count={5} defaultValue={product.rating} size="sm">
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
          </Card.Footer>
        </Box>
      </Card.Root>
      <h2>Reviews:</h2>
      <Stack
        gap="1"
        direction="row"
        wrap="wrap"
        justify="center"
        w="full"
        mt={10}
      >
        <For each={product.reviews}>
          {(variant) => (
            <Card.Root w="30%" bgColor={"whiteAlpha.800"}>
              <Card.Body gap="2">
                <Avatar.Root size="md" shape="rounded">
                  {/* <Avatar.Image src="https://picsum.photos/200/300" /> */}
                  <Avatar.Fallback name={variant?.reviewerName || ""} />
                </Avatar.Root>
                <Card.Title mb="2">
                  {variant?.reviewerName || "Nue Camp"}
                </Card.Title>
                <Card.Description>
                  {variant?.comment || "No review available."}
                </Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="center">
                <RatingGroup.Root
                  count={5}
                  defaultValue={product.rating}
                  size="sm"
                >
                  <RatingGroup.HiddenInput />
                  <RatingGroup.Control />
                </RatingGroup.Root>
              </Card.Footer>
            </Card.Root>
          )}
        </For>
      </Stack>
    </Fragment>
  );
}

export default ProductInfo;
