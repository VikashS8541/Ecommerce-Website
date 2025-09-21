import axios from "axios"


// All Products , it have set the limit with 10 by default, If  I required all the value than just call the limit value in the api , where the api is calling.
export const productData = async (limit = 8) => {
  // const limit = 194;

  try {
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}`);
    return response.data;  
  } catch (error) {
    console.error("Error in the API:", error);
    return null; 
  }
}



// Product Categories
export const productCategory = async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/categories`);
    return response.data;  
  } catch (error) {
    console.error("Error in the API:", error);
    return null;
  } 
}



// Single Product page

export const productId = async (id) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;  // Axios already parses JSON
  } catch (error) {
    console.error("Error in the API:", error);
    return null; 
  } 
}
