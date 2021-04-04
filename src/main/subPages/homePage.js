import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function HomePage(props) {
  const [currencyValues, setCurrencyValues] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
      .then((res) => {
        const responseData = res.data.bpi;
        setCurrencyValues([responseData]);
      });
  }, []);

  const displayAmount = () => {
    let returnData = [];
    Object.values(currencyValues).map((temp, index) => {
      Object.values(temp).map((subTemp, index) => {
        returnData.push(
          <Typography key={index} variant="h5" style={{ fontWeight: "bold" }}>
            {subTemp.rate} {subTemp.description}
          </Typography>
        );
      });
    });
    return returnData;
  };

  return (
    <div>
      <Box style={{ padding: "32px" }}>
        <Typography variant="h6" style={{ marginBottom: "16px" }}>
          {props.pageName}
        </Typography>
        {currencyValues.length > 0 ? (
          <Box>
            <Typography
              variant="h4"
              style={{ color: "#878787", fontWeight: "bold" }}
            >
              1 Bitcoin Equals
            </Typography>
            {displayAmount()}
          </Box>
        ) : (
          <Typography
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Data is loading ...
          </Typography>
        )}
      </Box>
    </div>
  );
}
