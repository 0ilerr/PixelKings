//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title A Dai Token
/// @author Euler Giachini, Kevin Kons
/// @notice You can use this contract to mint new tokens to a user 
/// @dev All function calls are currently implemented without side effects
contract BusdMock is ERC20 {
    constructor() ERC20("BusdMock", "BUSD") {
    }

    function mint(uint256 _value) external {
        _mint(msg.sender, _value);
    }
}
