import FIREBASE from '../config/FIREBASE'
import {dispatchError,dispatchLoading,dispatchSuccess} from '../utils'

export const GET_LIST_KATEGORI = "GET_LIST_KATEGORI"
export const GET_DETAIL_KATEGORI = "GET_DETAIL_KATEGORI"


export const getListKategori = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_KATEGORI)
      

        FIREBASE.database()
                .ref('kategoris')
                .once('value', (querySnapshot) => {
                    
                    //hasil
                    let data = querySnapshot.val() 
                    
                    dispatchSuccess(dispatch, GET_LIST_KATEGORI, data)
                })
                .catch((error) => {
                    
                    dispatchError(dispatch, GET_LIST_KATEGORI, error)
                    alert(error)
                })
            
    }
}

export const getDetailKategori = (id) => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_DETAIL_KATEGORI)
      

        FIREBASE.database()
                .ref('kategoris/'+id)
                .once('value', (querySnapshot) => {
                    
                    //hasil
                    let data = querySnapshot.val() 
                    
                    dispatchSuccess(dispatch, GET_DETAIL_KATEGORI, data)
                })
                .catch((error) => {
                    
                    dispatchError(dispatch, GET_DETAIL_KATEGORI, error)
                    alert(error)
                })
            
    }
}