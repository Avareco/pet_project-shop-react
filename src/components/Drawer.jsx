
import { useState } from 'react';
import React from 'react';
import Info from './Info';

import axios from 'axios';
import { useCart } from '../hooks/useCart';
const delay =(ms)=>new Promise((resolve)=>setTimeout(resolve,ms))
function Drawer({ items = [], onDelFromCart, setCartOpened }) {
	const [orderComplete, setOrderComplete] = useState(false);
	const [orderId, setOrderId] = useState(0)
	const [isLoading, setIsLoading] = useState(false);
	
	const onCloseCard = () => {
		setCartOpened(false)
		document.querySelector("body").classList.remove('lock')
	}
const {cartItems,setCartItems,totalPrice}=useCart();
	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post('https://623c280e2e056d1037fa7eb3.mockapi.io/orders', { items: cartItems })
						setOrderId(data.id)
			setOrderComplete(true);
			setCartItems([])
			for (let i = 0; i < cartItems.length; i++) {
				const item=cartItems[i]
				await axios.delete(`https://623c280e2e056d1037fa7eb3.mockapi.io/drawer/${item.id}`)
				await delay(1000);
				
			}
		} catch (error) {
			alert("Failed to create order")
		}
		setIsLoading(false);
	}

	return (
		<div className="overlay">
			<div className="drawer">
				<h2>
					Корзина <img onClick={onCloseCard} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
				</h2>
				{items.length > 0 ?
					<div>
						<div className="items">
							{items.map((obj) => (
								<div key={obj.id} className="cartItem">
									<div
										style={{ backgroundImage: `url(${obj.imageUrl})` }}
										className="cartItemImg"></div>

									<div className="cartItemTitle">
										<p>{obj.title}</p>
										<b>{obj.price} руб.</b>
									</div>
									<img onClick={() => onDelFromCart(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
								</div>
							))}
						</div>

						<div className="cartTotalBlock">
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice}  руб. </b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>{totalPrice*0.05} руб. </b>
								</li>
							</ul>
							<button disabled={isLoading} onClick={onClickOrder} className="greenButton">
								Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
							</button>
						</div>
					</div>
					:
					<Info title={orderComplete ? "Заказ Оформлен!" : "Корзина пустая"}
						description={orderComplete ?
							`Ваш заказ #${orderId} скоро будет передан курьерской доставке` :
							"Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
						image={orderComplete ? "/img/order-complete.jpg" : "/img/empty-cart.jpg"} />

				}
			</div>
		</div>
	);
}

export default Drawer;
