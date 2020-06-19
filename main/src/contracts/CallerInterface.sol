//Interface for the Oracle
//aim of the caller interface is for the callback, which is the price update event function
//Will include the functions without the body

pragma solidity >=0.5.0;

interface CallerInterface {
    function callBack(uint256 _ppi, uint256 id) external;
}
