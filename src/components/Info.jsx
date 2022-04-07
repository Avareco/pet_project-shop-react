import React from 'react'
import AppContext from '../context'
import { useContext } from 'react'
export default function Info({ title, description, image }) {
	const { setCartOpened } = useContext(AppContext)
	return (
		<div class="cartEmpty">
			<img width="120px" height="120px" src={image} alt="Empty" />
			<h2>{title}</h2>
			<p class="cartEmpty__text">{description}</p>
			<button onClick={() => setCartOpened(false)} class="greenButton">
				<img src="/img/arrow.svg" alt="Arrow" />
				Вернуться назад
			</button>
		</div>
	)
}
