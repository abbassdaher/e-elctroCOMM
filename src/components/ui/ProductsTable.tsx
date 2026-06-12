import { LuTrash, LuFilePen, LuEye } from "react-icons/lu";
import {
  useDeleteProductMutation,
  useEditProductbyDocumentIDMutation,
  useGetProductsListQuery,
} from "../../redux/RTKQuery/ProductsList";
import {
  Table,
  Skeleton,
  HStack,
  IconButton,
  useDisclosure,
  Field,
  Input,
  FileUpload,
  Button,
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
import { Fragment, useEffect, useState } from "react";
import { CustomAlertDialog } from "./CustomAlertDialog";
import { CustomModal } from "./CustomModal";
import { HiUpload } from "react-icons/hi";
import { useForm } from "react-hook-form";
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
  const [EditProductbyDocumentID] = useEditProductbyDocumentIDMutation();
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
  const settings = useSelector(
    (state: { settings: IProduct }) => state.settings,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProduct>();
  const [onOpenCustomModal, setOnOpenCustomModal] = useState(false);

  useEffect(() => {
    if (settings.editProduct) {
      reset({
        title: settings.editProduct?.title,
        description: settings.editProduct?.description,
        price: settings.editProduct?.price,
        discountPercentage: settings.editProduct?.discountPercentage,
        brand: settings.editProduct?.brand,
        SKUInput: settings.editProduct?.sku,
        weightInput: settings.editProduct?.weight,
        returnPolicyInput: settings.editProduct?.returnPolicy,
        stockInput: settings.editProduct?.stock,
        minimumOrderQuantityInput: settings.editProduct?.minimumOrderQuantity,
        shippingInformationInput: settings.editProduct?.shippingInformation,
      });
    }
  }, [settings.editProduct]);
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
                          onClick={() => {
                            setOnOpenCustomModal(true);
                            dispatch(editProduct(item));
                          }}
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
      <CustomModal
        title="product update"
        okTXT="Update"
        setOnOpenCustomModal={setOnOpenCustomModal}
        //         validation
        action={handleSubmit((i) => {
          dispatch(
            editProduct({
              //   ...settings.editProduct,
              title: i.titleInput,
              description: i.descriptionInput,
              price: i.priceInput,
              brand: i.brandInput,
            }),
          );
          EditProductbyDocumentID({
            documentID: settings.editProduct.documentId,

            title: i.titleInput,
            description: i.descriptionInput,
            price: i.priceInput,
          });
          setOnOpenCustomModal(false);
        })}
        open={onOpenCustomModal}
        onOpenChange={(e) => setOnOpenCustomModal(e)}
      >
        <Field.Root>
          {/* <Field.Label>title</Field.Label> */}
          <Input
            // name="titleInput"
            placeholder="title"
            css={{ "--focus-color": "lineHeights.moderate " }}
            defaultValue={settings.editProduct?.title}
            {...register("titleInput", { required: true })}
          />
          {errors.titleInput && (
            <span className="text-red-500">Title is required!</span>
          )}
          <Input
            // name="descriptionInput"
            placeholder="description"
            css={{ "--focus-color": "lineHeights.moderate " }}
            defaultValue={settings.editProduct?.description}
            {...register("descriptionInput", { required: true })}
          />
          {errors.descriptionInput && (
            <span className="text-red-500">Description is required!</span>
          )}
          <HStack>
            <Input
              //   name="priceInput"
              placeholder="price"
              css={{ "--focus-color": "lineHeights.moderate " }}
              defaultValue={settings.editProduct?.price}
              {...register("priceInput", { required: true })}
            />{" "}
            {errors.priceInput && (
              <span className="text-red-500">Price is required!</span>
            )}
            <Input
              name="discountPercentageInput"
              placeholder="discountPercentage"
              css={{ "--focus-color": "lineHeights.moderate " }}
              defaultValue={settings.editProduct?.discountPercentage}
            />
            <Input
              placeholder="Brand"
              css={{ "--focus-color": "lineHeights.moderate " }}
              defaultValue={settings.editProduct?.brand}
              {...register("brandInput", { required: true })}
            />
            {errors.brandInput && (
              <span className="text-red-500">Brand is required!</span>
            )}
          </HStack>
          <HStack>
            <Input
              placeholder="sku"
              css={{ "--focus-color": "lineHeights.moderate " }}
              defaultValue={settings.editProduct?.sku}
              {...register("SKUInput", { required: true })}
            />
            {errors.SKUInput && (
              <span className="text-red-500">SKU is required!</span>
            )}
            <Input
              name="weightInput"
              placeholder="Weight"
              defaultValue={settings.editProduct?.weight}
              css={{ "--focus-color": "lineHeights.moderate " }}
            />
            <Input
              name="returnPolicyInput"
              placeholder="Return Policy"
              defaultValue={settings.editProduct?.returnPolicy}
              css={{ "--focus-color": "lineHeights.moderate " }}
            />
            <Input
              placeholder="Stock"
              css={{ "--focus-color": "lineHeights.moderate " }}
              defaultValue={settings.editProduct?.stock}
              {...register("stockInput", { required: true })}
            />
            {errors.stockInput && (
              <span className="text-red-500">Stock is required!</span>
            )}
          </HStack>
          <HStack>
            <Input
              name="minimumOrderQuantityInput"
              placeholder="Minimum Order Quantity"
              defaultValue={settings.editProduct?.minimumOrderQuantity}
              css={{ "--focus-color": "lineHeights.moderate " }}
            />
            <Input
              name="shippingInformationInput"
              placeholder="shipping information"
              defaultValue={settings.editProduct?.shippingInformation}
              css={{ "--focus-color": "lineHeights.moderate " }}
            />{" "}
          </HStack>
          <Field.Root required>
            <Field.Label>Images:</Field.Label>
            <FileUpload.Root maxFiles={5}>
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List showSize clearable />
            </FileUpload.Root>
          </Field.Root>
        </Field.Root>
      </CustomModal>
    </Fragment>
  );
};
