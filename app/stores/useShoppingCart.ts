'use client'
import { persistentAtom } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../config";
import { useSharedState } from "../SharedStateContext";
import Cookies from "js-cookie";

export type CartItem = {
  id: any;
  quantity: number;
  size?: string;
  slug: string;
  name: string;
  ar_name: string;
  thumbnail: string;
  subtotal?: any;
  price: any;
  available?: boolean;
};

const shoppingCart = persistentAtom<CartItem[]>("cart", [], {
  listen: true,
  encode: JSON.stringify,
  decode: JSON.parse,
});

const isShoppingCartOpen = persistentAtom<boolean>(
  "isShoppingCartOpen",
  false,
  {
    listen: false,
    encode: (value) => String(value),
    decode: (value) =>
      value === null || value === undefined ? false : Boolean(value),
  }
);

const calculateTotalPrice = (cartItems: CartItem[]) => {
  let price = 0;
  cartItems?.forEach((item) => {
    if (typeof item.price === 'string') {
      price += (parseFloat(item.price) || 0) * item.quantity;
    }
  });
  return price;
};

const getCart = () => {
  return new Promise((resolve, reject) => {
    if (window.location.hostname !== 'localhost') {
      const apiUrl = `${API_ENDPOINT}/cart/get.php`;
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Origin': window.location.origin,
          Connection: "keep-alive",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to update quantity in cart");
          }
        })
        .then((data) => {
          // const { total, total_discount } = data;
          // resolve({ total: parseFloat(total), total_discount });
        })
        .catch((error) => {
          // reject(error);
        });
    } else {
      // Return a resolved Promise with default values when running in localhost
      // resolve({ total: 0, total_discount: 0 });
    }
  });
};


const callAddToCart = (products: CartItem | CartItem[]) => {
  // Ensure that products is an array, even if it's a single product
  const productsArray = Array.isArray(products) ? products : [products];

  productsArray.forEach((product) => {
    const apiUrl = `${API_ENDPOINT}/cart/add.php`;
    const requestData = {
      product_id: product.id,
      qty: product.quantity ?? 1,
    };

    fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
        'Origin': window.location.origin,
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to add item to cart');
        }
      })
      .then((data) => {
        // Handle the response data for each product
        // console.log('API response for product:', product.id, data);
        // You can also update the cart or perform any other actions here
      })
      .catch((error) => {
        // Handle network or parsing error for each product
        // console.error('Error for product:', product.id, error);
      });
  });
};

const callRemoveItemCart = (itemId: number) => {
  if (window.location.hostname !== 'localhost') {
    const apiUrl = `${API_ENDPOINT}/cart/remove.php`;
    const requestData = {
      product_id: itemId,
    };
    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        'Origin': window.location.origin,
        Accept: "application/json",
        Connection: "keep-alive",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to remove item to cart");
        }
      })
      .then((data) => {
        // Handle the response data
        // console.log("API response:", data);
        // const { total, total_discount }: any = data;
      })
      .catch((error) => {
        // Handle network or parsing error
        // console.error("Error:", error);
      });
  }
};

const setQty = (product: CartItem, qty: any) => {
  if (window.location.hostname !== 'localhost') {
    const apiUrl = `${API_ENDPOINT}/cart/setQty.php`;
    const requestData = {
      product_id: product.id,
      qty: qty,
    };
    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        'Origin': window.location.origin,
        Accept: "application/json",
        // Connection: "keep-alive",
      },
      method: "POST",
      // mode: 'no-cors',
      credentials: "include",
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          // getCart();
          return response.json();
        } else {
          throw new Error("Failed to update quantity in cart");
        }
      })
      .then((data) => {
        // getCart();
        // const { total, total_discount }: any = data;
      })
      .catch((error) => {
        // Handle network or parsing error
        // console.error("Error:", error);
      });
  }
};

const addCouponAPI = (couponCode: any) => {
  return new Promise((resolve, reject) => {
    if (window.location.hostname !== 'localhost') {
      const apiUrl = `${API_ENDPOINT}/cart/get-coupon-info.php`;
      const requestData = {
        coupon: couponCode,
        action: "add"
      };
      fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Accept': 'application/json',
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to update coupon in cart");
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
          return 'error';
        });
    }
  });
};

const removeCouponAPI = (couponCode: any) => {
  return new Promise((resolve, reject) => {
    if (window.location.hostname !== 'localhost') {
      const apiUrl = `${API_ENDPOINT}/cart/coupon.php`;
      const requestData = {
        coupon: couponCode,
        action: "remove"
      };
      fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Accept': 'application/json',
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.ok) {
            // getCart();
            return response.json();
          } else {
            throw new Error("Failed to update coupon in cart");
          }
        })
        .then((data) => {
          // console.log("API response coupon:", data);
          resolve(data);
          const { total, total_discount }: any = data;
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
          return 'error';
        });
    }
  });
};

export const useShoppingCart = () => {
  if (typeof window === "undefined") {
    return {
      getItemQuantity: () => null,
      cartQuantity: 0,
      cartQuantityTotal: 0,
      cartItems: [],
      isOpen: false,
      addToCart: () => null,
      disableStock: () => null,
      enableStock: () => null,
      // setWalletDiscount: () => null,
      decreaseCartQuantity: () => null,
      removeFromCart: () => null,
      openCart: () => null,
      closeCart: () => null,
      refreshCart: () => null,
      addCoupon: () => null,
      removeCoupon: () => null,
      totalPrice: 0,
      totalPriceUAE: 0,
      totalAPI: 0,
      totalDiscountAPI: 0,
      resetCart: () => null,
    };
  }
  const {
    setSelectedGovId,
    selectedGovIdPROV,
    selectedAreaIdPROV,
    setSelectedAreaId,
    selectedBranchIdPROV,
    selectedAreaRatePROV,
    walletDiscount,
    couponCode,
    couponDiscount,
  } = useSharedState();
  const cartStore = useStore(shoppingCart);
  const [totalAPI, setTotalAPI] = useState(0);
  const [totalDiscountAPI, setTotalDiscountAPI] = useState(0);

  const { setWalletDiscount, setCouponDiscount, setCouponCode,setCouponFreeShipping } = useSharedState();
  const resetCart = () => {
    // console.log("resetCart");
    shoppingCart.set([]);
    setWalletDiscount("0".toString());
    setCouponDiscount("0");
    setCouponCode("");
    setCouponFreeShipping(false);
    Cookies.remove("SavedCouponCode");
    Cookies.remove("order_note");
  };


  const addToCart = (products: CartItem | CartItem[]) => {
    if (Array.isArray(products)) {
      const newCartItems = [...cartStore];
      products.forEach((product) => {
        const itemIndex = newCartItems.findIndex(
          (item) => item.id === product.id
        );
        if (itemIndex !== -1) {
          newCartItems[itemIndex].quantity++;
          setQty(product, newCartItems[itemIndex].quantity);
        } else {
          newCartItems.push({
            id: product.id,
            slug: product.slug,
            thumbnail: product.thumbnail,
            name: product.name,
            ar_name: product.ar_name,
            price: product.price,
            quantity: product.quantity ?? 1,
          });
          if (window.location.hostname !== 'localhost') {
            callAddToCart(product);
          }
        }
      });
      shoppingCart.set(newCartItems);
    } else {
      const itemIndex = cartStore.findIndex((item) => item.id === products.id);
      if (itemIndex !== -1) {
        const newCartItems = [...cartStore];
        newCartItems[itemIndex].quantity++;
        shoppingCart.set(newCartItems);
        setQty(products, newCartItems[itemIndex].quantity);
      } else {
        shoppingCart.set([
          ...cartStore,
          {
            id: products.id,
            slug: products.slug,
            thumbnail: products.thumbnail,
            name: products.name,
            ar_name: products.ar_name,
            price: products.price,
            quantity: products.quantity ?? 1,
          },
        ]);
        if (window.location.hostname !== 'localhost') {
          callAddToCart(products);
        }
      }
    }
  };


  const disableStock = (itemId: number) => {
    const itemIndex = cartStore.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      const newCartItems = [...cartStore];
      newCartItems[itemIndex] = { ...newCartItems[itemIndex], available: false };
      shoppingCart.set(newCartItems);
    }
  };
  const enableStock = (itemId: number) => {
    const itemIndex = cartStore.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      const newCartItems = [...cartStore];
      newCartItems[itemIndex] = { ...newCartItems[itemIndex], available: true };
      shoppingCart.set(newCartItems);
    }
  };

  const decreaseCartQuantity = (product: CartItem) => {
    const itemIndex = cartStore.findIndex((item) => item.id === product.id);
    const qty =
      cartStore?.find((item) => item.id === product.id)?.quantity ?? 1;
    if (itemIndex !== -1) {
      const newCartItems = [...cartStore];
      if (newCartItems[itemIndex].quantity <= 1) {
        return removeFromCart(product.id);
      } else {
        newCartItems[itemIndex].quantity--;
        shoppingCart.set(newCartItems);
        setQty(product, qty - 1);
        return;
      }
    }
  };

  const removeFromCart = (itemId: number) => {
    const itemIndex = cartStore.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const newCartItems = [...cartStore];
      newCartItems.splice(itemIndex, 1);
      shoppingCart.set(newCartItems);
      callRemoveItemCart(itemId);
    }
    return;
  };

  const getItemQuantity = (product: CartItem) => {
    return cartStore?.find((item) => item.id === product.id)?.quantity ?? 0;
  };
  const isPercentageDiscount = couponDiscount && couponDiscount.includes("%");
  const percentage = isPercentageDiscount
  ? parseFloat(couponDiscount) / 100
  : 0;

  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const addCoupon = (couponCode: any) => {
    return addCouponAPI(couponCode);
  };
  const removeCoupon = (couponCode: any) => {
    return removeCouponAPI(couponCode);
  };
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceUAE, setTotalPriceUAE] = useState(0);
  useEffect(() => {
    const calculatedTotalPrice = cartStore.reduce((total, item) => {
      if (item.available !== false) {
        const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
        return total + itemPrice * item.quantity;
      }
      return total;
    }, 0);

    setTotalPrice(calculatedTotalPrice);
  }, [cartStore]);

  useEffect(() => {
    setTotalAPI(totalAPI - totalDiscountAPI);
    setTotalDiscountAPI(totalDiscountAPI);
  }, [totalAPI, totalDiscountAPI]);

  let discountAmount = isPercentageDiscount
  ? totalPrice * percentage
  : parseFloat(couponDiscount) || 0;

  let totalllll = totalPrice - discountAmount;

  return {
    getItemQuantity,
    cartQuantity: cartStore?.length ?? 0,
    cartQuantityTotal:
      cartStore?.reduce((total, item) => total + item.quantity, 0) ?? 0,
    cartItems: cartStore ?? [],
    isOpen,
    addToCart,
    decreaseCartQuantity,
    removeFromCart,
    disableStock,
    enableStock,
    openCart,
    closeCart,
    addCoupon,
    removeCoupon,
    totalPrice,
    totalPriceUAE,
    totalAPI,
    totalDiscountAPI,
    resetCart,
  };
};

export default useShoppingCart;
