import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import  Jarak  from '../Jarak'
import { colors, fonts } from '../../../utils'


const TombolLoading = ({ padding, fontsSize}) => {
    
    
    return (
        <TouchableOpacity style={styles.container(padding)} >
           <ActivityIndicator size="small" color="#FFFFFF"/>
            <Jarak width={5}/>
            <Text style={styles.title(fontsSize)}>LOADING ...</Text>
           
        </TouchableOpacity>
    )
}

export default TombolLoading;

const styles = StyleSheet.create({
    container: (padding) => ({
        backgroundColor: colors.border,
        padding: padding,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }),
    title: (fontsSize) => ({
        color: colors.white,
        fontSize: fontsSize ? fontsSize: 15,
        fontFamily: fonts.primary.bold
    })
})
