import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { values } from "lodash";
import React, { useState } from "react";
import "./LogIn.css";
const api = process.env.REACT_APP_API_ENDPOINT || window.location.origin;

function AddItem(props) {
  const [newItemCount, setNewItemCount] = useState('');
  const [newItemProductId, setNewItemProductId] = useState(-1);
  const [newItemExpiration, setNewItemExpiration] = useState('');
  const [formKeyItem, setFormKeyItem] = useState(10);

  // SUBMIT NEW ITEM
  const itemSubmit = async (evt) => {
    evt.preventDefault();
    setFormKeyItem(formKeyItem + 1)
    let data = {
      count: parseInt(newItemCount),
      product_id: parseInt(newItemProductId),
      fridge_id: props.fridgeId,
    };

  // resetForm= () => {
  //   this.setState({count:''} )
  // }

    const expiration = parseInt(newItemExpiration);
    if (expiration) {
      data.expiration = expiration;
    }
    const postNewItem = await axios.post(`${api}/item`, data);
    props.getItems();
  };

  return (
    <FormControl key={formKeyItem}>
      <form onSubmit={itemSubmit}>
        <label>Add New Food Item</label>
        <div>
          <Select
            value={newItemProductId}
            onChange={(e) => setNewItemProductId(e.target.value)}
            displayEmpty
          >
            <MenuItem value={-1} disabled>
              Select Product
            </MenuItem>
            {props.products &&
              props.products.map((product) => (
                <MenuItem value={product.id}>{product.name}</MenuItem>
              ))}
          </Select>
        </div>
        <div>
          <TextField
            variant="outlined"
            type="number"
            name="count"
            placeholder="Count"
            onChange={(e) => setNewItemCount(e.target.value)}
          />
        </div>
        <TextField
          variant="outlined"
          type="number"
          name="expiration"
          placeholder="Expiration"
          onChange={(e) => setNewItemExpiration(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </FormControl>
  );
}

export default AddItem;
