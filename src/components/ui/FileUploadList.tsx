import type { IProduct } from "@/interface";
import { CurrentFiles } from "../../redux/Slices/createProductSlice";
import { FileUpload, Float, useFileUploadContext } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

export const FileUploadList = () => {
  const fileUpload = useFileUploadContext();
  const currentImgFiles = fileUpload.acceptedFiles;
  const settings = useSelector(
    (state: {
      settings: {
        removeProduct: IProduct;
        editProduct: IProduct;
        seeProduct: IProduct;
      };
    }) => state.settings,
  );
  const dispatch = useDispatch();
  if (currentImgFiles.length === 0) return null;

  // const fileMetaData = currentImgFiles.map((file) => {
  //   lastModified: file.lastModified;
  //   lastModifiedDate: file.lastModifiedDate;
  //   name: file.name;
  //   size: file.size;
  //   type: file.type;
  //   webkitRelativePath: file.webkitRelativePath;
  // });
  const fileMetaData = currentImgFiles.map((file) => ({
    lastModified: file.lastModified,
    name: file.name,
    size: file.size,
    type: file.type,
    webkitRelativePath: file.webkitRelativePath,
  }));
  console.log("fileMeta: " + fileMetaData);
  // dispatch the slice action correctly via the actions object
  dispatch(CurrentFiles(fileMetaData));
  // console.log(`url(${settings?.editProduct?.images[0]})`);

  return (
    <FileUpload.ItemGroup display="flex" flexWrap="wrap" gap="3" mt="4">
      {
        // settings.editProduct?.images?.length > 0
        //   ? settings.editProduct.images.map((image: string) => (
        //       <FileUpload.Item
        //         w="auto"
        //         boxSize="20"
        //         p="2"
        //         // existing images are stored as URLs (string); cast to satisfy File prop
        //         file={image as unknown as File}
        //         key={(settings.editProduct.title + image) as string}

        //       >
        //         <FileUpload.ItemPreviewImage />
        //         <Float placement="top-end">
        //           <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
        //             <LuX />
        //           </FileUpload.ItemDeleteTrigger>
        //         </Float>
        //       </FileUpload.Item>
        //     ))
        //   :

        currentImgFiles.map((file) => (
          <FileUpload.Item
            key={settings?.editProduct?.documentId}
            file={file}
            w="20" // لجعل المربع متساوي الأبعاد (80px)
            h="20"
            p="0" // تصفير الـ padding لتمتد الصورة بشكل كامل
            position="relative"
            borderRadius="md"
            // overflow="hidden"
            border="1px solid"
            borderColor="border.muted"
            // 💡 هنا تكمن قوة الحل: حقن رابط الصورة كخلفية للمكون مباشرة
            bgImage={`url(${settings?.editProduct?.images[0]})`}
            bgSize="cover"
            backgroundPosition="center"
            bgRepeat="no-repeat"

            /* value/onValueChange are not supported by FileUpload.Item props; remove them */
          >
            <FileUpload.ItemPreviewImage />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger
                boxSize="4"
                layerStyle="fill.solid"
                _hover={{ bg: "red.400", transition: "background-color 0.2s" }}
              >
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))
      }
    </FileUpload.ItemGroup>
  );
};
