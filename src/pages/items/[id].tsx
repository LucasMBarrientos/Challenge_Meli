import React from "react";
import type { NextPage } from "next";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { Grid, Skeleton, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'

import styles from "./index.module.scss";
import { getDecimal, styleNumber } from "utils/utils";
import { ICurrency, IItem, IItemDescription } from "types/types";

const DescriptionPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [result, setResult] = React.useState<IItem>()
  const [currency, setCurrency] = React.useState<ICurrency>({
    id: "ARS",
    symbol: "$",
    description: "Peso argentino",
    decimal_places: 2
  })
  const [description, setdescription] = React.useState<IItemDescription>()
  const axios = require('axios');

  React.useEffect(() => {
    id && axios.get(`https://api.mercadolibre.com/items/${id}`).then((response:any) => {
      setResult(response.data);

      axios.get(`https://api.mercadolibre.com/currencies/${response.data.currency_id}`).then((res:any) => {
        setCurrency(res.data);
      });
    });

    id && axios.get(`https://api.mercadolibre.com/items/${id}/description`).then((response:any) => {
      setdescription(response.data);
    });
  }, [id]);


  if (!result || !id) {
    return (
      <Skeleton className={styles.container} />
    );
  }

  return (
    <Grid className={styles.container}>
      <Grid container className={styles.root}>
        <Grid container className={styles.itemContainer}>
            <Carousel autoPlay={true} indicators={false} animation="slide" navButtonsAlwaysInvisible={false} swipe={true} className={styles.itemImage}>
              {
                  result.pictures && result.pictures.map( (picture, i) => <img key={i} src={picture.url} /> )
              }
            </Carousel>
          <Grid className={styles.itemDescriptionContainer}>
            <Typography>{`${result.condition} - ${result.sold_quantity} vendidos`}</Typography>
            <Typography className={styles.itemTitle}>{result.title}</Typography>
            <Box className={styles.itemPrice}>
              {`${currency.symbol} ${styleNumber(Math.trunc(result.price))}`}
              
              <Box className={styles.itemPriceDecimal}>
                {getDecimal({number: result.price,decimal_places:currency.decimal_places})}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Typography className={styles.title}>{"Descripción del producto"}</Typography>
        <Box>{description && description.plain_text}</Box>
      </Grid>
    </Grid>
  );
};

export default DescriptionPage