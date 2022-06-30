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
        BlueBox
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

    uint256[2] private bronzenBox = [80, 98];
    uint256[3] private silverBox = [60, 92, 98];
    uint256[3] private goldenBox = [30, 75, 95];
    uint256[1] private minerBox = [90];

    address public tokenAddress;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;

        boxPrice[Box.BronzenBox] = 10;
        boxPrice[Box.SilverBox] = 20;
        boxPrice[Box.GoldenBox] = 30;
        boxPrice[Box.MinerBox] = 35;
        boxPrice[Box.GreenBox] = 40;
        boxPrice[Box.BlueBox] = 50;
    }

    function buyBox(
        Box _box,
        Class _class,
        uint8 _module
    ) external {
        address sender = _msgSender();
        
        require(!privateSale || whitelist[sender], "Open sale has not started");
        require(boxesBuyed[sender] < maxBuy, "Reached max buy");

        // if (privateSale) {
        //     if (!whitelist[sender]) {
        //         revert("Open sale has not started");
        //     }
        // }

        ERC20(tokenAddress).transferFrom(sender, owner(), boxPrice[_box]);
        Hero memory hero = _openBox(_box, _class, _module);
        uint id = _mintHero(sender, hero);

        boxesBuyed[sender]++;
        emit NewHeroNft(id, sender);
    }

    function _openBox(
        Box _box,
        Class _class,
        uint8 _module
    ) internal view returns (Hero memory hero) {
        if (_box == Box.BronzenBox) {
            return openBronzenBox(_class, _module);
        }
    }

    function openBronzenBox(Class _class, uint8 _module)
        internal
        view
        returns (Hero memory hero)
    {
        require(_module > 0 && _module <= 100);

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

    function openSilverBox(
        address _recipient,
        Class _class,
        string memory _module
    ) external payable {}

    function openGoldenBox(
        address _recipient,
        Class _class,
        string memory _module
    ) external payable {}

    function openGreenBox(
        address _recipient857,
        Class _class,
        string memory _module
    ) external payable {}

    function openBlueBox(
        address _recipient,
        Class _class,
        string memory _module
    ) external payable {}

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
        string memory _hero,
        string memory _uri
    ) external onlyOwner {
        string[] storage heros = classHero[_class];
        heros.push(_hero);
        heroUri[_hero] = _uri;
        classHero[_class] = heros;

        emit NewHero(_hero, _class);
    }

    function addToWhitelist(address _address) external onlyOwner {
        whitelist[_address] = true;
    }

    // TODO: Should we add removeFromWhiteList ??

    function finishprivateSale() external onlyOwner {
        privateSale = false;
    }
}
