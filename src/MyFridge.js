import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MyFridge.css";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AddIcon from "@material-ui/icons/Add";

import Typography from "@material-ui/core/Typography";
import { CardMedia, Fab } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import ItemsPage from "./ItemsPage";
const api = process.env.REACT_APP_API_ENDPOINT || window.location.origin;
const customer_id = process.env.REACT_APP_TEST_USER || window.userId;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyFridge() {
  const [uniqueItems, setUniqueItems] = useState([]);
  const [customer, setCustomer] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [products, setProducts] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct();
  };
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
    if (!customer || products.length === 0) {
      return;
    }

    async function getData() {
      const itemsInFridgeResponse = await axios.get(
        `${api}/fridge/${customer.fridge_id}/items`
      );
      const uniqueProducts = {};
      itemsInFridgeResponse.data.map((item) => {
        if (uniqueProducts[item.product_id]) {
          uniqueProducts[item.product_id].quantity += item.count;
        } else {
          uniqueProducts[item.product_id] = {
            quantity: item.count,
            item,
          };
        }
        return item;
      });

      setUniqueItems(Object.values(uniqueProducts));
    }

    getData();
  }, [customer, products]);

  return (
    <div className="MyFridge">
      <div className="btnParent">
        <Button className="btn" variant="contained" color="primary">
          Expiring Soon
        </Button>
        <Button className="btn" variant="contained" color="primary">
          Dairy
        </Button>
        <Button className="btn" variant="contained" color="primary">
          Meat
        </Button>
      </div>

      <div className="itemParent">
        {uniqueItems.map((uniqueItem) => {
          let product = products.find(
            (p) => p.id === uniqueItem.item.product_id
          );
          if (!product) {
            return <></>;
          }

          return (
            <Card className="item">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {product.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {uniqueItem.quantity}
                </Typography>

                <CardMedia
                  className="product-image"
                  image={product.image}
                  title={product.name}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    handleClickOpen();
                    setSelectedProduct(product.id);
                  }}
                >
                  show item
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
      <div className="addItem">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      {customer && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <ItemsPage
            handleClose={handleClose}
            fridgeId={customer.fridge_id}
            selectedProduct={selectedProduct}
          />
        </Dialog>
      )}
    </div>
  );
}

export default MyFridge;
