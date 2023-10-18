export interface ResponseData{
    code: number,
    message: string,
    ok: boolean
}

export interface Hospital{
    id: number,
    createTime: string,
    updateTime: string,
    isDeleted: number,
    param: {
        hostypeString: string,
        fullAddress: string
    },
    hoscode: string,
    hosname: string,
    hostype: string,
    provinceCode: string,
    cityCode: string,
    districtCode: string,
    address: string,
    logoData: string,
    intro: string,
    status: number,
    bookingRule: {
        cycle: number,
        releaseTime: string,
        stopTime: string,
        quitDay: number,
        quitTime: string,
        rule: string[]
    }
}

export type Content = Hospital[]

export interface HospitalResponseData extends ResponseData{
    data:{
        content: Content,
        pageable: {
            sort: {
                sorted: boolean,
                unsorted: boolean,
                empty: boolean
            },
            pageNumber: number,
            pageSize: number,
            offset: number,
            unpaged: boolean,
            paged: boolean
        },
        totalPages: number,
        last: boolean,
        totalElements: number,
        first: boolean,
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        numberOfElements: number,
        size: number,
        number: number,
        empty: boolean
    }
}


export  interface HostpitalLevelAndRegion{
    id: number,
    createTime: string,
    dictCode: string,
    hasChildren: boolean,
    isDeleted: number,
    name: string,
    param: {},
    parentId: number,
    updateTime: string,
    value: string
}

export type HostpitalLevelAndRegionArr = HostpitalLevelAndRegion[]

export interface HostpitalLevelAndRegionResData extends ResponseData{
    data: HostpitalLevelAndRegionArr
}

