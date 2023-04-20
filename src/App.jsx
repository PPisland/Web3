import { useState } from "react";
import { useEffect } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./web3.config";

const web3 = new Web3("https://rpc-mumbai.maticvigil.com");
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

function App() {
  const [account, setAccount] = useState("");
  const [myBalance, setMyBalance] = useState();
  const [total, setTotal] = useState();
  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log(accounts);
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogOut = () => {
    setAccount("");
  };

  // useEffect(() => {
  //   console.log(contract);
  // }, []);
  const onClickBalance = async () => {
    try {
      if (!account || !contract) return;

      const balance = await contract.methods.balanceOf(account).call();
      setMyBalance(web3.utils.fromWei(balance));
    } catch (error) {
      console.error(error);
    }
  };

  const onClickTotal = async () => {
    try {
      if (!account || !contract) return;

      const total = await contract.methods.totalSupply().call();
      setTotal(web3.utils.fromWei(total));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-red-100 min-h-screen flex justify-center items-center">
      {account ? (
        <div className="flex flex-col justify-center items-center">
          <div className="text-main font-semibold">
            {account.substring(0, 4)}...
            {account.substring(account.length - 4, account.length)}님
            환영합니다🎉🎉🎉
            <button className="btn-style ml-4" onClick={onClickLogOut}>
              로그아웃
            </button>
          </div>
          <div className="flex items-center mt-4">
            {myBalance && <div>{myBalance} THS</div>}
            <button className="btn-style ml-4" onClick={onClickBalance}>
              잔액 조회
            </button>
          </div>
          <div className="flex items-center mt-4">
            {total && <div>{total} THS</div>}
            <button className="btn-style ml-4" onClick={onClickTotal}>
              코인 총 수량
            </button>
          </div>
        </div>
      ) : (
        <button className="btn-style " onClick={onClickAccount}>
          <img
            className="w-12"
            src={`${process.env.PUBLIC_URL}/images/metamask.png`}
            alt=""
          />
        </button>
      )}
    </div>
  );
}

export default App;
