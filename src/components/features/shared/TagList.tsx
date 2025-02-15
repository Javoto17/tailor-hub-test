import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface TagItem {
  id: number;
  name: string;
}

interface TagListProps {
  title?: string;
  tags: TagItem[];
}

const TagList: React.FC<TagListProps> = ({ title, tags }) => (
  <View style={styles.tagSection}>
    {title && <Text style={styles.title}>{title}</Text>}
    <View style={styles.tagList}>
      {tags.map((tag) => (
        <Text key={tag.id} style={styles.tag}>
          {tag.name}
        </Text>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagSection: {
    padding: 16,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 8,
    fontSize: 14,
    backgroundColor: '#eee',
    padding: 4,
    borderRadius: 4,
  },
});

export default TagList;
