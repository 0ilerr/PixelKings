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
  let player: SignerWithAddress;
  const playerBusdInitialBalance: BigNumber = BigNumber.from(300000);

  const brozenBoxPrice: BigNumber = BigNumber.from(30);
  const brozenBoxNumber = 0;
  const silverBoxPrice: BigNumber = BigNumber.from(50);
  const silverBoxNumber = 1;
  const goldenBoxPrice: BigNumber = BigNumber.from(100);
  const goldenBoxNumber = 2;
  const minerBoxPrice: BigNumber = BigNumber.from(100);
  const minerBoxNumber = 3;
  const greenBoxPrice: BigNumber = BigNumber.from(20);
  const greenBoxNumber = 4;
  const blueBoxPrice: BigNumber = BigNumber.from(20);
  const blueBoxNumber = 5;
  const starterPackPrice: BigNumber = BigNumber.from(50);
  const starterPackNumber = 6;

  beforeEach(async () => {
    owner = (await ethers.getSigners())[0];
    player = (await ethers.getSigners())[1];

    const Busd = await ethers.getContractFactory('BusdMock');
    busdContract = await Busd.connect(owner).deploy();
    await busdContract.connect(owner).deployed();

    const HeroNft = await ethers.getContractFactory('HeroNft');
    heroNftContract = await HeroNft.connect(owner).deploy(owner.address);
    await heroNftContract.connect(owner).deployed();

    const Marketplace = await ethers.getContractFactory('PixelKingsMarketplace');
    marketplaceContract = await Marketplace.connect(owner).deploy(busdContract.address, heroNftContract.address);
    await marketplaceContract.connect(owner).deployed();

    await heroNftContract.setMarketplace(marketplaceContract.address);

    await busdContract.connect(player).mint(player.address, playerBusdInitialBalance);

    addHeroesToMarketplace();
  });

  it('Should deploy correctly', async () => {
    expect(await marketplaceContract.owner()).to.equal(owner.address);
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

    await marketplaceContract.connect(player).buyStarterPack();

    expect(await marketplaceContract.connect(player).playerBoxCount(player.address)).to.equal(1);

  });

  it('Should open bronzen box', async () => {
    const expectedHeroId = 0;

    await marketplaceContract.addToWhitelist(player.address);

    busdContract.connect(player).approve(marketplaceContract.address, brozenBoxPrice);

    await marketplaceContract.connect(player).buyBox(brozenBoxNumber);

    expect(await marketplaceContract.connect(player).openBox(brozenBoxNumber, 0, 75)).to.emit(marketplaceContract, "NewHeroNft")
      .withArgs(expectedHeroId, player.address);
  });

  it('Should open starter pack', async () => {
    const expectedHeroId1 = 0;
    const expectedHeroId2 = 1;
    const expectedHeroId3 = 2;

    await marketplaceContract.addToWhitelist(player.address);

    busdContract.connect(player).approve(marketplaceContract.address, starterPackPrice);

    await marketplaceContract.connect(player).buyStarterPack();

    expect(await marketplaceContract.connect(player).openStarterPack(1, 2, 73)).to.emit(marketplaceContract, "NewHeroNft")
      .withArgs(expectedHeroId1, player.address)
      .and.to.emit(marketplaceContract, "NewHeroNft")
      .withArgs(expectedHeroId2, player.address)
      .and.to.emit(marketplaceContract, "NewHeroNft")
      .withArgs(expectedHeroId3, player.address);

  });

  it('Should revert if the user is not in the white list', async () => {
    busdContract.connect(player).approve(marketplaceContract.address, brozenBoxPrice);

    await expect(marketplaceContract.connect(player).buyBox(brozenBoxNumber))
      .to.revertedWith('Open sale has not started')
  });

  it('Should revert if the module value is incorrect', async () => {
    await marketplaceContract.addToWhitelist(player.address);

    busdContract.connect(player).approve(marketplaceContract.address, brozenBoxPrice);

    await marketplaceContract.connect(player).buyBox(brozenBoxNumber);

    await expect(marketplaceContract.connect(player).openBox(brozenBoxNumber, 0, 108))
      .to.revertedWith('Module must be between 0 and 100')
  });

  const addHeroesToMarketplace = async () => {
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
});

