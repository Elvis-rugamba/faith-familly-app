import React from 'react';
import { Share } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import theme from '../../constants/theme';

const ShareButton = ({ route }) => {
  const { title, link } = route.params;
  const message = title || link ? `${title}\n\n${link}` : 'Abba Gospel';
  const options = { message };

  const onShare = async () => {
    try {
      const result = await Share.share(options);
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

  return (
    <MaterialCommunityIcons
      name="share-variant"
      color="#fff"
      size={theme.SIZES.NAVBAR_ICON_SIZE * 1.25}
      onPress={() => onShare()}
    />
  );
};

export default ShareButton;
