import {useState} from 'react'
import Popup from 'reactjs-popup'
import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => {
  const [paymentPop, setPaymentPop] = useState([])
  const [isDisable, setIsDisable] = useState('')
  const [confirm, setConfirm] = useState(false)
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        const showEmptyView = cartList.length === 0
        // TODO: Update the functionality to remove all the items in the cart
        const onClickRemoveAllProducts = () => {
          removeAllCartItems()
        }
        let total = 0
        const totalAmount = cartList.map(each => {
          if (each.quantity > 1) {
            total += each.quantity * each.price
          } else {
            total += each.price
          }
        })
        const onClickConfirmOrder = e => {
          setConfirm(true)
          console.log(e.target.value)
        }
        const onClickCheckOut = () => {
          setPaymentPop(false)
        }

        const onChangeRadio = e => {
          setIsDisable(e.target.value)
        }

        return (
          <>
            <Header />
            <div className="cart-container">
              {showEmptyView ? (
                <EmptyCartView />
              ) : (
                <div className="cart-content-container">
                  <div className="mycart-removAll-container">
                    <div>
                      <h1 className="cart-heading">My Cart</h1>
                    </div>
                    <div className="remove-all-button-container">
                      <button
                        className="remove-all-items-button"
                        onClick={onClickRemoveAllProducts}
                      >
                        Remove All
                      </button>
                    </div>
                  </div>
                  <CartListView />
                  <div className="checkout-cart-container">
                    <h1 className="order-total-heading">
                      Order Total: RS <a>{total}/-</a>
                    </h1>
                    <p>{cartList.length} Items in cart</p>
                    <Popup
                      modal
                      trigger={
                        <button
                          onClick={onClickCheckOut}
                          className="checkout-button"
                          type="button"
                        >
                          Checkout
                        </button>
                      }
                    >
                      <div className="popup-container">
                        <div className="popup-content-container">
                          <div className="payment-type-container">
                            <label>
                              <input
                                type="radio"
                                name="payment"
                                value="Card"
                                onChange={onChangeRadio}
                                disabled
                              />
                              Card
                            </label>
                            <br />
                            <label>
                              <input
                                type="radio"
                                name="payment"
                                value="Net Banking"
                                onChange={onChangeRadio}
                                disabled
                              />
                              Net Banking
                            </label>
                            <br />
                            <label>
                              <input
                                type="radio"
                                name="payment"
                                value="UPI"
                                onChange={onChangeRadio}
                                disabled
                              />
                              UPI
                            </label>
                            <br />
                            <label>
                              <input
                                type="radio"
                                name="payment"
                                value="Wallet"
                                onChange={onChangeRadio}
                              />
                              Wallet
                            </label>
                            <br />
                            <label>
                              <input
                                type="radio"
                                name="payment"
                                value="Cash on Delivery"
                                onChange={onChangeRadio}
                              />
                              Cash on Delivery
                            </label>
                            <br />
                          </div>
                          <div className="checkout-cart-total-container">
                            <dl>
                              <dt>Summery</dt>
                              <dd>
                                <p>total items: {cartList.length}</p>
                                <p>total price: {total}</p>
                              </dd>
                            </dl>
                            <hr />
                          </div>
                        </div>
                        <div className="successfully-container">
                          <button
                            className="confirm-order-button"
                            onClick={onClickConfirmOrder}
                            value={!(isDisable === 'Cash on Delivery')}
                            disabled={!(isDisable === 'Cash on Delivery')}
                          >
                            Confirm Order
                          </button>
                          {confirm && (
                            <p>Your order has been placed successfully</p>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </div>
                </div>
              )}
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
export default Cart
