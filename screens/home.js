import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
const home = ({ navigation }) =>
{


    return (
        <View>

            <Text style={styles.text}>
                This is an application that uses AI to classify plant leaf disease, by uploading or capturing the desired plant.
            </Text>
            <Text style={styles.text}>
                Please choose a plant:
            </Text>
            <View style={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Photo', 'Tomato')} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#121212", margin: 10, borderRadius: 10, height: 50, width: '40%' }}>
            <Text style = {{color:'red'}}>Tomato</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Photo', 'Potato')} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#121212", margin: 10, borderRadius: 10, height: 50, width: '40%' }}>
                <Text style = {{color:'yellow'}}>Potato</Text>
            </TouchableOpacity>

            </View>
      </View>
    )
}

export default home

const styles = StyleSheet.create({
    text: {
    
        paddingLeft: 25,
        paddingRight: 15,
        marginTop: 80,
        fontSize: 20,
        paddingBottom:10,
        color:'black',
        textAlign:'center',
        fontStyle:'italic',
        fontWeight:'bold'
    },
    view: {
    }


})
