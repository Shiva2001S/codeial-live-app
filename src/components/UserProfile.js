import React, { Component, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchUserProfile } from '../actions/profile';
import { connect, useDispatch, useSelector } from 'react-redux';
// // class UserProfile extends Component {
function UserProfile(props) {
  // Here useEffect is doing the same work as somponentDidMount do
  const params = useParams();
  const dispatch = useDispatch();
  console.log("params ", params);
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
  const { profile } = props;
  const { user } = profile;
  console.log("user ", user);


  // useEffect(() => {
  //   const { match } = props;

  //   if (match.params.userId) {
  //     // dispatch an action
  //   }
  // }, [props.match.params.userId]);

  // const {
  //   match: { params },
  // } = props;

  // console.log("super2 ", props);
  if(profile.inProgress){
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
        <button className="button save-btn">Add Friend</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
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
