import React, { Fragment } from "react";
import NavBar from "../components/ui/NavBar";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/ui/card/Card";

interface Iprops{
            product:object,
            id:number,
}
const HomePage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://dummyjson.com/products").then((res) => res.json()),
  });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <Fragment>
      <NavBar />
      <div className="grid sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 mt-10">
        {data &&
          data.products &&
          data.products.map((product:Iprops) => (
            <Card key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default HomePage;
