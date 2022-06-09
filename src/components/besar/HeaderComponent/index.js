import React, { Component } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { getData,colors, fonts, responsiveHeight } from '../../../utils'
import {IconCari} from '../../../assets'
import {Jarak, Tombol} from '../../kecil'
import { connect } from 'react-redux'
import { saveKeywordProduk } from '../../../actions/JerseyAction'
import { getListKeranjang } from '../../../actions/KeranjangAction'
class HeaderComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             search: ""
        }
    }

    componentDidMount() {
        getData('user').then((res) => {
            
            if(res){
                //sudah login
                this.props.dispatch(getListKeranjang(res.uid))
            }
        })
    }
    
    selesaiCari = () => {
        const { page , navigation, dispatch } = this.props
        const { search } = this.state;

        //Jalankan action SaveKeyword
        dispatch(saveKeywordProduk(search))
        
        //navigate jika halaman home ke list madu
        if(page !== "ListMadu") {
            navigation.navigate("ListMadu")
        }

        //kembvalikan state search ke string kosong
        this.setState({
            search: ''
        })
    }

    render() {
        const { search } = this.state
        const { navigation, getListKeranjangResult } = this.props

        let totalKeranjang;

        if(getListKeranjangResult){
            totalKeranjang = Object.keys(getListKeranjangResult.pesanans).length
        }


        return (
            <View style={styles.container}>
               <View style={styles.wrapperHeader}>
               {/* Input Pencarian */}
               <View style={styles.searchSection}>
                    <IconCari/>
                   <TextInput 
                   placeholder="Cari Barang ..." 
                   placeholderTextColor={'#BCB6B6'}
                   style={styles.input}
                   value={search}
                   onChangeText={(search) => this.setState({search})}
                   onSubmitEditing={()=> this.selesaiCari()}
                   />
               </View>
               <Jarak width={10}/>
                <Tombol 
                icon="keranjang"  
                padding={10} 
                onPress={() => navigation.navigate('Keranjang')}
                totalKeranjang = {totalKeranjang}
                />
               </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
})

export default connect(mapStateToProps, null)(HeaderComponent)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: responsiveHeight(125),
    },
    wrapperHeader: {
      marginTop:25,
      marginHorizontal: 30,  
      flexDirection: 'row',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingLeft: 10,
        alignItems: 'center'
    },
    input: {
        fontSize: 16,
        color: '#BCB6B6',
        fontFamily: fonts.primary.regular
    },

})
