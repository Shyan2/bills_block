pragma solidity ^0.5.0;


contract Bills {
    //Need 3 function, add, change, and remove
    string public name;
    uint256 public billCount = 0;
    mapping(uint256 => Bill) public bills;

    struct Bill {
        uint256 id;
        string itemName;
        string description;
    }

    event BillAdded(uint256 id, string itemName, string description);

    constructor() public {
        name = "Bill of quantities";
    }

    function addBill(string memory _itemName, string memory _description)
        public
    {
        billCount++;
        //uint256 id = bills.push(Bill(_itemName, _description)) - 1;
        //posts[postCount] = Post(postCount, _content, 0, msg.sender);
        bills[billCount] = Bill(billCount, _itemName, _description);
        emit BillAdded(billCount, _itemName, _description);
    }
}
