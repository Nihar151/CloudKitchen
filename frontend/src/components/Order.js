import React, { useState } from "react";

const Order = ({setItems}) => {
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Food: ", food);
    console.log("Quantity: ", quantity);

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        food,
        quantity,
      }),
    });
    console.log(response.status);
    console.log(response.ok);

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setItems((prev) => [json, ...prev]);
      setError(null);
      setEmptyFields([]);
      console.log(json);
    }
  };
  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a food to cart</h3>
        <label>Food</label>
        <select onChange={(e) => setFood(e.target.value)}>
          <option value="">-Select a food item-</option>
          <option value="Pizza">Pizza</option>
          <option value="Pasta">Pasta</option>
          <option value="Burger">Burger</option>
          <option value="Momos">Momos</option>
          <option value="Sandwich">Sandwich</option>
        </select>
        <label>Quantity</label>
        <input
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
        <button>Add item</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Order;
