import {
  Center,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

function SkelatonCard() {
  return (
    <Stack gap="6" maxW="xs" justifyContent={"center"} p={4}>
      <Skeleton height="100px" w="150px" margin={"auto"} />
      <HStack width="full">
        <SkeletonText noOfLines={3} />
      </HStack>
    </Stack>
  );
}

export default SkelatonCard;
