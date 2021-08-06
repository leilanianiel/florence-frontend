import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MyFridge.css";
import Button from "@material-ui/core/Button";

const api = process.env.REACT_APP_API_ENDPOINT || window.location.origin;
const customer_id = window.userId;

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
        {items.map((item) => {
          let product = products.find((p) => p.id === item.product_id);
          console.log(product);

          return (
            <>
              <img className="product-image" src={product.image} alt={product.name} />
            </>
          );
        })}
      </div>
      <div>
        <Button className="btn" variant="contained" color="primary">
          Expiring Soon
        </Button>
        <Button className="btn" variant="contained" color="primary">
          Dairy
        </Button>
        <Button className="btn" variant="contained" color="primary">
          Primary
        </Button>
      </div>
    </div>
  );
}

export default MyFridge;
