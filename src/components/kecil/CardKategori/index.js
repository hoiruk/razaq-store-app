import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { colors, responsiveHeight, responsiveWidth } from '../../../utils'
import {getProdukByKategori} from '../../../actions/JerseyAction'

const CardKategori = ({kategori, navigation, id, dispatch}) => {

    const toProdukByKategori = (id, namaKategori) => {
        //ke jersey action
        dispatch(getProdukByKategori(id, namaKategori))

        //navigaet ke list madu
        navigation.navigate('ListMadu')
    }   
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={()=>toProdukByKategori(id, kategori.namaKategori)}
            >
            <Image source={{uri: kategori.image}}
            style={styles.logo}/>
        </TouchableOpacity>
    )
}

export default connect()(CardKategori)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white, 
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        borderRadius:15,
    },
    logo: {
        width: responsiveWidth(57),
        height: responsiveHeight(65)
    }
})

