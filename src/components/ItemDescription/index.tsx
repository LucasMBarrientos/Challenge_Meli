import { redirectTo } from "utils/nextRouter";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import styles from "./index.module.scss";
import { styleNumber } from "utils/utils";
import { ICurrency } from "types/types";

export interface ItemDescriptionProps {
  id: string;
  text: string;
  logo?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  price: number;
  ubicacion: string;
  currency_id:string;
}


export  const ItemDescription = ({id,text,logo,price,ubicacion,currency_id}: ItemDescriptionProps) => {
  const axios = require('axios');
  const [currency, setCurrency] = React.useState<ICurrency>({
    id: "ARS",
    symbol: "$",
    description: "Peso argentino",
    decimal_places: 2
  })

  React.useEffect(() => {
    axios.get(`https://api.mercadolibre.com/currencies/${currency_id}`).then((response:any) => {
      setCurrency(response.data);
    });;
  }, []);

  
  const handleSearch = () => {
    redirectTo(`/items/${id}`);
  }
  
  return (
    <Grid container className={styles.root} onClick={handleSearch}>
      <Grid item className={styles.itemImage}>
        <img height={200} width={200} {...logo} />
      </Grid>
      <Grid item className={styles.itemDescriptionContainer} >
        <Typography className={styles.itemPrice}>{`${currency.symbol} ${styleNumber(Math.round(price))}`}</Typography>
        <Box className={styles.itemDescription} >{text}</Box>
      </Grid>
      <Grid item className={styles.itemUbicacion}>
      {ubicacion}
      </Grid>
      
    </Grid>
  );
};