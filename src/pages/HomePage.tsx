import React, { Fragment, memo, useEffect } from "react";
import NavBar from "../components/ui/NavBar";
// import { useQuery } from "@tanstack/react-query";
import Card from "../components/ui/card/Card";
import type { IProduct } from "../interface";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../redux/products/productsSlice";
import type { AppDispatch, RootState } from "../redux/Store";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);
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
      <NavBar />
      <div className="grid sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 mt-10">
        {/*  useQuery */}
        {/* {data &&
          data.products &&
          data.products.map((product: IProduct) => (
            <Card key={product.id} product={product} />
          ))} */}

        {/* useRedux */}
        {products &&
          products.products &&
          products.products.map((product: IProduct) => (
            <Card key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default memo(HomePage);
