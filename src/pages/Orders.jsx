import React from 'react'

import Card from '../components/Card/Card'


export default function Orders() {

	return (
		<div className="content">
			<div className="content__input">

				<h1>Мои заказы</h1>

			</div>

			<div className="items">
				{[].map((item) => (
					<Card

						{...item}
					/>
				))}
			</div>
		</div>
	)
}
