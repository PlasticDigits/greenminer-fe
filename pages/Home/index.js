
import React, { Component, useEffect, useState } from 'react';
import Web3ModalButton from '../../components/Web3ModalButton';
import Footer from '../../components/Footer';
import "./index.module.scss";
import { useEthers, useContractFunction, useCall  } from '@usedapp/core'
import { utils, Contract } from 'ethers'
import useCountdown from "../../hooks/useCountdown";
import GreenMinerLogoGreen from '../../public/static/assets/logo-green.png';
import BackgroundImage from '../../public/static/assets/images/bg.jpg';
import GreenMinerExplainer from '../../public/static/assets/images/greenminer-explanation.jpg';
import GemSaleAbi from "../../abi/GemSale.json";
import IERC20Abi from "../../abi/IERC20.json";
import {  ADDRESS_BUSD, ADDRESS_GEMSALE } from '../../constants/addresses';
import { UrlJsonRpcProvider } from '@ethersproject/providers';
const { formatEther, parseEther, Interface } = utils;

const GemSaleInterface = new Interface(GemSaleAbi);
const GemSaleContract = new Contract(ADDRESS_GEMSALE,GemSaleInterface);

const displayWad = (wad)=>!!wad ? Number(formatEther(wad)).toFixed(2) : "..."

function Home() {
  const {account,library,chainId,activateBrowserWallet} = useEthers();
  
  const { state: stateDeposit, send: sendDeposit } = useContractFunction(GemSaleContract, 'deposit');


  const [depositBnbInput,setDepositBnbInput] = useState(0.1)

  const { value: [minDepositWad], error: minDepositWadError } = useCall({
     contract: GemSaleContract,
     method: 'minDepositWad',
     args: []
   }) ?? {value:[]}
  const { value: [maxDepositWad], error: maxDepositWadError } = useCall({
     contract: GemSaleContract,
     method: 'maxDepositWad',
     args: []
   }) ?? {value:[]}
  const { value: [hardcap], error: hardcapError } = useCall({
     contract: GemSaleContract,
     method: 'hardcap',
     args: []
   }) ?? {value:[]}
  const { value: [totalDeposits], error: totalDepositsError } = useCall({
     contract: GemSaleContract,
     method: 'totalDeposits',
     args: []
   }) ?? {value:[]}
  const { value: [startEpoch], error: startEpochError } = useCall({
     contract: GemSaleContract,
     method: 'startEpoch',
     args: []
   }) ?? {value:[]}
  const { value: [endEpoch], error: endEpochError } = useCall({
     contract: GemSaleContract,
     method: 'endEpoch',
     args: []
   }) ?? {value:[]}
   
  const startEpochTimer = useCountdown(startEpoch,"Started");
  const endEpochTimer = useCountdown(endEpoch,"Ended");

  return (<>
    <section id="top" className="hero has-text-centered">
        <div>
            <div className="hero-head has-text-left">
                <Web3ModalButton />
              <div className="mt-3 pb-5">
                  <a href="https://greenminer.space">
                    <figure className="image is-64x64 is-rounded m-0 is-pulled-left ml-5 mr-5 mb-5" style={{display:"inline-block",top:"2px",position:"relative"}}>
                        <img src={GreenMinerLogoGreen} />
                    </figure>
                  </a>
                  <p className="title ml-5" style={{color:"white"}}>Green<span style={{color:"#67cd93"}}>Miner</span><small class="is-size-6 ml-3" style={{color:"#ddd",whiteSpace:'nowrap'}}>Token Sale</small></p>
                  <p className="subtitle is-size-6 mr-5 " style={{color:"#ddd"}}>A token with a rising price floor thanks to a green GPU mining operation farm powered by solar power!</p>
                <figure class="image">
                  <img src={GreenMinerExplainer} />
                </figure>
              </div>
              <div className="is-clearfix"></div>
            </div>
            <div className='hero-body p-0 m-0 pt-5 pb-5' style={{color:"#ddd", backgroundImage:`url(${BackgroundImage})`,backgroundAttachment:"fixed"}}>
              <div className="container has-text-centered">
                <h2 className="is-size-3 mt-3">Send BNB to join the Presale!</h2>
                <div className="p-2" style={{maxWidth:"300px",borderLeft:"solid 3px #ff4500",borderRight:"solid 3px #ff4500",borderRadius:"10px",marginLeft:"auto",marginRight:"auto"}}>
                  <ul>
                    <li style={{textShadow: "0px 0px 4px black"}}>GEM/BNB: 1900</li>
                    <li style={{textShadow: "0px 0px 4px black"}}>Hardcap: {displayWad(hardcap)} BNB</li>
                    <li style={{textShadow: "0px 0px 4px black"}}>Total Deposits: {displayWad(totalDeposits)} BNB</li>
                    <li style={{textShadow: "0px 0px 4px black"}}>Wallet Max: {displayWad(maxDepositWad)} BNB</li>
                    <li style={{textShadow: "0px 0px 4px black"}}>Wallet Min: {displayWad(minDepositWad)} BNB</li>
                    <hr className="m-2"/>
                    <li style={{textShadow: "0px 0px 4px black"}}>Start Timer: {startEpochTimer}</li>
                    <li style={{textShadow: "0px 0px 4px black"}}>End Timer: {endEpochTimer}</li>
                    <hr className="m-2"/>
                    <li style={{textShadow: "0px 0px 4px black"}}>Your Deposit: 0 BNB</li>
                  </ul>
                </div>
                <div className='mt-6'>
                  <input id="amountEtherInput" name="amountEtherInput" type="number" className='mb-3 input is-normal' step="0.1" min="0" max="100"
                    style={{maxWidth:"95px",border:"solid 2px #191919"}}
                    value={depositBnbInput}
                    onChange={(event)=>{
                      console.log("EVENT");
                      console.log(event.target.value);
                      let inputNum = Number(event.target.value);
                      if(!Number.isFinite(inputNum)) return;
                      let minNum = !!minDepositWad ? Number(formatEther(minDepositWad)) : 0;
                      console.log("minNum",minNum)
                      if(!!minDepositWad && (inputNum < minNum)) inputNum = minNum;
                      console.log("postmin",inputNum);
                      let maxNum = !!maxDepositWad ? Number(formatEther(maxDepositWad)) : 100;
                      if(!!maxDepositWad && (inputNum > maxNum)) inputNum = maxNum;
                      console.log("postmax",inputNum);
                      inputNum = Math.floor(inputNum*10)/10;
                      console.log("final",inputNum);
                      setDepositBnbInput(inputNum);
                    }} /> 
                    <span style={{position:"relative",top:"7px"}}><span style={{textShadow: "0px 0px 4px black",marginLeft:"4px"}}>BNB</span></span><br/>
                  <button className='is-size-5 button is-primary' style={{color:!!account?"#191919":"#444",backgroundColor:!!account?"#67cd93":"#555",border:"solid 2px #191919"}}
                    onClick={()=>sendDeposit({value:parseEther(depositBnbInput.toString())})}
                  >DEPOSIT</button>
                </div>
              </div>
            </div>
        </div>
    </section>
    
    <Footer />
    
  </>);
}

export default Home
