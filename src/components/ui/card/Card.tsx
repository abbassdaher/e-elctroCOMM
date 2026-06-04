import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/Redusers";
import { Link } from "react-router-dom";
import { clickedOnProduct } from "../../../redux/Slices/ClickedOnProductSlice";
import { Box, Stack } from "@chakra-ui/react";

interface Iprops {
  product: {
    title: string;
    images: string[];
    price: number;
    productID: number;
  };
}
const Card = ({ product }: Iprops) => {
  const dispatch = useDispatch();

  return (
    <Stack
      className="card flex flex-col justify-between   rounded-lg shadow-md bg-white"
      bg={{ base: "gray.100", _dark: "gray.800" }}
      w={"100%"}
    >
      <Link to={`product/${product.productID}`}>
        <Box>
          <div
            className="image_container"
            onClick={() => dispatch(clickedOnProduct(product))}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="image bg-light"
            >
              <image href={product.images[0]} height="100%" width="100%" />
            </svg>
          </div>
        </Box>

        <div className="title">
          <Box color={{ base: "black", _dark: "white" }}>
            <span>{product.title}</span>
          </Box>
        </div>
      </Link>
      {/* size */}
      {/* <div className="size">
        <span>Size</span>
        
          <ul className="list-size">
          <li className="item-list">
            <button className="item-list-button">37</button>
          </li>
          <li className="item-list">
            <button className="item-list-button">38</button>
          </li>
          <li className="item-list">
            <button className="item-list-button">39</button>
          </li>
          <li className="item-list">
            <button className="item-list-button">40</button>
          </li>
          <li className="item-list">
            <button className="item-list-button">41</button>
          </li>
          </ul>
        </div> */}
      <div className="action  ">
        <div className="price  ">
          <Box color={{ base: "black", _dark: "white" }}>
            <span>${product.price}</span>
          </Box>
        </div>
        <button
          className="cart-button"
          onClick={() => dispatch(addToCart(product))}
        >
          <svg
            className="cart-icon"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
          <span>Add to cart</span>
        </button>
      </div>
    </Stack>
  );
};
export default Card;
