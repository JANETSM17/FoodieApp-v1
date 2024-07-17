import React, { useState, useRef } from 'react';
import { View, Image, Text, Pressable, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Encuentra tu comida favorita cerca de ti',
    description: 'Inicia sesión para comenzar.',
    image: require('../assets/images/logos/cubiertos.png'), 
    buttons: [
      { text: 'Iniciar Sesión', onPress: 'Login' },
    ],
  },
  {
    id: '2',
    title: '¿No tienes una cuenta?',
    description: 'Regístrate aquí.',
    image: require('../assets/images/recursosExtras/camino.png'), 
    buttons: [
      { text: 'Cliente', onPress: 'Register', userType: 'Usuario' },
      { text: 'Proveedor', onPress: 'Register', userType: 'Proveedor' },
    ],
  },
];

const CarouselItem = ({ item, navigation }) => {
  const handlePress = (onPress, userType) => {
    navigation.navigate(onPress, { userType });
  };

  return (
    <View style={styles.slide}>
      <View style={styles.content}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {item.buttons.map((button, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              index === 0 ? styles.userButton : styles.providerButton,
            ]}
            onPress={() => handlePress(button.onPress, button.userType)}
          >
            <Text style={[
              styles.buttonText,
              index === 0 ? styles.userButtonText : styles.providerButtonText,
            ]}>{button.text}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const LandingPage = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => <CarouselItem item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  slide: {
    width: width,
    height: height,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  userButton: {
    backgroundColor: '#FFA500',
  },
  providerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userButtonText: {
    color: '#fff',
  },
  providerButtonText: {
    color: '#FFA500',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: '#333',
  },
});

export default LandingPage;
