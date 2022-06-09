import React, { Component } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import { colors, fonts, numberWithCommas,responsiveHeight, heightMobileUI, responsiveWidth, getData } from '../../utils'
import {CardKategori, Inputan, Jarak, Pilihan, ProdukSlider, Tombol} from '../../components'
import { RFValue } from 'react-native-responsive-fontsize'
import { connect } from 'react-redux'
import { getDetailKategori } from '../../actions/LigaAction'
import { masukKeranjang } from '../../actions/KeranjangAction'

class ProdukDetail extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            produk: this.props.route.params.produk,
            images: this.props.route.params.produk.gambar,
            jumlah: "",
            keterangan: "",
            uid: ""
        }
    }

    componentDidMount(){
        const { produk } = this.state
        this.props.dispatch(getDetailKategori(produk.kategori))
    }


    componentDidUpdate(prevProps) {
        const {saveKeranjangResult} = this.props

        if(saveKeranjangResult && prevProps.saveKeranjangResult !== saveKeranjangResult) {
        
            this.props.navigation.navigate("Keranjang")
        }
    }

    masukKeranjang = () => {
        const { jumlah, keterangan } = this.state

        getData('user').then((res) => {
            if(res) {

                //simpan uid local storage ke state
                this.setState({
                    uid: res.uid
                })

                //validasi form
                if(jumlah && keterangan){

                    //hubungkan ke action (keranjangaction)
                    this.props.dispatch(masukKeranjang(this.state))
                }else{
                    Alert.alert('Error', 'Jumlah dan Keterangan Wajib Di Isi')
                }

            }else {
                Alert.alert('Error', 'Silahkan Login Terlebih Dahulu')
                this.props.navigation.replace('Login')
            }
        })
    }
    
    render() {
        const { navigation, getDetailKategoriResult, saveKeranjangLoading} = this.props
        const { produk, images, jumlah, keterangan } = this.state
        return (
            <View style={styles.page}>
               <View style={styles.button}>
               <Tombol 
               icon="arrow-left" 
               padding={7} 
               onPress={() => navigation.goBack()}/>
               </View>
               <ProdukSlider images={images} />
            <View style={styles.container}> 
            <View style={styles.kategori}>
            <CardKategori kategori={getDetailKategoriResult} navigation={navigation} id={produk.kategori}/>
                </View>    
                <View style={styles.desc}>
                <Text style={styles.nama}>{produk.nama}</Text>
                <Text style={styles.harga}>Harga : Rp. { numberWithCommas(produk.harga) }</Text>
                
                <View style={styles.garis} />
                
                <View style={styles.wrapperJenisBerat}>
                <Text style={styles.jenisBerat}>Jenis : {produk.jenis}</Text>
                <Text style={styles.jenisBerat}> Berat: {produk.berat}</Text>
                </View>

                <View style={styles.wrapperInput}>
                <Inputan label="Jumlah" 
                width={responsiveWidth(166)} 
                height={responsiveHeight(43)}
                fontSize={13}
                value={jumlah}
                onChangeText={(jumlah) => this.setState({jumlah})}
                keyboardType="number-pad"
                />
                
                </View>
                <Inputan  label ="Keterangan" textarea
                fontSize={13}
                placeholder="Isi jika ingin menambahkan keterangan"
                value={keterangan}
                onChangeText={(keterangan) => this.setState({keterangan})}
                />
                <Jarak height={15} />
                <Tombol 
                title="Masuk Keranjang"
                type="textIcon"
                icon="keranjang-putih"
                padding={responsiveHeight(17)}
                fontSize={18}
                onPress={() => this.masukKeranjang()}
                loading={saveKeranjangLoading}
                />
                
                </View>
            </View>
    </View>
        );
    }
}

const mapStateToProps = (state) => ({
    getDetailKategoriResult: state.KategoriReducer.getDetailKategoriResult,

    saveKeranjangLoading: state.KeranjangReducer.saveKeranjangLoading,
    saveKeranjangResult: state.KeranjangReducer.saveKeranjangResult,
    saveKeranjangError: state.KeranjangReducer.saveKeranjangError,
})

export default connect(mapStateToProps, null)(ProdukDetail)

const styles = StyleSheet.create({
    page: { 
        flex: 1, 
        backgroundColor: colors.primary,
        },
        container: {
            position: 'absolute',
            bottom: 0,
            height: responsiveHeight(465),
            width: '100%',
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            backgroundColor: colors.white
        },
        button:{
            position: 'absolute',
            marginTop: 30,
            marginLeft: 30,
            zIndex: 1
        },
        desc: {
            marginHorizontal:30,
        },
        nama: {
            fontSize: RFValue(24, heightMobileUI),
            fontFamily: fonts.primary.bold,
            textTransform: 'capitalize'
        },
        harga: {
            fontSize: RFValue(24, heightMobileUI),
            fontFamily: fonts.primary.light,      
        },
        kategori: {
            alignItems: 'flex-end',
            marginRight: 30,
            marginTop: -30
        },
        garis: {
            borderWidth: 0.2,
            marginVertical: 5
        },
        wrapperJenisBerat: {
            flexDirection: 'row',
            marginBottom: 5
        },
        jenisBerat: {
            fontSize: 13,
            fontFamily: fonts.primary.regular,
            marginRight: 30
        },
        wrapperInput: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
  
})
