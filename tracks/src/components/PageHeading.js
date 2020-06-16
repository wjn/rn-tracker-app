import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from './Spacer';

const PageHeading = ({ headerText }) => {
  return (
    <Spacer>
      {/* Screen Header */}
      <Text style={styles.heading} h3>
        {headerText}
      </Text>
    </Spacer>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
  },
});

export default PageHeading;
