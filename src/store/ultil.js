import {store} from "@/store/store";
import {ethers} from 'ethers';
import {airCraftContractAddress} from "@/assets/config";
import {aircraftNFTAbi} from "@/assets/abi";
import {useNotificationService} from "./api";

const { addNotification } = useNotificationService();
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
