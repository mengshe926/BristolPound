import React from 'react'
import Module from './TownPoundCore/Module'
import { Font } from 'expo';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      fontLoaded: false
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'MuseoSans-300': require('./assets/fonts/MuseoSans-300.ttf'),
      'MuseoSans-100': require('./assets/fonts/MuseoSans-100.ttf'),
      'MuseoSans-500': require('./assets/fonts/MuseoSans-500.ttf'),
      'MuseoSans-700': require('./assets/fonts/MuseoSans-700.ttf'),
      'MuseoSans-900': require('./assets/fonts/MuseoSans-900.ttf'),
      'MuseoSans-300': require('./assets/fonts/MuseoSans-300.ttf'),
      'MuseoSans-100Italic': require('./assets/fonts/MuseoSans-100Italic.ttf'),
      'MuseoSans-500Italic': require('./assets/fonts/MuseoSans-500Italic.ttf'),
      'MuseoSans-700Italic': require('./assets/fonts/MuseoSans-700Italic.ttf'),
      'MuseoSans-900Italic': require('./assets/fonts/MuseoSans-900Italic.ttf')
    });
    this.setState({ fontLoaded: true })
  }

  render() {
    return (
       this.state.fontLoaded && <Module /> 
    )
  }
}

export default App
