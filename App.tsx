import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const App = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // state
  const [time, setTime] = useState(8); // Initial time set to 8am

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Reset function
  const reset = () => {
    setTime(8); // Reset time to 8am
  };

  // renders
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Button
            onPress={handlePresentModalPress}
            title="Present Modal"
            color="black"
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={styles.contentContainer}>
              <Button onPress={reset} title="Reset" />
              <View style={styles.sliderContainer}>
                <Text style={styles.timeText}>8:00 AM</Text>
                <MultiSlider
                  min={0}
                  max={24}
                  values={[24 - time]} // Reverse the value array
                  markerOffsetX={24 - time}
                  selectedStyle={{
                    backgroundColor: '#EEF3F7'
                  }}
                  unselectedStyle={{
                    backgroundColor: '#895CDF'
                  }}
                  onValuesChange={(newValues) => setTime(24 - newValues[0])} // Update time accordingly
                />
                <Text style={styles.timeText}>{time}</Text>
              </View>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sliderContainer: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
