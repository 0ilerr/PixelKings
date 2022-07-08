import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers, waffle } from 'hardhat';
import { PixelKingsMarketplace, BusdMock, HeroNft } from '../typechain-types';

describe('Marketplace', async () => {
  let marketplaceContract: PixelKingsMarketplace;
  let heroNftContract: HeroNft;
  let busdContract: BusdMock;
  let owner: SignerWithAddress;
  let moderator: SignerWithAddress;
  let player: SignerWithAddress;
  const playerBusdInitialBalance: BigNumber = BigNumber.from(30000000000000000000000);

  const brozenBoxPrice: BigNumber = BigNumber.from(30000000000000000000);
  const brozenBoxNumber = 0;
  const silverBoxPrice: BigNumber = BigNumber.from(50000000000000000000);
  const silverBoxNumber = 1;
  const goldenBoxPrice: BigNumber = BigNumber.from(100000000000000000000);
  const goldenBoxNumber = 2;
  const minerBoxPrice: BigNumber = BigNumber.from(100000000000000000000);
  const minerBoxNumber = 3;
  const greenBoxPrice: BigNumber = BigNumber.from(20000000000000000000);
  const greenBoxNumber = 4;
  const blueBoxPrice: BigNumber = BigNumber.from(20000000000000000000);
  const blueBoxNumber = 5;
  const starterPackPrice: BigNumber = BigNumber.from(50000000000000000000);
  const starterPackNumber = 6;

  beforeEach(async () => {
    moderator = (await ethers.getSigners())[0];
    owner = (await ethers.getSigners())[1];
    player = (await ethers.getSigners())[2];

    const Busd = await ethers.getContractFactory('BusdMock');
    busdContract = await Busd.connect(owner).deploy();
    await busdContract.connect(owner).deployed();

    const HeroNft = await ethers.getContractFactory('HeroNft');
    heroNftContract = await HeroNft.deploy(owner.address);
    await heroNftContract.connect(owner).deployed();

    const Marketplace = await ethers.getContractFactory('PixelKingsMarketplace');
    marketplaceContract = await Marketplace.deploy(busdContract.address, heroNftContract.address, owner.address);
    await marketplaceContract.connect(owner).deployed();

    await heroNftContract.setMarketplace(marketplaceContract.address);

    await busdContract.connect(player).mint(playerBusdInitialBalance);

    await addHeroesToMarketplace();
  });

  it('Should deploy correctly', async () => {
    expect(await marketplaceContract.tokenAddress()).to.equal(busdContract.address);
    expect(await marketplaceContract.heroNft()).to.equal(heroNftContract.address);
  });

  it('Should buy bronzen box', async () => {
    await marketplaceContract.addToWhitelist(player.address);

    busdContract.connect(player).approve(marketplaceContract.address, brozenBoxPrice);

    await marketplaceContract.connect(player).buyBox(brozenBoxNumber);

    expect(await marketplaceContract.connect(player).playerBoxCount(player.address)).to.equal(1);

  });

  it('Should buy starter pack', async () => {
    await marketplaceContract.addToWhitelist(player.address);

    busdContract.connect(player).approve(marketplaceContract.address, starterPackPrice);

    await marketplaceContract.connect(player).buyBox(starterPackNumber);

    expect(await marketplaceContract.connect(player).playerBoxCount(player.address)).to.equal(1);

  });

  it('Should open bronzen box', async () => {
    const expectedHeroId = 0;

    await marketplaceContract.addToWhitelist(player.address);

    busdContract.connect(player).approve(marketplaceContract.address, brozenBoxPrice);

    await marketplaceContract.connect(player).buyBox(brozenBoxNumber);

    expect(await marketplaceContract.connect(player).openBox(brozenBoxNumber, 0, 5)).to.emit(marketplaceContract, "NewHeroNft")
      .withArgs(expectedHeroId, player.address);
  });

  it('Should open starter pack', async () => {
    const expectedHeroId1 = 0;
    const expectedHeroId2 = 1;
    const expectedHeroId3 = 2;

    await marketplaceContract.addToWhitelist(player.address);

    busdContract.connect(player).approve(marketplaceContract.address, starterPackPrice);

    await marketplaceContract.connect(player).buyBox(starterPackNumber);

    expect(await marketplaceContract.connect(player).openStarterPack(1, 2, 73)).to.emit(marketplaceContract, "NewHeroNft")
      .withArgs(expectedHeroId1, player.address)
      .and.to.emit(marketplaceContract, "NewHeroNft")
      .withArgs(expectedHeroId2, player.address)
      .and.to.emit(marketplaceContract, "NewHeroNft")
      .withArgs(expectedHeroId3, player.address);

  });

  const addHeroesToMarketplace = async () => {
    for (let rarity = 0; rarity < 5; rarity++) {
      await marketplaceContract.addNewHero(0, "Archer", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "Frost Archer", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "Double Arrows", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "Triple Arrows", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "Sniper Archer", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "Gemini Archer", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "Bomerang Man", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "Bomber Archer", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "Random Bomber Archer", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "Launcher Archer", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "The Mad Archer", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(0, "Frozen Bomber", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(1, "Black Wolf", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(1, "Red Wolf", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(2, "Soldier", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(2, "Golden Soldier", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(2, "Steel Crog", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(2, "Golden Crog", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(3, "Bomberman", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(3, "TNT Tactician", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(3, "Magnus Wizard", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(4, "Fire Golem", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(4, "Lantern Wizard", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(4, "Magnetic Wizard", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(4, "Windcaller Wizard", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(4, "Magic Shield", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(4, "Toxic Wizard", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(4, "Spider Shield", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(5, "Sea Dragon", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(5, "Sea Dragon Ambusher", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(6, "Novice Miner", rarity, "uri" + rarity);
      await marketplaceContract.addNewHero(6, "Master Miner", rarity, "uri" + rarity);
    }
  }
});

