import { useMemo } from 'react';
import styles from './ProfileCard.module.css';
const ProfileCard = () => {
  // const user = localStorage.getItem('user')
  //   ? JSON.parse(localStorage.getItem('user'))
  //   : null;

  // <ProfileCard
  //           imageDescription="/useravatar1@2x.png"
  //           profileCardPosition="absolute"
  //           profileCardTop="calc(50% - 32px)"
  //           profileCardLeft="calc(50% - 27px)"
  //         />

  const user = {
    name: 'Ludi',
    email: 'ludi@gmail.com',
    pic: '/profilePhoto.png',
  };

  // const profileCardStyle = useMemo(() => {
  //   return {
  //     position: profileCardPosition,
  //     top: profileCardTop,
  //     left: profileCardLeft,
  //   };
  // }, [profileCardPosition, profileCardTop, profileCardLeft]);

  const profileCardPosition = 'absolute';
  const profileCardTop = 'calc(50% - 32px)';
  const profileCardLeft = 'calc(50% - 27px)';

  const profileCardStyle = useMemo(() => {
    return {
      position: profileCardPosition,
      top: profileCardTop,
      left: profileCardLeft,
    };
  }, [profileCardPosition, profileCardTop, profileCardLeft]);

  return (
    <div className={styles.profileCard} style={profileCardStyle}>
      <div className={styles.maxwell}>{user.name}</div>
      <img className={styles.userAvatarIcon} src={user.pic} alt={user.name} />
    </div>
  );
};

export default ProfileCard;
