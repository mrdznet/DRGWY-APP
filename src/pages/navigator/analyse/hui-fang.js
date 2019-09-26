import React, {Fragment} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    ScrollView,
    SectionList,
    TouchableWithoutFeedback,
    ImageBackground,
    Animated,
    FlatList,
    Image, TouchableOpacity,
} from 'react-native';

import BasePage from '../../base/base';
import BuildingHeader from '../../../components/building/building-header';
import BuildingCell from '../../../components/building/build-cell';
import {Button, Flex, Icon, List, WhiteSpace, SegmentedControl} from '@ant-design/react-native';
import Macro from '../../../utils/macro';
import forge from 'node-forge';
import LoadImage from '../../../components/load-image';
import {connect} from 'react-redux';
import {saveSelectBuilding} from '../../../utils/store/actions/actions';
import ScreenUtil from '../../../utils/screen-util';
import common from '../../../utils/common';
import SelectHeader from '../../../components/select-header';
import Echarts from 'native-echarts';
import AreaInfo from '../../../components/area-info';
import ScrollTitle from '../../../components/scroll-title';
import DashLine from '../../../components/dash-line';
import NavigatorService from '../navigator-service';
import ScrollTitleChange from '../../../components/scroll-title-change';
import {Row, Rows, Table} from 'react-native-table-component';


class HuiFangRatePage extends BasePage {

    static navigationOptions = ({navigation}) => {


        return {
            tabBarVisible: false,
            title: '回访满意度',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='left' style={{width: 30, marginLeft: 15}}/>
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                    <Icon name='bars' style={{marginRight: 15}} color="black"/>
                </TouchableWithoutFeedback>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            selectBuilding: this.props.selectBuilding || {},
            statistics: [],
        };
    }

    componentDidMount(): void {
        this.getStatustics();
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        const selectBuilding = this.state.selectBuilding;
        const nextSelectBuilding = nextProps.selectBuilding;
        if (!(selectBuilding && nextSelectBuilding && selectBuilding.key === nextSelectBuilding.key)) {
            this.setState({selectBuilding: nextProps.selectBuilding}, () => {
                this.onRefresh();
            });
        }

    }
    getStatustics = () => {
        NavigatorService.getFeeStatistics(1,this.state.selectBuilding.key,100000).then(statistics=>{
            console.log(1,statistics)
            this.setState({statistics:statistics.data || []});
        })
    }

    onRefresh = () => {

    };
    titleChange = (index) => {
        // this.getStatustics();
        const {statistics} = this.state;
        let item = statistics[index-1];
        this.setState({
            estateId: item.id
        },()=>{
            this.getStatustics();
        })

    };
    typeChange = (title,index) => {
        this.setState({
            type: index+1
        },()=>{
            this.getStatustics();
        })
    };


    render() {
        const {statistics, dataInfo} = this.state;
        const titles = [...['全部'],...statistics.map(item=>item.name)];
        console.log('t',titles)
        const option = {
            title: {
                text: '',
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                // formatter: '{a} <br/>{b} : {c}'
            },
            legend: {
                left: 'center',
                data: ['邮件营销'],
            },
            xAxis: {
                type: 'category',
                name: 'x',
                splitLine: {show: false},
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            yAxis: {
                type: 'value',
                name: 'y',
                data: ['0', '20', '40', '60', '80', '100'],

            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',

                    data: [12, 13, 10, 14, 9, 23, 21, 12, 3, 4, 6, 80],
                },

            ],
        };
        const tableHead = ['月份', '满意', '一般', '不满意'];
        const tableData = [
            ['1','2','12','7'],
            ['2','2','12','7'],
            ['3','2','12','7'],
            ['4','2','12','7'],
            ['5','2','12','7'],
            ['6','2','12','7'],
            ['7','2','12','7'],
            ['8','2','12','7'],
            ['9','2','12','7'],
            ['10','2','12','7'],
            ['11','2','12','7'],
            ['12','2','12','7'],
        ];

        return (

            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <ScrollTitleChange titles={titles}/>
                    <DashLine style={{marginTop: 10, marginLeft: 15, marginRight: 15}}/>
                    <AreaInfo style={{marginTop: 15}}/>
                    <DashLine style={{marginTop: 15, marginLeft: 15, marginRight: 15}}/>

                    <Echarts option={option} height={300}/>
                    <Table style={{margin:15}} borderStyle={{borderWidth: 2, borderColor: '#eee'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={tableData} textStyle={styles.text}/>
                    </Table>


                </ScrollView>


            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    header: {},
    left: {

        width: ScreenUtil.deviceWidth() / 3.0 - 15,

        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ccc',
        marginLeft: 15,
        height: 30,

    },
    right: {

        width: ScreenUtil.deviceWidth() / 3.0 * 2 - 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ccc',
        height: 30,

    },
    leftText: {
        fontSize: 14,
        color: '#666',
    },
    rightText: {
        fontSize: 14,
        color: '#666',
    },
    text: {
        textAlign: 'center',
        paddingTop:5,
        paddingBottom:5,
        color: '#666',
    },
    name: {
        color: '#666',
        fontSize: 14,
        paddingLeft: 10,
    },
});

const mapStateToProps = ({buildingReducer}) => {
    return {
        selectBuilding: buildingReducer.selectBuilding,
    };
};
export default connect(mapStateToProps)(HuiFangRatePage);
