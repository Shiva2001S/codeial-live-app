import React from "react";
import  FriendsListItem  from './FriendsListItem';

const FriendsList = (props) => {
    console.log("friendList prop ", props);
    return (
        <div className="friends-list">
            <div className="header">Friends</div>

            {props.friends && props.friends.length === 0 && (
                <div className="no-friends">No friends found!</div>
            )}

            {props.friends && props.friends.map((friend)=>(
                <FriendsListItem friend={friend} key={friend.userId} />
            ))}
        </div>
    )
}

export default FriendsList;
