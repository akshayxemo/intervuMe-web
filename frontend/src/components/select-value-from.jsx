// import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

BasicSelect.propTypes = {
  sendDataToParent: PropTypes.func,
  base: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
};
export default function BasicSelect({ sendDataToParent, base, val }) {
  //   const [value, setValue] = React.useState(val);

  const handleChange = (event) => {
    // setValue(event.target.value);
    sendDataToParent(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{base}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={val}
          label={base}
          onChange={handleChange}
        >
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"0.5"}>Very Bad</MenuItem>
          <MenuItem value={"1.0"}>Bad</MenuItem>
          <MenuItem value={"1.5"}>Very Poor</MenuItem>
          <MenuItem value={"2.0"}>Poor</MenuItem>
          <MenuItem value={"2.5"}>OK</MenuItem>
          <MenuItem value={"3.0"}>Normal</MenuItem>
          <MenuItem value={"3.5"}>Good</MenuItem>
          <MenuItem value={"4.0"}>Very Good</MenuItem>
          <MenuItem value={"4.5"}>Excellent</MenuItem>
          <MenuItem value={"5.0"}>Outstanding</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
