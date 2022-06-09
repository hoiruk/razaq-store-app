import FIREBASE from '../config/FIREBASE'
import {dispatchError,dispatchLoading,dispatchSuccess} from '../utils'

export const GET_LIST_PRODUK = "GET_LIST_PRODUK"
export const GET_LIST_PRODUK_BY_KATEGORI = "GET_LIST_PRODUK_BY_KATEGORI"
export const DELETE_PARAMETER_PRODUK = "DELETE_PARAMETER_PRODUK"
export const SAVE_KEYWORD_PRODUK = "SAVE_KEYWORD_PRODUK"

export const getListProduk = (idKategori, keyword) => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_PRODUK)

        if(idKategori){
            FIREBASE.database()
            .ref('produks')
            .orderByChild('kategori')
            .equalTo(idKategori)
            .once('value', (querySnapshot) => {
                
                //hasil
                let data = querySnapshot.val()
                
                dispatchSuccess(dispatch, GET_LIST_PRODUK, data)
            })
            .catch((error) => {
                
                dispatchError(dispatch, GET_LIST_PRODUK, error)
                alert(error)
            })
        }else if(keyword){
            FIREBASE.database()
            .ref('produks')
            .orderByChild('nama')
            .equalTo(keyword.toUpperCase())
            .once('value', (querySnapshot) => {
                
                //hasil
                let data = querySnapshot.val()
                
                dispatchSuccess(dispatch, GET_LIST_PRODUK, data)
            })
            .catch((error) => {
                
                dispatchError(dispatch, GET_LIST_PRODUK, error)
                alert(error)
            })


        }else{
            FIREBASE.database()
            .ref('produks')
            .once('value', (querySnapshot) => {
                
                //hasil
                let data = querySnapshot.val()
                
                dispatchSuccess(dispatch, GET_LIST_PRODUK, data)
            })
            .catch((error) => {
                
                dispatchError(dispatch, GET_LIST_PRODUK, error)
                alert(error)
            })
        }
       
    }
}

export const limitProoduk = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_PRODUK)

        FIREBASE.database()
                .ref('produks')
                .limitToLast(6)
                .once('value', (querySnapshot) => {
                    
                    //hasil
                    let data = querySnapshot.val()
                    
                    dispatchSuccess(dispatch, GET_LIST_PRODUK, data)
                })
                .catch((error) => {
                    
                    dispatchError(dispatch, GET_LIST_PRODUK, error)
                    alert(error)
                })
    }
}

export const getProdukByKategori = (id, namaKategori) => ({
    type: GET_LIST_PRODUK_BY_KATEGORI,
    payload: {
        idKategori: id,
        namaKategori: namaKategori
    }
})

export const deleteParameterProduk = () => ({
    type: DELETE_PARAMETER_PRODUK,
   
})

export const saveKeywordProduk = (search) => ({
    type: SAVE_KEYWORD_PRODUK,
    payload: {
        data: search
    }
})