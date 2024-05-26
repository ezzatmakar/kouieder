import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import TiktokPixel from 'tiktok-pixel';
// import { trackAddToCart } from "@/app/fb-pixel";
import useShoppingCart, { CartItem } from "@/app/stores/useShoppingCart";
// import i18next from "i18next";




function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
export default function AddToCartSimpleMini({ className, product, disabled }: {

    className?: string;
    product: CartItem;
    disabled: boolean;
    singleProductView?: boolean;
}) {
    // const { t, i18n } = useTranslation();
    const {
        getItemQuantity,
        addToCart,
        decreaseCartQuantity,
    } = useShoppingCart();
    const quantity = getItemQuantity(product) ?? 0;
    //  quantity = getItemQuantity(product);
    const handleTracking = () => {
        if (typeof window !== "undefined") {
          TiktokPixel.track("AddToCart", {
            contents: [
              {
                content_id: product.id.toString(),
                content_name: product.name,
                quantity: 1,
                price: parseFloat(product.price),
              },
            ],
            content_type: "product",
            value: parseFloat(product.price),
            currency: "EGP",
          });
        }
          if (typeof window !== "undefined") {
            import("react-facebook-pixel")
              .then((x) => x.default)
              .then((ReactPixel) => {
                ReactPixel.track("AddToCart", {
                  content_ids: [product.id],
                  content_type: "product",
                  currency: "EGP",
                  value: product.price,
                });
              });
          }
      };
    return (
        <>
            <button
                disabled={disabled}
                type="submit"
                onClick={() => {
                    addToCart(product);
                    // trackAddToCart('EGP', product.price);
                    // handleAddToCart(product);
                    handleTracking;
                }}
                className={classNames(
                    disabled ? 'cursor-not-allowed' : '',
                    className ?? ''
                )}
            >
                <img src="/images/icons/cart_plus.webp" alt="cart_plus" className="m-auto"/>
            </button >
        </>

    );
}
