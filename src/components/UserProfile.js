import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FetchUserProfile } from '../actions/profile';
import { connect, useDispatch, useSelector } from 'react-redux';
import { indexOf } from 'lodash';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {addFriend, removeFriend} from '../actions/friends';
// // class UserProfile extends Component {
function UserProfile(props) {
  // Here useEffect is doing the same work as somponentDidMount do
  const params = useParams();
  const dispatch = useDispatch();
  console.log("params ", params);
  // const success = null;
  // const error = null;
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  // props.dispatch(FetchUserProfile(params.userId));
  // useEffect(() => {
  //   this.state = {
  //     success: null,
  //     error: null,
  //   }
  // });

  useEffect(() => {
    if (params.userId) {
      props.dispatch(FetchUserProfile(params.userId));
    }
  }, [params.userId, dispatch])
  console.log("user component props", props);
  // const {profile} = props;
  // const {profile} = useSelector((state)=>{
  //   return state.profile;
  // })

  const { profile, auth } = props;
  const { user } = profile;
  console.log("params ", params);
  // const { success, error } = this.state;
  const { userId } = params;

  const checkIfUserIsAFriend = () => {
    console.log('this.props ', props);
    const {friends} = props;
    console.log('friends ', friends);

    const index = friends.map(friend => friend.userId).indexOf(userId);

    if (index !== -1) { return true; }

    return false;
  }

  const handleAddFriendClick = async () => {
    const url = APIUrls.addFriend(userId, auth.user.email);
    console.log('email ', auth);

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
      }
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if(data.success){
      setSuccess(null);
      setError(data.message);
      setSuccessMessage('Added friend successfully');
      // this.setState({
      //   // success : null,
      //   // error : data.message,
      //   success : setSuccess(null),
      //   error : setError(error.message),
      // });

      props.dispatch(addFriend(data.data.friendship));
    }else{
      // this.setState({
      //   success : null, 
      //   error : data.message,
      // });
      setSuccess(null);
      setError(data.message);
    }
  }

  const handleRemoveFriendClick = async () => {
    const { userId } = params;

    const url = APIUrls.removeFriend(userId);

    const extra = {
      method : 'POST', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
      },
    };

    const response = await fetch(url, extra);
    const data = await response.json();

    if(data.success){
      setSuccess(true);
      setSuccess('Remove friend successfully');
      props.dispatch(removeFriend(userId));
    }else{
      setSuccess(null);
      setError(data.message);
    }
  }

    if (profile.inProgress) {
      return (
        <h1>Loading!</h1>
      )
    }

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!checkIfUserIsAFriend() ?
            (<button className="button save-btn" onClick={handleAddFriendClick}>Add Friend</button>) :
            (<button className="button save-btn" onClick={handleRemoveFriendClick}>Remove Friend</button>)
          }

          {success && <div className='alert success-dailog'> {successMessage} </div>}
          {success && <div className='alert error-dailog'> {error} </div>}
        </div>
      </div>
    );
  }

const mapStateToProps = (state) => {
  return {
    auth : state.auth,
    profile: state.profile,
    friends: state.friends,
  }
}

export default connect(mapStateToProps)(UserProfile);

// import React, { Component } from 'react';

// class UserProfile extends Component {
//   // componentDidMount() {
//   //   const { match } = this.props;

//   //   if (match.params.userId) {
//   //     // dispatch an action
//   //   }
//   // }

//   render() {
//     // const {
//     //   match: { params },
//     // } = this.props;
//     // console.log('this.props', params);
//     console.log('super 2 ', this.props);
//     return (
//       <div className="settings">
//         <div className="img-container">
//           <img
//             src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
//             alt="user-dp"
//           />
//         </div>

//         <div className="field">
//           <div className="field-label">Name</div>
//           <div className="field-value">Some name</div>
//         </div>

//         <div className="field">
//           <div className="field-label">Email</div>
//           <div className="field-value">test@test.com</div>
//         </div>

//         <div className="btn-grp">
//           <button className="button save-btn">Add Friend</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default UserProfile;
