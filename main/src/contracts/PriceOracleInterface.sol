pragma solidity >=0.5.0;


interface PriceOracleInterface {
    function getLatestppi() external returns (uint256);
}
