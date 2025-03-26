import React, {useState, useEffect} from 'react';
import {FlatList, View, Dimensions, Animated, StyleSheet} from 'react-native';
import Sun from '../../components/Sun';
import Mercury from '../../components/Mercury';
import Venus from '../../components/Venus';
import Earth from '../../components/Earth';
import Mars from '../../components/Mars';
import Jupiter from '../../components/Jupiter';
import Saturn from '../../components/Saturn';
import Uranus from '../../components/Uranus';
import Neptune from '../../components/Neptune';

const {height} = Dimensions.get('window');

interface Planet {
  name: string;
  size: string;
  description: string;
  component: JSX.Element;
}

const planets: Planet[] = [
  {
    name: 'Sol',
    size: '1.392.700 km',
    description:
      'A estrela central do sistema solar. Todos os outros corpos do Sistema Solar, como planetas, planetas anões, asteroides, cometas e poeira, bem como todos os satélites associados a estes corpos, giram ao seu redor.',
    component: <Sun />,
  },
  {
    name: 'Mercúrio',
    size: '4,880 km',
    description: 'O menor e mais rápido planeta do sistema solar. A sua órbita tem a maior excentricidade e o seu eixo apresenta a menor inclinação em relação ao plano da órbita dentre todos os planetas do Sistema Solar.',
    component: <Mercury />,
  },
  {
    name: 'Vênus',
    size: '12,104 km',
    description: 'É um planeta terrestre e é o mais próximo em massa e tamanho de seu vizinho orbital, a Terra . Vênus tem de longe a atmosfera mais densa dos planetas terrestres, composta principalmente de dióxido de carbono com uma espessa cobertura global de nuvens de ácido sulfúrico . ',
    component: <Venus />,
  },
  {
    name: 'Terra',
    size: '12,742 km',
    description: 'A Terra é o terceiro planeta mais próximo do Sol, o mais denso e o quinto maior dos oito planetas do Sistema Solar. É por vezes designada como Mundo ou Planeta Azul. Lar de milhões de espécies de seres vivos, incluindo os humanos, a Terra é o único corpo celeste onde é conhecida a existência de vida.',
    component: <Earth />,
  },
  {
    name: 'Marte',
    size: '6,779 km',
    description: ' Batizado em homenagem a divindade romana da guerra, muitas vezes é descrito como o "Planeta Vermelho", porque o óxido de ferro predominante em sua superfície lhe dá uma aparência avermelhada.',
    component: <Mars />,
  },
  {
    name: 'Júpiter',
    size: '139,820 km',
    description: 'O maior planeta do sistema solar.  É um gigante gasoso com uma massa de mais de 2,5 vezes a de todos os outros planetas do Sistema Solar combinados e um pouco menos de um milésimo da massa do Sol.',
    component: <Jupiter />,
  },
  {
    name: 'Saturno',
    size: '116,460 km',
    description: 'Saturno é o sexto planeta a partir do Sol e o segundo maior do Sistema Solar atrás de Júpiter. Pertencente ao grupo dos gigantes gasosos, possui cerca de 95 massas terrestres e orbita a uma distância média de 9,5 unidades astronômicas.',
    component: <Saturn />,
  },
  {
    name: 'Urano',
    size: '50,724 km',
    description: 'Tem uma inclinação axial única. Foi nomeado em homenagem ao deus grego do céu, Urano. Embora seja visível a olho nu em boas condições de visualização, não foi reconhecido pelos astrônomos antigos como um planeta devido a seu pequeno brilho e lenta órbita.',
    component: <Uranus />,
  },
  {
    name: 'Netuno',
    size: '49,244 km',
    description: 'O último planeta do sistema solar. Pertencente ao grupo dos gigantes gasosos, possui um tamanho ligeiramente menor que o de Urano, mas maior massa, equivalente a 17 massas terrestres. Netuno orbita o Sol a uma distância média de 30,1 unidades astronômicas.',
    component: <Neptune />,
  },
];

const SolarSystem = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [animatedText, setAnimatedText] = useState(new Animated.Value(0));

  useEffect(() => {
    const newAnimatedValue = new Animated.Value(0);
    setAnimatedText(newAnimatedValue);

    Animated.timing(newAnimatedValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  const renderItem = ({item, index}: {item: Planet; index: number}) => (
    <View style={[styles.astrosContent, {height}]}>
      {item.component}
      {index === activeIndex && (
        <View style={styles.textContent}>
          <Animated.Text style={[styles.textName, {opacity: animatedText}]}>
            {item.name}
          </Animated.Text>
          <Animated.Text style={[styles.textSize, {opacity: animatedText}]}>
            {item.size}
          </Animated.Text>
          <Animated.Text
            style={[styles.descriptionText, {opacity: animatedText}]}>
            {item.description}
          </Animated.Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.universe}>
      <FlatList
        data={planets}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={event => {
          const index = Math.round(event.nativeEvent.contentOffset.y / height);
          setActiveIndex(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  universe: {
    flex: 1,
    backgroundColor: '#000',
  },
  astrosContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  textName: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'SpaceMono-BoldItalic',
  },
  textSize: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'SpaceMono-Italic',
  },
  descriptionText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'SpaceMono-Regular',
  },
});

export default SolarSystem;
