import React from "react";
import { Grid } from "@mui/material";

import styles from "./Main.module.scss";
import { Header } from "@/components/Header";

const Main: React.FC = ({ children }) => {
  
  return (
    <Grid className={styles.containerMainLayout}>
      <Header
          logo={{
            src: "https://static.vscdn.net/images/careers/demo/mercadolibre/1641314597::New+PCS+logp",
            alt: "logo",
          }}
        />
      <Grid container item className={styles.containerContent} component="main">
      {children}
      </Grid>
    </Grid>
  );
};

export default Main;
