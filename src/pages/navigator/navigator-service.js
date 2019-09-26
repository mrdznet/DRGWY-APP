import api from '../../utils/api';
import common from '../../utils/common';

export default {
    getFeeStatistics(pageIndex, OrganizeId, pageSize = 10) {
        return api.postData('/api/MobileMethod/MGetFeeStatistics', {pageIndex, pageSize, OrganizeId});
    },
    //楼栋
    getBuildings(keyValue) {
        return api.getData('/api/MobileMethod/MGetPStructs', {keyValue, type: 2});
    },
    //楼层
    getFloors(keyValue) {
        return api.getData('/api/MobileMethod/MGetPStructs', {keyValue, type: 4});
    },
    //房间
    getRooms(keyValue) {
        return api.getData('/api/MobileMethod/MGetPStructs', {keyValue, type: 5});
    },
    //账单
    getBillList(type, id, pageIndex, pageSize = 10) {
        let url = '/api/MobileMethod/MGetNotChargeBillList';
        if (type === '已交') {
            url = '/api/MobileMethod/MGetChargeBillList';
        }
        return api.postData(url, {pageIndex, pageSize, queryJson: {unitId: id}});
    },
    //服务单
    serviceList(pageIndex, billStatus, treeType, treeTypeId, billType, startTime, endTime) {
        /*
        {:,TreeType:,TreeTypeId:BillType:,StartTime:,EndTime:,}
         */

        // if (billType === '报修') {
        //     url = '/api/MobileMethod/MGetRepairPageList';
        // } else if (billType === '投诉') {
        //     url = '/api/MobileMethod/MGetComplaintPageList';
        // }

        return api.postData('/api/MobileMethod/MGetServiceDeskPageList', {
            pageIndex,
            pageSize: 10,
            billStatus,
            status: billStatus,
            treeType,
            treeTypeId,
            billType,
            startTime,
            endTime,
        });
    },
    weixiuList(pageIndex, billStatus, treeType, treeTypeId, startTime, endTime, repairArea) {
        /*
        {:,TreeType:,TreeTypeId:BillType:,StartTime:,EndTime:,}
         */

        // if (billType === '报修') {
        //     url = '';
        // } else if (billType === '投诉') {
        //     url = '/api/MobileMethod/MGetComplaintPageList';
        // }

        return api.postData('/api/MobileMethod/MGetRepairPageList', {
            pageIndex,
            pageSize: 10,
            billStatus,
            status: billStatus,
            treeType,
            treeTypeId,
            startTime,
            endTime,
            repairArea,
        });
    },
    tousuList(pageIndex, billStatus, treeType, treeTypeId, billType, startTime, endTime) {
        return api.postData('/api/MobileMethod/MGetComplaintPageList', {
            pageIndex,
            pageSize: 10,
            billStatus,
            status: billStatus,
            treeType,
            treeTypeId,
            billType,
            startTime,
            endTime,
        });
    },
    // //服务单详情
    // serviceDetail(type,keyValue) {
    //     let url = '/api/MobileMethod/MGetServicedeskEntity';
    //     if (billType === '报修') {
    //         url = '/api/MobileMethod/MGetRepairEntity';
    //     } else if (billType === '投诉') {
    //         url = '/api/MobileMethod/MGetComplaintEntity';
    //     }
    //     return api.getData(url,{keyValue});
    // }

    collectionRate(page, estateId, type) {
        let url;
        switch (page) {
            case 1: {
                url = '/api/MobileMethod/MGetCollectionRate';
                break;
            }
            case 2: {
                url = '/api/MobileMethod/MGetCashFlow';
                break;
            }
            case 3: {
                url = '/api/MobileMethod/MGetArrearsAge';
                break;
            }
            case 4: {
                url = '/api/MobileMethod/MGetRepairCompletionRate';
                break;
            }
            case 5: {
                url = '/api/MobileMethod/MGetComplaintCompletionRate';
                break;
            }
            case 6: {
                url = '/api/MobileMethod/MGetVisitSatisfactionRate';
                break;
            }
            default:
                break;
        }
        return api.postData(url, {estateId, type});
    },


};
