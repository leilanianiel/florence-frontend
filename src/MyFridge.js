import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MyFridge.css";
import Button from "@material-ui/core/Button";
import "react-dropdown/style.css";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import { CardMedia } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import ItemsPage from "./ItemsPage";
import AddProduct from "./AddProduct";
import AddItem from "./AddItem";
import moment from "moment";
import icon from "./Images/Florence Logo.png";

const api = process.env.REACT_APP_API_ENDPOINT || window.location.origin;
const customer_id = process.env.REACT_APP_TEST_USER || window.userId;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyFridge() {
  const [uniqueItems, setUniqueItems] = useState([]);
  const [customer, setCustomer] = useState();
  const [recipes, setRecipes] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [products, setProducts] = useState([]);
  const [visibleUniqueItems, setVisibleUniqueItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [expirySoon, setExpirySoon] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const getRecipe = async () => {
    // get recipe for current user
    const recipeResponse = await axios.get(`${api}/recipes/`);
    setRecipes(recipeResponse.data);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct();
    setExpirySoon(false);
  };

  const alphaSort = (a, b) => a.product.name.localeCompare(b.product.name);
  const alphaSortName = (a, b) => a.name.localeCompare(b.name);
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

    setVisibleUniqueItems(newList.sort(alphaSort));
  }, [products, selectedCategory, uniqueItems]);

  useEffect(() => {
    async function getData() {
      const customerResponse = await axios.get(
        `${api}/customer/${customer_id}`
      );
      setCustomer(customerResponse.data);

      const categoryResponse = await axios.get(`${api}/category`);
      setCategories(categoryResponse.data.sort(alphaSortName));
    }

    getProducts();
    getData();
  }, []);

  async function getProducts() {
    const productResponse = await axios.get(`${api}/product`);
    setProducts(productResponse.data.sort(alphaSortName));
  }
  async function getItems() {
    const itemsInFridgeResponse = await axios.get(
      `${api}/fridge/${customer.fridge_id}/items`
    );
    const uniqueProducts = {};

    itemsInFridgeResponse.data.map((item) => {
      if (uniqueProducts[item.product_id]) {
        uniqueProducts[item.product_id].quantity += item.count;
      } else {
        let product = products.find((p) => p.id === item.product_id);
        if (product) {
          uniqueProducts[item.product_id] = {
            quantity: item.count,
            product,
            item,
          };
        }
      }
      return item;
    });

    let expiringItems = Object.values(uniqueProducts).filter((item) => {
      let itemExpiry = moment(item.item.expiration);
      return itemExpiry.diff(moment(), "days") < 3;
    });

    setUniqueItems(Object.values(uniqueProducts));
    if (expiringItems.length > 0) {
      let title = "Hey!";
      let notification = undefined;
      let iconPath = window.location.origin + icon;
      let notificationData = {
        body: `You have ${expiringItems.length} items expiring soon`,
        image: expiringItems[0].product.image,
        icon: iconPath,
      };
      if (Notification.permission === "granted") {
        notification = new Notification(title, notificationData);
      } else {
        let permission = await Notification.requestPermission();

        if (permission === "granted") {
          notification = new Notification(title, notificationData);
        }
      }
      notification.onclick = () => {
        setExpirySoon(true);
        handleClickOpen();
      };
    }

    setVisibleUniqueItems(Object.values(uniqueProducts).sort(alphaSort));
  }

  useEffect(() => {
    if (!customer || products.length === 0) {
      return;
    }

    getItems();
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
          color={expirySoon ? "secondary" : "primary"}
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

        <Button
          className="btn"
          variant="contained"
          onClick={() => setSelectedCategory(7)}
          color={selectedCategory === 7 ? "secondary" : "primary"}
        >
          Drinks
        </Button>
      </div>

      <div className="itemParent">
        {visibleUniqueItems.map((uniqueItem, index) => {
          let product = products.find(
            (p) => p.id === uniqueItem.item.product_id
          );
          if (!product) {
            return <></>;
          }

          return (
            <Card className="item" key={index}>
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

      {/* add product button */}
      <div>
        <div className="addProduct">
          {/* <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab> */}
        </div>
        {categories && (
          <AddProduct
            getProducts={getProducts}
            categories={categories}
          ></AddProduct>
        )}
        {customer && products && (
          <AddItem
            getItems={getItems}
            products={products}
            fridgeId={customer.fridge_id}
          ></AddItem>
        )}
        {/* ITEM SUBMIT BUTTON */}
        <div>
          {/* get recipes button  */}
          <div>
            {recipes &&
              recipes.map((recipe) => (
                <div key={recipe.name}>
                  <img src={recipe.image} alt={recipe.name} />
                  <div>
                    <a href={recipe.url} rel="noreferrer" target="_blank">
                      {recipe.name}
                    </a>
                  </div>
                </div>
              ))}
          </div>
          <Button
            onClick={() => {
              getRecipe();
            }}
            className="btn recipes"
            variant="contained"
            color="secondary"
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
    </div>
  );
}
export default MyFridge;
