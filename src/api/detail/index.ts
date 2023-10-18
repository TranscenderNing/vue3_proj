import request from "@/utils/request"

enum API{
    HOSPITAL_DETAIL_URL = '/hosp/hospital/',
    HOSPITAL_DEPARTMENT_URL = '/hosp/hospital/department/',
    GET_USERCODE_URL = '/sms/send/',
    USER_LOGIN = '/user/login',
    WX_LOGIN_URL = '/user/weixin/getLoginParam/',
    HOSPITAL_WORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    HOSPITAL_DOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
    GET_USER_URL = '/user/patient/auth/findAll',
    GET_DOCTOR_URL = '/hosp/hospital/getSchedule/'
}

export const reqHospitalDetail = (hascode: string)=>{
    return request.get<any,any>(API.HOSPITAL_DETAIL_URL + hascode)
}


export const reqHospitalDepartment = (hascode: string)=>{
    return request.get<any,any>(API.HOSPITAL_DEPARTMENT_URL + hascode)
}


export const reqUsercode = (phone: string)=>{
    return request.get<any,any>(API.GET_USERCODE_URL + phone)
}


export const reqUserLogin = (data: any)=>{
    return request.post<any,any>(API.USER_LOGIN,data)
}



export const reqWxLogin = (wxRedirectUri: string)=>{
    return request.get<any,any>(API.WX_LOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`)
}


export const reqHospitalWork = (page: number,limit: number, hoscode: string, depcode: string)=>{
    return request.get<any,any>(API.HOSPITAL_WORK_URL+ `${page}/${limit}/${hoscode}/${depcode}`)
}


export const reqHospitalDoctor = (hoscode: string, depcode:string, workDate: string)=>{
    return request.get<any,any>(API.HOSPITAL_DOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)
}

export const reqUser = ()=>{
    return request.get<any,any>(API.GET_USER_URL)
}


export const reqDoctorInfo = (scheduleId:string)=>{
    return request.get<any,any>(API.GET_DOCTOR_URL+scheduleId)
}



