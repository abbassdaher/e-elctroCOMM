import { useGetProductsListQuery } from "../../redux/RTKQuery/ProductsList";
import { Table, Skeleton, Button, HStack } from "@chakra-ui/react";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
};

export const ProductTable = () => {
  const { data, isLoading } = useGetProductsListQuery({});
  console.log(data);

  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="md" width="full">
      <Table.Root size="lg" stickyHeader>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
            <Table.ColumnHeader>Settings</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading
            ? Array.from({ length: 5 }).map(() => (
                <Table.Row>
                  <Table.Cell>
                    <Skeleton height="5" width="80%" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton height="5" width="80%" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton height="5" width="80%" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton height="5" width="80%" />
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap="2">
                      <Skeleton height="5" width="20%" bg={"blue.200"} />
                      <Skeleton height="5" width="20%" bg={"red.200"} />
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))
            : data?.products?.map((item: Product) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell>{item.price}</Table.Cell>
                  <Table.Cell>
                    <Button
                      size="sm"
                      bg={{ base: "blue.300", _hover: "green.500" }}
                      color={{ base: "blackAlpha.600", _hover: "white" }}
                      variant="outline"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      bg={{ base: "red.300", _hover: "red.500" }}
                      color={{ base: "blackAlpha.600", _hover: "white" }}
                      variant="outline"
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};
