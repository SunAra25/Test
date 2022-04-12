import { Box , Text} from "@chakra-ui/react";
import React, {FC} from "react";
import { web3 } from "../web3Config";
import NFT from "./NFT";

export interface NFTinfo {
    NFTtype : string;
    NFTtokenID : string;
    NFTprices : string;
}

interface MyNFTProps extends NFTinfo {
    saleStatus: boolean;
    account: string;
}

const MyCollection: FC<MyNFTProps> = ({NFTtokenID, NFTtype, NFTprices, saleStatus, account,}) =>{
    return (
        <Box textAlign="center" w={150}>
            <NFT type={NFTtype} />
            <Box mt={2}>
                {NFTprices ==="0" ? (<div>판매 버튼</div>
                ) : (
                <Text d="inline-block">{web3.utils.fromWei(NFTprices)}</Text>)}
            </Box>
        </Box>
        );
    };

export default MyCollection;