// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract HeroNft is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => string) public heroUri;

    constructor() ERC721("Hero", "HR") {}

    struct Hero {
        string name;
        Class class;
        Rarity rarity;
        uint8 level;
        uint8 season;
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

    Hero[] public heros;

    function _mintHero(address recipient, Hero memory hero)
        internal
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, heroUri[hero.name]);
        heros.push(hero);

        _tokenIds.increment();

        return newItemId;
    }
}