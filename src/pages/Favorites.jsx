import React from 'react'

import Card from '../components/Card/Card'
import AppContext from '../context'

export default function Favorites({ onAddToCart,onAddToFav}) {
 const {favoriteItems,cartItems} = React.useContext(AppContext)
 function isFavorited(item) {
	return (favoriteItems
		.some(obj => Number(obj.parentId) === Number(item.id)
		))
}
 
	return (
	<div className="content">
			<div className="content__input">
				 
					<h1>Мои закладки</h1>
				
			</div>

			<div className="items">
		{favoriteItems.map((item) => (
						<Card
							onAddToCart={onAddToCart}
							onAddToFav={onAddToFav}
							favorited={true}
							added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
							{...item}
						/>
					))}
			</div>
		</div>
  )
}
