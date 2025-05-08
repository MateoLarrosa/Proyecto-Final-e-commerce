import styles from './cardStyles.module.css'


function Card({nombreImagen,titulo,cuerpo, onClick}) {
    
    const imagePath = new URL(`../../assets/${nombreImagen}`, import.meta.url).href;
    
    return(
        <div className={styles.card} onClick={onClick} style={{cursor: onClick ? 'pointer' : 'default'}}>
            <div>
                <img className={styles.cardImage} src={imagePath} alt="Cardbox logo" />
            </div>
            <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{titulo}</h2>
                <p className={styles.cardText}>{cuerpo}</p>
            </div>
        </div>
    );
}
export default Card;