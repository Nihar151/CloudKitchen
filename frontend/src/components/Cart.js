import React, { useState, useEffect } from "react";

const Cart = ({ items, setItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/cart");
      const json = await response.json();

      if (response.ok) {
        setItems(json);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch("/api/cart/" + id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    }
  };

  const openModal = (item) => {
    setEditingItem(item);
    setNewQuantity(item.quantity);
    setIsOpen(true);
  };

const handleEdit = async () => {
  const response = await fetch("/api/cart/" + editingItem._id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: newQuantity,
    }),
  });

  const json = await response.json();

  if (response.ok) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === json._id ? json : item
      )
    );

    setIsOpen(false);
    setEditingItem(null);
  }
};
  return (
    <div>
      {isOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Edit Quantity</h3>

      <input
        type="number"
        value={newQuantity}
        onChange={(e) => setNewQuantity(Number(e.target.value))}
      />

      <div className="modal-buttons">
        <button onClick={handleEdit}>Save</button>
        <button
          className="cancel-btn"
          onClick={() => {
            setIsOpen(false);
            setEditingItem(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
      <h3>Your Cart</h3>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        items.map((item) => (
          <div className="cart-item" key={item._id}>
            <h4>{item.food}</h4>
            <p>Quantity: {item.quantity}</p>
            <span
              onClick={() => handleDelete(item._id)}
              className="material-symbols-outlined"
            >
              delete
            </span>
            <span
              onClick={() => openModal(item)}
              className="material-symbols-outlined"
            >
              edit
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
