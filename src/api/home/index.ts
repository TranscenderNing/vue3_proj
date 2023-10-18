import request from "@/utils/request"
import { HospitalResponseData } from './type'

enum API{
    HOSPITAL_URL = '/hosp/hospital/',
    HOSPITAL_LEVEL_URL = '/cmn/dict/findByDictCode/',
    HOSPITAL_INFO = '/hosp/hospital/findByHosname/'
}

export const reqHospital = (page: number, limit: number, hostype='', districtCode='')=>{
    return request.get<any,HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
}

export const reqHospitalLevelAndRegion = (dictCode:string)=>{
    return request.get<any,any>(API.HOSPITAL_LEVEL_URL + dictCode)
}

export const reqHospitalByKeyword = (hosname:string)=>{
    return request.get<any,any>(API.HOSPITAL_INFO + hosname)
}