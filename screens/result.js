import React, {useEffect,useState} from 'react'
import { View, Text, Image } from 'react-native'

const result = (item) => {
  const [uri,setUri] = useState('')
  const [type,setType] = useState('')
  useEffect(()=>{
    setUri(item?.navigation?.state?.params?.uri)
    setType(item?.navigation?.state?.params?.class.replace(/_/g, ' ').replace(/Tomato/,''))
  },[item])
  return (
    <View>


      <View style={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'center' }}>
          <Image
          style={{height:400,width:400}}
          source={{
          uri
          }}
        />
      </View>
        <Text style={{  paddingLeft: 25,
          paddingRight: 15,
          marginTop: 15,
          fontSize: 25,
          paddingBottom:50,
          color:'black',
          textAlign:'center',
          fontStyle:'italic',
          fontWeight:'bold'}}>{type}</Text>
    </View>
  )
}

export default result
