
import React, { Component, useEffect, useState } from 'react';
import Web3ModalButton from '../../components/Web3ModalButton';
import Footer from '../../components/Footer';
import "./index.module.scss";
import { useEthers, useTokenAllowance, useTokenBalance  } from '@usedapp/core'
import { utils, Contract } from 'ethers'
import IERC20Abi from "../../abi/IERC20.json";
import {  ADDRESS_BUSD } from '../../constants/addresses';
const { formatEther, parseEther, Interface } = utils;

const ADDRESSS_STORAGE_KEY = 'UserWalletAddress';

function Home() {
  const {account,library,chainId,activateBrowserWallet} = useEthers();
  const busdBalance = useTokenBalance(ADDRESS_BUSD, account);

  return (<>
    <section id="top" className="hero is-fullheight has-background-gradient has-text-centered">
        <div>
            <div className="hero-head has-text-left">
                <Web3ModalButton busdBalance={busdBalance} />
              <div className="mt-3">
                  <p className="title ml-5">GreenMiner</p>
                  <p className="subtitle is-size-6 mr-5 " >A token with a rising price floor thanks to a green GPU mining operation farm powered by solar power!</p>
              </div>
              <div className="is-clearfix"></div>
            </div>
            <div className='hero-body p-4'>
              <div className="container">
              </div>
            </div>
        </div>
    </section>
    
    <Footer />
    
  </>);
}

export default Home
