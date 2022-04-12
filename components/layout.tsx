import React, { FC } from "react";
import { Stack, Flex, Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LayOut: FC = ({children}) => {
    return (
    <Stack h="100vh">
        <Flex bg="yellow.200" p={4} justifyContent="space-around" alignItems="center">
            <Box>
                <Text fontWeight="bold">2022 capstone</Text>
            </Box>
            <Link to="/">
                <Button size="sm">Main</Button>
            </Link>
            <Link to="MyNFT">
                <Button size="sm">My NFT Collections</Button>
            </Link>
        </Flex>
        <Flex direction="column" h="full" justifyContent="center" alignItems ="center">
            {children}
        </Flex>
    </Stack>
    );
};

export default LayOut;