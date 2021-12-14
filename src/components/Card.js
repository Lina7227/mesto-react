function Card(card) {

    function handleClick() {
        card.onCardClick(card.card);
    }
    
     

    return (

        <li className="element">
        
            <img 
                src={card.link}
                alt={card.name}
                className="element__image"
                onClick={handleClick}
            />
            
            <button type="button" aria-label="удалить карточку" className="element__remove"></button>

            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__rate">
                    <button type="button" aria-label="оценить фото" className="element__emotion"></button>
                    <h3 className="element__number">{card.likes}</h3>
                </div>
                
            </div>
        </li>
    );
}

export default Card;