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
  const [visibleUniqueItems, setVisibleUniqueItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [expirySoon, setExpirySoon] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct();
    setExpirySoon(false);
  };

  useEffect(() => {
    if (
      selectedCategory === undefined ||
      uniqueItems.count === 0 ||
      products.count === 0
    ) {
      return;
    }

    const newList = uniqueItems.filter((uniqueItem) => {
      if (selectedCategory === -1) {
        return true;
      }
      let product = products.find(
        (product) => product.id === uniqueItem.item.product_id
      );
      if (!product) {
        return false;
      }
      return product.category_id === selectedCategory;
    });

    setVisibleUniqueItems(newList);
  }, [products, selectedCategory, uniqueItems]);

  useEffect(() => {
    async function getData() {
      const customerResponse = await axios.get(
        `${api}/customer/${customer_id}`
      );
      // get recipe for current user
      const recipeResponse = await axios.get(
        `${api}/recipe/`
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
      setVisibleUniqueItems(Object.values(uniqueProducts));
    }

    getData();
  }, [customer, products]);

  return (
    <div className="MyFridge">
      <div className="btnParent">
        <Button
          className="btn"
          variant="contained"
          onClick={() => setSelectedCategory(-1)}
          color={selectedCategory === -1 ? "secondary" : "primary"}
        >
          All Items
        </Button>
        <Button
          className="btn"
          variant="contained"
          onClick={() => {
            setExpirySoon(true);
            handleClickOpen();
          }}
          color="primary"
        >
          Expiring Soon
        </Button>
        <Button
          size="small"
          className="btn"
          variant="contained"
          onClick={() => setSelectedCategory(4)}
          color={selectedCategory === 4 ? "secondary" : "primary"}
        >
          Dairy
        </Button>
        <Button
          className="btn"
          variant="contained"
          onClick={() => setSelectedCategory(3)}
          color={selectedCategory === 3 ? "secondary" : "primary"}
        >
          Meat
        </Button>
        <Button
          className="btn"
          variant="contained"
          onClick={() => setSelectedCategory(5)}
          color={selectedCategory === 5 ? "secondary" : "primary"}
        >
          Fruit
        </Button>
        <Button
          className="btn"
          variant="contained"
          onClick={() => setSelectedCategory(2)}
          color={selectedCategory === 2 ? "secondary" : "primary"}
        >
          Veggies
        </Button>
        <Button className="btn" variant="contained" color="primary">
          Drinks
        </Button>
      </div>

      <div className="itemParent">
        {visibleUniqueItems.map((uniqueItem) => {
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
        <Button
          className="btn recipes"
          variant="contained"
          color="primary"
        >
          Find Recipes
        </Button>
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
            expirySoon={expirySoon}
          />
        </Dialog>
      )}
    </div>
  );
}
export default MyFridge;
