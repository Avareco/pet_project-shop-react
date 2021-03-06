import React, { useState } from 'react';
import { Route } from "react-router-dom";
import Header from './components/Header/Header.jsx';
import Drawer from './components/Drawer/Drawer.jsx';
import Home from './pages/Home.jsx';
import './index.scss'
import axios from 'axios';
import Favorites from './pages/Favorites.jsx';
import AppContext from './context'
import Orders from './pages/Orders.jsx';
function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favoriteItems, setFavoriteItems] = useState([]);
	const [cartOpened, setCartOpened] = useState(false);
	const [findItem, setFindItem] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	React.useEffect(() => {
		//  fetch('https://623c280e2e056d1037fa7eb3.mockapi.io/items')
		//    .then((res) => {
		//      return res.json();
		//    })
		//    .then((json) => {
		//      setItems(json);
		//    });
		async function fetchData() {
			const cartResp = await axios.get('https://623c280e2e056d1037fa7eb3.mockapi.io/drawer')
			const favoritesResp = await axios.get('https://623c280e2e056d1037fa7eb3.mockapi.io/favorites')
			const itemsResp = await axios.get('https://623c280e2e056d1037fa7eb3.mockapi.io/items');
			setIsLoading(false);
			setCartItems(cartResp.data)
			setFavoriteItems(favoritesResp.data)
			setItems(itemsResp.data)

		}
		fetchData();

	}, []);

	const onAddToCart = async (obj) => {
		try {

			const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
			if (findItem) {
				setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`https://623c280e2e056d1037fa7eb3.mockapi.io/drawer//${findItem.id}`);
			} else {
				setCartItems((prev) => [...prev, obj]);
				const { data } = await axios.post('https://623c280e2e056d1037fa7eb3.mockapi.io/drawer/', obj);
				setCartItems((prev) =>
					prev.map((item) => {
						if (item.parentId === data.parentId) {
							return {
								...item,
								id: data.id,
							};
						}
						return item;
					}),
				);
			}

		} catch (error) {
			alert("Failed to add to cart")
		}
	};

	const onAddToFav = async (obj) => {
		try {
			const findItem = favoriteItems.some((item) => Number(item.id) === Number(obj.id));
			if (findItem) {
				//await	axios.delete(`https://623c280e2e056d1037fa7eb3.mockapi.io/favorites/${obj.id}`);
				setFavoriteItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
			} else {

				//await axios.post('https://623c280e2e056d1037fa7eb3.mockapi.io/favorites',obj);
				setFavoriteItems((prev) => [...prev, obj]);
			}

		} catch (error) {
			alert("Failed to add to favorites")
		}

	};

	const onDelFromCart = (id) => {
		try {
			setCartItems(cartItems.filter(item => Number(item.id) !== Number(id)))
			axios.delete(`https://623c280e2e056d1037fa7eb3.mockapi.io/drawer/${id}`)
		} catch (error) {
			alert("Failed to remove from cart")
		}

	}
	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};

	return (
		<AppContext.Provider value={
			{
				cartItems,
				setCartItems,
				favoriteItems,
				items,
				isItemAdded,
				setCartOpened,
				setCartItems,
				onAddToFav,
				onAddToCart
			}}>
			<div className="wrapper ">
				{cartOpened &&
					<Drawer
						items={cartItems}
						onDelFromCart={onDelFromCart}
						setCartOpened={setCartOpened} />}
				<Header setCartOpened={setCartOpened} />
				<Route path="/favorites">
					<Favorites

						onAddToCart={onAddToCart}
						onAddToFav={onAddToFav}
					/>
				</Route>
				<Route path="/" exact>
					<Home
						findItem={findItem}
						setFindItem={setFindItem}
						items={items}
						onAddToFav={onAddToFav}
						onAddToCart={onAddToCart}
						cartItems={cartItems}
						favoriteItems={favoriteItems}
						isLoading={isLoading}
					/>
				</Route>
				<Route path="/orders">
					<Orders />
				</Route>
			</div>
		</AppContext.Provider>
	);
}

export default App;
