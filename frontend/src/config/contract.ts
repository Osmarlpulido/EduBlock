// Configuración del contrato EduBlockSBT
export const CONTRACT_CONFIG = {
  // Dirección del contrato desplegado en Celo Alfajores
  ADDRESS: '0x45e92875e9736c8B08c60d36Ba50c023FDe2E523',
  ABI: [
    "function issueCertificate(address student, string memory courseName, string memory issuer, string memory issuedDate, string memory metadataURI) public returns (uint256)",
    "function verifyCertificate(uint256 tokenId, address student) public view returns (bool)",
    "function ownerOf(uint256 tokenId) public view returns (address)",
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
    "function certificates(uint256 tokenId) public view returns (string memory courseName, string memory issuer, string memory issuedDate, address student, string memory metadataURI)",
    "function totalSupply() public view returns (uint256)",
    "function tokenByIndex(uint256 index) public view returns (uint256)",
    "function balanceOf(address owner) public view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
    "event CertificateIssued(uint256 indexed tokenId, address indexed student, string courseName, string issuer, string issuedDate)"
  ]
};

// Configuración de la red Celo Alfajores
export const NETWORK_CONFIG = {
  chainId: 44787,
  chainName: 'Celo Alfajores Testnet',
  rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
  blockExplorerUrls: ['https://alfajores.celoscan.io/'],
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18,
  }
};

// URLs de faucets para obtener tokens de prueba
export const FAUCET_URLS = {
  CELO: 'https://faucet.celo.org/alfajores',
  CELO_ALTERNATIVE: 'https://faucet.celo.org/alfajores'
};

// Información del proyecto
export const PROJECT_INFO = {
  name: 'EduBlock',
  description: 'Plataforma de Certificados Educativos en Blockchain',
  version: '1.0.0',
  author: 'Osmarl Pulido Rodríguez',
  network: 'Celo Alfajores'
};
