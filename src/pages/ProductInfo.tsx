import { Badge, Box, Button, Card, HStack, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function ProductInfo() {
  const product = useSelector(
    (state: { clickedOnProduct: { product: [] } }) =>
      state.clickedOnProduct.product
  );
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
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
              {/* <Badge>Hot</Badge>
              <Badge>Caffeine</Badge> */}
            </HStack>
          </Card.Body>
          <Card.Footer>
            <Button>Buy Latte</Button>
          </Card.Footer>
        </Box>
      </Card.Root>
    </div>
  );
}

export default ProductInfo;
