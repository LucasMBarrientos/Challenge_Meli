import React from "react";
import type { NextPage } from "next";

import styles from "./index.module.scss";
import { Grid, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import {ItemDescription} from "@/components/ItemDescription";
import { IItem } from "types/types";

const MainPage: NextPage = () => {
  const router = useRouter()
  const { search } = router.query
  const axios = require('axios');
  const [results, setResults] = React.useState<IItem[]>([])

  React.useEffect(() => {
    search && axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${search}`).then((response:any) => {
      setResults(response.data.results);
    });;
  }, [search]);

  
  if (!results || !search) {
    return (
        <Skeleton className={styles.container} />
    );
  }

  return (
    <Grid className={styles.container}>
      {results?.map((item)=>(
        <ItemDescription
          currency_id={item.currency_id}
          key={item.id}
          id={item.id}
          text={item.title} 
          logo={{src: item.thumbnail}}
          price={item.price}
          ubicacion={item.address.state_name}
        />
      ))}
    </Grid>
  );
};

export default MainPage;
