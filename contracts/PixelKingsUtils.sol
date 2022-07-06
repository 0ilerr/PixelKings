// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract PixelKingsUtils is AccessControl {
    enum Box {
        BronzenBox,
        SilverBox,
        GoldenBox,
        MinerBox,
        GreenBox,
        BlueBox,
        StarterPack
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

    struct Hero {
        string name;
        Class class;
        Rarity rarity;
        uint8 level;
        uint8 season;
    }

    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");
    bytes32 public constant MARKETPLACE_ROLE = keccak256("MARKETPLACE_ROLE");

    mapping(string => mapping(Rarity => string)) public heroUri;

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
}
