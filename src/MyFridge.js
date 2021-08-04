import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MyFridge.css";
const api = process.env.REACT_APP_API_ENDPOINT;

const customer_id = 1; // TODO: do this properly

function MyFridge() {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getData() {
      const customerResponse = await axios.get(
        `${api}/customer/${customer_id}`
      );
      setCustomer(customerResponse.data);

      const productResponse = await axios.get(`${api}/product`);
      setProducts(productResponse.data);
    }

    getData();
  }, []);

  useEffect(() => {
    if (!customer) {
      return;
    }

    async function getData() {
      const itemsInFridgeResponse = await axios.get(
        `${api}/fridge/${customer.fridge_id}/items`
      );
      setItems(itemsInFridgeResponse.data);
    }

    getData();
  }, [customer]);

  return (
    <div className="MyFridge">
      {customer && (
        <div>
          id: {customer.id}
          user_name: {customer.user_name}
          fridge: {customer.fridge_id}
          <img src={customer.picture} alt={customer.user_name} />
        </div>
      )}
      <div>
        items:
        {items.map((item) => {
          let product = products.find((p) => p.id === item.product_id);

          return (
            <>
              id: {item.id}
              fridge: {item.fridge_id}
              product: {item.product_id}
              count: {item.count}
              fridge: {product.name}
              <img src={product.image} alt={product.name} />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default MyFridge;
