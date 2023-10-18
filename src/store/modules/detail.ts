import { defineStore } from 'pinia'
import { reqHospitalDetail, reqHospitalDepartment } from '@/api/detail'


const useDetailStore = defineStore('detail',{
    state: ()=>{
        return {
            details: {},
            departments: []
        }
    },
    actions:{
        // 获取医院详情的方法
        async getHospitalDetail(hoscode:string){
            let res = await reqHospitalDetail(hoscode)
            if(res.code === 200){
                this.details = res.data
            }
        },
        async getHospitalDepartment(hoscode:string){
            let res = await reqHospitalDepartment(hoscode)
            if(res.code === 200){
                this.departments = res.data
            }
        },
    },
    getters:{

    }
})

export default useDetailStore