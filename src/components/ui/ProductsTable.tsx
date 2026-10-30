import { LuTrash, LuFilePen, LuEye } from "react-icons/lu";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsListQuery,
  useUpdateProductByDocumentIDMutation,
  // useUpdateProductByDocumentIDMutation,
} from "../../redux/RTKQuery/ProductsList";
import {
  Table,
  Skeleton,
  HStack,
  IconButton,
  useDisclosure,
  Field,
  // Input,
  FileUpload,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  //   deleteProduct,
  editProduct,
  removeProduct,
  SettingsSlice,
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
import { FileUploadList } from "./FileUploadList";
// import { Tooltip } from "./tooltip";
import { Tooltip } from "../ui/tooltip";
// import ContentOfProduct from "../contentOfProduct";
import { Input } from "@chakra-ui/react";
import { isCreateProduct } from "../../redux/Slices/createProductSlice";
import CookieServices from "../sevices/CookieServices";
// import CookieServices from "../sevices/CookieServices";
type Product = {
  productID: number;
  documentId: string;
  title: string;
  category: string;
  price: number;
  thumbnail?: string | null;
  tumbnaill?: Array<{ url: string }>;
  stock: number;
};

export const ProductTable = () => {
  const { data, isLoading } = useGetProductsListQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductByDocumentID] = useUpdateProductByDocumentIDMutation();
  const [createProduct] = useCreateProductMutation();

  const dispatch = useDispatch();
  const product = useSelector(
    (state: {
      settings: {
        removeProduct: IProduct;
        editProduct: IProduct;
        seeProduct: IProduct;
        lastProductID: number;
      };
    }) => state.settings,
  );
  // const currentFiles = useSelector(
  //   (state: {
  //     createProduct: {
  //       isCreateProduct: boolean;
  //       CurrentFiles: File[];
  //     };
  //   }) => state.createProduct.CurrentFiles ?? [],
  // );
  // console.log(currentFiles);
  const createProductState = useSelector(
    (state: { createProduct: { isCreateProduct: boolean } }) =>
      state.createProduct,
  );

  const { open, onOpen, onClose } = useDisclosure();
  const onDeleteProductHandlerByDocumentID = (documentId: string) => {
    try {
      //       deleteProduct(documentId);
      deleteProduct(documentId);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(data.data.length+10);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProduct>();

  const [selectdFile, setSelectdFile] = useState<File | null>(null);

  const [isCustomUpdateModalOpen, setIsCustomUpdateModalOpen] = useState(false);
  // const [isCustomCreateModalOpen, setIsCustomCreateModalOpen] = useState(
  //   createProductState?.isCreateProduct,
  // );
  const isOffline = useSelector(
    (state: { settings: { isOffline: boolean } }) => state.settings.isOffline,
  );
  const close = () => {
    console.log("closed");
    reset({
      titleInput: "",
      descriptionInput: "",
      priceInput: 0,
      discountPercentageInput: 0,
      brandInput: "",
      SKUInput: "",
      weightInput: 0,
      returnPolicyInput: "",
      stockInput: 0,
      minimumOrderQuantityInput: 0,
      shippingInformationInput: "",
      thumbnailInput: "",
    });
  };

  useEffect(() => {
    if (product?.editProduct) {
      reset({
        title: product.editProduct?.title,
        description: product.editProduct?.description,
        price: product.editProduct?.price,
        discountPercentage: product.editProduct?.discountPercentage,
        brand: product.editProduct?.brand,
        SKUInput: product.editProduct?.sku,
        weightInput: product.editProduct?.weight,
        returnPolicyInput: product.editProduct?.returnPolicy,
        stockInput: product.editProduct?.stock,
        minimumOrderQuantityInput: product.editProduct?.minimumOrderQuantity,
        shippingInformationInput: product.editProduct?.shippingInformation,
        thumbnailInput: product.editProduct?.thumbnail,
      });
    }
  }, [product?.editProduct]);

  // useEffect(() => {
  //   if (createProductState.isCreateProduct) {
  //     reset({
  //       title: "",
  //       description: "",
  //       price: 0,
  //       discountPercentage: 0,
  //       brand: "",
  //       SKUInput: "",
  //       weightInput: 0,
  //       returnPolicyInput: "",
  //       stockInput: 0,
  //       minimumOrderQuantityInput: 0,
  //       shippingInformationInput: "",
  //       thumbnailInput: "",
  //     });
  //   }
  // }, [createProductState]);

  dispatch(SettingsSlice.actions.lastProductID(data?.data?.length + 10));
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
            {isLoading || isOffline
              ? Array.from({ length: 8 }).map((_, index) => (
                  <Table.Row key={index}>
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
                        <Skeleton height="5" width="30%" bg={"red.200"} />
                        <Skeleton height="5" width="30%" bg={"blue.200"} />
                        <Skeleton height="5" width="30%" bg={"yellow.200"} />
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))
              : data?.data?.map((item: Product) => (
                  <Table.Row
                    key={item?.productID}
                    color={{ base: "gray.800", _dark: "gray.100" }}
                  >
                    <Table.Cell>{item?.productID}</Table.Cell>
                    <Table.Cell>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="image bg-auto  rounded-full"
                      >
                        <image
                          href={item.thumbnail || item.tumbnaill?.[0]?.url}
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
                            setIsCustomUpdateModalOpen(true);
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
          if (product?.removeProduct?.documentId) {
            onDeleteProductHandlerByDocumentID(
              product?.removeProduct?.documentId,
            );
          }
        }}
      />
      {/* Create product */}
      <CustomModal
        title="Create Product"
        okTXT="Create"
        open={createProductState.isCreateProduct}
        onClose={() => {
          close();
        }}
        setOnOpenCustomModal={(s) => dispatch(isCreateProduct(s))}
        //   action={handleSubmit(async (i) => {
        //     const newProductData = {
        //       // documentID: i.ID,
        //       productID: product?.lastProductID + 1,
        //       title: i.titleInput,
        //       description: i.descriptionInput,
        //       price: Number(i.priceInput),
        //       category: i.category,
        //       stock: Number(i.stockInput) ,
        //       discountPercentage: Number(i.discountPercentageInput),
        //       rating: Number(i.rating),
        //       brand: i.brandInput,
        //       sku: i.SKUInput,
        //       weight: Number(i.weightInput),
        //       returnPolicy: i.returnPolicyInput,
        //       minimumOrderQuantity: Number(i.minimumOrderQuantityInput),
        //       shippingInformation: i.shippingInformationInput,
        //       // thumbnail: i.thumbnailInput,
        //       // thumbnaill:currentFiles
        //     };
        //     const formData = new FormData();

        //     formData.append("data", JSON.stringify(newProductData));
        //     //  formdata
        //       //     formData.append("documentID", String(newProductData.documentID));
        //       //     formData.append("productID", String(newProductData.productID));
        //       //     formData.append("title", String(newProductData.title));
        //       //     formData.append("price", String(newProductData.price));
        //       //     formData.append("brand", String(newProductData.brand));
        //       //     formData.append("category", String(newProductData.category));
        //       //     formData.append("sku", String(newProductData.sku));
        //       //     formData.append("stock", String(newProductData.stock));
        //       //     formData.append(
        //       //   "data",
        //       //   JSON.stringify({
        //       //     ...formData,
        //       //   }),
        //       // );
        //     if (currentFiles && currentFiles.length > 0) {
        //       // console.log("currentFiles",currentFiles[0])
        //       formData.append("files.tumbnaill", currentFiles[0]); // 👈 هذا هو الملف المفرد من نوع File/Blob
        //     }
        //     // // print formData
        //     for (const [key, value] of formData.entries()) {
        //       await console.log(`${key}: `, value);
        //     }
        //     // await createProduct({
        //     //   ...newProductData,
        //     // }).unwrap();
        //     await createProduct(formData).unwrap();
        //     // await console.log(object)
        //     // setIsCustomUpdateModalOpen(false);
        //     // reset({
        //     //   titleInput: "",
        //     //   descriptionInput: "",
        //     //   priceInput: 0,
        //     //   discountPercentageInput: 0,
        //     //   brandInput: "",
        //     //   SKUInput: "",
        //     //   weightInput: 0,
        //     //   returnPolicyInput: "",
        //     //   stockInput: 0,
        //     //   minimumOrderQuantityInput: 0,
        //     //   shippingInformationInput: "",
        //     //   thumbnailInput: "",
        //     // });
        //     // setIsCustomCreateModalOpen(false);
        //     // dispatch(isCreateProduct(false));
        //     // console.log("newProductData", newProductData);
        //   },(error)=>{
        //     console.log("onError", error);
        //   })
        // }
        action={handleSubmit(
          async (i) => {
            const newProductData = {
              // documentID: i.ID,
              productID: Number(product?.lastProductID + 1),
              title: i.titleInput,
              description: i.descriptionInput,
              price: Number(i.priceInput),
              category: i.category,
              stock: Number(i.stockInput),
              discountPercentage: Number(i.discountPercentageInput) || 0,
              rating: Number(i.rating) || 0,
              brand: i.brandInput,
              sku: i.SKUInput,
              weight: Number(i.weightInput) || 0,
              returnPolicy: i.returnPolicyInput,
              minimumOrderQuantity: Number(i.minimumOrderQuantityInput) || 0,
              shippingInformation: i.shippingInformationInput,
            };
            const formData = new FormData();

            formData.append("data", JSON.stringify(newProductData));
            //      formdata
            //     formData.append("documentID", String(newProductData.documentID));
            //     formData.append("productID", String(newProductData.productID));
            //     formData.append("title", String(newProductData.title));
            //     formData.append("price", String(newProductData.price));
            //     formData.append("brand", String(newProductData.brand));
            //     formData.append("category", String(newProductData.category));
            //     formData.append("sku", String(newProductData.sku));
            //     formData.append("stock", String(newProductData.stock));
            //     formData.append(
            //   "data",
            //   JSON.stringify({
            //     ...formData,
            //   }),
            // );
            if (selectdFile) {
              // console.log("currentFiles",currentFiles[0])
              console.log("is File?", selectdFile instanceof File);
              console.log("keys:", Object.keys(selectdFile));
              formData.append("files", selectdFile, selectdFile.name); // 👈 هذا هو الملف المفرد من نوع File/Blob
            }
            // // print formData
            for (const [key, value] of formData.entries()) {
              console.log(`${key}: `, value);
            }

            const uploaded = await fetch("http://localhost:1337/api/upload", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${CookieServices.getCookie("jwt")}`,
              },
              body: formData,
            }).then((r) => r.json());

            const imageId = uploaded[0].id;
            console.log(imageId);
            // await createProduct({
            //   ...newProductData,
            // }).unwrap();
            // await createProduct(formData).unwrap();

            await createProduct({
              ...newProductData,
              tumbnaill: imageId,
            }).unwrap();

            // setIsCustomCreateModalOpen(false);

            // reset({
            //   titleInput: "",
            //   descriptionInput: "",
            //   priceInput: 0,
            //   discountPercentageInput: 0,
            //   brandInput: "",
            //   SKUInput: "",
            //   weightInput: 0,
            //   returnPolicyInput: "",
            //   stockInput: 0,
            //   minimumOrderQuantityInput: 0,
            //   shippingInformationInput: "",
            //   thumbnailInput: "",
            // });
            // setIsCustomCreateModalOpen(false);
            // dispatch(isCreateProduct(false));

            // console.log("newProductData", newProductData);
          },
          (error) => {
            console.log("onError", error);
          },
        )}
      >
        <Field.Root>
          {/* <Field.Label>title</Field.Label> */}
          <Tooltip content="Title">
            <Input
              placeholder="title"
              css={{ "--focus-color": "lineHeights.moderate " }}
              {...register("titleInput", { required: true })}
            />
          </Tooltip>
          {errors.titleInput && (
            <span className="text-red-500">Title is required!</span>
          )}

          <Tooltip content="Description">
            <Input
              placeholder="description"
              css={{ "--focus-color": "lineHeights.moderate " }}
              {...register("descriptionInput", { required: true })}
            />
          </Tooltip>
          {errors.descriptionInput && (
            <span className="text-red-500">Description is required!</span>
          )}

          {/* price */}
          <HStack>
            <Tooltip content="Price">
              <Input
                placeholder="price"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("priceInput", { required: true })}
              />
            </Tooltip>{" "}
            {errors.priceInput && (
              <span className="text-red-500">Price is required!</span>
            )}
            {/* discount percentage */}
            <Tooltip content="Discount Percentage">
              <Input
                placeholder="discountPercentage"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("discountPercentageInput", { required: false })}
              />
            </Tooltip>
            {/* brand */}
            <Tooltip content="Brand">
              <Input
                placeholder="Brand"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("brandInput", { required: true })}
              />
            </Tooltip>
            {errors.brandInput && (
              <span className="text-red-500">Brand is required!</span>
            )}
            <Tooltip content="category">
              <Input
                placeholder="category"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("category", { required: true })}
              />
            </Tooltip>
            {errors.category && (
              <span className="text-red-500">Category is required!</span>
            )}
          </HStack>
          {/* sku */}
          <HStack>
            <Tooltip content="SKU">
              <Input
                placeholder="sku"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("SKUInput", { required: true })}
              />
            </Tooltip>
            {errors.SKUInput && (
              <span className="text-red-500">SKU is required!</span>
            )}
            <Tooltip content="Weight">
              <Input
                placeholder="Weight"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("weightInput", { required: false })}
              />
            </Tooltip>
            <Tooltip content="Return Policy">
              <Input
                placeholder="Return Policy"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("returnPolicyInput", { required: false })}
              />
            </Tooltip>
            <Tooltip content="Stock">
              <Input
                placeholder="Stock"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("stockInput", { required: true })}
              />
            </Tooltip>
            {errors.stockInput && (
              <span className="text-red-500">Stock is required!</span>
            )}
          </HStack>
          {/* minimumOrderQuantity + shippingInformation */}
          <HStack>
            <Tooltip content="Minimum Order Quantity">
              <Input
                placeholder="Minimum Order Quantity"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("minimumOrderQuantityInput", { required: false })}
              />
            </Tooltip>
            <Tooltip content="Shipping Information">
              <Input
                placeholder="shipping information"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("shippingInformationInput", { required: false })}
              />
            </Tooltip>
          </HStack>
          {/* thumbnail */}
          <Field.Root>
            <Field.Label>Thumbnail:</Field.Label>

            {/* <Tooltip content="Thumbnail">
                  <Input
                    placeholder="thumbnail"
                    css={{ "--focus-color": "lineHeights.moderate " }}
                    {...register("thumbnailInput", { required: true })}
                  />
                </Tooltip> */}
            {/* <Tooltip content="Thumbnail">
                  <Input
                    placeholder="thumbnail"
                    css={{ "--focus-color": "lineHeights.moderate " }}
                    {...register("thumbnailInput", { required: true })}
                  />
                </Tooltip> */}
            <FileUpload.Root
              maxFiles={1}
              accept="image/*"
              onFileChange={(details) => {
                setSelectdFile(details.acceptedFiles[0]);
              }}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              {/* <FileUpload.List showSize clearable /> */}
              <FileUploadList />
            </FileUpload.Root>
          </Field.Root>
        </Field.Root>
      </CustomModal>
      {/* updated usinf formData */}
      <CustomModal
        title="product update"
        okTXT="Update"
        setOnOpenCustomModal={setIsCustomUpdateModalOpen}
        open={isCustomUpdateModalOpen}
        //         validation
        action={handleSubmit(async (i) => {
          const formData = new FormData();
          const {
            // نفكك الحقول التي تنتهي بـ Input حتى لا تذهب مع الـ rest
            titleInput,
            discountPercentageInput,
            descriptionInput,
            priceInput,
            brandInput,
            SKUInput,
            weightInput,
            returnPolicyInput,
            stockInput,
            minimumOrderQuantityInput,
            shippingInformationInput,
            // thumbnailInput,
          } = i;

          const cleanProductData = {
            documentID: product?.editProduct?.documentId,
            title: titleInput,
            description: descriptionInput,
            price: Number(priceInput),
            stock: Number(stockInput),
            discountPercentage: Number(discountPercentageInput),
            rating: Number(product?.editProduct?.rating),
            brand: brandInput,
            sku: SKUInput,
            weight: Number(weightInput),
            returnPolicy: returnPolicyInput,
            minimumOrderQuantity: Number(minimumOrderQuantityInput),
            shippingInformation: shippingInformationInput,
            // thumbnail: thumbnailInput,
          };
          console.log(i);
          formData.append(
            "data", //             //   title: i.titleInput,
            JSON.stringify({ ...cleanProductData }),
          );
          dispatch(editProduct({ ...cleanProductData }));
          await updateProductByDocumentID({
            // documentID: product?.editProduct?.documentId,
            ...cleanProductData,
          }).unwrap();

          setIsCustomUpdateModalOpen(false);
          if (!isCustomUpdateModalOpen) {
            console.log("isCustomMoadal Is Close");
          }
          reset({
            titleInput: "",
            descriptionInput: "",
            priceInput: 0,
            discountPercentageInput: 0,
            brandInput: "",
            SKUInput: "",
            weightInput: 0,
            returnPolicyInput: "",
            stockInput: 0,
            minimumOrderQuantityInput: 0,
            shippingInformationInput: "",
            // thumbnailInput: "",
          });
        })}
        onClose={() => {
          // console.log("onclose");
          reset({
            titleInput: "",
            descriptionInput: "",
            priceInput: 0,
            discountPercentageInput: 0,
            brandInput: "",
            SKUInput: "",
            weightInput: 0,
            returnPolicyInput: "",
            stockInput: 0,
            minimumOrderQuantityInput: 0,
            shippingInformationInput: "",
            // thumbnailInput: "",
          });
        }}
        // onOpenChange={(open: boolean) => setIsCustomUpdateModalOpen(open)}
      >
        <Field.Root>
          {/* <Field.Label>title</Field.Label> */}
          <Tooltip content="Title">
            <Input
              placeholder="title"
              css={{ "--focus-color": "lineHeights.moderate " }}
              defaultValue={product?.editProduct?.title}
              {...register("titleInput", { required: true })}
            />
          </Tooltip>
          {errors.titleInput && (
            <span className="text-red-500">Title is required!</span>
          )}

          <Tooltip content="Description">
            <Input
              placeholder="description"
              css={{ "--focus-color": "lineHeights.moderate " }}
              defaultValue={product?.editProduct?.description}
              {...register("descriptionInput", { required: true })}
            />
          </Tooltip>
          {errors.descriptionInput && (
            <span className="text-red-500">Description is required!</span>
          )}
          {/* price */}
          <HStack>
            <Tooltip content="Price">
              <Input
                placeholder="price"
                css={{ "--focus-color": "lineHeights.moderate " }}
                defaultValue={product?.editProduct?.price}
                {...register("priceInput", { required: true })}
              />
            </Tooltip>{" "}
            {errors.priceInput && (
              <span className="text-red-500">Price is required!</span>
            )}
            {/* discount percentage */}
            <Tooltip content="Discount Percentage">
              <Input
                placeholder="discountPercentage"
                css={{ "--focus-color": "lineHeights.moderate " }}
                defaultValue={product?.editProduct?.discountPercentage}
                {...register("discountPercentageInput", { required: false })}
              />
            </Tooltip>
            {/* brand */}
            <Tooltip content="Brand">
              <Input
                placeholder="Brand"
                css={{ "--focus-color": "lineHeights.moderate " }}
                defaultValue={product?.editProduct?.brand}
                {...register("brandInput", { required: true })}
              />
            </Tooltip>
            {errors.brandInput && (
              <span className="text-red-500">Brand is required!</span>
            )}
          </HStack>
          {/* sku */}
          <HStack>
            <Tooltip content="SKU">
              <Input
                placeholder="sku"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("SKUInput", { required: true })}
              />
            </Tooltip>
            {errors.SKUInput && (
              <span className="text-red-500">SKU is required!</span>
            )}
            <Tooltip content="Weight">
              <Input
                placeholder="Weight"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("weightInput", { required: false })}
              />
            </Tooltip>
            <Tooltip content="Return Policy">
              <Input
                placeholder="Return Policy"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("returnPolicyInput", { required: false })}
              />
            </Tooltip>
            <Tooltip content="Stock">
              <Input
                placeholder="Stock"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("stockInput", { required: true })}
              />
            </Tooltip>
            {errors.stockInput && (
              <span className="text-red-500">Stock is required!</span>
            )}
          </HStack>
          {/* minimumOrderQuantity + shippingInformation */}
          <HStack>
            <Tooltip content="Minimum Order Quantity">
              <Input
                placeholder="Minimum Order Quantity"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("minimumOrderQuantityInput", { required: false })}
              />
            </Tooltip>
            <Tooltip content="Shipping Information">
              <Input
                placeholder="shipping information"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("shippingInformationInput", { required: false })}
              />
            </Tooltip>
          </HStack>
          {/* thumbnail */}
          <Field.Root>
            <Field.Label>Thumbnail:</Field.Label>
            <Tooltip content="Thumbnail">
              <Input
                placeholder="thumbnail"
                css={{ "--focus-color": "lineHeights.moderate " }}
                {...register("thumbnailInput", { required: false })}
              />
            </Tooltip>
            <FileUpload.Root maxFiles={5} accept="image/*">
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              {/* <FileUpload.List showSize clearable /> */}
              <FileUploadList />
            </FileUpload.Root>
          </Field.Root>
        </Field.Root>
      </CustomModal>
    </Fragment>
  );
};
