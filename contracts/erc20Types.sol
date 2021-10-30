// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20/ERC20.sol";
import "./ERC20/extensions/ERC20Burnable.sol";
import "./ERC20/access/Ownable.sol";

contract Token0 is ERC20 {
	constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _premint) ERC20(_name, _symbol, _decimals) {
		if(_premint > 0) { _mint(msg.sender, _premint); }
	}
}

contract Token1 is ERC20, ERC20Burnable {
	constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _premint) ERC20(_name, _symbol, _decimals) {
		if(_premint > 0) { _mint(msg.sender, _premint); }
	}
}

contract Token2 is ERC20, Ownable {
	constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _premint) ERC20(_name, _symbol, _decimals) {
		if(_premint > 0) { _mint(msg.sender, _premint); }
	}
	
	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}
}

contract Token3 is ERC20, ERC20Burnable, Ownable {
	constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _premint) ERC20(_name, _symbol, _decimals) {
	    if(_premint > 0) { _mint(msg.sender, _premint); }
	}
	
	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}
}
