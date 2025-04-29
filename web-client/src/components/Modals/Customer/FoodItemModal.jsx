import React, { useState } from "react";
import Counter from "../../ShoppingCart/Counter";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";
import ImageLoader from "../../Loaders/ImageLoader";
import { useImageLoaded } from "../../../utils/image-utils/useImageLoaded";
import { formatMinutesTime } from "../../../utils/format-utils/TimeFormatUtil";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/customer/cartSlice";
import { useToast } from "../../../utils/alert-utils/ToastUtil";

function FoodItemModal({ item, isOpen, onClose }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const isImageLoaded = useImageLoaded(item.image);

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (sizeID, qty) => {
    setQuantities((prev) => ({ ...prev, [sizeID]: qty }));
  };

  const handleAddToCart = () => {
    const cartItems = item.sizes
      .filter((size) => quantities[size._id] > 0)
      .map((size) => ({
        itemID: item._id,
        name: item.name,
        selectedSize: size.size,
        quantity: quantities[size._id],
        price: size.price,
      }));

    if (cartItems.length > 0) {
      dispatch(
        addToCart({
          restaurantID: item.restaurantID,
          restaurantName: item.restaurantName,
          deliveryFee: item.deliveryFee,
          items: cartItems,
        })
      );
    }
    toast.success("Items added to your cart");
    onClose();
  };

  return (
    <>
      <dialog
        id="shopping-cart-view-modal"
        className="modal modal-bottom sm:modal-middle"
        open={isOpen}
      >
        <div className="modal-box min-w-8/10 max-w-5xl">
          <div className="flex flex-col">
            <div className="card lg:card-side bg-base-100 shadow-sm">
              <figure className="w-full lg:w-96 h-96 overflow-hidden">
                {isImageLoaded ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-accent/30">
                    <ImageLoader />
                  </div>
                )}
              </figure>

              <div className="card-body w-full">
                <div className="flex flex-col gap-4">
                  <h2 className="card-title">{item.name}</h2>
                  <p>{item.description}</p>
                  <p>
                    Est. Preparation Time:{" "}
                    {formatMinutesTime(item.estPreperationTime)}
                  </p>
                  <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                      <tbody>
                        {item.sizes?.map((size) => (
                          <tr key={size._id}>
                            <td>{size.size}</td>
                            <td>{formatCurrency(size.price)}</td>
                            <td>
                              <Counter
                                existingQty={quantities[size._id] || 0}
                                onQuantityChange={(qty) =>
                                  handleQuantityChange(size._id, qty)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="card-actions justify-end">
                    <div className="flex flex-row gap-2">
                      <button className="btn btn-outline" onClick={onClose}>
                        Close
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleAddToCart}
                        disabled={Object.values(quantities).every(
                          (qty) => qty === 0 || qty === undefined
                        )}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default FoodItemModal;
