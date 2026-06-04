import { LuTrash, LuFilePen, LuEye } from "react-icons/lu";
import {
  useDeleteProductMutation,
  useGetProductsListQuery,
} from "../../redux/RTKQuery/ProductsList";
import {
  Table,
  Skeleton,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  //   deleteProduct,
  editProduct,
  removeProduct,
  //   seeProduct,
} from "../../redux/Slices/SettingsSlice";
import { clickedOnProduct } from "../../redux/Slices/ClickedOnProductSlice";
import { Link } from "react-router-dom";
import type { IProduct } from "@/interface";
import { Fragment } from "react";
import { CustomAlertDialog } from "./CustomAlertDialog";
// import { ImInsertTemplate } from "react-icons/im";
type Product = {
  productID: number;
  documentId: string;
  title: string;
  category: string;
  price: number;
  images: string[];
  stock: number;
};

export const ProductTable = () => {
  const { data, isLoading } = useGetProductsListQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useDispatch();
  const product = useSelector(
    (state: {
      settings: {
        removeProduct: IProduct;
        editProduct: IProduct;
        seeProduct: IProduct;
      };
    }) => state.settings,
  );
  const { open, onOpen, onClose } = useDisclosure();
  console.log(data);
  const onDeleteProductHandlerByDocumentID = (documentId: string) => {
    try {
      //       deleteProduct(documentId);
      deleteProduct(documentId);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <Table.ScrollArea borderWidth="1px" rounded="md" height="md" width="full">
        <Table.Root size="lg" stickyHeader>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>#</Table.ColumnHeader>
              <Table.ColumnHeader>Image</Table.ColumnHeader>
              <Table.ColumnHeader>Product</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Stock</Table.ColumnHeader>
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
              : data?.data?.map((item: Product) => (
                  <Table.Row key={item.productID}>
                    <Table.Cell>{item.productID}</Table.Cell>
                    <Table.Cell>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="image bg-light"
                      >
                        <image
                          href={item.images[0]}
                          height="100%"
                          width="100%"
                        />
                      </svg>
                    </Table.Cell>
                    <Table.Cell>{item.title}</Table.Cell>
                    <Table.Cell>{item.category}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>{item.stock}</Table.Cell>
                    <Table.Cell>
                      <HStack>
                        <IconButton
                          aria-label="Search database"
                          bg={{ base: "red.300", _hover: "red.500" }}
                          color={{ base: "blackAlpha.600", _hover: "white" }}
                          onClick={() => {
                            dispatch(removeProduct(item));
                            onOpen();
                          }}
                        >
                          <LuTrash />
                        </IconButton>
                        <IconButton
                          aria-label="Search database"
                          bg={{ base: "blue.300", _hover: "blue.500" }}
                          color={{ base: "blackAlpha.600", _hover: "white" }}
                          onClick={() => dispatch(editProduct(item))}
                        >
                          <LuFilePen />
                        </IconButton>
                        {item && (
                          <Link
                            to={`/dashboardLayout/product/${item.productID}`}
                          >
                            <IconButton
                              aria-label="Search database"
                              bg={{ base: "yellow.300", _hover: "yellow.500" }}
                              color={{
                                base: "blackAlpha.600",
                                _hover: "white",
                              }}
                              onClick={() => dispatch(clickedOnProduct(item))}
                            >
                              <LuEye />
                            </IconButton>
                          </Link>
                        )}
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
          {/* <CustomAlertDialog /> */}
        </Table.Root>
      </Table.ScrollArea>
      <CustomAlertDialog
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be."
        isOpen={open}
        onOpen={onOpen}
        onClose={onClose}
        cancleTXT="Cancel"
        okTXT="Delete"
        deleteAction={() => {
          if (product?.removeProduct.documentId) {
            onDeleteProductHandlerByDocumentID(
              product.removeProduct.documentId,
            );
          }
        }}
      />
    </Fragment>
  );
};
