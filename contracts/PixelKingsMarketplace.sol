// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./HeroNft.sol";
import "./PixelKingsUtils.sol";

contract PixelKingsMarketplace is PixelKingsUtils {
    event NewHero(string name, Class class);
    event UpdateHero(string name, string uri);
    event NewHeroNft(uint256 id, address owner);

    mapping(Box => uint256) public boxPrice;
    mapping(Class => string[]) public classToHeros;

    mapping(address => bool) public whitelist;
    mapping(Box => uint256) public availableBoxes;
    mapping(address => uint8) public playerBoxCount;
    mapping(address => mapping(Box => uint256)) public playerBoxes;

    bool private privateSale = true;
    uint8 private maxBuy = 6;

    uint256[2] private bronzenBox = [80, 98];
    uint256[3] private silverBox = [60, 92, 98];
    uint256[3] private goldenBox = [30, 75, 95];
    uint256[1] private minerBox = [90];

    address public tokenAddress;
    address public heroNft;

    constructor(
        address _tokenAddress,
        address _heroNftAddress,
        address _owner
    ) {
        tokenAddress = _tokenAddress;
        heroNft = _heroNftAddress;

        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
        _grantRole(MODERATOR_ROLE, _msgSender());

        boxPrice[Box.BronzenBox] = 30;
        boxPrice[Box.SilverBox] = 50;
        boxPrice[Box.GoldenBox] = 100;
        boxPrice[Box.MinerBox] = 100;
        boxPrice[Box.GreenBox] = 20;
        boxPrice[Box.BlueBox] = 20;
        boxPrice[Box.StarterPack] = 50;

        availableBoxes[Box.BronzenBox] = 5000;
        availableBoxes[Box.SilverBox] = 3500;
        availableBoxes[Box.GoldenBox] = 1500;
        availableBoxes[Box.MinerBox] = 5000;

        availableBoxes[Box.GreenBox] = 250;
        availableBoxes[Box.BlueBox] = 500;
        availableBoxes[Box.StarterPack] = 250;
    }

    function buyBox(Box _box) external {
        address sender = _msgSender();

        require(!privateSale || whitelist[sender], "Open sale has not started");
        require(playerBoxCount[sender] < maxBuy, "Reached max buy");

        playerBoxCount[sender]++;

        ERC20(tokenAddress).transferFrom(sender, address(this), boxPrice[_box]);

        playerBoxes[sender][_box]++;
        availableBoxes[_box]--;
    }

    function openBox(
        Box _box,
        Class _class,
        uint8 _module
    ) external {
        require(
            _box != Box.StarterPack,
            "Starter pack must be open through openStarterPack function"
        );

        address sender = _msgSender();

        require(playerBoxes[sender][_box] > 0, "Player do not have a box");

        playerBoxes[sender][_box]--;

        Hero memory hero = _openBox(_box, _class, _module);
        uint256 id = HeroNft(heroNft).mintHero(sender, hero);

        emit NewHeroNft(id, sender);
    }

    function openStarterPack(
        Class _class1,
        Class _class2,
        uint8 _module
    ) external {
        address sender = _msgSender();
        //TODO: Criar função privada para essas 3 operações e chamar a função 3 vezes
        Hero memory hero1 = _openBox(Box.BlueBox, _class1, _module);
        uint256 id = HeroNft(heroNft).mintHero(sender, hero1);
        emit NewHeroNft(id, sender);

        Hero memory hero2 = _openBox(Box.BlueBox, _class2, _module);
        uint256 id2 = HeroNft(heroNft).mintHero(sender, hero2);
        emit NewHeroNft(id2, sender);

        Hero memory hero3 = _openBox(Box.GreenBox, Class.Miner, _module);
        uint256 id3 = HeroNft(heroNft).mintHero(sender, hero3);
        emit NewHeroNft(id3, sender);
    }

    function _openBox(
        Box _box,
        Class _class,
        uint8 _module
    ) internal view returns (Hero memory hero) {
        string[] memory heros = classToHeros[_class];
        require(heros.length > 0, "This hero class does not exist");

        uint256 randomNumber = generateRandom(_module);
        uint256 rarityNumber = randomNumber % 100;
        uint256 heroNumber = randomNumber % heros.length;

        hero.name = heros[heroNumber];
        hero.class = _class;
        hero.rarity = _generateRarity(_box, rarityNumber);
    }

    function _generateRarity(Box _box, uint256 rarityNumber)
        internal
        view
        returns (Rarity rarity)
    {
        rarity = Rarity.Common;
        if (_box == Box.BronzenBox) {
            rarity = _generateRarityForBronzenBox(rarityNumber);
        } else if (_box == Box.SilverBox) {
            rarity = _generateRarityForSilverBox(rarityNumber);
        } else if (_box == Box.GoldenBox) {
            rarity = _generateRarityForGoldenBox(rarityNumber);
        } else if (_box == Box.MinerBox) {
            rarity = _generateRarityForMinerBox(rarityNumber);
        } else if (_box == Box.BlueBox || _box == Box.GreenBox) {
            rarity = Rarity.CommonStarter;
        }
    }

    function _generateRarityForBronzenBox(uint256 rarityNumber)
        internal
        view
        returns (Rarity rarity)
    {
        if (rarityNumber <= bronzenBox[0]) {
            rarity = Rarity.Common;
        } else if (rarityNumber <= bronzenBox[1]) {
            rarity = Rarity.Uncommon;
        } else {
            rarity = Rarity.Rare;
        }
    }

    function _generateRarityForSilverBox(uint256 rarityNumber)
        internal
        view
        returns (Rarity rarity)
    {
        if (rarityNumber <= silverBox[0]) {
            rarity = Rarity.Common;
        } else if (rarityNumber <= silverBox[1]) {
            rarity = Rarity.Uncommon;
        } else if (rarityNumber <= silverBox[2]) {
            rarity = Rarity.Rare;
        } else {
            rarity = Rarity.Epic;
        }
    }

    function _generateRarityForGoldenBox(uint256 rarityNumber)
        internal
        view
        returns (Rarity rarity)
    {
        if (rarityNumber <= goldenBox[0]) {
            rarity = Rarity.Common;
        } else if (rarityNumber <= goldenBox[1]) {
            rarity = Rarity.Uncommon;
        } else if (rarityNumber <= goldenBox[2]) {
            rarity = Rarity.Rare;
        } else {
            rarity = Rarity.Epic;
        }
    }

    function _generateRarityForMinerBox(uint256 rarityNumber)
        internal
        view
        returns (Rarity rarity)
    {
        if (rarityNumber <= minerBox[0]) {
            rarity = Rarity.Common;
        } else {
            rarity = Rarity.Uncommon;
        }
    }

    function updateBoxPrice(Box _box, uint256 _price)
        external
        onlyRole(MODERATOR_ROLE)
    {
        boxPrice[_box] = _price;
    }

    function updateHeroUri(
        string memory _heroName,
        Rarity rarity,
        string memory _uri
    ) external onlyRole(MODERATOR_ROLE) {
        heroUri[_heroName][rarity] = _uri;
        emit UpdateHero(_heroName, _uri);
    }

    function addNewHero(
        Class _class,
        string memory _name,
        Rarity _rarity,
        string memory _uri
    ) external onlyRole(MODERATOR_ROLE) {
        string[] memory heros = classToHeros[_class];

        bool heroAlreadyAdded;
        for (uint256 i; i < heros.length; i++) {
            if (
                keccak256(abi.encodePacked(heros[i])) ==
                keccak256(abi.encodePacked(_name))
            ) {
                heroAlreadyAdded = true;
                break;
            }
        }

        if (heroAlreadyAdded) {
            heroUri[_name][_rarity] = _uri;
            emit UpdateHero(_name, _uri);
        } else {
            classToHeros[_class].push(_name);
            heroUri[_name][_rarity] = _uri;
            emit NewHero(_name, _class);
        }
    }

    function addToWhitelist(address _address)
        external
        onlyRole(MODERATOR_ROLE)
    {
        whitelist[_address] = true;
    }

    function generateRandom(uint256 _module) internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        msg.sender,
                        _module
                    )
                )
            );
    }

    function finishPrivateSale() external onlyRole(MODERATOR_ROLE) {
        privateSale = false;

        availableBoxes[Box.BronzenBox] += 2500;
        availableBoxes[Box.SilverBox] += 1500;
        availableBoxes[Box.GoldenBox] += 1000;
        availableBoxes[Box.MinerBox] += 2500;

        availableBoxes[Box.GreenBox] += 125;
        availableBoxes[Box.BlueBox] += 250;
        availableBoxes[Box.StarterPack] += 125;
    }
}
