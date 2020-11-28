import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Image,
  Slider,
  TouchableHighlight,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio, Video } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';

import { Block, Text } from '../../components';
import theme from '../../constants/theme';
import { selectMusics } from '../../store/modules/music/selectors';

const { height, width } = Dimensions.get('window');
const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
// const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };
const BACKGROUND_COLOR = '#FFF8ED';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (width * 2.0) / 5.0 - FONT_SIZE * 2;

const MusicPlayerScreen = ({ route }) => {
  const { item, index } = route.params;
  const musics = useSelector((state) => selectMusics(state));
  let currentIndex = index;
  console.log(musics[currentIndex]);
  let isSeeking = false;
  let shouldPlayAtEndOfSeek = false;
  let playbackInstance = null;
  let video;
  const [showVideo, setshowVideo] = useState(false);
  const [playbackInstanceName, setplaybackInstanceName] = useState(
    LOADING_STRING,
  );
  const [loopingType, setloopingType] = useState(LOOPING_TYPE_ALL);
  const [muted, setmuted] = useState(false);
  const [playbackInstancePosition, setplaybackInstancePosition] = useState(
    null,
  );
  const [playbackInstanceDuration, setplaybackInstanceDuration] = useState(
    null,
  );
  const [shouldPlay, setshouldPlay] = useState(true);
  const [isPlaying, setisPlaying] = useState(false);
  const [isBuffering, setisBuffering] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [volume, setvolume] = useState(1.0);
  const [poster, setposter] = useState(false);
  const [fullscreen, setfullscreen] = useState(false);
  const [throughEarpiece, setthroughEarpiece] = useState(false);
  const [shouldCorrectPitch, setshouldCorrectPitch] = useState(true);
  const [rate, setrate] = useState(1.0);
  const [videoWidth, setvideoWidth] = useState(width);
  const [videoHeight, setvideoHeight] = useState(VIDEO_CONTAINER_HEIGHT);
  const [useNativeControls, setuseNativeControls] = useState(false);

  const setAudioMode = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  };

  useEffect(() => {
    setAudioMode();
  }, []);

  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////

  const loadNewPlaybackInstance = async (playing) => {
    try {
      if (playbackInstance !== null) {
        await playbackInstance.unloadAsync();
        playbackInstance.setOnPlaybackStatusUpdate(null);
        playbackInstance = null;
      }

      const source = { uri: musics[currentIndex].url };
      const initialStatus = {
        shouldPlay: playing,
        rate: rate,
        shouldCorrectPitch: shouldCorrectPitch,
        volume: volume,
        isMuted: muted,
        isLooping: loopingType === LOOPING_TYPE_ONE,
        // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
        // androidImplementation: 'MediaPlayer',
      };

      if (musics[currentIndex].isVideo) {
        console.log(onPlaybackStatusUpdate);
        await video.loadAsync(source, initialStatus);
        video.onPlaybackStatusUpdate(onPlaybackStatusUpdate);
        playbackInstance = video;
        const status = await video.getStatusAsync();
      } else {
        const { sound, status } = await Audio.Sound.createAsync(
          source,
          initialStatus,
          onPlaybackStatusUpdate,
        );
        playbackInstance = sound;
      }

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
      setshowVideo(false);
      setisPlaying(false);
      setplaybackInstanceName(LOADING_STRING);
      setplaybackInstanceDuration(null);
      setplaybackInstancePosition(null);
      setisLoading(true);
    } else {
      setplaybackInstanceName(musics[currentIndex].name);
      setshowVideo(musics[currentIndex].isVideo);
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
      setvolume(status.volume);
      setloopingType(status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL);
      setshouldCorrectPitch(status.shouldCorrectPitch);
      if (status.didJustFinish && !status.isLooping) {
        advanceIndex(true);
        updatePlaybackInstanceForIndex(true);
      }
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

  const advanceIndex = (forward) => {
    currentIndex =
      (currentIndex + (forward ? 1 : musics.length - 1)) % musics.length;
  };

  const updatePlaybackInstanceForIndex = async (playing) => {
    updateScreenForLoading(true);

    setvideoWidth(width);
    setvideoHeight(VIDEO_CONTAINER_HEIGHT);

    loadNewPlaybackInstance(playing);
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

  const onStopPressed = async () => {
    console.log('Stop pressed');
    if (playbackInstance !== null) {
      await playbackInstance.stopAsync();
    }
  };

  const onForwardPressed = () => {
    console.log('Forward pressed');
    if (playbackInstance !== null) {
      advanceIndex(true);
      updatePlaybackInstanceForIndex(shouldPlay);
    }
  };

  const onBackPressed = () => {
    console.log('Back pressed');
    if (playbackInstance !== null) {
      advanceIndex(false);
      updatePlaybackInstanceForIndex(shouldPlay);
    }
  };

  const onMutePressed = async () => {
    console.log('Muted pressed');
    if (playbackInstance !== null) {
      await playbackInstance.setIsMutedAsync(!muted);
    }
  };

  const onLoopPressed = async () => {
    console.log('Loop pressed');
    if (playbackInstance !== null) {
      await playbackInstance.setIsLoopingAsync(
        loopingType !== LOOPING_TYPE_ONE,
      );
    }
  };

  const onVolumeSliderValueChange = (value) => {
    console.log('Volume change');
    if (playbackInstance !== null) {
      playbackInstance.setVolumeAsync(value);
    }
  };

  const trySetRate = async (rt, correctPitch) => {
    if (playbackInstance !== null) {
      try {
        await playbackInstance.setRateAsync(rt, correctPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  const onRateSliderSlidingComplete = async (value) => {
    trySetRate(value * RATE_SCALE, shouldCorrectPitch);
  };

  const onPitchCorrectionPressed = async (value) => {
    trySetRate(rate, !shouldCorrectPitch);
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

  const getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  };

  const getTimestamp = () => {
    if (
      playbackInstance !== null &&
      playbackInstancePosition !== null &&
      playbackInstanceDuration !== null
    ) {
      return `${getMMSSFromMillis(
        playbackInstancePosition,
      )} / ${getMMSSFromMillis(playbackInstanceDuration)}`;
    }

    return '';
  };

  const onPosterPressed = () => {
    setposter(!poster);
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

  const onSpeakerPressed = () => {
    setthroughEarpiece(!throughEarpiece);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: throughEarpiece,
    });
  };

  return (
    <View style={styles.container}>
      <Block width={width} style={styles.detailsBlock}>
        <Block style={styles.imageBlock}>
          <Image
            style={styles.musicImage}
            source={{ uri: item.cover }}
            resizeMethod="resize"
          />
        </Block>
        <View style={styles.videoContainer}>
          <Video
            ref={mountVideo}
            style={[
              styles.video,
              {
                opacity: showVideo ? 1.0 : 0.0,
                width: videoWidth,
                height: videoHeight,
              },
            ]}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
            onError={onError}
            onFullscreenUpdate={onFullscreenUpdate}
            onReadyForDisplay={onReadyForDisplay}
            useNativeControls={useNativeControls}
          />
        </View>
        <Block flex={1} style={styles.songContentBlock}>
          <Text
            title
            bold
            color={theme.COLORS.PRIMARY}
            style={styles.songHeading}>
            {item.name}
          </Text>
          <Text
            body2
            color={theme.COLORS.SECONDARY_TEXT}
            style={styles.songBody}>
            {item.artist}
          </Text>
        </Block>
      </Block>
      <Block
        flex={1}
        width={width}
        style={[
          styles.bottomBlock,
          { opacity: isLoading ? DISABLED_OPACITY : 1.0 },
        ]}>
        <Block
          // flex={1}
          width={width}
          row
          space="between"
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
          <Text caption color={theme.COLORS.BLACK}>
            {isBuffering ? BUFFERING_STRING : getTimestamp()}
          </Text>
        </Block>
        <Block flex={1} row style={styles.controllBlock}>
          <TouchableHighlight
            underlayColor={theme.COLORS.WHITE}
            style={styles.wrapper}
            onPress={() => onBackPressed()}
            disabled={isLoading}>
            <MaterialCommunityIcons
              name="skip-previous"
              color="#000"
              size={theme.SIZES.NAVBAR_ICON_SIZE * 1.5}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={theme.COLORS.WHITE}
            style={styles.playWrapper}
            onPress={onPlayPausePressed()}
            disabled={isLoading}>
            <MaterialCommunityIcons
              name={isPlaying ? 'pause' : 'play'}
              color={theme.COLORS.PRIMARY}
              size={theme.SIZES.NAVBAR_ICON_SIZE * 1.5}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={theme.COLORS.WHITE}
            style={styles.stopWrapper}
            onPress={() => onStopPressed()}
            disabled={isLoading}>
            <MaterialCommunityIcons
              name="stop"
              color={theme.COLORS.PRIMARY}
              size={theme.SIZES.NAVBAR_ICON_SIZE * 1.25}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={theme.COLORS.WHITE}
            style={styles.wrapper}
            onPress={() => onForwardPressed()}
            disabled={isLoading}>
            <MaterialCommunityIcons
              name="skip-next"
              color="#000"
              size={theme.SIZES.NAVBAR_ICON_SIZE * 1.5}
            />
          </TouchableHighlight>
        </Block>
        <Block flex={1} row style={styles.volumeBlock}>
          <Block row>
            <TouchableHighlight
              underlayColor={theme.COLORS.WHITE}
              style={styles.wrapper}
              onPress={() => onMutePressed()}
              disabled={isLoading}>
              <MaterialCommunityIcons
                name={muted ? 'volume-mute' : 'volume-high'}
                color="#000"
                size={theme.SIZES.NAVBAR_ICON_SIZE}
              />
            </TouchableHighlight>
          </Block>
          <TouchableHighlight
            underlayColor={theme.COLORS.WHITE}
            style={styles.muteWrapper}
            onPress={() => onLoopPressed()}
            disabled={isLoading}>
            <MaterialCommunityIcons
              name="repeat"
              color="#000"
              size={theme.SIZES.NAVBAR_ICON_SIZE}
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={() => onFullscreenPressed()}>
            <MaterialCommunityIcons
              name="repeat"
              color="#000"
              size={theme.SIZES.NAVBAR_ICON_SIZE}
            />
          </TouchableHighlight>
        </Block>
      </Block>
      <Modal
        visible={isLoading}
        animationType="fade"
        transparent={true}
        onRequestClose={() => console.log('closed')}>
        <Block style={styles.modalView}>
          <Block style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              color={theme.COLORS.PRIMARY}
              size="large"
              animating={isLoading}
            />
          </Block>
        </Block>
      </Modal>
    </View>
  );
};

export default MusicPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: theme.COLORS.WHITE, // '#A5AEBA',
  },
  detailsBlock: {
    paddingHorizontal: 40,
    paddingVertical: 16,
  },
  imageBlock: {
    height: 280,
    backgroundColor: theme.COLORS.PLACEHOLDER,
    borderRadius: 16,
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
  musicImage: {
    width: 'auto',
    height: '100%',
    borderRadius: 16,
  },
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT,
  },
  video: {
    maxWidth: width,
  },
  songContentBlock: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  songHeading: {},
  songBody: {
    lineHeight: 20,
  },
  bottomBlock: {
    marginTop: 40,
    paddingVertical: 16,
  },
  sliderBlock: {
    alignItems: 'center',
    paddingRight: 16,
  },
  slider: {
    flex: 1,
    // paddingVertical: 16,
    alignSelf: 'stretch',
    // width: width - 100,
  },
  controllBlock: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  playWrapper: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.COLORS.PRIMARY,
    borderWidth: 2,
    borderRadius: 50,
  },
  stopWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.COLORS.PRIMARY,
    borderWidth: 2,
    borderRadius: 50,
  },
  volumeBlock: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  volumeSlider: {
    width: width / 2 - 32,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: theme.COLORS.SECONDARY,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
