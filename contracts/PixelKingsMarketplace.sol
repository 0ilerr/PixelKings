// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./HeroNft.sol";

contract PixelKingsMarketplace is HeroNft {
    enum Box {
        BronzenBox,
        SilverBox,
        GoldenBox,
        MinerBox,
        GreenBox,
        BlueBox,
        StarterPack
    }

    event NewHero(string name, Class class);
    event UpdateHero(string name, string uri);
    event NewHeroNft(uint id, address owner);

    mapping(Box => uint) public boxPrice;
    mapping(address => string) public userBox;
    mapping(Class => string[]) public classHero;

    mapping(address => bool) private whitelist;
    mapping(address => uint8) private boxesBuyed;
    bool private privateSale = true;
    uint8 private maxBuy = 6;

    uint[2] private bronzenBox = [80, 98];
    uint[3] private silverBox = [60, 92, 98];
    uint[3] private goldenBox = [30, 75, 95];
    uint[1] private minerBox = [90];

    address public tokenAddress;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;

        boxPrice[Box.BronzenBox] = 30;
        boxPrice[Box.SilverBox] = 50;
        boxPrice[Box.GoldenBox] = 100;
        boxPrice[Box.MinerBox] = 100;
        boxPrice[Box.GreenBox] = 20;
        boxPrice[Box.BlueBox] = 20;
        boxPrice[Box.StarterPack] = 50;
    }

    modifier isModuleCorrect(uint8 _module) {
        require(
            _module > 0 && _module <= 100,
            "Module must be between 0 and 100"
        );
        _;
    }

    function buyBox(
        Box _box,
        Class _class,
        uint8 _module
    ) external isModuleCorrect(_module) {
        address sender = _msgSender();

        require(!privateSale || whitelist[sender], "Open sale has not started");
        require(boxesBuyed[sender] < maxBuy, "Reached max buy");

        ERC20(tokenAddress).transferFrom(sender, owner(), boxPrice[_box]);
        Hero memory hero = _openBox(_box, _class, _module);
        uint id = _mintHero(sender, hero);

        boxesBuyed[sender]++;
        emit NewHeroNft(id, sender);
    }

    function buyStarterPack(Class _class1, Class _class2) external {
        address sender = _msgSender();

        require(!privateSale || whitelist[sender], "Open sale has not started");
        require(boxesBuyed[sender] < maxBuy, "Reached max buy");

        ERC20(tokenAddress).transferFrom(
            sender,
            owner(),
            boxPrice[Box.StarterPack]
        );
        Hero memory hero1 = _openBlueBox(_class1);
        uint256 id = _mintHero(sender, hero1);
        emit NewHeroNft(id, sender);

        Hero memory hero2 = _openBlueBox(_class2);
        uint256 id2 = _mintHero(sender, hero2);
        emit NewHeroNft(id2, sender);

        Hero memory hero3 = _openGreenBox();
        uint256 id3 = _mintHero(sender, hero3);
        emit NewHeroNft(id3, sender);

        boxesBuyed[sender]++;
    }

    function _openBox(
        Box _box,
        Class _class,
        uint8 _module
    ) internal view returns (Hero memory hero) {
        if (_box == Box.BronzenBox) {
            return _openBronzenBox(_class, _module);
        } else if (_box == Box.SilverBox) {
            return _openSilverBox(_class, _module);
        } else if (_box == Box.GoldenBox) {
            return _openGoldenBox(_class, _module);
        } else if (_box == Box.MinerBox) {
            return _openMinerBox(_module);
        } else if (_box == Box.BlueBox) {
            return _openBlueBox(_class);
        } else if (_box == Box.GreenBox) {
            return _openGreenBox();
        }
    }

    function _openBronzenBox(Class _class, uint8 _module)
        internal
        view
        returns (Hero memory hero)
    {
        hero.class = _class;

        string[] memory heros = classHero[_class];
        require(heros.length != 0);

        if (_module <= bronzenBox[0]) {
            hero.rarity = Rarity.Common;
        } else if (_module <= bronzenBox[1]) {
            hero.rarity = Rarity.Uncommon;
        } else {
            hero.rarity = Rarity.Rare;
        }

        uint256 heroNumber = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, heros.length)
            )
        ) % heros.length;

        hero.name = heros[heroNumber];
    }

    function _openSilverBox(Class _class, uint8 _module)
        internal
        view
        returns (Hero memory hero)
    {
        hero.class = _class;

        string[] memory heros = classHero[_class];
        require(heros.length != 0);

        if (_module <= silverBox[0]) {
            hero.rarity = Rarity.Common;
        } else if (_module <= silverBox[1]) {
            hero.rarity = Rarity.Uncommon;
        } else if (_module <= silverBox[2]) {
            hero.rarity = Rarity.Rare;
        } else {
            hero.rarity = Rarity.Epic;
        }

        uint256 heroNumber = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, heros.length)
            )
        ) % heros.length;

        hero.name = heros[heroNumber];
    }

    function _openGoldenBox(Class _class, uint8 _module)
        internal
        view
        returns (Hero memory hero)
    {
        hero.class = _class;

        string[] memory heros = classHero[_class];
        require(heros.length != 0);

        if (_module <= goldenBox[0]) {
            hero.rarity = Rarity.Common;
        } else if (_module <= goldenBox[1]) {
            hero.rarity = Rarity.Uncommon;
        } else if (_module <= goldenBox[2]) {
            hero.rarity = Rarity.Rare;
        } else {
            hero.rarity = Rarity.Epic;
        }

        uint256 heroNumber = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, heros.length)
            )
        ) % heros.length;

        hero.name = heros[heroNumber];
    }

    function _openMinerBox(uint8 _module)
        internal
        view
        returns (Hero memory hero)
    {
        hero.class = Class.Miner;

        string[] memory heros = classHero[Class.Miner];
        require(heros.length != 0);

        if (_module <= minerBox[0]) {
            hero.rarity = Rarity.Common;
        } else {
            hero.rarity = Rarity.Uncommon;
        }

        uint256 heroNumber = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, heros.length)
            )
        ) % heros.length;

        hero.name = heros[heroNumber];
    }

    function _openBlueBox(Class _class)
        internal
        view
        returns (Hero memory hero)
    {
        hero.class = _class;

        string[] memory heros = classHero[_class];
        require(heros.length != 0);

        hero.rarity = Rarity.CommonStarter;

        uint256 heroNumber = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, heros.length)
            )
        ) % heros.length;

        hero.name = heros[heroNumber];
    }

    function _openGreenBox() internal view returns (Hero memory hero) {
        hero.class = Class.Miner;

        string[] memory heros = classHero[Class.Miner];
        require(heros.length != 0);

        hero.rarity = Rarity.CommonStarter;

        uint256 heroNumber = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, heros.length)
            )
        ) % heros.length;

        hero.name = heros[heroNumber];
    }

    function updateBoxPrice(Box _box, uint256 _price) external onlyOwner {
        boxPrice[_box] = _price;
    }

    function updateHeroUri(string memory _hero, string memory _uri)
        external
        onlyOwner
    {
        heroUri[_hero] = _uri;
        emit UpdateHero(_hero, _uri);
    }

    function addNewHero(
        Class _class,
        string memory _name,
        string memory _uri
    ) external onlyOwner {
        string[] storage heros = classHero[_class];
        heros.push(_name);
        heroUri[_name] = _uri;
        classHero[_class] = heros;

        emit NewHero(_name, _class);
    }

    function addToWhitelist(address _address) external onlyOwner {
        whitelist[_address] = true;
    }

    // TODO: Should we add removeFromWhiteList ??

    function finishprivateSale() external onlyOwner {
        privateSale = false;
    }
}
