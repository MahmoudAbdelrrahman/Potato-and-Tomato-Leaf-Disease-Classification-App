import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';


import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const photo = (item) =>
{
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [wait, setWait] = useState(false)
  const [link, setLink] =  useState('https://us-central1-potato-project-338823.cloudfunctions.net/predict')
  useEffect(() =>
  {
   if(item.navigation.state.params === 'Tomato') {
     setLink('https://us-central1-tomato-project-339000.cloudfunctions.net/predict')
   }
    (async () =>
    {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { s } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();



  }, []);

  if (hasPermission === null)
  {
    return <View />;
  }
  if (hasPermission === false)
  {
    return <Text>No access to camera</Text>;
  }
  async function takePicture()
  {

    if (camRef)
    {

      setWait(true)
      const data = await camRef.current.takePictureAsync({ quality: 0.5 });
      MediaLibrary.saveToLibraryAsync(data.uri);
      setCapturedPhoto(data.uri);

      setWait(false)
      setOpen(true);

    }

  }
  const pickImage = async () =>
  {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });



    if (!result.cancelled)
    {
      console.log(result)

      console.log(result.uri)

      let x = result.uri
      try
      {


        let uri = x

        let apiUrl = link;
 
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
    
        let formData = new FormData();
    
        formData.append('file', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
    
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
    
        setWait(true)
        let result = await fetch(apiUrl, options);
        console.log(result.status)
        setWait(false)
        setOpen(false)
        const obj =  await result.json()
        console.log(obj)
        item.navigation.navigate('Result',{uri,class:obj.class})
      } catch (error)
      {

        console.log(error)
      }
    }
  }

  const uploadPhoto = async () =>
  {

    try {
      let uri = capturedPhoto

      let apiUrl = link;
 
     let uriParts = uri.split('.');
     let fileType = uriParts[uriParts.length - 1];
 
     let formData = new FormData();
 
     formData.append('file', {
       uri,
       name: `photo.${fileType}`,
       type: `image/${fileType}`,
     });
 
     let options = {
       method: 'POST',
       body: formData,
       headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
       },
     };
 
     setWait(true)
     let result = await fetch(apiUrl, options);
     console.log(result.status)
     setWait(false)
     setOpen(false)
     const obj =  await result.json()
     console.log(obj)
     item.navigation.navigate('Result',{uri,class:obj.class})
   
    } catch (error) {
      console.log(error)
    }
   

  }



  return (


    <View style={{ flex: 1 }}>




      <Camera style={{ flex: 1 }} type={type}
        ref={camRef}
      >

      </Camera>

      <View style={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'center' }}>

        <TouchableOpacity disabled={wait} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#121212", margin: 10, borderRadius: 10, height: 50, width: '40%' }} onPress={takePicture} >


          <FontAwesome name={wait ? 'spinner' : 'camera'} size={23} color="#FFF" />

        </TouchableOpacity>

        <TouchableOpacity disabled={wait} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#121212", margin: 10, borderRadius: 10, height: 50, width: '40%' }} onPress={pickImage} >


          <FontAwesome name={wait ? 'spinner' : 'folder'} size={23} color="#FFF" />

        </TouchableOpacity>

      </View>





      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
      >



        <View >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity disabled={wait} style={{ margin: 10 }} onPress={() => setOpen(false)}>
              <FontAwesome name="close" size={50} color={wait ? "#FF0000" : "#000000"} />
            </TouchableOpacity>

          </View>

          <Image
            style={{ marginLeft: 'auto', marginRight: 'auto', width: '70%', height: '70%', borderRadius: 20 }}
            source={{ uri: capturedPhoto }}
          />


          <View style={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity disabled={wait} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "black", margin: 10, borderRadius: 10, height: 50, width: '40%' }} onPress={uploadPhoto} >
              <FontAwesome name={wait ? 'spinner' :'upload'} size={23} color="#FFF" />
            </TouchableOpacity>

          </View>
        </View>

      </Modal>




    </View>

  );
}

export default photo

