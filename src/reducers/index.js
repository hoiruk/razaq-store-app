import { combineReducers } from 'redux'
import RajaOngkirReducer from './rajaongkir'
import AuthReducer from './auth'
import ProfileReducer from './profile'
import KategoriReducer from './kategori'
import ProdukReducer from './jersey'
import KeranjangReducer from './keranjang'
import PaymentReducer from './payment'
import PesananReducer from './pesanan'
import HistoryReducer from './history'


const rootReducer = combineReducers({
    RajaOngkirReducer,
    AuthReducer,
    ProfileReducer,
    KategoriReducer,
    ProdukReducer,
    KeranjangReducer,
    PaymentReducer,
    PesananReducer,
    HistoryReducer
});

export default rootReducer