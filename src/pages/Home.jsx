import React from 'react'

import Card from '../components/Card/Card.jsx';
export default function Home({ findItem,
	setFindItem,
	items,
	cartItems,
	favoriteItems,
	onAddToFav,
	onAddToCart,
	isLoading
}) {
	function isAdded(item) {
		return (cartItems
			.some(obj => Number(obj.id) === Number(item.id)
			))
	}

	function isFavorited(item) {
		return (favoriteItems
			.some(obj => Number(obj.id) === Number(item.id)
			))
	}


	console.log(favoriteItems)
	const renderItems = () => {
		if (isLoading) {
			return (
				[...Array(8)]
					.map((item, index) => (
						<Card
							key={index}
							onAddToFav={onAddToFav}
							onAddToCart={(obj) => onAddToCart(obj)}
							added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
							loading={isLoading}
							{...item}
						/>
					)))
		} else {
			return (
				items
					.filter((item) => (item.title
						.toLowerCase()
						.includes(findItem.toLowerCase())))
					.map((item) => (
						<Card
							key={item.id}
							onAddToFav={onAddToFav}
							onAddToCart={(obj) => onAddToCart(obj)}
							added={isAdded(item)}
							favorited={isFavorited(item)}
							loading={isLoading}
							cartItems={cartItems}
							{...item}
						/>
					)))
		}
	}

	return (
		<div className="content">
			<div className="content__input">

				{findItem.length > 0 ?
					<h1>Поиск по: {findItem}</h1> :
					<h1>Все кроссовки</h1>}
				<div className="search-block ">
					<img src="/img/search.svg" alt="Search" />
					<input
						value={findItem}
						onChange={e => setFindItem(e.target.value)}
						placeholder="Поиск..." />
					{findItem && <img onClick={() => setFindItem("")} height={30}
						width={30}
						src="/img/btn-remove.svg" alt="remove" />}

				</div>
			</div>

			<div className="items">
				
					{
						renderItems()
					}
				
			</div>
		</div>
	)
}
