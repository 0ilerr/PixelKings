// SPDX-License-Identifier: MIT

pragma solidity =0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract PixelKingsMint is ERC1155 {
    uint public constant bronzeBox = 0; // Box and ID Number
    uint public constant silverBox = 1;
    uint public constant goldenBox = 2;
    uint public constant blueBox = 3;
    uint public constant greenBox = 4;
    uint public constant starterBox = 5;

    address owner;

    constructor() ERC1155("https://URI.com/{id}") {
        owner = msg.sender;
        _mint(msg.sender, bronzeBox, 6, ""); // Msg.sender and quantity of boxes
        _mint(msg.sender, silverBox, 6, "");
        _mint(msg.sender, goldenBox, 6, "");
        _mint(msg.sender, blueBox, 6, "");
        _mint(msg.sender, greenBox, 6, "");
        _mint(msg.sender, starterBox, 1, "");
    }

    struct Shooter {
        string archer;
        string frostArcher;
        string doubleArrows;
        string tripleArrows;
        string sniperArcher;
        string geminiArcher;
        string bomerangMan;
        string bomberArcher;
        string randomBomberArcher;
        string launcherArcher;
        string theMadArcher;
        string frozenBomber;
    }

    struct OneShoot {
        string blackWolf;
        string redWolf;
    }

    struct Tank {
        string soldier;
        string goldenSoldier;
        string steelCrog;
        string goldenCrog;
    }

    struct Explosive {
        string bomberman;
        string tntTactician;
        string magnusWizard;
    }

    struct Miner {
        string noviceMiner;
        string masterMiner;
    }

    struct Support {
        string fireGolem;
        string lanternWizard;
        string magneticWizard;
        string windcallerWizard;
        string magicShield;
        string toxicWizard;
        string spiderShield;
    }

    struct Dragon {
        string seaDragon;
        string dragonAmbusher;
    } 

    modifier onlyOwner {
      require(msg.sender == owner);
      _;

    function mintMore(...) public onlyOwner { // if owner of contract wants to mint more NFTs later
        _mint(...)
    }
    
}
    /* Create Box ID 7 boxes (
    STARTER BOXES (BLUE + GREEN)
    BRONZE BOX,
    SILVER BOX,
    GOLDEN BOX,
    MINER BOX,
    BLUE BOX,
    GREEN BOX */

    /* Create 7 classes (
        Shooter, 
        One Shoot, 
        Tank, 
        Explosive, 
        Miner, 
        Support, 
        Dragon */

    // Create 32 characters with attributes and rarity
    // Add reveal function
    // Max Box per wallet: 6
