import {store} from "@/store/store";
import {ethers} from 'ethers';
import {airCraftContractAddress} from "@/assets/config";
import {aircraftNFTAbi} from "@/assets/abi";
import {useNotificationService} from "./api";

const { addNotification } = useNotificationService();
const MONAD_CHAIN_ID = '0x279f';
const MONAD_CHAIN_CONFIG = {
  chainId: MONAD_CHAIN_ID,
  chainName: 'Monad Testnet',
  nativeCurrency: {
    name: 'Monad',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: ['https://testnet-rpc.monad.xyz/'], // Thay bằng RPC URL thực
  blockExplorerUrls: ['https://testnet.monadexplorer.com/'], // Thay bằng explorer thực
};

async function connectWallet() {
  try {
    // Kiểm tra MetaMask
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed. Please install it to proceed.');
    }

    // Yêu cầu truy cập tài khoản
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Khởi tạo provider
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Kiểm tra chain hiện tại
    const network = await provider.getNetwork();
    const currentChainId = `0x${network.chainId.toString(16)}`;
    console.log('Current chainId:', currentChainId, 'Expected:', MONAD_CHAIN_ID); // Debug log

    if (currentChainId !== MONAD_CHAIN_ID) {
      // Yêu cầu xác nhận từ người dùng trước khi chuyển mạng
      const userConfirmed = window.confirm(
        'This application requires the Monad network. Would you like to switch to the Monad network now?'
      );

      if (!userConfirmed) {
        throw new Error('User declined to switch to the Monad network.');
      }

      try {
        // Yêu cầu chuyển sang Monad
        console.log('Requesting switch to Monad chain ID:', MONAD_CHAIN_ID); // Debug log
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: MONAD_CHAIN_ID }],
        });
      } catch (switchError) {
        // Nếu chuỗi chưa được thêm (lỗi 4902), thêm chuỗi Monad
        if (switchError.code === 4902) {
          console.log('Adding Monad chain:', MONAD_CHAIN_CONFIG); // Debug log
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MONAD_CHAIN_CONFIG],
          });
        } else {
          throw switchError;
        }
      }
    }

    // Lấy signer và địa chỉ
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    console.log('Connected wallet:', address, 'on Monad chain (ID: 10143)');

    return { provider, signer, address };
  } catch (error) {
    console.error('Wallet connection failed:', error.message);
    throw error;
  }
}

const contractAddress = airCraftContractAddress

async function getContract(signer) {
  const contract = new ethers.Contract(contractAddress, aircraftNFTAbi, signer);
  return contract;
}

export async function _getOwnedAircrafts() {
  const ownerAddress = store.state.address;
  try {
    const { signer } = await connectWallet();
    const contract = await getContract(signer);

    const nftCount = await contract.balanceOf(ownerAddress);
    const aircrafts = [];

    for (let i = 0; i < nftCount; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(ownerAddress, i);

      // Lấy thông tin về từng NFT
      const aircraftData = await contract.getAircraftData(tokenId);
      aircrafts.push({
        tokenId: tokenId,
        points: aircraftData[0],
        level: aircraftData[1]
      });
    }
    return aircrafts;
  } catch (error) {
    console.error("Failed to fetch owned aircrafts:", error);
  }
}

export async function _mintAircraft() {
  const playerAddress = store.state.address
  try {
    const { signer } = await connectWallet();
    const contract = await getContract(signer);

    // Gọi hàm mintAircraft từ contract
    const tx = await contract.mintAircraft(playerAddress);
    console.log("Minting transaction: ", tx);
    addNotification(`Minting transaction: ${tx?.hash}`);

    // Đợi giao dịch hoàn thành
    const receipt = await tx.wait();
    console.log("Minted Aircraft, transaction receipt: ", receipt);
  } catch (error) {
    console.error("Minting failed:", error);
  }
}

export async function _updateAircraft(tokenId, pointsGained) {
  try {
    const { signer } = await connectWallet();
    const contract = await getContract(signer);

    // Gọi hàm updateAircraft từ contract
    const tx = await contract.updateAircraft(tokenId, pointsGained);
    console.log("Updating aircraft, transaction: ", tx);

    // Đợi giao dịch hoàn thành
    const receipt = await tx.wait();
    console.log("Updated aircraft, transaction receipt: ", receipt);
  } catch (error) {
    console.error("Updating aircraft failed:", error);
  }
}

export async function _recordAchievement(points, description) {
  try {
    const { signer } = await connectWallet();
    const contract = await getContract(signer);

    // Gọi hàm updateAircraft từ contract
    const tx = await contract.recordAchievement(points, description);

    // Chờ giao dịch được xác nhận
    await tx.wait();

    console.log("Achievement recorded successfully:", tx);
  } catch (error) {
    console.error("Updating aircraft failed:", error);
  }
}

export async function _connectWallet() {
  return await connectWallet();
}

export async function _disconnectWallet() {
  try {
    if (typeof window.ethereum !== 'undefined' && store.state.address) {
      // Reset địa chỉ ví trong store
      store.commit('setWallet', null);
      addNotification("Disconnected in-app wallet!");
      return true;
    } else {
      addNotification("No wallets are connected!");
      return false;
    }
  } catch (error) {
    addNotification("Wallet disconnection failed!");
    throw error;
  }
}
