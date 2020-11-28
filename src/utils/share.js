import { Share } from 'react-native';

const share = async (title, link) => {
  const message = title && link ? `${title}\n${link}` : 'Share with';

  try {
    const result = await Share.share({
      message: title && link ? `${title}` : 'Share with',
      url: link,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
        console.log(`shared with activity type of ${result.activityType}`);
      } else {
        // shared
        console.log('shared');
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
      console.log('dismissed');
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default share;
