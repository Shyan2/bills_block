pragma solidity ^0.5.0;


contract Bills {
    string public projectName;
    uint256 public billCount;
    mapping(uint256 => Bill) public bills;

    struct Bill {
        uint256 id;
        string workSection;
        string component;
        string itemDescription;
        string unit;
        uint256 quantity;
        uint256 rate;
        uint256 total;
    }

    event billCreated(
        uint256 id,
        string workSection,
        string component,
        string itemDescription,
        string unit,
        uint256 quantity,
        uint256 rate,
        uint256 total
    );

    function createBill(
        string memory _workSection,
        string memory _component,
        string memory _itemDescription
    ) public {
        billCount++;
        //temp
        string memory _unit = "";
        uint256 _quantity = 0;
        uint256 _rate = 0;
        uint256 _total = _quantity * _rate;

        bills[billCount] = Bill(
            billCount,
            _workSection,
            _component,
            _itemDescription,
            _unit,
            _quantity,
            _rate,
            _total
        );
    }
}
