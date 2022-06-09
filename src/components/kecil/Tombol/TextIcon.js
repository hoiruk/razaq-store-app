import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import  Jarak  from '../Jarak'
import { IconBack, IconKeranjang, IconKeranjangPutih, IconSubmit } from '../../../assets'
import { colors, fonts } from '../../../utils'


const TextIcon = ({icon, padding, onPress, title, fontsSize, disabled}) => {
    const Icon = () => {
        if(icon === "keranjang") {
            return <IconKeranjang/>
        }else if(icon === "arrow-left"){
            return <IconBack/>
        }else if(icon === "keranjang-putih"){
            return <IconKeranjangPutih/>
        }else if(icon === "submit"){
            return <IconSubmit/>
        }
        return <IconKeranjang/>
    }
    
    return (
        <TouchableOpacity style={styles.container(padding, disabled)} onPress={onPress}>
            <Icon/>
            <Jarak width={5}/>
            <Text style={styles.title(fontsSize)}>{title}</Text>
           
        </TouchableOpacity>
    )
}

export default TextIcon;

const styles = StyleSheet.create({
    container: (padding, disabled) => ({
        backgroundColor: disabled ? colors.border : colors.primary,
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
