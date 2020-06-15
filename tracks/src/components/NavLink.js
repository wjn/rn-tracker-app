import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';
/**
 * withNavigation Note
 *
 * The navigators used in this project provide navigation as a prop to the
 * component they render. If we have children within those components, we can
 * either pass navigation down to the children or alternately, wrap the child
 * component in a withNavigation.
 */

const NavLink = ({ navigation, linkText, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{linkText}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default withNavigation(NavLink);
