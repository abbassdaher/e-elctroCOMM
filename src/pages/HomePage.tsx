import { Fragment, memo, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
import Card from "../components/ui/card/Card";
import type { IProduct } from "../interface";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../redux/products/productsSlice";
import type { AppDispatch, RootState } from "../redux/Store";

const HomePage = () => {
  const { data, loading } = useSelector(({ products }: RootState) => products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);
  if (loading) return <div className="text-center text-light">Loading...</div>;
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
      {/* <NavBar /> */}
      <div className="grid sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 mt-10">
        {/*  useQuery */}
        {/* {data &&
          data.products &&
          data.products.map((product: IProduct) => (
            <Card key={product.id} product={product} />
          ))} */}

        {/* useRedux */}
        {data.products &&
          data.products.map((product: IProduct) => (
            <Card key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default memo(HomePage);
