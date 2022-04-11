import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'


import Card from '../components/Card/Card'
import AppContext from '../context';


export default function Orders() {
	const [orders, setOrders] = useState([])
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		try {
			(async () => {
				const { data } = await axios.get('https://623c280e2e056d1037fa7eb3.mockapi.io/orders');
				setIsLoading(false)
				setOrders(data.map(obj => obj.items).flat()
				)
			})()
		} catch (error) {
			alert("Orders downloading failed")
		}

	}, [])  
	const { cartItems } = useContext(AppContext)

	return (
		<div className="content">
			<div className="content__input">

				<h1>My orders</h1>

			</div>

			<div className="items">

				{
					isLoading ? [...Array(8)]
						.map((item, index) => (
							<Card
								key={index}
								loading={isLoading}
								{...item}
							/>
						)) :
						orders.map((item, index) => (
							<Card
								key={index}
								loading={isLoading}
								{...item}
							/>
						))}
			</div>
		</div>
	)
}
