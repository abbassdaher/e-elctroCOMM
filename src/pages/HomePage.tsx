import { Fragment, memo } from "react";
// import { useQuery } from "@tanstack/react-query";
import Card from "../components/ui/card/Card";
import type { IProduct } from "../interface";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../redux/Store";
import { useGetProductsListQuery } from "../redux/RTKQuery/ProductsList";
import { Grid } from "@chakra-ui/react";
import SkelatonCard from "../components/ui/card/SkelatonCard";

const HomePage = () => {
  const { data, isLoading } = useGetProductsListQuery({});
  console.log(data)
  if (isLoading)
    return (
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr)) "
        gap=""
        // mt={10}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <SkelatonCard key={i} />
        ))}
      </Grid>
    );
  // useQuery
  // const { isPending, error, data } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () =>
  //     fetch("https://dummyjson.com/products").then((res) => res.json()),
  // });

  // if (isPending) return "Loading...";

  // if (error) return "An error has occurred: " + error.message;

  return (
    <Fragment>
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={4}
        justifyItems="center"
      >
        {data.data &&
          data.data.map((product: IProduct) => (
            <Card key={product.productID} product={product} />
            
          ))}
      </Grid>
    </Fragment>
  );
};

export default memo(HomePage);
