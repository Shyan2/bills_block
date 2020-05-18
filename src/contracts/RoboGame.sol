pragma solidity ^0.5.0;


contract RoboGame {
    string public name;
    uint256 public robotCount = 0;

    mapping(uint256 => Robot) public robots;

    struct Robot {
        uint256 robotID;
        string name;
        uint256 robotdna;
        uint256 level;
        address payable owner;
    }

    event RobotCreated(
        uint256 robotID,
        string name,
        uint256 robotdna,
        uint256 level,
        address payable owner
    );

    event LevelUp(
        uint256 robotID,
        string name,
        uint256 robotdna,
        uint256 level,
        address payable owner
    );

    constructor() public {
        name = "Robot game!";
    }

    function _createDna(string memory _str) private pure returns (uint256) {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % 10**16;
    }

    function createRobot(string memory _name) public {
        require(bytes(_name).length > 0, "Please enter a name!");
        uint256 _robotdna = _createDna(_name);
        robotCount++;
        robots[robotCount] = Robot(robotCount, _name, _robotdna, 0, msg.sender);
        emit RobotCreated(robotCount, _name, _robotdna, 0, msg.sender);
    }

    function levelRobot(uint256 _robotID) public payable {
        require(_robotID > 0 && _robotID <= robotCount, "Invalid ID");
        Robot memory _robot = robots[_robotID];
        address payable _owner = _robot.owner;
        address(_owner).transfer(msg.value);
        _robot.level = _robot.level + msg.value;
        robots[_robotID] = _robot;

        emit LevelUp(
            robotCount,
            _robot.name,
            _robot.robotdna,
            _robot.level,
            _owner
        );
    }
}
