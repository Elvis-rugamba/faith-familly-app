import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
  TouchableHighlight,
  Slider,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';

import { Block, Text, Divider, TvCard } from '../../components';

import theme from '../../constants/theme';
import { getRadios } from '../../store/modules/radio/actions';
import {
  selectRadios,
  selectCategories,
  selectIsLoadingRadios,
  selectIsLoadingCategories,
  selectErrorMessage,
} from '../../store/modules/radio/selectors';
import i18n from '../../utils/i18n';

const { height, width } = Dimensions.get('window');
const VIDEO_CONTAINER_HEIGHT = height / 2.5;

const RadioScreen = ({ navigation }) => {
  let isSeeking = false;
  let shouldPlayAtEndOfSeek = false;
  let playbackInstance = null;
  let video;
  const dispatch = useDispatch();
  const radios = useSelector((state) => selectRadios(state));
  const categories = useSelector((state) => selectCategories(state));
  const isLoadingRadios = useSelector((state) => selectIsLoadingRadios(state));
  const isLoadingCategories = useSelector((state) =>
    selectIsLoadingCategories(state),
  );
  const errorMessage = useSelector((state) => selectErrorMessage(state));
  const [muted, setmuted] = useState(false);
  const [playbackInstancePosition, setplaybackInstancePosition] = useState(
    null,
  );
  const [playbackInstanceDuration, setplaybackInstanceDuration] = useState(
    null,
  );
  const [shouldPlay, setshouldPlay] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const [isBuffering, setisBuffering] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [fullscreen, setfullscreen] = useState(false);
  const [shouldCorrectPitch, setshouldCorrectPitch] = useState(true);
  const [rate, setrate] = useState(1.0);
  const [useNativeControls, setuseNativeControls] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoWidth, setvideoWidth] = useState(width);
  const [videoHeight, setvideoHeight] = useState(VIDEO_CONTAINER_HEIGHT);
  const [buttonTitle, setButtonTitle] = useState('Download');
  const [progressValue, setProgressValue] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    dispatch(getRadios());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getRadios());
  };

  const loadNewPlaybackInstance = async (playing) => {
    try {
      if (playbackInstance !== null) {
        await playbackInstance.unloadAsync();
        playbackInstance.setOnPlaybackStatusUpdate(null);
        playbackInstance = null;
      }

      const source = { uri: videoUrl };
      const initialStatus = {
        shouldPlay: playing,
        rate: rate,
        shouldCorrectPitch: shouldCorrectPitch,
        // volume: volume,
        isMuted: muted,
        // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
        // androidImplementation: 'MediaPlayer',
      };
      await video.loadAsync(source, initialStatus);
      video.onPlaybackStatusUpdate(onPlaybackStatusUpdate);
      playbackInstance = video;
      const status = await video.getStatusAsync();

      updateScreenForLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const mountVideo = (component) => {
    video = component;
    loadNewPlaybackInstance(false);
  };

  const updateScreenForLoading = (loading) => {
    if (loading) {
      setisPlaying(false);
      setplaybackInstanceDuration(null);
      setplaybackInstancePosition(null);
      setisLoading(true);
    } else {
      setisLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setplaybackInstancePosition(status.positionMillis);
      setplaybackInstanceDuration(status.durationMillis);
      setshouldPlay(status.shouldPlay);
      setisPlaying(status.isPlaying);
      setisBuffering(status.isBuffering);
      setrate(status.rate);
      setmuted(status.isMuted);
      // setvolume(status.volume);
      setshouldCorrectPitch(status.shouldCorrectPitch);
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  const onLoad = (status) => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  const onError = (error) => {
    console.log(`ON ERROR : ${error}`);
  };

  const onReadyForDisplay = (event) => {
    const widestHeight =
      (width * event.naturalSize.height) / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      setvideoWidth(
        (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
          event.naturalSize.height,
      );
      setvideoHeight(VIDEO_CONTAINER_HEIGHT);
    } else {
      setvideoWidth(width);
      setvideoHeight(
        (width * event.naturalSize.height) / event.naturalSize.width,
      );
    }
  };

  const onFullscreenUpdate = (event) => {
    console.log(
      `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`,
    );
  };

  const onPlayPausePressed = async () => {
    console.log('Play pressed');
    if (playbackInstance !== null) {
      if (isPlaying) {
        await playbackInstance.pauseAsync();
      } else {
        await playbackInstance.playAsync();
      }
    }
  };

  const onSeekSliderValueChange = (value) => {
    if (playbackInstance !== null && !isSeeking) {
      isSeeking = true;
      shouldPlayAtEndOfSeek = shouldPlay;
      playbackInstance.pauseAsync();
    }
  };

  const onSeekSliderSlidingComplete = async (value) => {
    if (playbackInstance !== null) {
      isSeeking = false;
      const seekPosition = value * playbackInstanceDuration;
      if (shouldPlayAtEndOfSeek) {
        playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  const getSeekSliderPosition = () => {
    if (
      playbackInstance !== null &&
      playbackInstancePosition !== null &&
      playbackInstanceDuration !== null
    ) {
      return playbackInstancePosition / playbackInstanceDuration;
    }

    return 0;
  };

  const onUseNativeControlsPressed = () => {
    setuseNativeControls(!useNativeControls);
  };

  const onFullscreenPressed = () => {
    try {
      video.presentFullscreenPlayer();
    } catch (error) {
      console.log(error.toString());
    }
  };

  // async function downloadVideo() {
  //   setButtonTitle('Downloading')

  //   const callback = downloadProgress => {
  //     setTotalSize(formatBytes(downloadProgress.totalBytesExpectedToWrite))

  //     var progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
  //     progress = progress.toFixed(2) * 100
  //     setProgressValue(progress.toFixed(0))
  //   };

  //   const downloadResumable = FileSystem.createDownloadResumable(
  //     videoUrl,
  //     FileSystem.documentDirectory + 'small.mp4',
  //     {},
  //     callback
  //   );

  //   try {
  //     const { uri } = await downloadResumable.downloadAsync();
  //     console.log('Finished downloading to ', uri);
  //     setButtonTitle('Downloaded')
  //   } catch (e) {
  //     console.error(e);
  //   }

  // }

  const renderItem = ({ item, index }) => (
    <TvCard
      key={`tv-${index}`}
      item={item}
      style={styles.musicsCard}
      onPress={() => setVideoUrl(item.url)}
    />
  );

  const renderSeparator = () => <Divider style={styles.separator} />;

  const renderEmpty = () => {
    return (
      <Block flex={1} style={styles.listEmpty}>
        <Text body1 bold color={theme.COLORS.SECONDARY}>
          {i18n.t('errorMessage404Route')}
        </Text>
      </Block>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Block width={width} style={styles.videoBlock}>
        <Image
          style={styles.radioImage}
          source={require('../../../assets/logo.png')}
          resizeMethod="resize"
        />
        <Block row style={styles.controllBlock}>
          <TouchableHighlight
            underlayColor={theme.COLORS.WHITE}
            style={styles.playWrapper}
            onPress={onPlayPausePressed()}
            disabled={isLoading}>
            <MaterialCommunityIcons
              name={'play'}
              color={theme.COLORS.PRIMARY}
              size={theme.SIZES.NAVBAR_ICON_SIZE * 1.5}
            />
          </TouchableHighlight>
          <Block
            // flex={1}
            width={width}
            style={styles.sliderBlock}>
            <Slider
              style={styles.slider}
              value={getSeekSliderPosition()}
              onValueChange={onSeekSliderValueChange}
              onSlidingComplete={onSeekSliderSlidingComplete}
              disabled={isLoading}
              minimumTrackTintColor={theme.COLORS.PRIMARY}
              maximumTrackTintColor={theme.COLORS.SECONDARY}
              thumbTintColor={theme.COLORS.PRIMARY}
            />
          </Block>
          {/* <TouchableHighlight
            underlayColor={theme.COLORS.WHITE}
            style={styles.wrapper}
            onPress={() => onFullscreenPressed()}
            disabled={isLoading}>
            <MaterialCommunityIcons
              name="fullscreen"
              color={theme.COLORS.SECONDARY}
              size={theme.SIZES.NAVBAR_ICON_SIZE * 1.5}
            />
          </TouchableHighlight> */}
        </Block>
      </Block>
      <Block flex={1} width={width} style={styles.contentBlock}>
        {/* <Block flex={1} style={styles.categoryBlock}>
          <Block row style={styles.categoryTimeBlock}>
            <Text
              overline
              color={theme.COLORS.SECONDARY}
              style={styles.category}>
              category
            </Text>
            <Text overline color={theme.COLORS.SECONDARY} style={styles.time}>
              time
            </Text>
          </Block>
          <Text overline color={theme.COLORS.SECONDARY}>
            Host: Abba gospel
          </Text>
        </Block> */}
        {isLoadingRadios ? (
          <ActivityIndicator
            size="large"
            color={theme.COLORS.PRIMARY}
            style={styles.activityIndicator}
          />
        ) : (
          <FlatList
            data={radios}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            // ItemSeparatorComponent={renderSeparator}
            onRefresh={() => handleRefresh()}
            refreshing={isLoadingRadios || isLoadingCategories}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </Block>
    </SafeAreaView>
  );
};

export default RadioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoBlock: {
    justifyContent: 'space-between',
    height: height / 4,
    // backgroundColor: theme.COLORS.PLACEHOLDER,
    ...Platform.select({
      android: { elevation: theme.SIZES.CARD_ELEVATION },
      ios: {
        shadowColor: theme.COLORS.CARD_SHADOW_COLOR,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
    }),
  },
  radioImage: {
    width: width,
    height: height / 5,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  controllBlock: {
    alignSelf: 'flex-end',
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    // justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  playWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.COLORS.PRIMARY,
    borderWidth: 2,
    borderRadius: 50,
  },
  wrapper: {
    // paddingHorizontal: 16,
  },
  sliderBlock: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  slider: {
    flex: 1,
    // paddingHorizontal: 16,
    alignSelf: 'stretch',
    // width: width - 100,
  },
  contentBlock: {
    // paddingHorizontal: 16,
  },
  categoryBlock: {
    padding: 16,
    borderColor: 'red',
    borderWidth: 1,
  },
  categoryTimeBlock: {
    // padding: 4,
  },
  category: {
    paddingRight: 4,
    borderRightWidth: 1,
    borderRightColor: theme.COLORS.PRIMARY,
  },
  time: {
    paddingLeft: 4,
  },
  headingBlock: {},
  title: {
    paddingTop: 8,
    lineHeight: 30,
  },
  subtitle: {
    paddingTop: 16,
  },
  descBlock: {
    paddingVertical: 16,
  },
  relatedBlock: {
    // padding: 8,
  },
  related: {
    paddingVertical: 16,
  },
  tvCard: {
    marginVertical: 8,
  },
  divider: {
    height: 4,
    width: width / 5,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  activityIndicator: {
    marginVertical: 16,
  },
  webViewContainer: {
    height: height / 2.5,
    width: width - 32,
    marginTop: 20,
  },
  listEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
