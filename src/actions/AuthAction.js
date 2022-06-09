import FIREBASE from '../config/FIREBASE'
import {storeData} from '../utils'
import {dispatchError,dispatchLoading,dispatchSuccess} from '../utils'

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = (data, password) => {
    return (dispatch) => {

        //LOADING
        dispatchLoading(dispatch, REGISTER_USER )

FIREBASE
.auth()
.createUserWithEmailAndPassword(data.email, password)
.then((success) => {
    // ambil UID, buat data Baru (data + UID)
const dataBaru = {
    ...data,
    uid: success.user.uid
} 
    
    // Simpan Ke realtime database firebase
    FIREBASE
    .database()
    .ref('users/' + success.user.uid)
    .set(dataBaru);

    //Sukses
    dispatchSuccess(dispatch, REGISTER_USER, dataBaru)
    

    // Simpan Ke Local Storage (Async Storage)
    storeData('user', dataBaru)


  })
  .catch((error) => {
   
   //ERROR
   dispatchError(dispatch, REGISTER_USER, error.message)

            alert(error.message)
  });

    }
}

export const loginUser = (email, password) => {
   
    return (dispatch) => {
        //LOADING
        dispatchLoading(dispatch, LOGIN_USER)
        

        FIREBASE
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((success) => {
           
            // Signed in
            FIREBASE
            .database()
            .ref('/users/' + success.user.uid)
            .once('value')
            .then((resDB) => {
                
            if(resDB.val()) {
            //Sukses
            dispatchSuccess(dispatch, LOGIN_USER, resDB.val() )

        // Simpan Ke Local Storage (Async Storage)
        storeData('user', resDB.val())

            }else {
                //ERROR
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: "Data User Tidak Ada"
                    }
                })

                alert("Data User Tidak Ada")
            }
  
              });
              
            // ...
        })
        .catch((error) => {
            //ERROR
           dispatchError(dispatch, LOGIN_USER, error.message)

            alert(error.message)
        });
    }
}