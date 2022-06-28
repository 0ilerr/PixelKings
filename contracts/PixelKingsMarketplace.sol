// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PixelKingsMarketplace is Ownable {
    enum Box {
        BronzenBox,
        SilverBox,
        GoldenBox,
        MinerBox,
        GreenBox,
        BlueBox
    }

    enum Class {
        Shooter,
        OneShoot,
        Tank,
        Explosive,
        Suport,
        Dragon,
        Miner
    }

    enum Rarity {
        CommonStarter,
        Common,
        Uncommon,
        Rare,
        Epic
    }

    event NewHero(string name, Class class);

    event UpdateHero(string name, string uri);

    mapping(Box => uint256) public boxValue;
    mapping(address => string) public userBox;
    mapping(Class => string[]) public classHero;
    mapping(string => string) public heroUri;

    address[] private witheList;
    mapping(address => uint8) private boxBuyed;
    bool private privateSale = true;
    uint8 private maxBuy = 6;

    uint256[4] private bronzenBox = [80, 98, 100, 0];
    uint256[4] private silverBox = [60, 92, 98, 100];
    uint256[4] private goldenBox = [30, 75, 95, 100];
    uint256[2] private minerBox = [90, 100];

    address private tokenAddress1;
    address private tokenAddress2;

    struct HeroS {
        string name;
        string uri;
        Class class;
        Rarity rarity;
    }

    //verificar
    modifier notOwnerOfBox(address _recipient) {
        require(msg.sender == _recipient, "Not allowed");
        _;
    }

    modifier dontHaveBox(address _recipient, string memory _box) {
        require(
            keccak256(bytes(userBox[_recipient])) == keccak256(bytes(_box)),
            "User not possess a Box"
        );
        _;
    }

    constructor(address _tokenAddress1, address _tokenAddress2) {
        tokenAddress1 = _tokenAddress1;
        tokenAddress2 = _tokenAddress2;
    }

    function buyBox(
        address _recipient,
        Box _box,
        uint256 _amount
    ) external notOwnerOfBox(_recipient) {
        //verificar
        require(_amount >= boxValue[_box], "Not enough amount");

        if (privateSale) {
            for (uint256 i; i <= witheList.length; i++) {
                if (witheList[i] == _recipient) {
                    address owner = owner();
                    ERC20(tokenAddress1).transferFrom(msg.sender, owner, _amount);
                    if (_box == Box.BronzenBox) {
                        userBox[_recipient] = "BronzenBox";
                    } else if (_box == Box.SilverBox) {
                        userBox[_recipient] = "SilverBox";
                    } else if (_box == Box.GoldenBox) {
                        userBox[_recipient] = "GoldenBox";
                    } else if (_box == Box.GreenBox) {
                        userBox[_recipient] = "GreenBox";
                    } else if (_box == Box.BlueBox) {
                        userBox[_recipient] = "BlueBox";
                    }
                }
            }
        } else if (!privateSale) {
            address owner = owner();
            ERC20(tokenAddress1).transferFrom(msg.sender, owner, _amount);
            if (_box == Box.BronzenBox) {
                userBox[_recipient] = "BronzenBox";
            } else if (_box == Box.SilverBox) {
                userBox[_recipient] = "SilverBox";
            } else if (_box == Box.GoldenBox) {
                userBox[_recipient] = "GoldenBox";
            } else if (_box == Box.GreenBox) {
                userBox[_recipient] = "GreenBox";
            } else if (_box == Box.BlueBox) {
                userBox[_recipient] = "BlueBox";
            }
        }
    }

    
    function openBronzenBox(
        address _recipient,
        Class _class,
        uint8 _module //verificar
    )
        external
        view
        dontHaveBox(_recipient, "BronzenBox")
        returns (HeroS memory hero)
    {
        require(_module > 0 && _module <= 100);

        string[] memory heros = classHero[_class];

        require(heros.length != 0);

        hero.class = _class;

        if (_module <= bronzenBox[0] && _module > 0) {
            hero.rarity = Rarity.Common;
        } else if (_module <= bronzenBox[1] && _module > bronzenBox[0]) {
            hero.rarity = Rarity.Uncommon;
        } else if (_module <= bronzenBox[2] && _module > bronzenBox[1]) {
            hero.rarity = Rarity.Rare;
        }

        uint heroName = uint(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, heros.length)
            )
        ) % heros.length;

        hero.name = heros[heroName];
        hero.uri = heroUri[hero.name];

        //TODO - MINT NEW NFT
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
        address _recipient,
        Class _class,
        string memory _module
    ) external payable {}

    function openBlueBox(
        address _recipient,
        Class _class,
        string memory _module
    ) external payable {}

    function updateBoxValue(Box _box, uint256 _value) external onlyOwner {
        boxValue[_box] = _value;
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

    function addUserToWhiteList(address _address) external onlyOwner {
        witheList.push(_address);
    }

    function finishprivateSale() external onlyOwner {
        privateSale = false;
    }
}
