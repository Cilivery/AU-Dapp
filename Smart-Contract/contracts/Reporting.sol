// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialMediaModeration {
    struct Post {
        uint256 likes;
        uint256 dislikes;
        uint256 reports;
        address owner;
        bool isUnsafe;
    }

    struct User {
        uint256 totalLikes;
        uint256 totalDislikes;
        uint256 totalReports;
        uint256 totalPosts;
        bool isBanned;
    }

    mapping(uint256 => Post) public posts;
    mapping(address => User) public users;

    uint256 public postCount;
    uint256 public constant REPORT_THRESHOLD = 5;
    uint256 public constant UCR_THRESHOLD = 50; // User Credibility Rating threshold
    uint256 public constant TOTAL_USERS = 1000; // Example total users (dynamic scaling possible)

    event PostReported(uint256 postId, address reporter);
    event PostMarkedUnsafe(uint256 postId);
    event UserBanned(address user);

    modifier onlyPostOwner(uint256 postId) {
        require(posts[postId].owner == msg.sender, "Not the post owner.");
        _;
    }

    modifier onlyValidPost(uint256 postId) {
        require(posts[postId].owner != address(0), "Post does not exist.");
        _;
    }

    function createPost() external {
        postCount++;
        posts[postCount] = Post({
            likes: 0,
            dislikes: 0,
            reports: 0,
            owner: msg.sender,
            isUnsafe: false
        });

        users[msg.sender].totalPosts++;
    }

    function likePost(uint256 postId) external onlyValidPost(postId) {
        posts[postId].likes++;
        users[posts[postId].owner].totalLikes++;
    }

    function dislikePost(uint256 postId) external onlyValidPost(postId) {
        posts[postId].dislikes++;
        users[posts[postId].owner].totalDislikes++;
    }

    function reportPost(uint256 postId) external onlyValidPost(postId) {
        Post storage post = posts[postId];
        User storage postOwner = users[post.owner];

        post.reports++;
        postOwner.totalReports++;

        emit PostReported(postId, msg.sender);

        uint256 totalInteractions = post.likes + post.dislikes;
        uint256 ucr = calculateUCR(post.owner);

        if (
            post.dislikes > (totalInteractions / 2) && // More than 50% dislikes
            post.reports > REPORT_THRESHOLD &&
            ucr < UCR_THRESHOLD
        ) {
            post.isUnsafe = true;
            emit PostMarkedUnsafe(postId);
        }
    }

    function calculateUCR(address userAddress) public view returns (uint256) {
        User storage user = users[userAddress];

        if (user.totalPosts <= 1) {
            return 100; // Default UCR for new users
        }

        uint256 totalImpressions = user.totalLikes + user.totalDislikes;

        if (totalImpressions == 0) {
            return 100; // No activity yet, max UCR
        }

        return (user.totalLikes * 100) / totalImpressions;
    }

    function banUser(address userAddress) external {
        User storage user = users[userAddress];
        uint256 ucr = calculateUCR(userAddress);

        if (user.totalReports > REPORT_THRESHOLD && ucr < UCR_THRESHOLD) {
            user.isBanned = true;
            emit UserBanned(userAddress);
        }
    }

    function getPostDetails(uint256 postId)
        external
        view
        returns (
            uint256 likes,
            uint256 dislikes,
            uint256 reports,
            address owner,
            bool isUnsafe
        )
    {
        Post storage post = posts[postId];
        return (
            post.likes,
            post.dislikes,
            post.reports,
            post.owner,
            post.isUnsafe
        );
    }

    function getUserDetails(address userAddress)
        external
        view
        returns (
            uint256 totalLikes,
            uint256 totalDislikes,
            uint256 totalReports,
            uint256 totalPosts,
            bool isBanned
        )
    {
        User storage user = users[userAddress];
        return (
            user.totalLikes,
            user.totalDislikes,
            user.totalReports,
            user.totalPosts,
            user.isBanned
        );
    }
}