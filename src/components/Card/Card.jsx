import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"
import { useContext, useEffect } from 'react';
import AppContext from '../../context';


function Card({ id, title, imageUrl, price,
	onAddToFav,
	onAddToCart,
	favorited = false,
	added,
	loading = false }) {

	const [isFavorite, setIsFavorite] = React.useState(favorited);
	const { isItemAdded, favoriteItems } = useContext(AppContext)


	useEffect(() => {
		setIsFavorite(favorited)
	}, [favoriteItems])

	const onClickPlus = () => {
		onAddToCart({ id, parentId: id, title, imageUrl, price });

	};
	const onClickFav = () => {

		onAddToFav({ id, parentId: id, title, imageUrl, price });
		setIsFavorite(prev => prev);
	};
	return (
		<div className={styles.card}>
			{loading ?
				<ContentLoader
					speed={2}
					width={150}
					height={188}
					viewBox="0 0 150 188"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				
				>
					<rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
					<rect x="0" y="106" rx="3" ry="3" width="150" height="15" />
					<rect x="33" y="155" rx="0" ry="0" width="15" height="1" />
					<rect x="0" y="158" rx="8" ry="8" width="80" height="24" />
					<rect x="56" y="115" rx="0" ry="0" width="0" height="6" />
					<rect x="0" y="127" rx="3" ry="3" width="90" height="15" />
					<rect x="104" y="153" rx="8" ry="8" width="40" height="34" />
				</ContentLoader>
				:
				<>
					<div className={styles.favorite} onClick={onClickFav}>
						{onAddToFav && <img src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"} alt="Unliked" />}
					</div>
					<img width={133} height={112} src={imageUrl} alt="Sneakers" />
					<h5>{title}</h5>
					<div className={styles.card__bottom}>
						<div className={styles.card__price}>
							<span>Price:</span>
							<b>{price} usd</b>
						</div>
						{onAddToCart && <img
							className={styles.plus}
							onClick={onClickPlus}
							src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
							alt="Plus"
						/>}
					</div>
				</>
			}

			{/* */}
		</div>
	);
}

export default Card;
