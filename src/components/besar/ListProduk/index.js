import React from 'react'
import { StyleSheet,ActivityIndicator, Text, View } from 'react-native'
import { CardProduk } from '../../kecil'
import {connect} from 'react-redux'
import {colors} from '../../../utils'

const ListProduk = ({getListProdukError, getListProdukLoading, getListProdukResult, navigation}) => {
    return (
        <View style={styles.container}>
            {getListProdukResult ? Object.keys(getListProdukResult).map ((key) => {
               return (
                <CardProduk
                key={key}
                produk={getListProdukResult[key]}
                navigation={navigation}
                />
               )

           }) : getListProdukLoading ? (
           <View style={styles.loading}>
               <ActivityIndicator color={colors.primary} />
           </View>

           ): getListProdukError ? (
            <Text>{getListProdukError}</Text>
           
            ) : (
              
           <Text>Data Kosong</Text>
           )}

        </View>
    )
}

const mapStateToProps = (state) => ({
    getListProdukLoading: state.ProdukReducer.getListProdukLoading,
    getListProdukResult: state.ProdukReducer.getListProdukResult,
    getListProdukError: state.ProdukReducer.getListProdukError
})

export default connect(mapStateToProps, null)(ListProduk)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10
    },
    loading: {
        flex: 1,
        marginTop: 10,
        marginBottom: 30
    }
})
