export const aircraftNFTAbi = [
  "function balanceOf(address owner) public view returns (uint256)",
  "function mintAircraft(address player) public returns (uint256)",
  "function updateAircraft(uint256 tokenId, uint256 pointsGained) public",
  "function getAircraftData(uint256 tokenId) public view returns (uint256, uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "event AircraftUpdated(uint256 indexed tokenId, uint256 points, uint256 level)",
  "function recordAchievement(uint256 _points, string memory _description) public",
  "function getAchievementCount(address _player) public view returns (uint256)",
  "function getAchievement(address _player, uint256 _index) public view returns (uint256, string, uint256)"
]
