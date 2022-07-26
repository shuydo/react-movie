import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  PaginationItem,
} from "@mui/material";
import { Pagination /*, Stack*/ } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

import "../js/header";

const Header = ({ lang, langs, changeLang, page, qty, setpage }) => {
  return (
    <Box className="header">
      <AppBar
        sx={{
          backgroundColor: "rgba(128, 128, 128, .8)", // backgroundColor: "rgba(0, 0, 0, .8)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Toolbar
          sx={{ justifyContent: { xs: "space-around", sm: "space-between" } }}
        >
          <ul style={{ display: "flex", listStyle: "none" }}>
            <li>
              <NavLink
                to="/"
                className="NavLink"
                // activeClassName="NavLink--active"
              >
                <b>Trending</b>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/popular"
                className="NavLink"
                // activeClassName="NavLink--active"
              >
                <b>Popular</b>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className="NavLink"
                // activeClassName="NavLink--active"
              >
                <b>Movies</b>
              </NavLink>
            </li>
          </ul>
          <FormControl
            variant="standard"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <InputLabel id="demo-simple-select-label">lingua</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label="lang"
              onChange={evt => changeLang(evt.target.value)}
            >
              {langs.map(item => (
                <MenuItem
                  key={item}
                  value={item}
                  style={{ textTransform: "uppercase" }}
                >
                  {item.toUpperCase()}
                </MenuItem>
              ))}
              )
            </Select>
          </FormControl>

          <Pagination
            size="normal"
            color={"secondary"}
            count={qty}
            page={page}
            onChange={(_, num) => setpage(num)}
            hidePrevButton // showFirstButton// showLastButton
            hideNextButton
            renderItem={item => (
              <PaginationItem
                component={Link}
                to={`/?page=${item.page}`}
                {...item}
              />
            )} // sx={{ pt: { xs: 6.25, sm: 8.25 }, color: "white" }}
          />

          <Typography
            sx={{ display: { xs: "none", sm: "block" } }}
            variant="h6"
            component="span"
          >
            Tranding now
          </Typography>
          {/* <button style={{display:"block",height: 15}}type="button"onClick={changeLang}></button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
