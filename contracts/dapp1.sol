// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;

contract dapp1 {
  // timestamp, wallet address of sx and rx, funds
  uint public count = 0; // state variable

  function increamentCount() public {
    ++count;
  }
}
