// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importamos librerías seguras y conocidas de OpenZeppelin
// Estas nos dan funciones ya probadas para crear tokens NFT
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// 🏫 Contrato principal de EduBlockSBT
// Este contrato emite certificados educativos únicos e intransferibles
contract EduBlockSBT is ERC721URIStorage, Ownable {
    // Contador para asignar un ID único a cada certificado
    uint256 private _tokenIds;

    // Estructura de datos para guardar información del certificado
    struct Certificate {
        string courseName;     // Nombre del curso o programa
        string issuer;         // Nombre de la institución o profesor
        string issuedDate;     // Fecha de emisión
        address student;        // Dirección de la wallet del estudiante
        string metadataURI;    // Enlace con información adicional (por ejemplo en IPFS)
    }

    // Mapeo: asocia el ID del token con los datos del certificado
    mapping(uint256 => Certificate) public certificates;

    // 🪙 Evento: se emite cuando se crea un nuevo certificado
    event CertificateIssued(
        uint256 indexed tokenId,
        address indexed student,
        string courseName,
        string issuer,
        string issuedDate
    );

    // 🔒 Constructor: define el nombre y símbolo del token
    constructor() ERC721("EduBlock Soulbound Token", "EDUSBT") Ownable(msg.sender) {}

    // 📜 Función para emitir un nuevo certificado
    // Solo el propietario del contrato (por ejemplo, la institución) puede hacerlo
    function issueCertificate(
        address student,        // wallet del estudiante
        string memory courseName, // nombre del curso
        string memory issuer,     // quién lo emite
        string memory issuedDate, // fecha de emisión
        string memory metadataURI // enlace con los metadatos
    ) public onlyOwner returns (uint256) {
        _tokenIds++; // incrementa el ID del token
        uint256 newTokenId = _tokenIds;

        // Crea el NFT y se lo asigna al estudiante
        _safeMint(student, newTokenId);
        _setTokenURI(newTokenId, metadataURI);

        // Guarda la información del certificado
        certificates[newTokenId] = Certificate(
            courseName,
            issuer,
            issuedDate,
            student,
            metadataURI
        );

        // Emite un evento para registrar la emisión del certificado
        emit CertificateIssued(newTokenId, student, courseName, issuer, issuedDate);

        return newTokenId;
    }

    // 🚫 Funciones que impiden transferir el token
    // Así garantizamos que sea "Soulbound" (unido al alma)
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        revert("Soulbound: transfer not allowed");
    }

    function approve(address to, uint256 tokenId) public pure override(ERC721, IERC721) {
        revert("Soulbound: approval not allowed");
    }

    function setApprovalForAll(address operator, bool approved) public pure override(ERC721, IERC721) {
        revert("Soulbound: approval for all not allowed");
    }

    // ✅ Verificación: permite a cualquiera comprobar si un certificado pertenece a una wallet
    function verifyCertificate(uint256 tokenId, address student) public view returns (bool) {
        return ownerOf(tokenId) == student;
    }
}