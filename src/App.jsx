import {
  Box,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { AiFillStar, AiOutlineFork } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import "./App.css";

const links = ["all", "html", "css", "javascript"];

const getData = async (searchTerm) => {
  let res = await fetch(
    `https://api.github.com/search/repositories?q=stars:%3E1+language:${searchTerm}`
  );
  let data = await res.json();
  return data;
};

function App() {
  const [currLink, setcurrLink] = useState("all");
  const [data, setData] = useState([]);
  useEffect(() => {
    getData(currLink).then((d) => {
      setData(d.items);
    });
  }, [currLink]);

  const handleClick = (link) => {
    setcurrLink(link);
  };
  return (
    <div className="App">
      <div className="app__navbar">
        {links.map((link, i) => (
          <button
            className="app__navbar-link"
            key={i}
            onClick={() => handleClick(link)}
          >
            {link.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="app_container">
        <SimpleGrid spacing="40px" columns={{ sm: 1, md: 2, lg: 4 }}>
          {data.map((lang) => (
            <Box p={"4"} boxShadow={"lg"} rounded="lg" key={lang.id}>
              <VStack>
                <Image
                  src={lang.owner.avatar_url}
                  alt={`avatar_${lang.name}`}
                />
                <Heading>{lang.name}</Heading>
                <Heading>{lang.language}</Heading>
              </VStack>
              <HStack>
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <AiFillStar />
                  <Box>{`${lang.stargazers_count} stars`}</Box>
                </Box>
                <Spacer />
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <AiOutlineFork />
                  <Box>{`${lang.stargazers_count} stars`}</Box>
                </Box>
                <HStack></HStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}

export default App;
