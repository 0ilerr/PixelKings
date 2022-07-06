import { ethers } from 'hardhat';
import { PixelKingsMarketplace, HeroNft, BusdMock } from '../typechain-types';
import { BigNumber } from 'ethers';
const initialSupply = BigNumber.from('15000000000000000000000'); 


async function main() {

    const BusdMock = await ethers.getContractFactory("BusdMock");
    const busdMock: BusdMock = await BusdMock.deploy();
    console.log('Deploying...');
    await busdMock.deployed();
    console.log('Contract BusdMock deployed at:', busdMock.address);

    await busdMock.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", initialSupply);
    await busdMock.mint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", initialSupply);

    const HeroNft = await ethers.getContractFactory("HeroNft");
    const heroNft: HeroNft = await HeroNft.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log('Deploying...');
    await heroNft.deployed();
    console.log('Contract HeroNft deployed at:', heroNft.address);

    const PixelKingsMarketplace = await ethers.getContractFactory("PixelKingsMarketplace");
    const pixelKingsMarketplace: PixelKingsMarketplace = await PixelKingsMarketplace.deploy(busdMock.address, heroNft.address);
    console.log('Deploying...');
    await pixelKingsMarketplace.deployed();
    console.log('Contract PixelKingsMarketplace deployed at:', pixelKingsMarketplace.address);

    await heroNft.setMarketplace(pixelKingsMarketplace.address);



}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});