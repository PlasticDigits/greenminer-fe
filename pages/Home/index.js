
import React, { Component, useEffect, useState } from 'react';
import Web3ModalButton from '../../components/Web3ModalButton';
import Footer from '../../components/Footer';
import "./index.module.scss";
import { useEthers, useTokenAllowance, useTokenBalance  } from '@usedapp/core'
import { utils, Contract } from 'ethers'
import GreenMinerLogoGreen from '../../public/static/assets/logo-green.png';
import BackgroundImage from '../../public/static/assets/images/bg.jpg';
import GreenMinerExplainer from '../../public/static/assets/images/greenminer-explanation.jpg';
import IERC20Abi from "../../abi/IERC20.json";
import {  ADDRESS_BUSD } from '../../constants/addresses';
import { UrlJsonRpcProvider } from '@ethersproject/providers';
const { formatEther, parseEther, Interface } = utils;

const ADDRESSS_STORAGE_KEY = 'UserWalletAddress';

function Home() {
  const {account,library,chainId,activateBrowserWallet} = useEthers();
  const busdBalance = useTokenBalance(ADDRESS_BUSD, account);

  return (<>
    <section id="top" className="hero is-fullheight has-text-centered">
        <div>
            <div className="hero-head has-text-left">
                <Web3ModalButton busdBalance={busdBalance} />
              <div className="mt-3 pb-5">
                  <a href="https://greenminer.space">
                    <figure className="image is-64x64 is-rounded m-0 is-pulled-left ml-5 mr-5 mb-5" style={{display:"inline-block",top:"2px",position:"relative"}}>
                        <img src={GreenMinerLogoGreen} />
                    </figure>
                  </a>
                  <p className="title ml-5" style={{color:"white"}}>Green<span style={{color:"#67cd93"}}>Miner</span><small class="is-size-6 ml-3" style={{color:"#ddd"}}>Token Sale</small></p>
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
                    <li>GEM/BNB: 1900</li>
                    <li>Hardcap: 15 BNB</li>
                    <li>Wallet Maximum: 3 BNB</li>
                    <li>Wallet Minimum: 0.1 BNB</li>
                    <li>Your Deposit: 0 BNB</li>
                  </ul>
                </div>
                <div className='mt-6'>
                  <input id="amountEtherInput" type="number" className='mb-3 input is-normal' style={{maxWidth:"91px"}} /> <span style={{position:"relative",top:"5px"}}>BNB</span><br/>
                  <button className='is-size-5 button is-primary'>DEPOSIT</button>
                </div>
              </div>
            </div>
        </div>
    </section>
    
    <Footer />
    
  </>);
}

export default Home
