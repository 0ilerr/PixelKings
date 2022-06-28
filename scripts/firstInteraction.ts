import { ethers } from 'hardhat';
import fs from 'fs'

const fsPromisses = fs.promises

const ABI = './artifacts/contracts/PixelKingsMarketplace.sol/PixelKingsMarketplace.json'

const DEPLOYED_CONTRACT_ADDRESS = '0x272cF90F4013e430D998C1797339900c9F4A65D0'

async function getAbi() {
    const data = await fsPromisses.readFile(ABI, 'utf8')
    const abi =  JSON.parse(data)['abi']

    return abi
}

async function main() {
    let provider = ethers.getDefaultProvider('https://data-seed-prebsc-1-s1.binance.org:8545')
    const abi = await getAbi()
    const PRIVATE_KEY_LOCAL: any = process.env.PRIVATE_KEY;

    let signer = new ethers.Wallet(PRIVATE_KEY_LOCAL, provider);

    const pixelKingsMarketplace = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
    await pixelKingsMarketplace.addNewHero(0,"Archer", "uri");
    await pixelKingsMarketplace.addNewHero(0,"Frost Archer", "uri");
    await pixelKingsMarketplace.addNewHero(0,"Double Arrows", "uri");
    await pixelKingsMarketplace.addNewHero(0,"Triple Arrows", "uri");
    await pixelKingsMarketplace.addNewHero(0,"Sniper Archer", "uri");
    await pixelKingsMarketplace.addNewHero(0,"Gemini Archer", "uri");
    await pixelKingsMarketplace.addNewHero(0,"Bomerang Man", "uri");
    await pixelKingsMarketplace.addNewHero(0,"Bomber Archer", "uri");
    await pixelKingsMarketplace.addNewHero(0,"Random Bomber Archer", "uri");
    await pixelKingsMarketplace.addNewHero(0,"Launcher Archer", "uri");
    await pixelKingsMarketplace.addNewHero(0,"The Mad Archer", "uri");
    await pixelKingsMarketplace.addNewHero(0,"Frozen Bomber", "uri");
    await pixelKingsMarketplace.addNewHero(1,"Black Wolf", "uri");
    await pixelKingsMarketplace.addNewHero(1,"Red Wolf", "uri");
    await pixelKingsMarketplace.addNewHero(2,"Soldier", "uri");
    await pixelKingsMarketplace.addNewHero(2,"Golden Soldier", "uri");
    await pixelKingsMarketplace.addNewHero(2,"Steel Crog", "uri");
    await pixelKingsMarketplace.addNewHero(2,"Golden Crog", "uri");
    await pixelKingsMarketplace.addNewHero(3,"Bomberman", "uri");
    await pixelKingsMarketplace.addNewHero(3,"TNT Tactician", "uri");
    await pixelKingsMarketplace.addNewHero(3,"Magnus Wizard", "uri");
    await pixelKingsMarketplace.addNewHero(4,"Fire Golem", "uri");
    await pixelKingsMarketplace.addNewHero(4,"Lantern Wizard", "uri");
    await pixelKingsMarketplace.addNewHero(4,"Magnetic Wizard", "uri");
    await pixelKingsMarketplace.addNewHero(4,"Windcaller Wizard", "uri");
    await pixelKingsMarketplace.addNewHero(4,"Magic Shield", "uri");
    await pixelKingsMarketplace.addNewHero(4,"Toxic Wizar", "uri");
    await pixelKingsMarketplace.addNewHero(4,"Spider Shield", "uri");
    await pixelKingsMarketplace.addNewHero(5,"Sea Dragon", "uri");
    await pixelKingsMarketplace.addNewHero(5,"Sea Dragon Ambusher", "uri");
    await pixelKingsMarketplace.addNewHero(6,"Novice Miner", "uri");
    await pixelKingsMarketplace.addNewHero(6,"Master Miner", "uri");

    await pixelKingsMarketplace.updateBoxValue(0, 10);
    await pixelKingsMarketplace.updateBoxValue(1, 20);
    await pixelKingsMarketplace.updateBoxValue(2, 30);
    await pixelKingsMarketplace.updateBoxValue(3, 35);
    await pixelKingsMarketplace.updateBoxValue(4, 40);
    await pixelKingsMarketplace.updateBoxValue(5, 50);
}


main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});