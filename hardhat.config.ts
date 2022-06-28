import * as dotenv from 'dotenv';

import { HardhatUserConfig } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import 'solidity-coverage';

dotenv.config();

const PRIVATE_KEY: any = process.env.PRIVATE_KEY;
const PRIVATE_KEY_LOCAL: any = process.env.PRIVATE_KEY_LOCAL;
const BSCSCAN_API_KEY: any = process.env.BSCSCAN_API_KEY;
const POLYGON_API_KEY: any = process.env.POLYGON_API_KEY;



const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    local: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [PRIVATE_KEY_LOCAL]
    },
    bsc: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [PRIVATE_KEY]
    },
    polygonMumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [PRIVATE_KEY]
    },
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: BSCSCAN_API_KEY,
      polygonMumbai: POLYGON_API_KEY,
      polygon: POLYGON_API_KEY
    }
  }
};

export default config;