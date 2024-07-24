import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BG_Color, TEXT_Color } from '../../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import debounce from 'lodash.debounce';

const SearchCandidate = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      searchUsers(search); // Ensure search is executed when the component is focused
    }
  }, [isFocused]);

  const searchUsers = async (txt) => {
    if (txt.trim() === '') {
      setUsers([]);
      return;
    }

    setLoading(true);

    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('name', '>=', txt)
        .where('name', '<=', txt + '\uf8ff') // Using a range to handle partial matches
        .get();
        
      let temp = [];
      querySnapshot.docs.forEach(doc => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setUsers(temp);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of searchUsers to limit the number of API calls
  const debouncedSearchUsers = useCallback(debounce(searchUsers, 300), []);

  const handleSearch = (txt) => {
    setSearch(txt);
    debouncedSearchUsers(txt);
  };

  return (
    <View style={styles.container}>
      <View style={styles.SearchBox}>
        <Image source={require('../../../images/search.png')} style={styles.icon} />
        <TextInput
          placeholder="Search Users here....."
          placeholderTextColor={'#9e9e9e'}
          style={styles.input}
          value={search}
          onChangeText={handleSearch}
        />
        {search !== '' && (
          <TouchableOpacity
            onPress={() => {
              setSearch('');
              searchUsers('');
            }}>
            <Image source={require('../../../images/cross.png')} style={styles.cross} />
          </TouchableOpacity>
        )}
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => {
                navigation.navigate('UserDetails', { data: item });
              }}>
              <View style={styles.topView}>
                <TouchableOpacity>
                  <Image
                    source={item.profileImg ? { uri: item.profileImg } : require('../../../images/user.png')}
                    style={styles.profile}
                  />
                </TouchableOpacity>
                <Text style={styles.item}>{item.name}</Text>
              </View>
              <Text style={styles.subTitle}>
                {item.isUserName ? 'Username: ' + item.isUserName : 'Email: ' + item.email}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_Color,
  },
  SearchBox: {
    width: '90%',
    height: verticalScale(40),
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: moderateScale(20),
    borderRadius: moderateScale(30),
    borderColor: '#9e9e9e',
    flexDirection: 'row',
    paddingLeft: moderateScale(15),
    alignItems: 'center',
  },
  icon: {
    width: scale(16),
    height: scale(16),
  },
  input: {
    width: '80%',
    height: '100%',
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    color: TEXT_Color,
  },
  cross: {
    width: scale(16),
    height: scale(16),
    marginLeft: moderateScale(5),
  },
  userItem: {
    width: '90%',
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  item: {
    fontSize: moderateScale(22),
    width: '90%',
    fontWeight: '600',
    color: TEXT_Color,
    marginLeft: moderateScale(10),
  },
  subTitle: {
    fontSize: moderateScale(15),
    fontWeight: '800',
    color: TEXT_Color,
    marginTop: moderateScale(5),
    marginLeft: moderateScale(10),
    width: '90%',
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
  },
  profile: {
    width: scale(50),
    height: scale(50),
    borderRadius: 50,
    marginLeft: moderateScale(5),
  },
  loadingText: {
    alignSelf: 'center',
    marginTop: moderateScale(20),
    fontSize: moderateScale(16),
    color: TEXT_Color,
  },
});

export default SearchCandidate;
