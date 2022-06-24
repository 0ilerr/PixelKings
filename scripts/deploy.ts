import { ethers } from 'hardhat';
// import { PixelKingsMarketplace } from '../typechain-types';
import { PixelKingsMarketplace } from '../typechain-types'

async function main() {

    const PixelKingsMarketplace = await ethers.getContractFactory("PixelKingsMarketplace");
    const pixelKingsMarketplace: PixelKingsMarketplace = await PixelKingsMarketplace.deploy("0x4F79A173eAfC8fD0faC38432b3bbEd8650a7387D", "0x4F79A173eAfC8fD0faC38432b3bbEd8650a7387D");
    console.log('Deploying...');
    await pixelKingsMarketplace.deployed();
    console.log('Contract deployed at:', pixelKingsMarketplace.address);

    pixelKingsMarketplace.[Class.Shooter] = [
        "Archer",
        "Frost Archer",
        "Double Arrows",
        "Double Arrows",
        "Triple Arrows",
        "Sniper Archer",
        "Gemini Archer",
        "Bomerang Man",
        "Bomber Archer",
        "Random Bomber Archer",
        "Launcher Archer",
        "The Mad Archer",
        "Frozen Bomber",
        "Black Wolf",
        "Red Wolf"
    ];

    boxValue[Box.BronzenBox] = 10;
    boxValue[Box.SilverBox] = 20;
    boxValue[Box.GoldenBox] = 30;
    boxValue[Box.GreenBox] = 50;
    boxValue[Box.BlueBox] = 50;
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});