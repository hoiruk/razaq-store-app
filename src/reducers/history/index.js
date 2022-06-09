import { GET_LIST_HISTORY, UPDATE_STATUS } from '../../actions/HistoryAction'

const initialState = {

    getListHistoryLoading: false,
    getListHistoryResult: false,
    getListHistoryError: false,

    updateStatusHistoryLoading: false,
    updateStatusHistoryResult: false,
    updateStatusHistoryError: false,
}

export default function (state = initialState, action) {

    switch(action.type) {
        
        case GET_LIST_HISTORY:
            return {
                ...state,
                getListHistoryLoading: action.payload.loading,
                getListHistoryResult: action.payload.data,
                getListHistoryError: action.payload.errorMessage,
            }

        case UPDATE_STATUS:
            return {
                ...state,
                updateStatusHistoryLoading: action.payload.loading,
                updateStatusHistoryResult: action.payload.data,
                updateStatusHistoryError: action.payload.errorMessage,
            }

            default:
                return state
    }
}