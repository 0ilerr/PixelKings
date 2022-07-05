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
  const playerBusdInitialBalance: BigNumber = BigNumber.from(300);

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

    await busdContract.connect(player).mint(playerBusdInitialBalance);

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

  })

  it('Should revert if the user is not in the white list', async () => {
    busdContract.connect(player).approve(marketplaceContract.address, brozenBoxPrice);

    await expect(marketplaceContract.connect(player).buyBox(brozenBoxNumber))
      .to.revertedWith('Open sale has not started')
  })

  it('Should revert if the module value is incorrect', async () => {
    await marketplaceContract.addToWhitelist(player.address);

    busdContract.connect(player).approve(marketplaceContract.address, brozenBoxPrice);

    await marketplaceContract.connect(player).buyBox(brozenBoxNumber);

    await expect(marketplaceContract.connect(player).openBox(brozenBoxNumber, 0, 108))
      .to.revertedWith('Module must be between 0 and 100')
  })

  const addHeroesToMarketplace = async () => {
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Archer", index, "uri" + index);
    }

    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Frost Archer", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Double Arrows", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Triple Arrows", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Sniper Archer", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Gemini Archer", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Bomerang Man", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Bomber Archer", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Random Bomber Archer", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Launcher Archer", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "The Mad Archer", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(0, "Frozen Bomber", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(1, "Black Wolf", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(1, "Red Wolf", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(2, "Soldier", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(2, "Golden Soldier", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(2, "Steel Crog", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(2, "Golden Crog", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(3, "Bomberman", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(3, "TNT Tactician", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(3, "Magnus Wizard", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(4, "Fire Golem", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(4, "Lantern Wizard", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(4, "Magnetic Wizard", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(4, "Windcaller Wizard", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(4, "Magic Shield", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(4, "Toxic Wizard", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(4, "Spider Shield", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(5, "Sea Dragon", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(5, "Sea Dragon Ambusher", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(6, "Novice Miner", index, "uri" + index);
    }
    for (let index = 0; index < 5; index++) {
      await marketplaceContract.addNewHero(6, "Master Miner", index, "uri" + index);
    }
  }
});

