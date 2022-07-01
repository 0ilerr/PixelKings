import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers, waffle } from 'hardhat';
import { PixelKingsMarketplace, BusdMock } from '../typechain-types/contracts';

describe('Marketplace', async () => {
  let marketplaceContract: PixelKingsMarketplace;
  let busdContract: BusdMock;
  let owner: SignerWithAddress;
  let player: SignerWithAddress;
  const playerBusdInitialBalance: BigNumber = BigNumber.from(300);

  beforeEach(async () => {
    owner = (await ethers.getSigners())[0];
    player = (await ethers.getSigners())[1];

    const Busd = await ethers.getContractFactory('BusdMock');
    busdContract = await Busd.deploy();
    await busdContract.deployed();

    const Marketplace = await ethers.getContractFactory('PixelKingsMarketplace');
    marketplaceContract = await Marketplace.deploy(busdContract.address);
    await marketplaceContract.deployed();

    await busdContract.connect(player).mint(playerBusdInitialBalance);
    
    addHeroesToMarketplace();
  });
  
  it('Should deploy correctly', async () => {
    expect(await marketplaceContract.owner()).to.equal(owner.address);
    expect(await marketplaceContract.tokenAddress()).to.equal(busdContract.address);
  });
  
  it.only('Should buy bronzen box with archer class', async () => {
    const brozenBoxPrice: BigNumber = BigNumber.from(10);
    const brozenBoxNumber = 0;
    const archerClassNumber = 0;
    const expectedHeroId = 0;
    
    await marketplaceContract.addToWhitelist(player.address);

    busdContract.connect(player).approve(marketplaceContract.address, brozenBoxPrice);

    await expect(marketplaceContract.connect(player).buyBox(brozenBoxNumber, archerClassNumber, 1))
      .to.emit(marketplaceContract, "NewHeroNft")
      .withArgs(expectedHeroId, player.address);
      
      const ownerBusdBalance = await busdContract.balanceOf(owner.address);
      const playerBusdBalance = await busdContract.balanceOf(player.address);
      const hero = await marketplaceContract.heros(expectedHeroId);

      expect(ownerBusdBalance).to.equal(brozenBoxPrice);
      expect(playerBusdBalance).to.equal(playerBusdInitialBalance.sub(brozenBoxPrice));

      expect(await marketplaceContract.ownerOf(expectedHeroId)).to.equal(player.address);
      expect(hero.class).to.equal(archerClassNumber);
      // TODO: Arrumar um jeito de verificar a uri e nome do heroi
  })

  it('Should revert if the user is not in the white list', async () => {
    const brozenBoxPrice: BigNumber = BigNumber.from(10);
    const brozenBoxNumber = 0;
    const archerClassNumber = 0;
    busdContract.connect(player).approve(marketplaceContract.address, brozenBoxPrice);

    await expect(marketplaceContract.connect(player).buyBox(brozenBoxNumber, archerClassNumber, 1))
      .to.revertedWith('Open sale has not started')
  })

  it('Should revert if the module value is incorrect', async () => {
    const brozenBoxPrice: BigNumber = BigNumber.from(10);
    const brozenBoxNumber = 0;
    const archerClassNumber = 0;
    busdContract.connect(player).approve(marketplaceContract.address, brozenBoxPrice);

    await expect(marketplaceContract.connect(player).buyBox(brozenBoxNumber, archerClassNumber, 108))
      .to.revertedWith('Module must be between 0 and 100')
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

