import React from 'react'
import AppContext from '../context'
import { useContext } from 'react'
export default function Info({ title, description, image }) {
	const { setCartOpened } = useContext(AppContext)
	const onCloseCard = () => {
		setCartOpened(false)
		document.querySelector("body").classList.remove('lock')
	}
	return (
		<div class="cartEmpty">
			<img width="120px" height="120px" src={image} alt="Empty" />
			<h2>{title}</h2>
			<p class="cartEmpty__text">{description}</p>
			<button onClick={ onCloseCard} class="greenButton">
				<img src="img/arrow.svg" alt="Arrow" />
				Return to catalog
			</button>
		</div>
	)
}
