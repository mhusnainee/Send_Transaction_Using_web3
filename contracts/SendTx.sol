//SPDX-License-Identifier:GPL-3.0

pragma solidity >= 0.7.0 <0.9.0;

contract SendTx
{
    uint public number;

    /**
    * @dev set function is used to set the value of number.
    * @param _num - Will be assigned to variable number.
    */
    function set(uint _num) public{
        number = _num;
    }

    /**
     * @dev get function is used to get the value of number.
     */
    function get() public view returns(uint)
    {
        return number;
    }
}