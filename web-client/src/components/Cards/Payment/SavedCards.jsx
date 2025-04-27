import { useState } from "react";
import Card from "./Card";

function SavedCards({ cards, onDelete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setMenuOpenId(null);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setMenuOpenId(null);
    }
  };

  const handleMenuToggle = (id) => {
    setMenuOpenId(prev => (prev === id ? null : id));
  };

  if (cards.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-center">No saved cards yet.</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 relative overflow-hidden">
      
      {/* Card Container */}
      <div className="relative w-[90%] max-w-[375px] h-[225px] sm:h-[250px] md:h-[270px]">
        {cards.map((card, index) => {
          const isActive = index === currentIndex;

          if (!isActive) return null; // Only show the active card

          return (
            <div
              key={card._id}
              className="absolute top-0 left-0 w-full transition-all duration-500 ease-in-out"
            >
              <Card
                id={card._id}
                cardName={card.cardName}
                brand={card.brand}
                last4={card.last4}
                onDelete={onDelete}
                menuOpen={menuOpenId === card._id}
                onMenuToggle={handleMenuToggle}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-6 mt-8">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={nextCard}
          disabled={currentIndex === cards.length - 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default SavedCards;
