import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "./ItemsPage.css";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import { CardMedia, Fab } from "@material-ui/core";
const api = process.env.REACT_APP_API_ENDPOINT || window.location.origin;

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function ItemsPage(props) {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  const handleClickDecrease = async (itemId) => {
    const deceaseResponse = await axios.post(
      `${api}/item/${itemId}/decrease_count`
    );
    console.log(deceaseResponse);
    getItems();
  };

  const handleClickDelete = async (itemId) => {
    const deleteResponse = await axios.delete(`${api}/item/${itemId}`);
    console.log(deleteResponse);
    getItems();
  };

  useEffect(() => {
    async function getData() {
      const productResponse = await axios.get(`${api}/product`);
      setProducts(productResponse.data);
    }

    getData();
  }, []);

  async function getItems() {
    const itemsInFridgeResponse = await axios.get(
      `${api}/fridge/${props.fridgeId}/items`
    );
    let itemsToShow = itemsInFridgeResponse.data.filter((item) => {
      if (!props.expirySoon) {
        return item.product_id === props.selectedProduct;
      } else {
        let itemExpiry = moment(item.expiration);
        return itemExpiry.diff(moment(), "days") < 3;
      }
    });
    itemsToShow = itemsToShow.sort((left, right) =>
      moment(left.expiration).diff(moment(right.expiration))
    );
    console.log(itemsToShow);

    setItems(itemsToShow);
  }

  useEffect(() => {
    if (products.count === 0) {
      return;
    }
    getItems();
  }, [products, props.fridgeId, props.selectedProduct]);

  return (
    <div>
      <AppBar className={classes.appBar} color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Items
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="itemContainer">
        {items.map((item) => {
          let product = products.find((p) => p.id === item.product_id);
          console.log(product);
          if (!product) {
            return <></>;
          }

          let expiryDate = moment(item.expiration);

          return (
            <Card className="item">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {product.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {item.count}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Expires {expiryDate.fromNow()}
                </Typography>

                <CardMedia
                  className="product-image"
                  image={product.image}
                  title={product.name}
                />
              </CardContent>
              <CardActions>
                <Fab
                  onClick={() => {
                    handleClickDecrease(item.id);
                  }}
                  color="primary"
                  aria-label="add"
                  size="small"
                >
                  <ExposureNeg1Icon />
                </Fab>
                <Fab
                  onClick={() => {
                    handleClickDelete(item.id);
                  }}
                  color="primary"
                  aria-label="add"
                  size="small"
                >
                  <DeleteForeverIcon />
                </Fab>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
