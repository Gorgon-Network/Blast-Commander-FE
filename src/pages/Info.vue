<template>
  <div>info</div>
  <v-btn @click="connectWallet">connect</v-btn>
  <v-btn @click="mintAircraft">mint</v-btn>
  <v-btn @click="getOwnedAircrafts">info</v-btn>
</template>
<script setup>
import {ethers} from 'ethers';
import {store} from "@/store/store";
import {aircraftNFTAbi} from "../assets/abi";
import {airCraftContractAddress} from "../assets/config"
import {_getOwnedAircrafts, _mintAircraft} from "@/store/ultil";


async function connectWallet() {
  // Kiểm tra xem người dùng có MetaMask không
  if (typeof window.ethereum !== 'undefined') {
    // Yêu cầu MetaMask cấp quyền truy cập vào tài khoản
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Khởi tạo provider từ MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Lấy signer để thực hiện các giao dịch
    const signer = await provider.getSigner();

    console.log("Connected wallet:", await signer.getAddress());

    return { provider, signer };
  } else {
    console.error("MetaMask chưa được cài đặt!");
  }
}

const contractAddress = airCraftContractAddress

async function getContract(signer) {
  const contract = new ethers.Contract(contractAddress, aircraftNFTAbi, signer);
  return contract;
}

async function mintAircraft() {
  await _mintAircraft();
}


async function getOwnedAircrafts() {
  const a= await _getOwnedAircrafts();
  console.log('nft', a)
}

</script>
