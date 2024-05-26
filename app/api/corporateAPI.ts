// import { API_ENDPOINT } from "~/config";

import { API_ENDPOINT, FRONTEND_ENDPOINT } from "../config";

const sendAuthenticatedRequest = async (endpoint: string, requestData: any) => {
  try {
    const apiUrl = `${API_ENDPOINT}/${endpoint}`;
    const requestBody = {
      ...requestData,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData as unknown;
    } else {
      console.log("Request failed");
      return null;
    }
  } catch (error) {
    console.log("An error occurred", error);
    return null;
  }
};


const contactUsForm = async (formData: any) => {
  return sendAuthenticatedRequest("contact-us.php", formData);
};

export async function getRecipes() {
  const url: string = `${API_ENDPOINT}/pages/getPosts.php`;
  const data: any = {
    post_type: "recipe",
    posts_per_page: 8,
    page:1,
    extra_fields: [
        "prep_time",
        "cooking_time",
        "total_time",
        "persons",
        "created_time"
    ]
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };

  if (typeof window !== "undefined") {
    headers["Origin"] = window.location.origin;
  }
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const recipes = result;
    return recipes;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getBranches() {
  const url: string = `${API_ENDPOINT}/pages/getPosts.php`;
  const data: any = {
    post_type: "branch",
    posts_per_page: 20,
    page:1,
    extra_fields: [
      "type",
      "name",
      "name_ar",
      "address",
      "address_ar",
      "phone",
      "location",
      "city"
    ]
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin": FRONTEND_ENDPOINT
  };

  if (typeof window !== "undefined") {
    headers["Origin"] = window.location.origin;
  }
  const options: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const recipes = result;
    return recipes;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getRecipeBySlug(slug: string) {
  const url: string = `${API_ENDPOINT}/pages/getPost.php`;
  const data: any = {
    slug: slug,
    type: "recipe",
  };
  const headers = {
    "Content-Type": "application/json",
    "Origin":""
  };

  if (typeof window !== "undefined") {
    headers["Origin"] = window.location.origin;
  }
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
    return null;
  }
}

export async function getBlogBySlug(slug: string) {
  const url: string = `${API_ENDPOINT}/pages/getPost.php`;
  const data: any = {
    slug: slug,
    type: "post",
  };

  const headers = {
    "Content-Type": "application/json",
    "Origin":""
  };

  if (typeof window !== "undefined") {
    headers["Origin"] = window.location.origin;
  }
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
    return null;
  }
}

export { contactUsForm };
