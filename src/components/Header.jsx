import { Link } from "react-router-dom";
import AppContext from "../context";
import "./Header.scss"
import React, { useContext } from 'react'
import { useCart } from "../hooks/useCart";

function Header({ setCartOpened, price, counterFavorites }) {
	const onClickCart = () => {
		setCartOpened(true);
		document.querySelector("body").classList.add('lock')
	}
	const { totalPrice } = useCart();
	return (
		<header className="header">
			<Link to="/">
				<div className="logo ">
					<img width={40} height={40} src="/img/logo.png" />
					<div>
						<h3 className="text-uppercase">React Sneakers</h3>
						<p className="opacity-5">Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className="header__content ">
				<li onClick={onClickCart} className="header__cart ">
					<img width={18} height={18} src="/img/cart.svg" />
					<span>{totalPrice > 0 && totalPrice + " руб."}</span>
				</li>
				<li>
					<Link to="/favorites">
						{counterFavorites > 0 && <div className="header__counter">{counterFavorites}</div>}
						<img width={18} height={18} src="/img/favorits.svg" /></Link>
				</li>
				<li>
					<Link to="/orders">
						<img width={18} height={18} src="/img/user.svg" /></Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;