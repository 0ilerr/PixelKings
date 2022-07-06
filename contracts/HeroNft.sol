// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./PixelKingsUtils.sol";

contract HeroNft is ERC721URIStorage, PixelKingsUtils {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(address _owner) ERC721("Hero", "HR") {
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
        _grantRole(MODERATOR_ROLE, _msgSender());
    }

    Hero[] public heros;

    function mintHero(address recipient, Hero memory hero)
        public
        onlyRole(MARKETPLACE_ROLE)
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, heroUri[hero.name][hero.rarity]);
        heros.push(hero);

        _tokenIds.increment();

        return newItemId;
    }


    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setMarketplace(address marketplace)
        external
        onlyRole(MODERATOR_ROLE)
        zeroAddressNotAllowed(marketplace)
    {
        _grantRole(MARKETPLACE_ROLE, marketplace);
    }
}
