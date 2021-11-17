// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20_Mint is ERC20, Ownable {
	uint8 private decimals2;

	constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _premint) ERC20(_name, _symbol) {
		decimals2 = _decimals;
		if(_premint > 0) { _mint(msg.sender, _premint); }
	}
	
	function decimals() public view override returns (uint8) {
        return decimals2;
    }

	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}
}