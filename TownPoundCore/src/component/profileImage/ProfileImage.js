import React from 'react'
import { Image, View } from 'react-native'
import categories from '../../util/categories'
import Images from '@Assets/images'

const layer = (src, style) => {
  if (src) {
    return <Image style={{flex: 1, position: 'absolute', ...style}} source={src} resizeMode='cover'/>
  }
}

const backgroundImage = [
  Images.brandBlue1,
  Images.brandBlue2,
  Images.darkBlue1,
  Images.secondaryBlue1
]

const border = {
  offWhite: Images.borderOffWhite,
}

const categoryImage = { }
categoryImage[categories.shop] = Images.shop
categoryImage[categories.person] = Images.person
categoryImage[categories.system] = Images.system

const CustomImage = ({image, style, borderColor}) =>
    <View style={style}>
      {layer(image, {height: style.height - 2, width: style.width - 2, margin: 1})}
      {layer(border[borderColor], {height: style.height, width: style.width})}
    </View>

const Placeholder = ({style, colorCode, category}) =>
  <View style={style}>
    {layer(backgroundImage[colorCode], {height: style.height - 2, width: style.width - 2, margin: 1})}
    {layer(categoryImage[category], {height: style.height - 2, width: style.width - 2, margin: 1})}
  </View>

const WithdrawalImage = ({style}) =>
  <View style={style}>
    {layer(Images.cashpoint, {height: style.height - 2, width: style.width - 2, margin: 1})}
  </View>

const ProfileImage = (props) =>
    props.withdrawal
      ? <WithdrawalImage {...props}/>
      : props.image
        ? <CustomImage {...props}/>
        : <Placeholder {...props}/>
export default ProfileImage
