// config.ts

import path from 'path';

interface EfiPayConfig {
  sandbox: boolean;
  client_id: string;
  client_secret: string;
  certificate: string;
  baseUrl: string;
}

interface Environments {
  production: EfiPayConfig;
  sandbox: EfiPayConfig;
}

const config: Environments = {
  production: {
    sandbox: false,
    client_id: 'Client_Id_e23f45609c6df5de3e7e5f1f0a1ccb2a9bbf1c7d',
    client_secret: 'Client_Secret_dc8e679ac6ff4d77e2ce9007059ce67285f9ead2',
    certificate: path.resolve(__dirname, 'producao-609302-cantina(linux).p12'),
    baseUrl: 'https://api-pix.gerencianet.com.br'
  },
  sandbox: {
    sandbox: true,
    client_id: 'Client_Id_730cfe5d408eba817026802c41b9f260e11eca74',
    client_secret: 'Client_Secret_263cf08ca3fb9eed233164126330bea1a0358d3f',
    certificate: path.resolve(__dirname, 'homologacao-609302-cantina - homolog(linux).p12'),
    baseUrl: 'https://api-pix-h.gerencianet.com.br'
  }
};

type Environment = keyof Environments;

// Função para obter a configuração baseada no ambiente
const getConfig = (env: Environment): EfiPayConfig => {
  return config[env];
};

// Escolha o ambiente baseado em uma variável de ambiente ou alguma outra lógica
const environment: Environment = (process.env.NODE_ENV === 'production') ? 'production' : 'sandbox';

export default getConfig(environment);