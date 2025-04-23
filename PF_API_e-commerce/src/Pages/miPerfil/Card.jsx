import './cardStyles.css'

function Card({nombreImagen,titulo,cuerpo}) {
    
    const imagePath = new URL(`../../assets/${nombreImagen}`, import.meta.url).href;
    
    return(
        <div className="card">
            <div>
                <img className='card-image' src={imagePath} alt="Cardbox logo" />
            </div>
            <div className="card-body">
                <h2 className='card-title'>{titulo}</h2>
                <p className='card-text'>{cuerpo}</p>
            </div>
        </div>
    );
}
export default Card;