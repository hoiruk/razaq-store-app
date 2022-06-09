import { 
    GET_LIST_PRODUK, 
    GET_LIST_PRODUK_BY_KATEGORI, 
    DELETE_PARAMETER_PRODUK,
    SAVE_KEYWORD_PRODUK
} from '../../actions/JerseyAction'

const initialState = {
    getListProdukLoading: false,
    getListProdukResult: false,
    getListProdukError: false,

    idKategori: false,
    namaKategori: false,
    keyword: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_LIST_PRODUK:
            
            return {
                ...state,
                getListProdukLoading: action.payload.loading,
                getListProdukResult: action.payload.data,
                getListProdukError: action.payload.errorMessage,
            }
        case GET_LIST_PRODUK_BY_KATEGORI:
            
            return {
                ...state,
                idKategori: action.payload.idKategori,
                namaKategori: action.payload.namaKategori,
            }
        case DELETE_PARAMETER_PRODUK:
            return {
                ...state,
                idKategori: false,
                namaKategori: false,
                keyword: false
            }
        case SAVE_KEYWORD_PRODUK:
            return {
                ...state,
                keyword: action.payload.data
            }
        default:
            return state
    }

}