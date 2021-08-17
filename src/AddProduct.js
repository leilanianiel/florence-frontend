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
import Quagga from "quagga";
const api = process.env.REACT_APP_API_ENDPOINT || window.location.origin;

function AddProduct(props) {
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState(-1);
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductBarcode, setNewProductBarcode] = useState("");
  const [open, setOpen] = useState(false);

  const closePopup = () => {
    Quagga.stop();
    setOpen(false);
  };

  // SUBMIT NEW PRODUCT
  const onSubmit = async (evt) => {
    evt.preventDefault();

    const data = {
      name: newProductName,
      category_id: parseInt(newProductCategory),
      image: newProductImage,
    };

    if (newProductBarcode) {
      data.barcode = newProductBarcode;
    }
    const postNewProduct = await axios.post(`${api}/product`, data);

    props.getProducts();

    setNewProductName("");
    setNewProductBarcode("");
    setNewProductImage("");
    setNewProductCategory(-1);
  };

  const barcodeStart = async (evt) => {
    setOpen(true);

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: '#productBarcode'
        },
        decoder: {
          readers: ["code_128_reader",
            "ean_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "upc_e_reader",
            "codabar_reader",
            "2of5_reader",
            "code_93_reader",
          ],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        let handler = Quagga.onDetected(onDetected);
        function onDetected(data) {
          console.log(data);
          setNewProductBarcode(data.codeResult.code);
          Quagga.offDetected(handler);
          closePopup();
        };
        Quagga.start();
      }
    );
  };

  return (
    <FormControl>
      <form className="form" onSubmit={onSubmit}>
        <label>Add New Product</label>
        <div>
          <TextField
            variant="outlined"
            type="text"
            name="name"
            placeholder="Food Name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            type="url"
            name="Image"
            placeholder="Paste image URL"
            value={newProductImage}
            onChange={(e) => setNewProductImage(e.target.value)}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={barcodeStart}>
            Scan barcode
          </Button>

          <div
            className={`cover ${open ? "visible" : ""}`}
            onClick={closePopup}
          >
            <div id="productBarcode" className="viewport"></div>
          </div>
        </div>
        <div>
          <TextField
            variant="outlined"
            type="text"
            name="Barcode"
            placeholder="Barcode"
            value={newProductBarcode}
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
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </Select>
        </div>
        <div className="space">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </FormControl>
  );
}

export default AddProduct;
