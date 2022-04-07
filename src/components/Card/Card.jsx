import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"
import { useContext,useEffect } from 'react';
import AppContext from '../../context';


function Card({ id, title, imageUrl, price,
	onAddToFav,
	onAddToCart,
	favorited = false,
	added = false,
	loading = false }) {
	const [isAdded, setIsAdded] = React.useState(added);
	const [isFavorite, setIsFavorite] = React.useState(favorited);
	const { cartItems, favoriteItems, items } = useContext(AppContext)

	useEffect(() => {
	  setIsAdded(added)
	}, [cartItems,favoriteItems])
	

	const onClickPlus = () => {
		onAddToCart({ id, title, imageUrl, price });
		setIsAdded(!isAdded);
	};
	const onClickFav = () => {
		onAddToFav({ id, title, imageUrl, price });
		setIsFavorite(!isFavorite);
	};
	return (
		<div className={styles.card}>
			{loading ?
				<ContentLoader
					speed={3}
					width={150}
					height={260}
					viewBox="0 0 150 260"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="100" rx="3" ry="3" width="150" height="15" />
					<rect x="118" y="144" rx="8" ry="8" width="32" height="32" />
					<rect x="0" y="150" rx="8" ry="8" width="80" height="24" />
					<rect x="0" y="120" rx="3" ry="3" width="90" height="15" />
					<rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
				</ContentLoader>
				:
				<>
					<div className={styles.favorite} onClick={onClickFav}>
						<img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked" />
					</div>
					<img width={133} height={112} src={imageUrl} alt="Sneakers" />
					<h5>{title}</h5>
					<div className={styles.card__bottom}>
						<div className={styles.card__price}>
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						<img
							className={styles.plus}
							onClick={onClickPlus}
							src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
							alt="Plus"
						/>
					</div>
				</>
			}

			{/* */}
		</div>
	);
}

export default Card;
