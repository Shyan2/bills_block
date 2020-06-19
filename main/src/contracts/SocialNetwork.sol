pragma solidity >=0.5.0;


contract SocialNetwork {
    //public gives us the getter function
    string public name;
    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    struct Post {
        uint256 id;
        string content;
        uint256 tipAmount;
        address payable author;
    }

    event PostCreated(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    event PostTipped(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    constructor() public {
        name = "Dapp University Social Network";
    }

    //underscore is local variable, not state variable
    function createPost(string memory _content) public {
        //Require valid content
        require(bytes(_content).length > 0);
        //Increment the post count
        postCount++;
        //Create the post
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        //Trigger event
        emit PostCreated(postCount, _content, 0, msg.sender);
    }

    function tipPost(uint256 _id) public payable {
        //Make sure the id is valid
        require(_id > 0 && _id <= postCount);
        //Fetch the post
        Post memory _post = posts[_id]; //creates a new copy, will not affect until reassigned
        //Fetch the author
        address payable _author = _post.author;
        //Pay the author by sending them Ether
        _author.transfer(msg.value);
        //Increment the tip amount
        //1 Ether === 1000000000000000000 (18 0s)
        _post.tipAmount = _post.tipAmount + msg.value;
        //Update the post (reassigned here)
        posts[_id] = _post;
        //Trigger an event
        emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
    }
}
