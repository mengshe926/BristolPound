import React from 'react'
import { ScrollView, TouchableHighlight, View } from 'react-native'
import Colors from '@Colors/colors'

const FixedScrollableList = (props) =>

  	<View style={props.style}>
      	<ScrollView>
	         {props.items.map((item, index) =>
	            //zIndex is required for overflow to work on android
	            <TouchableHighlight
	            	style={{ backgroundColor: item.pressable ? 'white' : 'transparent',
	            			overflow: 'hidden',
	            			zIndex: 100,
	            			flex: 1 }}
	            	key={item.id || (-1 * index)}
	            	underlayColor={Colors.offWhite}
	            	onPress={() => props.onPress(item)}>
	              		{props.componentForItem(item)}
	            </TouchableHighlight>
			     )}
      	</ScrollView>
  	</View>


export default FixedScrollableList
