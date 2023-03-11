import React from "react";
import {
  AppBar, Toolbar, IconButton,
  InputBase,
  Grid,
  useMediaQuery,
  SvgIcon,
} from "@mui/material";
import Router, { useRouter } from "next/router";
import { NODE_ENV } from "utils/env";

import styles from "./index.module.scss";

import { redirectTo } from "utils/nextRouter";
import { FaSearch } from "icons/FaSearch";

export interface HeaderProps {
  onClickButton?: () => void;
  logo?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  position?: "absolute" | "fixed" | "sticky" | "static" | "relative";
}

export const Header = ({
  logo = {
    alt: "logo",
    className: styles.logo,
    src: "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.22.5/mercadolibre/logo__large_plus.png",
  },
  position = "static",
}: HeaderProps) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const router = useRouter()
  
  if (NODE_ENV !== "test") {
    const { search } = router?.query

    React.useEffect(() => {
      search && setCode(search as string)
    }, [search]);
  } 
 
  const [code, setCode] = React.useState<string>();

  const handleClickLogo = () => {
    redirectTo("/");
  };

  

  const handleSearch = () => {
    Router.push({
      pathname: '/items',
      query: { search: code },
    })
  }

  return (
    <AppBar classes={{ root: styles.root }} color="inherit" position={position}>
      <Toolbar classes={{ root: styles.toolbar }}>
        {
        !isMobile&& <div className={styles.main}>
          <div className={styles.containerImage}>
            <img height={64} width={192} {...logo} onClick={handleClickLogo}/>
          </div>
        </div>
        }
       
        <Grid className={styles.inputContainer}>
          <InputBase
            className={styles.inputItem}
            value={code}
            placeholder="Nunca dejes de buscar"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <IconButton className={styles.inputIcon} onClick={handleSearch} type="button" sx={{ p: '10px' }} aria-label="search">
            <FaSearch/>
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
