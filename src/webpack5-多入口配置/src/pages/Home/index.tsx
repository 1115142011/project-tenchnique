import {
  AspectRatio,
  Box,
  Center,
  Checkbox,
  Container,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Home: React.FC<any> = () => {
  let [params] = useSearchParams();
  console.log("xxxxx地址参数>>>>", params);

  return (
    <Container>
      There are many benefits to a joint design and development system. Not only
      does it bring benefits to the design team, but it also brings benefits to
      engineering teams. It makes sure that our experiences have a consistent
      look and feel, not just in our design specs, but in production
      <Center bg="tomato" h="100%" color="white">
        <Checkbox defaultChecked>Checkbox</Checkbox>
      </Center>
    </Container>
  );
};
export default Home;
