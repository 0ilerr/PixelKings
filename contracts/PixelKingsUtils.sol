// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract PixelKingsUtils {
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

    mapping(string => mapping(Rarity => string)) public heroUri;
}
