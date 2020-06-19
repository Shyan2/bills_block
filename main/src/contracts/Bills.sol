pragma solidity >=0.5.0;

import "./Ownable.sol";
import "./PriceOracleInterface.sol";

contract Bills is Ownable {
    string public projectName;
    uint256 public billCount = 0;
    //ID maps to a bill (struct Bill) from the list of bills
    mapping(uint256 => Bill) public bills;

    //for oracle
    address public oracleAddress;
    PriceOracleInterface private oracleInstance;
    mapping(uint256 => bool) myRequests;
    uint256 private ppiPrice;

    struct Bill {
        uint256 id;
        string workSection;
        string component;
        string itemDescription;
        string unit;
        uint256 quantity;
        uint256 unitPrice;
        uint256 baseppi;
        uint256 ppi;
        address owner;
    }

    event BillCreated(
        uint256 id,
        string workSection,
        string component,
        string itemDescription,
        string unit,
        uint256 quantity,
        uint256 unitPrice,
        uint256 baseppi,
        uint256 ppi,
        address owner
    );

    event newOracleAddress(address oracleAddress);
    event ReceivedNewRequestIdEvent(uint256 id);
    event PriceUpdatedEvent(uint256 ppiValue, uint256 id);
    event SetQuantity(uint256 id, uint256 quantity);
    event SetUnitPrice(uint256 id, uint256 unitPrice);

    function createBill(
        string memory _workSection,
        string memory _component,
        string memory _itemDescription,
        string memory _unit,
        uint256 _baseppi,
        uint256 _ppi
    ) public {
        billCount++;
        uint256 _quantity = 1;
        uint256 _unitPrice = 1;

        bills[billCount] = Bill(
            billCount,
            _workSection,
            _component,
            _itemDescription,
            _unit,
            _quantity,
            _unitPrice,
            _baseppi,
            _ppi,
            msg.sender
        );

        emit BillCreated(
            billCount,
            _workSection,
            _component,
            _itemDescription,
            _unit,
            _quantity,
            _unitPrice,
            _baseppi,
            _ppi,
            msg.sender
        );
    }

    function setQuantity(uint256 _billId, uint256 _newQuantity) public {
        require(
            msg.sender == bills[_billId].owner,
            "Only the owner can set the quantity."
        );
        bills[_billId].quantity = _newQuantity;

        emit SetQuantity(_billId, _newQuantity);
    }

    function setUnitPrice(uint256 _billId, uint256 _newUnitPrice) public {
        // require(
        //     msg.sender == bills[_billId].owner,
        //     "Only the owner can set the unit price."
        // );
        bills[_billId].unitPrice = _newUnitPrice;

        emit SetUnitPrice(_billId, _newUnitPrice);
    }

    function setOracleInstanceAddress(address _oracleInstanceAddress) public {
        oracleAddress = _oracleInstanceAddress;
        oracleInstance = PriceOracleInterface(oracleAddress);
        emit newOracleAddress(oracleAddress);
    }

    function updateppiPrice() public {
        uint256 id = oracleInstance.getLatestppi();
        myRequests[id] = true;
        emit ReceivedNewRequestIdEvent(id);
    }

    function callBack(uint256 _ppiPrice, uint256 _id) public onlyOracle {
        require(myRequests[_id], "This request is not in my pending list.");
        ppiPrice = _ppiPrice;
        delete myRequests[_id];
        emit PriceUpdatedEvent(_ppiPrice, _id);
    }

    modifier onlyOracle() {
        require(
            msg.sender == oracleAddress,
            "You are not authorized to call this function."
        );
        _;
    }
}
