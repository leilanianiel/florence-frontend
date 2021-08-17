import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Slide,
  TextField,
  Dialog,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import "./LogIn.css";
import Quagga from "quagga";
const api = process.env.REACT_APP_API_ENDPOINT || window.location.origin;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AddItem(props) {
  const [newItemCount, setNewItemCount] = useState("");
  const [newItemProductId, setNewItemProductId] = useState(-1);
  const [newItemExpiration, setNewItemExpiration] = useState("");
  const [newProductBarcode, setNewProductBarcode] = useState("");
  const [open, setOpen] = useState(false);

  const closePopup = () => {
    Quagga.stop();
    setOpen(false);
  };

  // SUBMIT NEW ITEM
  const itemSubmit = async (evt) => {
    evt.preventDefault();
    let data = {
      count: parseInt(newItemCount),
      product_id: parseInt(newItemProductId),
      fridge_id: props.fridgeId,
    };

    const expiration = parseInt(newItemExpiration);
    if (expiration) {
      data.expiration = expiration;
    }
    const postNewItem = await axios.post(`${api}/item`, data);
    props.getItems();

    setNewItemExpiration("");
    setNewItemProductId(-1);
    setNewProductBarcode("");
    setNewItemCount("");
  };

  const barcodeStart = async (evt) => {
    setOpen(true);

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: "#itemBarcode",
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "code_39_reader",
            "upc_e_reader",
            "code_39_vin_reader",
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
          let product = props.products.find(
            (p) => p.barcode === data.codeResult.code
          );
          if (product) {
            Quagga.offDetected(handler);
            setNewItemProductId(product.id);
            closePopup();
          }
        }
        Quagga.start();
      }
    );
  };

  return (
    <FormControl>
      <form className="form" onSubmit={itemSubmit}>
        <label>Add New Item</label>
        <div>
          <Button variant="contained" color="primary" onClick={barcodeStart}>
            Scan barcode
          </Button>

          <div
            className={`cover ${open ? "visible" : ""}`}
            onClick={closePopup}
          >
            <div id="itemBarcode" className="viewport"></div>
          </div>
        </div>
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
                <MenuItem value={product.id} key={product.id}>
                  {product.name}
                </MenuItem>
              ))}
          </Select>
        </div>
        <div>
          <TextField
            variant="outlined"
            type="number"
            name="count"
            placeholder="Count"
            value={newItemCount}
            onChange={(e) => setNewItemCount(e.target.value)}
          />
        </div>
        <TextField
          variant="outlined"
          type="number"
          name="expiration"
          placeholder="Expiration"
          value={newItemExpiration}
          onChange={(e) => setNewItemExpiration(e.target.value)}
        />
        <div className="space">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </FormControl>
  );
}

export default AddItem;
