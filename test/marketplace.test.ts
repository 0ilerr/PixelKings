import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { PixelKingsMarketplace, BusdMock } from '../typechain-types/contracts';

describe('Marketplace', async () => {
  let marketplaceContract: PixelKingsMarketplace;
  let busdContract: BusdMock;
  let owner: SignerWithAddress;
  let player1: SignerWithAddress;
  const player1BusdAmount: number = 300;

  beforeEach(async () => {
    owner = (await ethers.getSigners())[0];
    player1 = (await ethers.getSigners())[1];

    const Busd = await ethers.getContractFactory('BusdMock');
    busdContract = await Busd.deploy();
    await busdContract.deployed();

    const Marketplace = await ethers.getContractFactory('PixelKingsMarketplace');
    marketplaceContract = await Marketplace.deploy(busdContract.address);
    await marketplaceContract.deployed();

    await busdContract.connect(player1).mint(player1BusdAmount);
    addHeroesToMarketplace();
  });

  it('Should deploy correctly', async () => {
    expect(await marketplaceContract.owner()).to.equal(owner.address);
    expect(await marketplaceContract.tokenAddress()).to.equal(busdContract.address);
  });

  it('Should buy bronzen box with archer class', async () => {
    const brozenBoxPrice = 10000000000000000000; //10
    const brozenBoxNumber = 0;
    const archerClassNumber = 0;
    busdContract.connect(player1).approve(marketplaceContract.address, brozenBoxPrice);

    await marketplaceContract.connect(player1).buyBox(brozenBoxNumber, archerClassNumber, 1);

    
  })

  const addHeroesToMarketplace = async () => {
    await marketplaceContract.addNewHero(0, "Archer", "uri");
    await marketplaceContract.addNewHero(0, "Frost Archer", "uri");
    await marketplaceContract.addNewHero(0, "Double Arrows", "uri");
    await marketplaceContract.addNewHero(0, "Triple Arrows", "uri");
    await marketplaceContract.addNewHero(0, "Sniper Archer", "uri");
    await marketplaceContract.addNewHero(0, "Gemini Archer", "uri");
    await marketplaceContract.addNewHero(0, "Bomerang Man", "uri");
    await marketplaceContract.addNewHero(0, "Bomber Archer", "uri");
    await marketplaceContract.addNewHero(0, "Random Bomber Archer", "uri");
    await marketplaceContract.addNewHero(0, "Launcher Archer", "uri");
    await marketplaceContract.addNewHero(0, "The Mad Archer", "uri");
    await marketplaceContract.addNewHero(0, "Frozen Bomber", "uri");
    await marketplaceContract.addNewHero(1, "Black Wolf", "uri");
    await marketplaceContract.addNewHero(1, "Red Wolf", "uri");
    await marketplaceContract.addNewHero(2, "Soldier", "uri");
    await marketplaceContract.addNewHero(2, "Golden Soldier", "uri");
    await marketplaceContract.addNewHero(2, "Steel Crog", "uri");
    await marketplaceContract.addNewHero(2, "Golden Crog", "uri");
    await marketplaceContract.addNewHero(3, "Bomberman", "uri");
    await marketplaceContract.addNewHero(3, "TNT Tactician", "uri");
    await marketplaceContract.addNewHero(3, "Magnus Wizard", "uri");
    await marketplaceContract.addNewHero(4, "Fire Golem", "uri");
    await marketplaceContract.addNewHero(4, "Lantern Wizard", "uri");
    await marketplaceContract.addNewHero(4, "Magnetic Wizard", "uri");
    await marketplaceContract.addNewHero(4, "Windcaller Wizard", "uri");
    await marketplaceContract.addNewHero(4, "Magic Shield", "uri");
    await marketplaceContract.addNewHero(4, "Toxic Wizar", "uri");
    await marketplaceContract.addNewHero(4, "Spider Shield", "uri");
    await marketplaceContract.addNewHero(5, "Sea Dragon", "uri");
    await marketplaceContract.addNewHero(5, "Sea Dragon Ambusher", "uri");
    await marketplaceContract.addNewHero(6, "Novice Miner", "uri");
    await marketplaceContract.addNewHero(6, "Master Miner", "uri");
  }
});

