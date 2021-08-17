import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import "./LogIn.css";
const api = process.env.REACT_APP_API_ENDPOINT || window.location.origin;

function AddProduct(props) {
  const [newProductName, setNewProductName] = useState();
  const [newProductCategory, setNewProductCategory] = useState(-1);
  const [newProductImage, setNewProductImage] = useState();

  // SUBMIT NEW PRODUCT
  const onSubmit = async (evt) => {
    evt.preventDefault();

    const postNewProduct = await axios.post(`${api}/product`, {
      name: newProductName,
      category_id: parseInt(newProductCategory),
      image: newProductImage,
    });

    props.getProducts();

    // setNewProduct(postNewProduct.data);
  };

  return (
    <FormControl>
      <form onSubmit={onSubmit}>
        <label>Add New Food Product</label>
        <div>
          <TextField
            variant="outlined"
            type="text"
            name="name"
            placeholder="Food Name"
            onChange={(e) => setNewProductName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="url"
            name="Image"
            placeholder="Paste image URL"
            onChange={(e) => setNewProductImage(e.target.value)}
          />
        </div>
        <div>
          <Select
            value={newProductCategory}
            onChange={(e) => setNewProductCategory(e.target.value)}
            displayEmpty
          >
            <MenuItem value={-1} disabled>
              Select Category
            </MenuItem>
            {props.categories &&
              props.categories.map((category) => (
                <MenuItem value={category.id}>{category.name}</MenuItem>
              ))}
          </Select>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </FormControl>
  );
}

export default AddProduct;
