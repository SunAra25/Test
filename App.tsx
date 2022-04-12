import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./components/layout";
import Main from "./routes/main";
import MyNFT from "./routes/myNFT";

const App: FC = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async() => {
    try{
      if(window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      }

      else {
        alert("INSTALL METAMASK!");
      }
    }catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    getAccount();
  }, [account]);


  return (
    <BrowserRouter>
      <LayOut>
        <Routes>
          <Route path='/' element={<Main account ={account} />} />
          <Route path="myNFT" element={<MyNFT account ={account} />}/>
        </Routes>
      </LayOut>
    </BrowserRouter>
  );
};

export default App;