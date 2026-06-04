import axios from "axios";

async function importProductsDataToStrapi() {
  const products = await axios.get("https://dummyjson.com/products");

  for (const product of products.data.products) {
    await axios.post(
      "http://localhost:1337/api/products",
      {
        data: {
          productID: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
          thumbnail: product.thumbnail,
          images: product.images,
          reviews: product.reviews,
          tags: product.tags,
          minimumOrderQuantity: product.minimumOrderQuantity,
          warranty: product.warranty,
          availabilityStatus: product.availabilityStatus,
          sku: product.sku,
          dimensions: product.dimensions,
          weight: product.weight,
          shippingInformation: product.shippingInformation,
          returnPolicy: product.returnPolicy,
        },
      },
      {
        headers: {
          Authorization: "Bearer Cookies.get('jwt')", // Replace with your actual JWT token
        },
      },
    );
  }
  // console.log(products);
}

importProductsDataToStrapi();
