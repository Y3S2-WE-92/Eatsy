import { useState } from "react";
import Card from "./Card";
import { useToast } from "../../../utils/alert-utils/ToastUtil";

function SavedCards({ cards, onDelete, onEdit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editCardId, setEditCardId] = useState(null);
  const [newCardName, setNewCardName] = useState("");
  const toast = useToast();

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

  const openEditModal = (id, currentName) => {
    setEditCardId(id);
    setNewCardName(currentName);
    document.getElementById('edit_modal').showModal();
  };

  const handleEditSubmit = () => {
    if (newCardName.trim()) {
      if (newCardName == null) {
        toast.warning("Enter a card name don't keep it null")
      }
      onEdit(editCardId, newCardName);
      document.getElementById('edit_modal').close();
    }
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
          if (!isActive) return null;

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
                onEdit={() => openEditModal(card._id, card.cardName)}
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

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Card Name</h3>
          <input
            type="text"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter new card name"
          />
          <div className="modal-action">
            <button onClick={handleEditSubmit} className="btn btn-primary">Save</button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

    </div>
  );
}

export default SavedCards;
