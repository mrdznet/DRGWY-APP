import api from '../../utils/api';
import common from '../../utils/common';

export default {
    getUserInfo() {
        return api.getData('/api/MobileMethod/MGetUserInfo');
    },
    changePsd(psd, old) {
        let password = common.jiami(psd);
        let oldPassword = common.jiami(old);
        return api.postData('/api/MobileMethod/ChangePassword', {password, oldPassword});
    },
};
