import { ethers } from 'hardhat';
import fs from 'fs'

const fsPromisses = fs.promises

const ABI = './artifacts/contracts/PixelKingsMarketplace.sol/PixelKingsMarketplace.json'

const DEPLOYED_CONTRACT_ADDRESS = '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9'

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

    const marketplaceContract = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
    await marketplaceContract.addNewHero(0, "Archer");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Archer", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "Frost Archer");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Frost Archer", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "Double Arrows");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Double Arrows", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "Triple Arrows");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Triple Arrows", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "Sniper Archer");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Sniper Archer", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "Gemini Archer");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Gemini Archer", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "Bomerang Man");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Bomerang Man", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "Bomber Archer");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Bomber Archer", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "Random Bomber Archer");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Random Bomber Archer", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "Launcher Archer");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Launcher Archer", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "The Mad Archer");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("The Mad Archer", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(0, "Frozen Bomber");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Frozen Bomber", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(1, "Black Wolf");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Black Wolf", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(1, "Red Wolf");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Red Wolf", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(2, "Soldier");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Soldier", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(2, "Golden Soldier");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Golden Soldier", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(2, "Steel Crog");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Steel Crog", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(2, "Golden Crog");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Golden Crog", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(3, "Bomberman");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Bomberman", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(3, "TNT Tactician");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("TNT Tactician", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(3, "Magnus Wizard");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Magnus Wizard", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(4, "Fire Golem");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Fire Golem", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(4, "Lantern Wizard");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Lantern Wizard", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(4, "Magnetic Wizard");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Magnetic Wizard", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(4, "Windcaller Wizard");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Windcaller Wizard", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(4, "Magic Shield");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Magic Shield", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(4, "Toxic Wizard");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Toxic Wizard", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(4, "Spider Shield");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Spider Shield", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(5, "Sea Dragon");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Sea Dragon", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(5, "Sea Dragon Ambusher");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Sea Dragon Ambusher", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(6, "Novice Miner");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Novice Miner", index, "uri" + index);
    }
    await marketplaceContract.addNewHero(6, "Master Miner");
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.updateHeroUri("Master Miner", index, "uri" + index);
    }
}


main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});