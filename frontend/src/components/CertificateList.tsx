import React, { useState, useEffect, useCallback } from 'react';

interface Certificate {
  tokenId: number;
  courseName: string;
  issuer: string;
  issuedDate: string;
  student: string;
  metadataURI: string;
}

interface CertificateListProps {
  contract: any;
  account: string;
}

const CertificateList: React.FC<CertificateListProps> = ({ contract, account }) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{[key: number]: boolean}>({});

  // Cargar certificados del usuario
  const loadCertificates = useCallback(async () => {
    if (!contract || !account) return;

    setLoading(true);
    try {
      const balance = await contract.balanceOf(account);
      const certs: Certificate[] = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        const certData = await contract.certificates(tokenId);
        
        certs.push({
          tokenId: Number(tokenId),
          courseName: certData.courseName,
          issuer: certData.issuer,
          issuedDate: certData.issuedDate,
          student: certData.student,
          metadataURI: certData.metadataURI
        });
      }

      setCertificates(certs);
    } catch (error) {
      console.error('Error cargando certificados:', error);
    } finally {
      setLoading(false);
    }
  }, [contract, account]);

  // Verificar certificado
  const verifyCertificate = async (tokenId: number, student: string) => {
    if (!contract) return;

    try {
      const isValid = await contract.verifyCertificate(tokenId, student);
      setVerificationResult(prev => ({
        ...prev,
        [tokenId]: isValid
      }));
    } catch (error) {
      console.error('Error verificando certificado:', error);
    }
  };

  useEffect(() => {
    if (contract && account) {
      loadCertificates();
    }
  }, [contract, account, loadCertificates]);

  if (loading) {
    return (
      <div className="certificate-list">
        <h2>📜 Mis Certificados</h2>
        <div className="loading">
          <p>Cargando certificados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-list">
      <h2>📜 Mis Certificados ({certificates.length})</h2>
      
      {certificates.length === 0 ? (
        <div className="no-certificates">
          <p>No tienes certificados emitidos aún.</p>
          <p>Los certificados aparecerán aquí una vez que sean emitidos por una institución.</p>
        </div>
      ) : (
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div key={cert.tokenId} className="certificate-card">
              <div className="certificate-header">
                <h3>{cert.courseName}</h3>
                <span className="token-id">Token ID: {cert.tokenId}</span>
              </div>
              
              <div className="certificate-details">
                <p><strong>Institución:</strong> {cert.issuer}</p>
                <p><strong>Fecha:</strong> {cert.issuedDate}</p>
                <p><strong>Estudiante:</strong> {cert.student.slice(0, 6)}...{cert.student.slice(-4)}</p>
                
                {cert.metadataURI && (
                  <p><strong>Metadatos:</strong> <a href={cert.metadataURI} target="_blank" rel="noopener noreferrer">Ver detalles</a></p>
                )}
              </div>
              
              <div className="certificate-actions">
                <button 
                  onClick={() => verifyCertificate(cert.tokenId, cert.student)}
                  className="verify-btn"
                >
                  {verificationResult[cert.tokenId] === undefined 
                    ? 'Verificar' 
                    : verificationResult[cert.tokenId] 
                      ? '✅ Válido' 
                      : '❌ Inválido'
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button onClick={loadCertificates} className="refresh-btn">
        🔄 Actualizar Lista
      </button>
    </div>
  );
};

export default CertificateList;
