pragma solidity >=0.5.0;

import "./Ownable.sol";
import "./CallerInterface.sol";


//The oracle is responsible to retrieve the PPI value from the public API
//It just needs to know which one to retrieve
//Inputs required (based on the work section (or component??))
//For now: Concrete ingredients and related products and Architectural, engineering and related services
//https://www.bls.gov/regions/mid-atlantic/data/producerpriceindexengineering_us_table.htm
//https://www.bls.gov/regions/mid-atlantic/data/producerpriceindexconcrete_us_table.htm

//Get and set functions. For now only get one value
//address: 0xC85E4ac66c1978C8793705F3ED0716C009DA6ACD

contract BillsOracle is Ownable {
    uint256 private randNonce = 0;
    uint256 private modulus = 1000;
    mapping(uint256 => bool) pendingRequests;

    event SetLatestppi(uint256 ppi, address callerAddress);
    event GetLatestppi(address callerAddress, uint256 id);

    function getLatestppi() public returns (uint256) {
        randNonce++;
        uint256 id = uint256(
            keccak256(abi.encodePacked(now, msg.sender, randNonce))
        ) % modulus;
        pendingRequests[id] = true;
        emit GetLatestppi(msg.sender, id);
        return id;
    }

    function setLatestppi(
        uint256 _ppi,
        address _callerAddress,
        uint256 _id
    ) public onlyOwner {
        require(pendingRequests[_id], "This request is not in my pending list");
        delete pendingRequests[_id];
        CallerInterface callerInstance;
        callerInstance = CallerInterface(_callerAddress);
        callerInstance.callBack(_ppi, _id);
        emit SetLatestppi(_ppi, _callerAddress);
    }
}
