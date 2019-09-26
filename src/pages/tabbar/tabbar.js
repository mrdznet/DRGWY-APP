import React, {Component} from 'react';
import {Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import {
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator,
    createDrawerNavigator,
} from 'react-navigation';
import BuildingPage from '../building/building';
import WorkPage from '../work/work';
import MinePage from '../mine/mine';
import NavigatorPage from '../navigator/navigator';
import HomePage from '../home/home';
import SecondDetailBuildingPage from '../building/second-detail-buinding/second-detail-buinding';
import ManagerBuildingPage from '../../pages/building/manager-building/manager-building';
import DetailBuildingPage from '../building/detail-building/detail-building';
import BuildingsPage from '../building/buildings/buildings';
import FeeStatisticPage from '../navigator/fee-statistic/fee-statistic';
import {Icon} from '@ant-design/react-native';
import AddWorkPage from '../work/add-work';
import PersonInfoPage from '../mine/person-info';
import SettingPage from '../mine/setting';
import ModifyPsdPage from '../mine/modify-psd';
import SelectAddressPage from '../work/select-address';
import TaskListPage from '../work/task/task-list';
import FuWuDanListDetailPage from '../work/task/fu-wu-dan-list-detail';
import PaiDanListDetailPage from '../work/task/pai-dan-list-detail';
import JieDanListDetailPage from '../work/task/jie-dan-list-detail';
import KaiGongListDetailPage from '../work/task/kai-gong-list-detail';
import WanChengListDetailPage from '../work/task/wan-cheng-list-detail';
import FeeHousePage from '../navigator/fee-housing';
import FeeBuildingsPage from '../navigator/fee-buildings';
import FeeRoomsPage from '../navigator/fee-rooms';
import FeeDetailPage from '../navigator/fee-detail';
import CollectionRatePage from '../navigator/analyse/collection-rate';
import ZiJinLiuPage from '../navigator/analyse/zijinliu';
import QianFeiZhangLingPage from '../navigator/analyse/qian-fei-zhang-ling';
import WeiXiuRatePage from '../navigator/analyse/wei-xiu';
import TouSuPage from '../navigator/analyse/tou-su';
import HuiFangRatePage from '../navigator/analyse/hui-fang';

import EstateFuwuPage from '../navigator/estate/estate-fuwu';
import EfuwuDetailPage from '../navigator/estate/estate-fuwu-detail';
import EtousuDetailPage from '../navigator/estate/estate-tousu-detail';
import EweixiuDetailPage from '../navigator/estate/estate-weixiu-detail';
import EstateWeixiuPage from '../navigator/estate/estate-weixiu';
import EstateTousuPage from '../navigator/estate/estate-tousu';
import JianYanListDetailPage from '../work/task/jian-yan-list-detail';
import HuiFangDetailPage from '../work/task/hui-fang-detail';
import ScanScreen from '../navigator/qrcode-scanner';


const BuildingNavigator = createStackNavigator({

    Building: {
        screen: BuildingPage,
        navigationOptions: (navigation) => ({
            title: '楼宇',
            headerBackTitle: null,
            header: null,
        }),
    },
    SecondDetail: SecondDetailBuildingPage,
    DetailBuilding: DetailBuildingPage,
    Buildings: BuildingsPage,
    Home: HomePage,
    scan: ScanScreen,


});
BuildingNavigator.navigationOptions = ({navigation}) => ({
    tabBarVisible: navigation.state.index === 0,
});


const navigatorNavigator = createStackNavigator({


    Navigator: {
        screen: NavigatorPage,
    },
    FeeStatistic: {
        screen: FeeStatisticPage,
        navigationOptions: () => ({
            title: '统计分析',
        }),
    },
    feeRooms: FeeRoomsPage,
    feeBuildings: FeeBuildingsPage,
    feeHouse: FeeHousePage,
    e_fuwu: EstateFuwuPage,
    feeDetail: FeeDetailPage,
    fuwuD: EfuwuDetailPage,
    weixiuD: EweixiuDetailPage,
    tousuD: EtousuDetailPage,
    e_weixiu: EstateWeixiuPage,
    e_tousu: EstateTousuPage,

    collection: CollectionRatePage,
    zijinliu: ZiJinLiuPage,
    qianfei: QianFeiZhangLingPage,
    weixiu_s: WeiXiuRatePage,
    tousu_s: TouSuPage,
    huifang_s: HuiFangRatePage,
    scana: ScanScreen,


});
navigatorNavigator.navigationOptions = ({navigation}) => ({
    tabBarVisible: navigation.state.index === 0,
});
const WorkNavigator = createStackNavigator({
    // select: SelectAddressPage,
    // AddWork: AddWorkPage,
    // Task: TaskListPage,


    Work: {
        screen: WorkPage,
        navigationOptions: () => ({
            title: '工作台',
            headerBackTitle: null,
        }),
    },
    AddWork: AddWorkPage,
    select: SelectAddressPage,
    service: FuWuDanListDetailPage,
    wancheng: WanChengListDetailPage,
    jianyan: JianYanListDetailPage,
    kaigong: KaiGongListDetailPage,
    jiedan: JieDanListDetailPage,
    paidan: PaiDanListDetailPage,
    huifang: HuiFangDetailPage,

    Task: TaskListPage,


});
WorkNavigator.navigationOptions = ({navigation}) => ({
    tabBarVisible: navigation.state.index === 0,
});
const MineNavigator = createStackNavigator({
    Mine: {
        screen: MinePage,
        navigationOptions: () => ({
            title: '我的',
            headerBackTitle: null,
        }),
    },
    Person: PersonInfoPage,
    Setting: SettingPage,
    ModifyPsd: ModifyPsdPage,
});
MineNavigator.navigationOptions = ({navigation}) => ({
    tabBarVisible: navigation.state.index === 0,
});

const tabbar = createBottomTabNavigator({
    // Mine: {
    //     screen: MineNavigator,
    //     navigationOptions: () => ({
    //         title: '我',
    //         headerBackTitle: null,
    //     }),
    // },
    //
    Navigator: {
        screen: navigatorNavigator,
        navigationOptions: () => ({
            title: '导航',
            headerBackTitle: null,
        }),
    },
    Building: {
        screen: BuildingNavigator,
        navigationOptions: () => ({
            title: '楼宇',
            headerBackTitle: null,
        }),
    },


    Work: {
        screen: WorkNavigator,
        navigationOptions: () => ({
            title: '工作台',
            headerBackTitle: null,
        }),
    },


    // Work: {
    //     screen: WorkNavigator,
    //     navigationOptions: () => ({
    //         title: '工作台',
    //         headerBackTitle: null,
    //     }),
    // },
    Mine: {
        screen: MineNavigator,
        navigationOptions: () => ({
            title: '我',
            headerBackTitle: null,
        }),
    },

}, {
    tabBarOptions: {
        activeTintColor: '#2491C4',
        inactiveTintColor: '#6F757C',
        labelStyle: {
            fontSize: 14,
        },
        tabStyle: {
            // padding:1
        },

    },
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let imageUrl;
            if (routeName === 'Building') {
                if (focused) {
                    imageUrl = require('../../static/images/tabbar/home_select.png');
                } else {
                    imageUrl = require('../../static/images/tabbar/home.png');
                }
            } else if (routeName === 'Navigator') {
                if (focused) {
                    imageUrl = require('../../static/images/tabbar/goods_select.png');
                } else {
                    imageUrl = require('../../static/images/tabbar/goods.png');
                }
            } else {
                if (focused) {
                    imageUrl = require('../../static/images/tabbar/mine_select.png');
                } else {
                    imageUrl = require('../../static/images/tabbar/mine.png');
                }
            }


            // You can return any component that you like here!
            return <Image
                style={{width: 18, height: 21}}
                source={imageUrl}
            />;
        },
    }),

});
const {width, height} = Dimensions.get('window');

const Drawer = createDrawerNavigator({
        TabBar: {
            screen: tabbar,
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        drawerPosition: 'left',
        drawerWidth: width * 0.8,
        drawerLockMode: 'locked-closed',
        useNativeAnimations: true,
        contentComponent: props => {
            return <ManagerBuildingPage {...props}/>;
        },
    });


export default createAppContainer(Drawer);
