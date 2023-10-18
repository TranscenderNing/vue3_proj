import request from "@/utils/request";

enum API{
    SUBMIT_ORDER_URL='/order/orderInfo/auth/submitOrder/',
    ORDER_DETAIL_URL = '/order/orderInfo/auth/getOrderInfo/',
    CANCLE_ORDER_URL  = '/order/orderInfo/auth/cancelOrder/',
    QRCODE_URL = '/order/weixin/createNative/',
    PAY_STATUS_URL = '/order/weixin/queryPayStatus/',
    USER_INFO_URL = '/user/auth/getUserInfo',
    CERTIFICATION_TYPE_URL = '/cmn/dict/findByDictCode/',
    USER_CERTIFICATION_URL = '/user/auth/userAuah',
    ORDER_LIST_URL = '/order/orderInfo/auth/',
    ALL_PATIENT_URL = '/user/patient/auth/findAll',
    ALL_ORDER_STATUS_RUL = '/order/orderInfo/auth/getStatusList',
    CITY_URL = '/cmn/dict/findByParentId/',
    ADD_PATIENT_URL = '/user/patient/auth/save',
    UPDATE_PATIENT_URL = '/user/patient/auth/update',
    DELETE_PATIENT_URL = '/user/patient/auth/remove/'
}


export const reqSubmitOrder = (hoscode:string, scheduleId:string, patientId:number)=>{
    return request.post<any,any>(API.SUBMIT_ORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)
}

export const reqOrderDetail = (id:string)=>{
    return request.get<any,any>(API.ORDER_DETAIL_URL+id)
}

export const reqCancelOrder = (id:string)=>{
    return request.get<any,any>(API.CANCLE_ORDER_URL+id)
}

export const reqQrcode = (id:string)=>{
    return request.get<any,any>(API.QRCODE_URL+id)
}

export const reqQuerqyPayState = (id:string)=>{
    return request.get<any,any>(API.PAY_STATUS_URL+id)
}


export const reqUserInfo = ()=>{
    return request.get<any,any>(API.USER_INFO_URL)
}


export const reqCertificationType = (dictCode:any)=>{
    return request.get<any,any>(API.CERTIFICATION_TYPE_URL+dictCode)
}

export const reqUserCertification = (data:any)=>{
    return request.post<any,any>(API.USER_CERTIFICATION_URL,data)
}

export const reqOrderList = (page: number,limit: number, patientId: string, orderStatus: string)=>{
    return request.get<any,any>(API.ORDER_LIST_URL+`${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
}

export const reqAllPatients = ()=>{
    return request.get<any,any>(API.ALL_PATIENT_URL)
}

export const reqAllOrderStatus = ()=>{
    return request.get<any,any>(API.ALL_ORDER_STATUS_RUL)
}


export const reqCity = (parentId:string)=>{
    return request.get<any,any>(API.CITY_URL+parentId)
}

export const reqAddOrUpdatePatient = (data:any)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATE_PATIENT_URL,data)
    }else{
        return request.post<any,any>(API.ADD_PATIENT_URL,data)
    }
}

export const reqDeletePatient = (id:number)=>{
    return request.delete<any,any>(API.DELETE_PATIENT_URL+id)
}



