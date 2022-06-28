import { ethers } from 'hardhat';
// import { PixelKingsMarketplace } from '../typechain-types';
import { PixelKingsMarketplace } from '../typechain-types'

async function main() {

    const PixelKingsMarketplace = await ethers.getContractFactory("PixelKingsMarketplace");
    const pixelKingsMarketplace: PixelKingsMarketplace = await PixelKingsMarketplace.deploy("0x4F79A173eAfC8fD0faC38432b3bbEd8650a7387D", "0x4F79A173eAfC8fD0faC38432b3bbEd8650a7387D");
    console.log('Deploying...');
    await pixelKingsMarketplace.deployed();
    console.log('Contract deployed at:', pixelKingsMarketplace.address);

}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});