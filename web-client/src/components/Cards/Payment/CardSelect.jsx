function CardSelect ({ savedCards, onSelect, onOther }){
    return (
    <div className="grid gap-4">
      {savedCards?.map(card => (
        <div key={card._id} className="card shadow-md bg-base-100 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold">{card.cardName}</h2>
              <p>{card.brand} •••• {card.last4}</p>
            </div>
            <button className="btn btn-primary" onClick={() => onSelect(card)}>Use</button>
          </div>
        </div>
      ))}
      <div className="divider">or</div>
      <button className="btn btn-outline w-full" onClick={onOther}>Use another card</button>
    </div>
  )};

  export default CardSelect;
  