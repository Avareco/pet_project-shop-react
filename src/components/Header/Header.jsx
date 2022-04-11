import { Link } from "react-router-dom";
import "./Header.scss"
import { useCart } from "../../hooks/useCart";

function Header({ setCartOpened }) {
	const onClickCart = () => {
		setCartOpened(true);
		document.querySelector("body").classList.add('lock')
	}
	const { totalPrice, countFavs } = useCart();
	return (
		<header className="header">
			<Link to="">
				<div className="logo ">
					<img width={40} height={40} src="./img/logo.png" alt="logo" />
					<div>
						<h3 className="text-uppercase">React Sneakers</h3>
						<p className="opacity-5">Number #1 sneakers shop</p>
					</div>
				</div>
			</Link>
			<ul className="header__content ">
				<li onClick={onClickCart} className="header__cart ">
					<img width={18} height={18} src="img/cart.svg" alt="cart" />
					<span>{totalPrice > 0 && totalPrice + " usd"}</span>
				</li>
				<li>
					<Link to="favorites">
						{countFavs > 0 && <div className="header__counter">{countFavs}</div>}
						<img width={18} height={18} src="img/favorits.svg" alt="favorite" /></Link>
				</li>
				<li>
					<Link to="orders">
						<img width={18} height={18} src="img/user.svg" alt="user" /></Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;
