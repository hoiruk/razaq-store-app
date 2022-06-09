import FIREBASE from '../config/FIREBASE'
import {dispatchError,dispatchLoading,dispatchSuccess} from '../utils'

export const MASUK_KERANJANG = "MASUK_KERANJANG"
export const GET_LIST_KERANJANG = "GET_LIST_KERANJANG"
export const DELETE_KERANJANG = "DELETE_KERANJANG"

export const masukKeranjang = (data) => {
    return (dispatch) => {
        dispatchLoading(dispatch, MASUK_KERANJANG)

        //Cek apakah data keranjang user tsb sudah ada atau blm 
        FIREBASE.database()
                .ref('keranjangs/'+data.uid)
                .once('value', (querySnapshot)=> {
                   

                    if(querySnapshot.val()) {
                        
                        //update keranjang utama
                        const keranjangUtama = querySnapshot.val()
                        const beratBaru = parseInt(data.jumlah) * parseFloat(data.produk.berat)
                        const hargaBaru = parseInt(data.jumlah) * parseInt(data.produk.harga)



                        FIREBASE.database()
                                .ref('keranjangs')
                                .child(data.uid)
                                .update({
                                    totalHarga: keranjangUtama.totalHarga + hargaBaru,
                                    totalBerat: keranjangUtama.totalBerat + beratBaru
                                })
                                .then((response) => {
                                   
                                    //simpan ke keranjang detail
                                    dispatch(masukKeranjangDetail(data))

                                })
                                .catch((error) => {
                                    dispatchError(dispatch, MASUK_KERANJANG, error)
                                    alert(error)
                                })

                    }else{
                        //simpan keranjang utama
                        const keranjangUtama = {
                            user: data.uid,
                            tanggal: new Date().toDateString(),
                            totalHarga: parseInt(data.jumlah) * parseInt(data.produk.harga),
                            totalBerat: parseInt(data.jumlah) * parseFloat(data.produk.berat)
                        }

                        FIREBASE.database()
                                .ref('keranjangs')
                                .child(data.uid)
                                .set(keranjangUtama)
                                .then((response) => {
                                    
                                    //simpan ke keranjang detail
                                    dispatch(masukKeranjangDetail(data))

                                })
                                .catch((error) => {
                                    dispatchError(dispatch, MASUK_KERANJANG, error)
                                    alert(error)
                                })
                    }
                })
                .catch((error) => {
                    dispatchError(dispatch, MASUK_KERANJANG. error)
                    alert(error)
                })
    }
}

export const masukKeranjangDetail = (data) => {
    return (dispatch) => {
        const pesanans = {
            product: data.produk,
            jumlahPesan: data.jumlah,
            totalHarga: parseInt(data.jumlah) * parseInt(data.produk.harga),
            totalBerat: parseInt(data.jumlah) * parseFloat(data.produk.berat),
            keterangan: data.keterangan
        }

        FIREBASE.database()
                .ref('keranjangs/'+data.uid)
                .child('pesanans')
                .push(pesanans)
                .then((response) => {

                    dispatchSuccess(dispatch, MASUK_KERANJANG, response ? response : [])
                })
                .catch((error) => {
                    dispatchError(dispatch, MASUK_KERANJANG. error)
                    alert(error)
                })

    }
}

export const getListKeranjang = (id) => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_KERANJANG)
      

        FIREBASE.database()
                .ref('keranjangs/'+id)
                .once('value', (querySnapshot) => {
                    
                    //hasil
                    let data = querySnapshot.val() 
                    
                    dispatchSuccess(dispatch, GET_LIST_KERANJANG, data)
                })
                .catch((error) => {
                    
                    dispatchError(dispatch, GET_LIST_KERANJANG, error)
                    alert(error)
                })
            
    }
}

export const deleteKeranjang = (id, keranjangUtama, keranjnag) => {
    return(dispatch) => {
        dispatchLoading(dispatch, DELETE_KERANJANG)

        const totalHargaBaru = keranjangUtama.totalHarga - keranjnag.totalHarga

        const totalBeratBaru = keranjangUtama.totalBerat - keranjnag.totalBerat

        if(totalBeratBaru === 0){
            //hapus keranjang utama dan detail
            FIREBASE.database()
                    .ref('keranjangs')
                    .child(keranjangUtama.user)
                    .remove()
                    .then((response) => {
                        dispatchSuccess(dispatch, DELETE_KERANJANG, "Keranjang Berhasil Dihapus")
                    })
                    .catch((error) => {
                        dispatchError(dispatch, DELETE_KERANJANG,error)
                        alert(error)
                    })

        }else {
            //hanya update keranjnag utama 
            FIREBASE.database()
                    .ref('keranjangs')
                    .child(keranjangUtama.user)
                    .update({
                        totalBerat: totalBeratBaru,
                        totalHarga: totalHargaBaru
                    })
                    .then((response)=> {
                         //dan hapus pesanan detail 

                         dispatch(deleteKeranjangDetail(id, keranjangUtama))
                    })
                    .catch((error) => {
                        dispatchError(dispatch, DELETE_KERANJANG,error)
                        alert(error)
                    })
            

        }
    }
}

export const deleteKeranjangDetail = (id, keranjangUtama) => {
    return(dispatch) => {

        FIREBASE.database()
                .ref('keranjangs/'+keranjangUtama.user)
                .child('pesanans')
                .child(id)
                .remove()
                .then((response)=> {
                    dispatchSuccess(dispatch, DELETE_KERANJANG, "Keranjang Berhasil Dihapus")
                })
                .catch((error) => {
                    dispatchError(dispatch, DELETE_KERANJANG,error)
                    alert(error)
                })
    }
}