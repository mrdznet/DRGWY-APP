import React, { Fragment } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl, Modal,
} from 'react-native';
import BasePage from '../../base/base';
import { Icon, Radio } from '@ant-design/react-native/lib/index';
import { List, WhiteSpace, Flex, TextareaItem, Grid, Button } from '@ant-design/react-native/lib/index';
import ScreenUtil from '../../../utils/screen-util';
import LoadImage from '../../../components/load-image';
import SelectImage from '../../../utils/select-image';
import common from '../../../utils/common';
import UDRecord from '../../../utils/UDRecord';
import api from '../../../utils/api';
import UDPlayer from '../../../utils/UDPlayer';

import UDToast from '../../../utils/UDToast';
import DashLine from '../../../components/dash-line';
import WorkService from '../work-service';
import UploadImageView from '../../../components/upload-image-view';
import Communicates from '../../../components/communicates';
import ListImages from '../../../components/list-images';
import Macro from '../../../utils/macro';
import CommonView from '../../../components/CommonView';
import ImageViewer from 'react-native-image-zoom-viewer';


const Item = List.Item;

export default class JianYanListDetailPage extends BasePage {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '维修检验',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='left' style={{ width: 30, marginLeft: 15 }} />
                </TouchableOpacity>
            ),

        };
    };

    constructor(props) {
        super(props);
        let fuwu = common.getValueFromProps(this.props);
        let type = common.getValueFromProps(this.props, 'type');
        this.state = {
            value: '',
            fuwu,
            type,
            result: 1,
            images: [],
            detail: {},
            communicates: [],
            lookImageIndex: 0,
            visible: false,
        };
        console.log(this.state);
    }

    componentDidMount(): void {
        this.getData();
    }


    getData = () => {
        const { fuwu, type } = this.state;
        // console.log('fuw', fuwu);
        WorkService.weixiuDetail(fuwu.id).then(detail => {
            // console.log('detail', detail);
            this.setState({
                detail: {
                    ...detail.entity,
                    serviceDeskCode: detail.serviceDeskCode,
                    relationId: detail.relationId,
                    statusName: detail.statusName,
                },
            });
            WorkService.serviceCommunicates(detail.relationId).then(res => {
                this.setState({
                    communicates: res,
                });
            });
        });

        // WorkService.serviceExtra(fuwu.id).then(images => {
        WorkService.weixiuExtra(fuwu.id).then(images => {
            this.setState({
                images,
            });
        });
    };

    click = (handle) => {
        const { fuwu, type, value, result } = this.state;
        if (handle === '完成检验' && !(value && value.length > 0)) {
            UDToast.showInfo('请输入文字');
            return;
        }
        WorkService.serviceHandle(handle, fuwu.id, value, { result }).then(res => {
            UDToast.showInfo('操作成功');
            this.props.navigation.goBack();
        });
    };

    communicateClick = (i) => {
        let c = this.state.communicates;
        let d = c.map(it => {
            if (it.id === i.id) {
                it.show = i.show !== true;
            }
            return it;
        });
        this.setState({
            communicates: d,
        });
    };
    cancel = () => {
        this.setState({
            visible: false,
        });
    };

    lookImage = (lookImageIndex) => {
        this.setState({
            lookImageIndex,
            visible: true,
        });
    };

    render() {
        const { images, detail, communicates } = this.state;
        return (
            <CommonView style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 10 }}>
                <ScrollView>
                    <Flex style={[styles.every, ScreenUtil.borderBottom()]} justify='between'>
                        <Text style={styles.left}>{detail.billCode}</Text>
                        <Text style={styles.right}>{detail.statusName}</Text>
                    </Flex>
                    <Flex style={[styles.every2]} justify='between'>
                        <Text style={styles.left}>{detail.address} {detail.contactName}</Text>
                        <TouchableWithoutFeedback onPress={() => common.call(detail.contactLink)}>
                            <Flex><LoadImage style={{ width: 30, height: 30 }} /></Flex>
                        </TouchableWithoutFeedback>
                    </Flex>
                    <DashLine />
                    <Text style={styles.desc}>{detail.repairContent}</Text>
                    <DashLine />
                    <ListImages images={images} lookImage={this.lookImage} />
                    <Flex style={[styles.every2]} justify='between'>
                        <Text style={styles.left}>转单人：{detail.createUserName} {detail.createDate}</Text>
                    </Flex>
                    <TouchableWithoutFeedback>
                        <Flex style={[styles.every]}>
                            <Text style={styles.left}>关联单：</Text>
                            <Text onPress={() => this.props.navigation.navigate('service', { data: { id: detail.relationId } })}
                                style={[styles.right, { color: Macro.color_4d8fcc }]}>{detail.serviceDeskCode}</Text>
                        </Flex>
                    </TouchableWithoutFeedback>
                    <DashLine />
                    <Flex justify={'between'} style={{ margin: 15 }}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ result: 1 })}>
                            <Flex>
                                {/* <LoadImage style={{ width: 15, height: 15 }} /> */}
                                <Radio style={{ width: 15, height: 15 }}/>
                                <Text style={{ color: '#666', fontSize: 15, paddingLeft: 15 }}>合格</Text>
                            </Flex>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.setState({ result: 0 })}>
                            <Flex>
                                {/* <LoadImage style={{ width: 15, height: 15 }} /> */}
                                <Radio style={{ width: 15, height: 15 }} />
                                <Text style={{ color: '#666', fontSize: 15, paddingLeft: 15 }}>不合格</Text>
                            </Flex>
                        </TouchableWithoutFeedback>
                    </Flex>
                    <View style={{
                        margin: 15,
                        borderStyle: 'solid',
                        borderColor: '#F3F4F2',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}>
                        <TextareaItem
                            rows={4}
                            placeholder='检验建议'
                            style={{ fontSize: 14, paddingTop: 10, height: 100, width: ScreenUtil.deviceWidth() - 32 }}
                            onChange={value => this.setState({ value })}
                            value={this.state.value}
                        />
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.click('完成检验')}>
                        <Flex justify={'center'} style={[styles.ii, { width: '80%', marginLeft: '10%', marginRight: '10%', marginBottom: 20 }, { backgroundColor: Macro.color_4d8fcc }]}>
                            <Text style={styles.word}>完成检验</Text>
                        </Flex>
                    </TouchableWithoutFeedback>
                    <Communicates communicateClick={this.communicateClick} communicates={communicates} />
                </ScrollView>
                <Modal visible={this.state.visible} onRequestClose={this.cancel} transparent={true}>
                    <ImageViewer index={this.state.lookImageIndex} onCancel={this.cancel} onClick={this.cancel}
                        imageUrls={this.state.images} />
                </Modal>
            </CommonView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#F3F4F2',

    },
    every: {
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
    },
    every2: {
        marginLeft: 15,
        marginRight: 15,
        paddingBottom: 10,
        paddingTop: 10,
    },
    left: {
        fontSize: 14,
        color: '#333',
    },
    right: {
        fontSize: 14,
        color: '#333',
    },
    desc: {
        padding: 15,
        paddingBottom: 40,
    },
    ii: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: (ScreenUtil.deviceWidth() - 15 * 2 - 20 * 2) / 3.0,
        backgroundColor: '#999',
        borderRadius: 6,
        marginBottom: 20,
    },
    word: {
        color: 'white',
        fontSize: 16,
    },

});
