import { useSelector } from "react-redux";
import type { ICartItem, IProduct } from "../../interface";

const DropDown = () => {
  const cartItems = useSelector((state: ICartItem) => state.cart.cartItems);
  console.log(cartItems);

  return (
    <div>
      <button
        data-popover-target="cart-menu"
        className=" rounded-md border border-transparent  text-center text-sm  text-slate-600 hover:bg-slate-100  active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={(e) => {
          e.currentTarget.nextElementSibling?.classList.toggle("hidden");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="red"
          className="w-7 h-7 pointer-events-none"
        >
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
        </svg>
      </button>
      <ul
        role="menu"
        data-popover="cart-menu"
        data-popover-placement="bottom"
        className=" hidden absolute z-10 min-w-[180px] max-h-50 overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
      >
        {cartItems.length ? (
          cartItems.map((item: IProduct) => {
            return (
              <li
                role="menuitem"
                className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
                <img
                  alt="tania andrew"
                  src={item.images[0]}
                  className="relative inline-block h-10 w-10 rounded-full object-cover object-center"
                />
                <div className="flex flex-col gap-1 ml-4">
                  <p className="text-slate-800 font-medium">{item.brand}</p>
                  <p className="text-slate-500 text-sm flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 mr-1 text-slate-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
                      />
                      <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                      <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                      <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                    </svg>
                    {item.quantity} x {item.price}
                  </p>
                </div>
              </li>
            );
          })
        ) : (
          <li className="cursor-pointer text-red-500 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
            Your cart is empty
          </li>
        )}
      </ul>
    </div>
  );
};

export default DropDown;
