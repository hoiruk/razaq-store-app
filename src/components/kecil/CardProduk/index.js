import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Tombol  from '../Tombol';
import { colors, fonts, responsiveWidth } from '../../../utils'

const CardProduk = ({produk, navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card}>
                <Image 
                source={{uri: produk.gambar[0]}}
                style={styles.gambar}
                />
            <Text style={styles.text}>{produk.nama}</Text>
            </TouchableOpacity>
            
            <Tombol 
            type="text" 
            title="Detail"
            padding={7}
            onPress={() => navigation.navigate('ProdukDetail', { produk }) }
            />     
        </View>
    )
}

export default CardProduk

const styles = StyleSheet.create({
    gambar: {
        width: 124,
        height: 124
    },
    container: {
        marginBottom: 25
    },
    text: {
        fontFamily: fonts.primary.bold,
        fontSize: 13,
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    card: {
        backgroundColor: colors.yellow,
        width: responsiveWidth(150),
        alignItems: 'center',
        padding: 10,
        borderRadius:10,
        marginBottom: 10
    }
})
