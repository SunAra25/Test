import { Text, Button, Grid, Flex } from "@chakra-ui/react";
import React, {FC, useEffect, useState} from "react";
import MyCollection, { NFTinfo } from "../components/myCollection";
import { mintNFTContract, saleNFTAddress, saleNFTContract } from "../web3Config";

interface myNFTProps {
    account: string;
}

const MyNFT : FC<myNFTProps> = ({account}) =>{
    const[NFTarray, setNFTarray] = useState<NFTinfo[]>();

    const [saleStatus, setSaleStatus] = useState<boolean>(false);

    const getNFTtoken = async () => {
        try{
            const balanceLength = await mintNFTContract.methods.balanceOf(account).call();

            const tempNFTarray = [];

            for(let i = 0; i < parseInt(balanceLength, 10); i++){
                const NFTtokenID = await mintNFTContract.methods.tokenOfOwnerByIndex(account, i).call();

                const NFTtype = await mintNFTContract.methods.NFTtypes(NFTtokenID).call();

                const NFTprice = await saleNFTContract.methods.NFTprices(NFTtokenID).call();
                tempNFTarray.push(NFTtokenID, NFTtype, NFTprice);
            }
            setNFTarray(tempNFTarray);

            }catch (error){
                console.error(error);
            }
        };

    const getIsApprovedForAll = async () => {
        try{
            const response = await mintNFTContract.methods.isApprovedForAll(account, saleNFTAddress).call();
        
            if(response){
                setSaleStatus(response);
            }
        }catch(error){
            console.error(error);
        }
    }

    const onclickApproveToggle = async () => {
        try{
            if(!account) return;

            const response = await mintNFTContract.methods.setApprovalForAll(saleNFTAddress,!saleStatus).send({from : account});

            if(response.status){
                setSaleStatus(!saleStatus);
            }
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        if(!account) return;
        
        getIsApprovedForAll();
        getNFTtoken();
    }, [account]);


    return (
        <> 
        <Flex alignItems="center">
            <Text display="inline-block">
                Sale Status : {saleStatus ? "True" : " False" }
            </Text>
            <Button size = "xs" ml={2} colorScheme={saleStatus ? "red" : "blue"}
                 onClick={onclickApproveToggle}>
                {saleStatus ? "Cancle" : "Approve"}
            </Button>
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)" gap={8}>{
            NFTarray && NFTarray.map((v, i) => {
            return <MyCollection key={i} 
            NFTtokenID={v.NFTtokenID} 
            NFTtype={v.NFTtype}
            NFTprices={v.NFTprices}
            saleStatus={saleStatus}
            account={account} />;
        })
      }</Grid>
    </>
 );
}
export default MyNFT;