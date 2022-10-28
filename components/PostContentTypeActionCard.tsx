import React from 'react';
import {Card, Title} from 'react-native-paper';
import {View, StyleSheet, Pressable} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Themes from '../themes';

interface PostContentTypeActionCard {
  onPressAction: () => void;
  title: string;
  iconName: string;
  isSelected: boolean;
}

export default function PostContentTypeActionCard({
  onPressAction,
  title,
  iconName,
  isSelected,
}: PostContentTypeActionCard) {
  const selectedCardStyle = isSelected ? styles.selectedCard : {};
  const selectedTitleStyle = isSelected ? styles.selectedTitle : {};
  const selectedIconColor = isSelected ? '#fff' : '#000';

  return (
    <Pressable
      onPress={onPressAction}
      style={styles.contentTypeSelectionOption}>
      <Card style={[styles.defaultCard, selectedCardStyle]}>
        <Card.Content>
          <View style={styles.imageAndTitleContainer}>
            <FontAwesome5 name={iconName} size={60} color={selectedIconColor} />
            <Title style={selectedTitleStyle}>{title}</Title>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentTypeSelectionOption: {
    width: '48%',
  },

  contentTypeIcon: {
    height: 50,
    width: 50,
  },

  imageAndTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  defaultCard: {
    borderRadius: 18,
  },

  selectedCard: {
    backgroundColor: Themes.colors.secondary,
  },

  selectedTitle: {
    color: Themes.colors.onSecondary,
  },
});
