import { Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const ChatLoading = ({ search }) => {
  const [screenHeight, setScreenHeight] = useState({
    loaderScreenSize: 1,
    unitLoaderSize: 1,
    flag: false,
  });

  useEffect(() => {
    if (!screenHeight.flag) {
      setScreenHeight({
        loaderScreenSize: Math.floor(
          document.documentElement.clientHeight * 0.7
        ),
        unitLoaderSize: parseInt(
          window.getComputedStyle(document.getElementById("loader"), null)[
            "height"
          ]
        ),
        flag: true,
      });
    }
  }, [search]);

  let Size = Math.round(
    screenHeight.loaderScreenSize / screenHeight.unitLoaderSize
  );

  let array = Array(Size);

  const displayLoaders = () => {
    const content = [];
    for (var i = 0; i < array.length; i++) {
      content.push(
        <Skeleton
          startColor="#555"
          endColor="#333"
          id="loader"
          m={2}
          height="60px"
        />
      );
    }
    return content;
  };

  return displayLoaders();
};

export default ChatLoading;
