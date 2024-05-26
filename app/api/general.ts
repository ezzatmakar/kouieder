import { API_ENDPOINT, FRONTEND_ENDPOINT } from "../config";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
type CustomRequestInit = RequestInit & {
};

const sendRequest = async (endpoint: any, requestData: any, method = "POST") => {
  try {
    const apiUrl = `${API_ENDPOINT}/${endpoint}`;
    const requestBody = {
      ...requestData,
    };

    const response = await fetch(apiUrl, {
      method: method,
      body: method === "POST" ? JSON.stringify(requestBody) : null, // Include the body for POST requests only
      headers: {
        "Origin": FRONTEND_ENDPOINT
      }
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.log("Request failed");
      return null;
    }
  } catch (error) {
    console.log("An error occurred", endpoint, error);
    return null;
  }
};

const fetchGovs = async () => {
  return sendRequest("shipping.php", {});
};
const fetchBranches = async () => {
  return sendRequest("branches/get_all_branches.php", {});
};

const fetchHomeData = async () => {
  const url: string = `${API_ENDPOINT}/pages/get-page-by-slug.php`;
  const data: any = {
    slug: 'home'
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const products = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
const fetchAboutData = async () => {
  const url: string = `${API_ENDPOINT}/pages/get-page-by-slug.php`;
  const data: any = {
    slug: 'about'
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const products = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
const fetchBranchesData = async () => {
  const url: string = `${API_ENDPOINT}/pages/get-page-by-slug.php`;
  const data: any = {
    slug: 'branches'
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const products = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
const fetchCartPage = async () => {
  const url: string = `${API_ENDPOINT}/pages/get-page-by-slug.php`;
  const data: any = {
    slug: 'cart'
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const products = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const fetchCheckoutPage = async () => {
  const url: string = `${API_ENDPOINT}/pages/get-page-by-slug.php`;
  const data: any = {
    slug: 'checkout'
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const products = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
const checkFreeShipping = async () => {
  return sendRequest("check_free_shipping.php", {}, "POST");
};
const checkFlashSale = async () => {
  return sendRequest("bogo_discount.php", {}, "POST");
};

const fetchNav = async () => {
  return sendRequest("nav.php", {});
};

const fetchCats = async () => {
  return sendRequest("cats.php", {});
};

const fetchAreas = async (govId: any) => {
  const requestData = { gov_id: govId };
  return sendRequest("shipping.php", requestData);
};

const fetchCartExtraProducts = async (filterData: any) => {
  const apiUrl = `${API_ENDPOINT}/cart-extra-products.php`;
  const requestBody = {
    branch_id: filterData.branch_id,
    count: filterData.count
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers,
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.log("Request failed");
      throw new Error("Request failed");
    }
  } catch (error) {
    console.log("An error occurred", error);
    throw error;
  }
};
const fetchFilterProducts = async (filterData: any) => {
  const apiUrl = `${API_ENDPOINT}/filter.php`;
  const requestBody = {
    category: filterData.selectedCategories || "",
    price_range: [filterData.minPrice, filterData.maxPrice],
    products_per_page: filterData.products_per_page || 20,
    page_number: filterData.pageNumber,
    sort: {
      criteria: filterData.criteria,
      arrangement: filterData.arrangement,
    },
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers,
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.log("Request failed");
      throw new Error("Request failed");
    }
  } catch (error) {
    console.log("An error occurred", error);
    throw error;
  }
};

export async function getProductBySlug(productSlug: string) {
  const url: string = `${API_ENDPOINT}/single.php`;
  const data: any = {
    slug: productSlug,
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: CustomRequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const product = result;
    return product;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getProductBySlugStock(productSlug: string,selectedBranchIdPROV:any) {
  const url: string = `${API_ENDPOINT}/single-stock.php`;
  const data: any = {
    slug: productSlug,
    branch_id: selectedBranchIdPROV,
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: CustomRequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const product = result;
    return product;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

const getExtraProducts = async (categorySlug: string, count: number = 5) => {
  const url: string = `${API_ENDPOINT}/category.php`;
  const data: any = {
    category: categorySlug,
    products_per_page: count,
    page_number: 1,
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const products = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export async function getUpSellingProducts(productID: number) {
  const url: string = `${API_ENDPOINT}/upSelling.php`;
  const data: any = {
    product_id: productID,
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const products = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getCategoryProducts(
  categorySlug: string,
  pageNumber: number = 1,
  pageSize: number = 20
) {
  const url: string = `${API_ENDPOINT}/category.php`;
  const data: any = {
    category: categorySlug,
    products_per_page: pageSize,
    page_number: pageNumber,
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: CustomRequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const products = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getCategoryInfo(slug: string) {
  const url = `${API_ENDPOINT}/catInfo.php`;
  const data = {
    category: slug,
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  const request = new Request(url, {
    ...options,
  });
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getNav() {
  const url = `${API_ENDPOINT}/nav.php`;

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options = {
    method: "GET",
    headers,
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function searchForm(key_word: string, lang: string) {
  const url: string = `${API_ENDPOINT}/search.php`;
  const data: any = {
    products_per_page: 21,
    page: 1,
    keyword: key_word,
    lang: lang,
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };

  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getOrderInfo(orderID: number) {
  const url: string = `${API_ENDPOINT}/orderInfo.php`;
  const data: any = {
    order_id: orderID,
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function addReview(productID: number, reviewerName: string, reviewerEmail: string, reviewContent: string, selectedRating: number) {
  const url: string = `${API_ENDPOINT}/reviews.php`;
  const data: any = {
    action: 'add',
    product_id: productID,
    reviewer_name: reviewerName,
    reviewer_email: reviewerEmail,
    review_content: reviewContent,
    rating: selectedRating,
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };

  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getReviewOfProduct(productID: number) {
  const url: string = `${API_ENDPOINT}/reviews.php`;
  const data: any = {
    action: 'get_product',
    product_id: productID
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": ""
  };

  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
export async function getAllReviews(count: number) {
  const url: string = `${API_ENDPOINT}/reviews.php`;
  const data: any = {
    action: 'get_all_reviews',
    reviews_per_page: count,
    page: 1
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": ""
  };
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
const checkStockForBranch = async (areaId: string, branchId: string, items: string[]) => {
  try {
    const requestData = {
      area_id: areaId,
      branch_id: branchId,
      items: items
    };

    return await sendRequest('branches/check_stock_for_branch.php', requestData);
  } catch (error) {
    console.log("An error occurred while checking stock:", error);
    return null;
  }
};

const fetchBlogs = async (posts_per_page: number, page: number) => {
  try {
    const requestData = {
      post_type: 'post',
      posts_per_page: posts_per_page,
      page: page
    };

    return await sendRequest('pages/getPosts.php', requestData);
  } catch (error) {
    console.log("cannot get blog!", error);
    return null;
  }
};

export {
  fetchGovs,
  fetchAreas,
  fetchNav,
  fetchCats,
  fetchFilterProducts,
  getExtraProducts,
  fetchBranchesData,
  checkStockForBranch,
  fetchHomeData,
  fetchAboutData,
  checkFreeShipping,
  fetchBranches,
  fetchCartExtraProducts,
  checkFlashSale,
  fetchCartPage,
  fetchCheckoutPage,
  fetchBlogs
};
