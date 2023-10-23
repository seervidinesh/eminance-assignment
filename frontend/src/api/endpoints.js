const baseURL = 'http://localhost:4000' 

export const signup = `${baseURL}/user/signup`;
export const userMe = `${baseURL}/user/me`;
export const logIn = `${baseURL}/auth/login`;
export const logOut = `${baseURL}/auth/logout`;
export const allProducts = `${baseURL}/products/`;
export const productsById = productId => `${baseURL}/products/${productId}`;