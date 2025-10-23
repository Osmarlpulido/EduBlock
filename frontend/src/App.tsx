import React, { useState } from 'react';
import './App.css';
import CertificateList from './components/CertificateList';
import { CONTRACT_CONFIG, NETWORK_CONFIG } from './config/contract';
import { ethers } from 'ethers';


function App() {
  const [account, setAccount] = useState<string>('');
  const [contract, setContract] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estado del formulario para emitir certificados
  const [formData, setFormData] = useState({
    student: '',
    courseName: '',
    issuer: '',
    issuedDate: '',
    metadataURI: ''
  });

  // Conectar wallet
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          
          // Verificar si estamos en la red correcta
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (parseInt(chainId, 16) !== NETWORK_CONFIG.chainId) {
            await switchToAlfajores();
          }
          
          // Conectar con el contrato
          await connectToContract();
        }
      } else {
        alert('Por favor instala MetaMask para usar esta aplicación');
      }
    } catch (error) {
      console.error('Error conectando wallet:', error);
      alert('Error al conectar la wallet');
    }
  };

  // Conectar con el contrato desplegado
  const connectToContract = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_CONFIG.ADDRESS,
          CONTRACT_CONFIG.ABI,
          signer
        );
        setContract(contract);
        console.log('Contrato conectado:', CONTRACT_CONFIG.ADDRESS);
      }
    } catch (error) {
      console.error('Error conectando con el contrato:', error);
    }
  };

  // Cambiar a red Alfajores
  const switchToAlfajores = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}` }],
        });
      }
    } catch (switchError: any) {
      // Si la red no existe, la agregamos
      if (switchError.code === 4902 && window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [NETWORK_CONFIG],
          });
        } catch (addError) {
          console.error('Error agregando red:', addError);
        }
      }
    }
  };

  // Emitir certificado
  const issueCertificate = async () => {
    if (!contract) {
      alert('Contrato no conectado');
      return;
    }

    setLoading(true);
    try {
      const tx = await contract.issueCertificate(
        formData.student,
        formData.courseName,
        formData.issuer,
        formData.issuedDate,
        formData.metadataURI
      );
      
      await tx.wait();
      alert('Certificado emitido exitosamente!');
      
      // Limpiar formulario
      setFormData({
        student: '',
        courseName: '',
        issuer: '',
        issuedDate: '',
        metadataURI: ''
      });
      
    } catch (error) {
      console.error('Error emitiendo certificado:', error);
      alert('Error al emitir certificado');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>🏫 EduBlock</h1>
        <p>Plataforma de Certificados Educativos en Blockchain</p>
        
        {!isConnected ? (
          <button onClick={connectWallet} className="connect-btn">
            Conectar Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <p>✅ Conectado: {account.slice(0, 6)}...{account.slice(-4)}</p>
            <p>🌐 Red: Celo Alfajores</p>
          </div>
        )}
      </header>

      <main className="App-main">
        {isConnected && (
          <>
            <div className="certificate-section">
              <h2>📜 Emitir Certificado</h2>
            <div className="form-container">
              <div className="form-group">
                <label>Dirección del Estudiante:</label>
                <input
                  type="text"
                  value={formData.student}
                  onChange={(e) => setFormData({...formData, student: e.target.value})}
                  placeholder="0x..."
                />
              </div>
              
              <div className="form-group">
                <label>Nombre del Curso:</label>
                <input
                  type="text"
                  value={formData.courseName}
                  onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                  placeholder="Introducción a Blockchain"
                />
              </div>
              
              <div className="form-group">
                <label>Institución/Emisor:</label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                  placeholder="Universidad XYZ"
                />
              </div>
              
              <div className="form-group">
                <label>Fecha de Emisión:</label>
                <input
                  type="date"
                  value={formData.issuedDate}
                  onChange={(e) => setFormData({...formData, issuedDate: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>URI de Metadatos (opcional):</label>
                <input
                  type="text"
                  value={formData.metadataURI}
                  onChange={(e) => setFormData({...formData, metadataURI: e.target.value})}
                  placeholder="https://ipfs.io/..."
                />
              </div>
              
              <button 
                onClick={issueCertificate} 
                disabled={loading}
                className="issue-btn"
              >
                {loading ? 'Emitiendo...' : 'Emitir Certificado'}
              </button>
            </div>
            </div>
            
            <CertificateList contract={contract} account={account} />
          </>
        )}

        <div className="info-section">
          <h2>🔍 Verificar Certificado</h2>
          <p>Para verificar un certificado, necesitas el ID del token y la dirección del estudiante.</p>
          <p>Los certificados son Soulbound Tokens (SBTs) - únicos e intransferibles.</p>
        </div>

        <div className="features-section">
          <h2>✨ Características de EduBlock</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔒 Seguro</h3>
              <p>Certificados verificables en blockchain</p>
            </div>
            <div className="feature-card">
              <h3>🌍 Descentralizado</h3>
              <p>Sin dependencia de instituciones centrales</p>
            </div>
            <div className="feature-card">
              <h3>🚫 No Transferible</h3>
              <p>Soulbound Tokens únicos para cada estudiante</p>
            </div>
            <div className="feature-card">
              <h3>📱 Accesible</h3>
              <p>Verificación instantánea desde cualquier wallet</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>Desarrollado con ❤️ por Osmarl Pulido Rodríguez</p>
        <p>Construido en Celo para promover la inclusión digital en América Latina</p>
      </footer>
    </div>
  );
}

export default App;