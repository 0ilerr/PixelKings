// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Hero is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Hero", "HR") {}

    struct HeroInfo {
        string name;
        uint8 class;
        uint8 rarity;
    }

    HeroInfo[] public herosInfo;

    function mintHero(address recipient, string memory tokenURI, string calldata name, uint8 class, uint8 rarity)
        internal
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        herosInfo.push(HeroInfo(name, class, rarity));

        return newItemId;
    }
}