// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./PixelKingsUtils.sol";

contract HeroNft is ERC721URIStorage, AccessControl, PixelKingsUtils {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");
    bytes32 public constant MARKETPLACE_ROLE = keccak256("MARKETPLACE_ROLE");

    constructor(address moderator) ERC721("Hero", "HR") {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(MODERATOR_ROLE, moderator);
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

    modifier zeroAddressNotAllowed(address addr) {
        require(addr != address(0), "ZERO Addr is not allowed");
        _;
    }

    function setAdminRole(address admin)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        zeroAddressNotAllowed(admin)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _revokeRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function setModerator(address moderator)
        external
        onlyRole(MODERATOR_ROLE)
        zeroAddressNotAllowed(moderator)
    {
        _grantRole(MARKETPLACE_ROLE, moderator);
    }

    function setMarketplace(address marketplace)
        external
        onlyRole(MODERATOR_ROLE)
        zeroAddressNotAllowed(marketplace)
    {
        _grantRole(MARKETPLACE_ROLE, marketplace);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
