import {Pressable, StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import React from 'react';

interface EmptyDocumentSectionProps {
  handleOnScanDocumentsAction: () => void;
}

export default function EmptyDocumentSection({
  handleOnScanDocumentsAction,
}: EmptyDocumentSectionProps) {
  return (
    <View style={styles.emptyDocumentsContainer}>
      <Pressable onPress={handleOnScanDocumentsAction}>
        <View>
          <Title>Scan Some Document</Title>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  emptyDocumentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
