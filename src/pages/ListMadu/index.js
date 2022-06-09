import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getListProduk } from '../../actions/JerseyAction'
import { getListKategori } from '../../actions/LigaAction'
import { HeaderComponent, Jarak, ListKategori, ListProduk, Tombol } from '../../components'
import { colors, fonts } from '../../utils'



class ListMadu extends Component {
    componentDidMount(){
        
        this._unsubscribe = 
            this.props.navigation.addListener('focus', () => {
                const { idKategori, keyword } = this.props
                this.props.dispatch(getListKategori())
                this.props.dispatch(getListProduk(idKategori, keyword))
        })
    }

    componentWillUnmount(){
        this._unsubscribe()
    }

    componentDidUpdate(prevProps) {
        const {idKategori, keyword} = this.props

        if(idKategori && prevProps.idKategori !== idKategori) {
            this.props.dispatch(getListProduk(idKategori, keyword))
        }
        if(keyword && prevProps.keyword !== keyword) {
            this.props.dispatch(getListProduk(idKategori,keyword))
        }
    }
    
    render() {
        
        const {navigation, namaKategori, keyword} = this.props
        
        return (
            <View style={styles.page}>
                 <HeaderComponent navigation={navigation} page="ListMadu"/>
                <ScrollView showsHorizontalScrollIndicator={false} style={styles.container}>
                <View style={styles.pilihKategori}>
                <ListKategori navigation={navigation}/>
                </View>

                <View style={styles.pilihProduk}>
                    {keyword ? (
                         <Text style={styles.label}>
                         Cari : <Text style={styles.boldLabel}>{keyword}</Text> 
                        
                         </Text>
                    ):(
                        <Text style={styles.label}>
                        Pilih <Text style={styles.boldLabel}>Produk </Text> 
                        {namaKategori ? namaKategori : "Yang Anda Inginkan"}
                        </Text>
                    )}
               
                <ListProduk navigation={navigation}/>
                </View>

                <Jarak height={100}/>
                </ScrollView>

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    idKategori: state.ProdukReducer.idKategori,
    namaKategori: state.ProdukReducer.namaKategori,
    keyword: state.ProdukReducer.keyword
})

export default connect(mapStateToProps, null)(ListMadu)

const styles = StyleSheet.create({

    page: { 
        flex: 1,
        backgroundColor: colors.white, 
},
container: {
    marginTop: -30,
},
pilihKategori: {
    marginHorizontal: 30,
},
pilihProduk: {
    marginHorizontal: 30,
    marginTop: 10,
},
label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular
},
boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold
}
})
