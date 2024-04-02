//REPLACE_ITEMS_START//
//version=2.1.2//
class RIF {
    static Match(string, replaceMatch, rString) {
        return ((replaceMatch === 'full' && string === rString) || (replaceMatch === 'inc' && string.includes(rString)) || false)
    }
    constructor(input = {}) {
        this.items = [document]
        this.mode = input.mode || 'text'
        this.match = input.match || 'full'
        this.replaceFunctions = input.func || []
        this.fullReplace = input.full || false
    }
    st = (obj) => {
        this.mode = obj.mode || this.mode
        this.match = obj.match || this.match
        this.replaceFunctions = obj.func ? [...this.replaceFunctions, ...obj.func] : this.replaceFunctions
        this.fullReplace = obj.full || this.fullReplace
    }
    get before() {
        this.items = this.items
            .filter(item => item && item.previousElementSibling)
            .map(item => item.previousElementSibling);
        return this
    }
    get next() {
        this.items = this.items
            .filter(item => item && item.nextElementSibling)
            .map(item => item.nextElementSibling);
        return this
    }
    get first() {
        this.items = this.items
            .filter(item => item && item.firstElementChild)
            .map(item => item.firstElementChild);
        return this
    }
    get all() {
        this.items = this.items
            .filter(item => item && item.children && item.children.length)
            .map(item => Array.from(item.children))
            .reduce((acc, children) => acc.concat(children), []);
        return this
    }
    index = (index) => {
        this.items = this.items
            .filter(item => item && item.children && item.children.length)
            .map(item => item.children[index]);
        return this
    }
    haveStyle = (styles) => {
        this.items = this.items
            .filter(item => { try { let style_ = item.getAttribute("style"); return style_ && style_.includes(styles) } catch { return false } });
        return this
    }
    isStyle = (styles) => {
        this.items = this.items
            .filter(item => { try { let style_ = item.getAttribute("style"); return style_ && (style_ === styles) } catch { return false } });
        return this
    }
    isClass = (ClassList) => {
        this.items = this.items
            .filter(item => item && item.classList === ClassList);
        return this
    }
    isId = (Id) => {
        this.items = this.items
            .filter(item => item && item.id === Id);
        return this
    }
    class = (className) => {
        this.items = this.items
            .filter(item => (item))
            .map(item => Array.from(item.querySelectorAll(`.${className}`)))
            .reduce((acc, children) => acc.concat(children), []);
        return this
    }
    id = (idValue) => {
        this.items = this.items
            .filter(item => (item))
            .map(item => Array.from(item.querySelectorAll(`#${idValue}`)))
            .reduce((acc, children) => acc.concat(children), []);
        return this
    }
    hasHtml = (html) => {
        if (html === '*') { return this }

        this.items = this.items
            .filter(item => (item.innerHTML.includes(html)))
        return this
    }
    isHtml = (html) => {
        this.items = this.items
            .filter(item => (item.innerHTML === html))
        return this
    }
    get fontCN() {
        this.replaceFunctions.push((div) => {
            div.style.fontFamily = "Noto Sans SC"
        })
        return this
    }


    REPLACE = (replaceObject) => {
        let mode = (
            (this.mode === 'html') ? 'innerHTML' :
                (this.mode === 'text') ? 'textContent' :
                    'error'
        )
        if (mode == 'error') { console.log('mode错误:', this.mode) }

        for (const [key, value] of Object.entries(replaceObject)) {
            this.items.forEach(item => {
                if (item && RIF.Match(item[mode], this.match, key)) {
                    if (this.match === 'full') {
                        item[mode] = value
                    } else if (this.match === 'inc') {
                        if (this.fullReplace) { item[mode] = value } else {
                            item[mode] = item[mode].replace(new RegExp(`${key}`, 'g'), value)
                        }
                    }
                    this.replaceFunctions.forEach(func => func(item))
                    window.__LOGGING__ += 1
                }
            })
        }
    }
    get click() {
        this.items.forEach(item => {
            const allProps = Object.keys(item);
            for (const prop of allProps) {
                if (prop.startsWith('__reactProps')) {
                    try { item[prop].onClick() } catch { }
                }
            }
        })

    }
    get enable() {
        this.items = this.items.forEach(item => {
            if (!(item.classList.contains(this.STATE))) { this.click }
        })
        return this
    }
    get disable() {
        this.items = this.items.forEach(item => {
            if (item.classList.contains(this.STATE)) { this.click }
        })
        return this
    }
    state = (STATE) => {
        this.STATE = STATE
        return this
    }
    get q() {
        const self = this
        return {
            to: (html) => {
                return {
                    get select() {
                        return self.class('button_KVN.button_KVN.multi-select_Roq').hasHtml(html).state('selected');
                    },
                    get CGE_chicked() {
                        return self.class('title_vqR').hasHtml(html).before.class('toggle_cca.item-mouse-states_Fmi.toggle_CGE').state('checked')
                    },
                    CGE_value: (value) => {
                        self.class('title_vqR').hasHtml(html).next.class('input_JvC.item-states_QjV')
                        self.items = self.items.forEach(item => {
                            item.value = value
                        })
                        return self
                    },
                    get obj() {
                        self.class('editor-item_VnW.editor-item-base_sYx.editor-widget_QQl').first.first.isHtml(html).next.state('checked')
                        return self
                    },
                    get clear() {
                        return self.class('button_WPv.button_dLA').hasHtml(html)
                    },
                    get picker() {
                        return self.class('picker-toggle_d6k')
                    }
                };
            }
        };
    }
}

function rif(...args) { return new RIF(...args) }
function RE(...args) {
    return args.reduce((result, value, index, array) => {
        if (index % 2 === 0) {
            const key = array[index];
            const val = array[index + 1];
            result.set(key, val);
        }
        return result;
    }, new Map());
}
function replaceContent() {
    window.__LOGGING__ = 0
    let addinfo = ''

    let time1 = new Date().getTime()
    try {
        const MAIN = {
            主界面: {
                版本: rif({ match: 'inc' }).class('version_VJt')
            },
            悬浮框: {
                标题: rif().class('balloon_qJY.balloon_H23.up_ehW.center_hug.anchored-balloon_AYp.up_el0').class('title_lCJ'),
                内容: rif().class('balloon_qJY.balloon_H23.up_ehW.center_hug.anchored-balloon_AYp.up_el0').class('paragraphs_nbD.description_dNa').first,
                提示: rif().class('tooltip-fade-in_S9n'),
                提示2: rif().class('value_uLz')
            },
            工具框: {
                标签: rif().class('tool-options-panel_Se6').class('label_RZX'),
                值: rif().class('tool-options-panel_Se6').class('number-field__Hd')
            },
            设置: {
                选项: rif().class('menu_hb1.child-opacity-transition_nkS').class('item_pq7.primary_Q54').first,
                标签: rif().class('option-page_CW8.option-section_VzQ').class('main-column_D0A').class('content_gqa').class('label_DGc.label_ZLb'),
                分类: rif().class('option-page_CW8.option-section_VzQ').class('main-column_D0A').class('breadcrumbs_xcd').class('label_sAz.label-level-1'),
                标题: rif().class('option-page_CW8.option-section_VzQ').class('info-column_uQ0').class('info-title_a3p'),
                描述: rif().class('option-page_CW8.option-section_VzQ').class('info-column_uQ0').class('info-description_wwd'),
                TAB: rif().class('option-page_CW8.option-section_VzQ').class('main-column_D0A').class('tab_P7S')
            },
            下拉框: {
                标签: rif().class('dropdown-item_sZT'),
                值: rif().class('dropdown-toggle_V9z').class('label_l_4')
            },
            按钮: rif().class('button_WWa.button_SH8'),
            工具栏: {
                资产详情: {
                    标题: rif().class('asset-detail-panel_hf8.detail-panel_izf').class('title-bar_I7O.child-opacity-transition_nkS').class('title_qub'),
                    描述: rif().class('asset-detail-panel_hf8.detail-panel_izf').class('content_rep.row_H0d.child-opacity-transition_nkS').class('column_dTT').class('paragraphs_nbD.description_ZQn').first
                }
            }
        }
        const 开发者模式 = {
            顶栏: {
                按钮: rif().class('tab-bar_b_c').class('button_BNH').fontCN
            },

            内容: {
                标签: rif().class('content_gqa').class('label_KyX').fontCN,
                按钮: rif().class('content_gqa').class('button_k8s').fontCN,
                标题: rif().class('content_gqa').class('title_Xkf').fontCN,
                值: rif().class('content_gqa').class('value_fMT').fontCN,
                折叠: rif().class('content_gqa').class('label_qS_').fontCN,
                控制值: rif().class('content_gqa').class('control_b3l').fontCN,
            }
        }
        const HOOKUI = {
            顶栏: {
                名称: rif({ mode: 'html', match: 'inc' }).class('content_XD5.content_AD7.child-opacity-transition_nkS').class('row_B8G')
            },
            面板: {
                标题: rif().class('title-bar_PF4').class('title_SVH.title_zQN'),
                内容: rif().class('content_XD5.content_AD7.child-opacity-transition_nkS'),
                标签: rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('label_DGc.label_ZLb'),
                标签2: rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('row_S2v'),
                标签_p: rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('row_S2v').all,
                头: rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('header_Ld7'),
                头描述: rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('header_MP_.header_8H_'),
                项目: rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('header-content_SqG.header-content_wUX').all,
            }
        }

        const 编辑器 = {
            通用: [
                rif().class('content_yeu').class('header-label_H79'),
                rif().class('content_yeu').class('toggle-label_UK9'),
                rif().class('content_yeu').class('label_OqN'),
                rif().class('content_yeu').class('label_BbZ'),
                rif().class('picker-popup_pUb').class('name_u39'),
                rif().class('content_yeu.content_AD7').class('page-view_PUO').class('name_u39'),

                rif().class('content_yeu').class('label_tNr'),
                rif().class('content_yeu').class('picker-toggle_d6k'),
                rif().class('dropdown-item_Hjk'),
                rif().class('label_tNr'),
                rif().class('toggle-flags-button_T7X'),
                rif().class('header_IuN').class('title_zQN'),
                rif().class('button_WPv')
            ],

            通用inc: [
                rif({match:'inc'}).class('content_yeu').class('header-label_H79'),
                rif({match:'inc'}).class('content_yeu').class('toggle-label_UK9'),
                rif({match:'inc'}).class('content_yeu').class('label_OqN'),
                rif({match:'inc'}).class('content_yeu').class('label_BbZ'),
                rif({match:'inc'}).class('picker-popup_pUb').class('name_u39'),
                rif({match:'inc'}).class('content_yeu.content_AD7').class('page-view_PUO').class('name_u39'),

                rif({match:'inc'}).class('content_yeu').class('label_tNr'),
                rif({match:'inc'}).class('content_yeu').class('picker-toggle_d6k'),
                rif({match:'inc'}).class('dropdown-item_Hjk'),
                rif({match:'inc'}).class('label_tNr'),
                rif({match:'inc'}).class('toggle-flags-button_T7X')

            ],

        }
        const REPLACE_ITEM_NEW = {
            开发者模式_模拟: RE(
                [开发者模式.内容.标签], {
                'Active tool': '激活工具',
                'Selected': '选中',
                'Taxi Starting Fee': '出租车起步价',
                'High-Speed Highways': '高速公路',
                'Advanced Pollution Management': '高级污染管理',
                'PreRelease Programs': '释前教育',
                'City Promotion': '城市宣传',
                'Allow gameplay manipulation': '允许游戏中操控',
                'Debug toggle': '调试选中',
                'Bypass validation results': '无碰撞',
                'Parallel Road':'并列',
                'Elevation':'高度',
                'Elevation Step':'高度阶段',
                'Sim speed': '模拟速度',
                'Smooth speed': '平滑速度',
                'Interpolation offset': '插值偏移',
                'Step Time (ms)': '步进时间 (ms)',
                'Disable trips': '禁用行程',
                'Debug Lifepath Chirps ': '调试生命周期轨迹',
                'Birth Chance': '出生几率',
                'Snap guide lines':'对齐导线',
                'Snap zone grid': '对齐功能区',

                'Atmosphere': '大气层',
                'Biome': '生态群落',
                'Water sim speed': '水模拟速度',
                'Time step override': '时间步长',
                'Time Step': '时间步长',
                'Current Time Step': '当前时间步长',
                'Max Velocity': '最大速度',
                'Use Active Cells Culling': '使用活动单元剔除',
                'Water Grid Size Multiplier': '水格大小',
                'Water grid size': '水格大小',
                'Flow number of Downscale': '流动降阶数量',
                'Blur flow': '流动模糊',
                'Enable flow Dounscale':'启用流动降阶',
                'Flow limiter for render': '流动渲染限制器',
                'Max Water Flow Length for render': '最大渲染水流长度',
                'Water Flow Render Multiplier': '水流渲染倍增',
                'Climate time': '气候时间',
                'Override Climate time': '气候时间 覆盖',
                'Current climate': '当前气候',
                'Current season': '当前季节',
                'Temperature': '温度',
                'Override Temperature': '覆盖 温度',
                'Snow sim speed': '雪模拟速度',
                'Cloudiness': '云',
                'Override Cloudiness': '云 覆盖',
                'Aurora': '极光',
                'Override Aurora': '极光 覆盖',
                'Precipitation volume scale': '降水量比例',
                'Global VFX time from Simulation time': '全局视觉效果时间与模拟时间关联',
                'Weather VFX time from Simulation time': '天气视觉效果时间与模拟时间关联',
                'Temperature Electricity Consumption Multiplier': '气温电力消耗倍增',
                'Time/Date': '时间/日期',
                'Latitude': '纬度',
                'Longitude': '经度',
                'Day of year': '天 (年)',
                'Day of year (Moon)': '天 (日夜)',
                'Time of day': '时间',
                'Time of day multiplier': '时间流速倍增',
                'Number of lunar cycles per year': '每年的月球周期数',
                'Override time for debug': '时间 覆盖',
                'Superfast building spawning': '超快速 建筑生成',
                'Superfast area-prop spawning': '超快速 区域道具生成',
                'Superfast leveling': '超快速 建筑升级',
                'Select entity': '选择实体',
                'Water Pipe Fluid Flow': '水管液体流动',
                'Disable Water consumption': '禁用水消耗',
                'Disable Sewage generation': '禁用污水生成',
                'Ground Multiplier': '地面污染',
                'Ground Radius': '地面污染范围',
                'Air Radius': '空气污染范围',
                'Noise Radius': '噪音污染范围',
                'Net Noise Radius': '道路 噪音污染范围',
                'Net Noise Multiplier': '道路 噪音污染',
                'Net Air Multiplier': '道路 空气污染',
                'Air Multiplier': '空气污染',
                'Noise Multiplier': '噪音污染',
                'Wind Advection Speed': '风平流速度',
                'Air Fade': '空气污染消退',
                'Ground Fade': '地面污染消退',
                'Plant Air Multiplier': '植物 空气污染倍增',
                'Plant Ground Multiplier': '植物 地面污染倍增',
                'Plant Fade': '植物 消退',
                'Fertility Ground Multiplier': '沃土 地面污染',
                'Distance Expotent': '距离指数',
                'Danger Level': '危险等级',
                'Precipitation': '降水',
                'Override Precipitation': '降水 覆盖',
                'Average temperature': '平均温度',
                'Average precipitation': '平均降水量',
                'Average cloudiness': '平均多云程度',
                'Yearly average temperature': '年均温度',
                'Freezing temperature': '冰点温度',
                'Temperature base height': '温度基准',
                'Snap existing geometry': '对齐现有物体',
                'Snap 90 degree angles': '对齐90度角',
                'Snap road side': '对齐道路两侧',
                'Snap building side': '对齐建筑两侧',
                'Bypass confirmation': '跳过确认',
                'Type': '类别',
                'Mode': '模式',
                'Overwrite existing zone': '覆盖现有区域',
                'Snap cell length': '对齐单元格长度',

            },
                [开发者模式.内容.标题], {
                'Climate time': '气候时间',
                'Temperature': '温度',
                'Precipitation': '降水',
                'Cloudiness': '云',
                'Aurora': '极光'
            },
                [开发者模式.内容.按钮], {
                'Save game': '保存游戏',
                'Load game': '加载游戏',
                'Remove residents/vehicles': '移除居民/车辆',
                'Cleanup obsolete entities': '清理过时实体',

                'Save water': '保存水',
                'Load water': '加载水',
                'Restart water': '重启水',
                'Water to sealevel': '水位调整为海平面(危险)',
                'Reload Water Sources': '重新加载水源(危险)',
                'Override Temperature': '气温',
                'Advance time 1h': '提前1小时',
                'Advance time 12h': '提前12小时',
                'Advance time 6d': '提前6天',
                'Give max resource': '获取最大资源',
                'Print age debug': '打印年龄调试信息',
                'Print school debug': '打印学校调试信息',
                'Print company debug': '打印公司调试信息',
                'Print trade debug': '打印贸易调试信息',
                'Remove extra companies': '移除额外的公司',
                'Print null households': '打印空户调试信息',
                'Calc customers': '计算顾客',
                'Calc eligible': '计算符合条件者',
                'Calc students from OC': '计算OC中的学生',
                'Happiness factors': '幸福因素',
                'Reset land value': '重置土地价值',
                'Reset rents': '重置租金',
                'Reset services': '重置服务',
                'Reset trade costs': '重置贸易成本',
                'Reset transfers': '重置转账',
                'Reset trip neededs': '重置行程需求',
                'Reset storages': '重置存储',
                'Follow selected citizen': '跟随选定居民',
                'Age selected citizen': '年龄调整选定居民',
                'Trigger Test Life Event': '触发测试生活事件',
                'Discard statistics': '丢弃统计信息',
                'Print commuter distribution': '打印通勤分布',
                'Reset Electricity': '重置电力',
                'Reset pollution': '重置污染',
                'Traveling': '旅行中',
                'VisitAttractions': '参观景点',
                'Sightseeing': '观光',
                'Lightning Strike': '雷击',
                'Valentines Day': '情人节',
                'Flood': '洪水',
                'Tsunami': '海啸',
                'Tornado': '龙卷风',
                'Rocket Launch': '火箭发射',
                'Building Collapse': '建筑倒塌',
                'Robbery': '抢劫',
                'Generic Sickness': '一般疾病',
                'Sudden Death': '突然死亡',
                'Severe Injury': '严重伤害',
                'Hail Storm': '冰雹风暴',
                'Lose Control Accident': '失控事故',
                'Forest Fire': '森林火灾',
                'Building Fire': '建筑火灾',
                'Export heightmap': '导出高程图',
                'Create Chirps': '创建轨迹',
                'Check property rent errors': '检查租金错误',
                'Fix property rent errors': '修复租金错误',
                'Fix invalid Enabled Effects': '修复无效的启用效果',
                'Remove snow': '移除雪',
                'Save Wind': '保存风',
                'Load Wind': '加载风',
                'Reset Wind': '重置风',
                'Select next': '选择下一个',
            },
                [开发者模式.内容.值], {
                'Default Tool': '默认工具',
                'Area Tool': '区域工具',
                'Bulldoze Tool': '推土机',
                'Upgrade Tool': '升级工具',
                'Anarchy Tool': '无碰撞工具',
                'Tree 控制ler Tool': '树木控制器',
                'Line Tool': '条形工具',
                'Zone Tool': '功能区工具',
                'Water Tool': '水源工具',
                'Flood Fill': '填充',
                'Marquee': '滚动',
                'Paint': '涂刷'
            },
                [开发者模式.内容.折叠], {
                'Policies': '政策',
                'Diversity': '多样性',
                'Water': '水',
                'Weather & climate': '天气 与 气候',
                'Electricty & Water': '电力 与 水资源',
                'Time': '时间',
                'Economy': '经济',
                'Pollution': '污染',
                'Start event': '开始事件',
                'Terrain': '地形',
                'Triggers': '触发器',
                'Error Check': '错误检查',
                'Season stats': '季节统计',
                'Temperature stats': '温度统计'
            },
                [开发者模式.内容.控制值], {
                'Atmosphere1Prefab': '大气层1预制体',
                'GrasslandBiomePrefab': '草原生态群落预制体',
                'SeasonSummer': '夏季季节',
                'Oil Lot - Navigation': '石油地块 - 导航',
                'Ore Lot - Navigation': '矿石地块 - 导航',
                'Agriculture Lot - Field': '农业地块 - 田地',
                'Oil Lot': '石油区域',
                'Ore Lot': '矿石区域',
                'Agriculture Lot': '农业区域',
                'Forestry Lot': '林业区域',
                'Extractor Lot': '提取器区域',
                'District Area': '市辖区域',
                'Clear Area': '清除区域',
                'Clip Surface': '裁剪地面',
                'Walking Area': '行走区域',
                'Map Tile': '地图瓦片',
                'Water Tile': '水瓦片',
                'Hangaround Area': '待遇区域',
                'Park Area': '公园区域',
                'Gympark Area': '健身公园区域',
                'Placeholder': ' 占位符',
                'Oil Surface Placeholder': '石油地面',
                'Ore Surface Placeholder': '矿石地面',
                'Agriculture Surface': '农业地面',
                'Concrete Surface': '混凝土地面',
                'Grass Surface': '草地地面',
                'Pavement Surface': '人行道地面',
                'Sand Surface': '沙地地面',
                'Tiles Surface': '瓷砖地面',
                'Forestry Surface': '林业地面',
                'Landfill Surface': '垃圾填埋地面',
                'Oil Surface 01': '石油地面',
                'Ore Surface 01': '矿石地面',
                'Landfill Site Lot': '垃圾填埋场区域',
            }
            ),
            开发者模式_游戏玩法: RE(
                [开发者模式.内容.标签], {
                'Tutorials enabled': '启用教程',
                'Freeze tutorials': '冻结教程',
                'Active tutorial list': '当前教程列表',
                'Active tutorial': '当前教程',
                'Show developer info': '显示开发者信息',
                'Show unspawned objects': '显示未生成的对象',
                'Show markers': '显示标记',
                'Lefthand traffic': '靠左行驶',
                'Default theme': '默认主题',
                'Hospital service fee': '医院服务费',
                'Basic education service fee': '基础教育服务费',
                'Secondary education service fee': '中等教育服务费',
                'Higher education service fee': '高等教育服务费',
                'Water usage fee': '水费',
                'Garbage collection fee': '垃圾清理费',
                'Electricity fee': '电费',
                'Public transport fee': '公共交通费'
            },
                [开发者模式.内容.按钮], {
                'Skip tutorial phase': '跳过教程阶段',
                'Show all tutorials in advisor': '在顾问中显示所有教程',
                'Skip active tutorial list': '跳过当前教程列表',
                'Select next theme': '选择下一个主题',
                'Unlock all': '解锁全部',
                'Get 200 XP': '获取200经验值',
                'Next MS': '下一个MS',
                'Get 500k money': '获得500,000钱',
            },
                [开发者模式.内容.控制值], {
                'North American': '北美',
                'European': '欧洲'
            }
            ),
            开发者模式_渲染: RE(
                [开发者模式.内容.标签], {
                'Fullscreen Debug Mode': '全屏调试模式',
                'Max Overdraw Count': '最大过度绘制计数',
                'Max Quad Cost': '最大四边形成本',
                'Max Vertex Density': '最大顶点密度',
                'Min Motion Vector Length (in pixels)': '运动矢量长度（以像素为单位）',
                'Mip Maps': 'Mip贴图',
                'Terrain Texture': '地形纹理',
                'False Color Mode': '伪彩模式',
                'Freeze Camera For Culling': '冻结摄像头以进行剔除',
                'Waveform': '波形',
                'Exposure': '曝光',
                'Parade mode': '巡游模式',
                'Vectorscope': '矢量范围',
                'Size': '大小',
                'NVUnityPlugin Version': 'NVUnity插件版本',
                'NGX API Version': 'NGX API版本',
                'Device Status': '设备状态',
                'DLSS Supported': 'DLSS支持',
                'DLSS Injection Point': 'DLSS注入点',
                'Clear Render Targets At Creation': '在创建时清除渲染目标',
                'Disable Pass Culling': '禁用通行剔除',
                'Immediate Mode': '即时模式',
                'Enable Logging': '启用日志记录',
            },
                [开发者模式.内容.值], {
                'Control': '控制',
                'No Visible Camera': '无可见摄像头'
            },
                [开发者模式.内容.标题], {
                'Color Monitors': '色彩监视器',
                '#WaveformContainer': '波形容器',
                '#VectorscopeContainer': '矢量范围容器',
                'NVIDIA device debug view': 'NVIDIA设备调试视图',
                'HDRP Render Graph': 'HDRP渲染图',
                'DLSS Slot ID': 'DLSS 槽位 ID',
                'Status': '状态',
                'Input resolution': '输入分辨率',
                'Output resolution': '输出分辨率',
                'Quality': '质量',
            },
                [开发者模式.内容.按钮], {
                'Log Frame Information': '记录帧信息',
                'Log Resources': '记录资源'
            },
            ),
            开发者模式_游戏渲染: RE(
                [开发者模式.内容.标签], {
                'Texture Debug Mode': '纹理调试模式',
                'Entity culling': '实体剔除',
                'Effect culling': '效果剔除',
                'Batch allocation': '批量分配',
                'Batch upload': '批量上传',
                'Batch groups': '批量分组',
                'Batch renderers': '批量渲染器',
                'Batch materials': '批量材质',
                'Batch meshes': '批量网格',
                'Area triangle buffer': '区域三角形缓冲',
                'Procedural skeleton buffer': '程序骨架缓冲',
                'Procedural skeleton upload': '程序骨架上传',
                'Procedural emissive buffer': '程序自发光缓冲',
                'Procedural emissive upload': '程序自发光上传',
                'Animation shape buffer': '动画形状缓冲',
                'Animation bone buffer': '动画骨骼缓冲',
                'Animation frame buffer': '动画帧缓冲',
                'Animation index buffer': '动画索引缓冲',
                'Animation meta buffer': '动画元数据缓冲',
                'Level of detail': '细节级别',
                'Disable lod models': '禁用LOD模型',
                'Disable mesh loading': '禁用网格加载',
                'Force mesh unloading': '强制卸载网格',
                'Strict mesh memory budget': '严格的网格内存限制',
                'Long cross fade': '淡入淡出',
                'Debug': '调试',
                'Punctual Lights': '点光源',
                'Max Punctual Lights': '最大 点光源 数量',
                'Punctual Lights Cookies': '点光源 Cookies',
                'Enable Min-Max light culling optim': '启用最小-最大点光源光照剔除优化',
                'Max Distance Culling Scale': '最大距离剔除比例',
                'Min Distance Culling Scale': '最小距离剔除比例',
                'Number of punctual lights': '点光源数量',
                'Tri count': '三角形数量',
                'Foliage': '植被',
                'DebugBlit': '调试Blit',
                'Tunnel Pass': '隧道通道',
                'Outlines Pass': '轮廓通道',
                'Dynamic Resolution': '动态分辨率',
                'Upscale Filter': '升采样滤镜',
                'Auto Adaptive': '自适应',
                'CBT Max Depth': 'CBT最大深度',

                'All': '全部',
                'Shader Graphs/AreaDecalShader': '表面',
                'BH/SG_CurvedShader': '栅栏',
                'BH/Overlay/CurvedOverlayShader': '曲线覆盖',
                'BH/Decals/CurvedDecalShader': '道路 - 线',
                'BH/Decals/CurvedDecalDeteriorationShader': '道路 - 车辙印',
                'BH/Pipeline/CurvedPipelineShader': '曲线管道',
                'BH/SG_DefaultShader': 'SG_默认',
                'BH/SG_BaseShader': 'SG_基础',
                'BH/NetCompositionMeshLitShader': '道路',
                'BH/Pipeline/DefaultPipelineShader': '管道 (头)',
                'BH/Decals/DefaultDecalShader': '道路 - 标贴',
                'BH/Impostors/Render/SG_ImpostorTree': '远距离树木',
                'BH/SG_VegRootShader': '植被根',
                'BH/SG_VegLeavesShader': '植被叶',
                'Shader Graphs/ZoneBlock': '功能区',
                'BH/SG_WinShader': '建筑 - 窗户',
                'BH/GlsShader': '建筑 - 玻璃',
                'BH/WatShader': '建筑 - 水',

                'Didimo/HDRP/SG_CharacterSkin': '角色 - 皮肤',
                'Didimo/HDRP/HDRPGenericCrowd': 'HDRP通用群体',
                'Didimo/HDRP/SG_CharacterCloth': '角色 - 衣服',
                'Didimo/HDRP/SG_CharacterGeneric': '角色 - 饰品',
                'BH/Characters/SG_HairCardsDyed': '角色 - 头发',
                'BH/GraShader': 'BH/GraShader',

                'Scale': '渲染精度'
            },
                [开发者模式.内容.值], {
                'Catmull Rom': 'Catmull-Rom',
            },
                [开发者模式.内容.按钮], {
                'Refresh splatmap': '刷新地表纹理图',
            },
                [开发者模式.内容.折叠], {
                'Scale': '缩放',
                'Shaders': '着色器',
                'Custom passes': '自定义通道',
            },
                [开发者模式.内容.控制值], {
                'Scale': '渲染精度',
                'Unknown': '未知',
                'False': '否',
                'BeforePost': '后处理前'
            }
            ),
            开发者模式_工具: RE(
                [开发者模式.内容.标签], {
                'Physical Objects': '物理对象',
                'Marker Objects': '标记对象',
                'Interpolated Positions': '插值位置',
                'Net Connections': '网络连接',
                'Group Connections': '组连接',
                'District Connections': '区域连接',
                'Lot Heights': '地块高度',
                'Draw Nodes': '绘制节点',
                'Draw Edges': '绘制边缘',
                'Draw Outlines': '绘制轮廓',
                'Standalone Lanes': '独立车道',
                'Slave Lanes': '从属车道',
                'Master Lanes': '主车道',
                'Connection Lanes': '连接车道',
                'Draw Overlaps': '绘制重叠',
                'Draw Reserved': '绘制保留',
                'Draw Blocked': '绘制阻塞',
                'Draw Condition': '绘制条件',
                'Draw Signals': '绘制信号',
                'Draw Priorities': '绘制优先级',
                'Show positions': '显示位置',
                'Spot Lights Cones': '聚光灯锥形',
                'Show active water cell': '显示活动水格',
                'Fixed Height': '固定高度',
                'Draw Pivots': '绘制枢轴',
                'Draw Grids': '绘制网格',
                'Vacant Lots': '空地块',
                'Lots': '地块',
                'Districts': '区域',
                'Map Tiles': '地图瓦片',
                'Spaces': '空间',
                'Surfaces': '表面',
                'Lane Connections': '车道连接',
                'Humans': '人类',
                'Animals': '动物',
                'Cars': '汽车',
                'Trains': '火车',
                'Ships': '船只',
                'Aircrafts': '飞机',
                'Workplaces': '工作场所',
                'Services': '服务',
                'UneducatedCitizens': '未受教育的市民',
                'EducatedCitizens': '受过教育的市民',
                'OutsideConnection': '外部连接',
                'ConvenienceFoodStore': '便利食品店',
                'GrainSupply': '谷物供应',
                'VegetableSupply': '蔬菜供应',
                'WoodSupply': '木材供应',
                'TextilesSupply': '纺织品供应',
                'ConvenienceFoodSupply': '便利食品供应',
                'PaperSupply': '纸张供应',
                'VehiclesSupply': '车辆供应',
                'OilSupply': '石油供应',
                'PetrochemicalsSupply': '石化产品供应',
                'OreSupply': '矿石供应',
                'MetalsSupply': '金属供应',
                'ElectronicsSupply': '电子产品供应',
                'Attractiveness': '吸引力',
                'PlasticsSupply': '塑料供应',
                'CoalSupply': '煤炭供应',
                'StoneSupply': '石材供应',
                'LivestockSupply': '牲畜供应',
                'CottonSupply': '棉花供应',
                'SteelSupply': '钢铁供应',
                'MineralSupply': '矿物供应',
                'ChemicalSupply': '化学品供应',
                'MachinerySupply': '机械设备供应',
                'BeveragesSupply': '饮料供应',
                'TimberSupply': '木材供应',
                'Taxi': '出租车',
                'Healthcare': '医疗保健',
                'FireRescue': '消防救援',
                'Police': '警察',
                'Park': '公园',
                'PostService': '邮政服务',
                'Education': '教育',
                'EmergencyShelter': '紧急避难所',
                'Welfare': '福利',
                'Draw Graph': '绘制图表',
                'Show Restrictions': '显示限制',
                'Show time cost': '显示时间成本',
                'Show behavior cost': '显示行为成本',
                'Show money cost': '显示金钱成本',
                'Show comfort cost': '显示舒适度成本',
                'Visualize Queries': '可视化查询',
                'Static Objects': '静态对象',
                'Moving Objects': '移动对象',
                'Nets': '网络',
                'Lanes': '车道',
                'Zones': '区域',
                'Areas': '地区',
                'Routes': '路径',
                'Effects': '效果',
                'Local Effects': '局部效应',
                'Land value': '地价',
                'StorageLeveling': '存储水准',
                'Leveling': '水准',
                'Buildings': '建筑物',
                'Residential worth': '住宅价值',
                'Commercial worth': '商业价值',
                'Industrial worth': '工业价值',
                'Untaxed income': '免税收入',
                'Storage used': '存储使用',
                'Ground pollution': '地面污染',
                'Air pollution': '空气污染',
                'Noise pollution': '噪音污染',
                'Forest': '森林',
                'Accumulated Garbage': '累积垃圾',
                'Produce Garbage': '产生垃圾',
                'Show Surface Boxes': '显示表面框',
                'Show Culling Boxes': '显示裁剪框',
                'Land value (Cell)': '区块地价',
                'Land value (Edge)': '隐藏地价',
                'Strict':'严格模式',
                'Buildable Area':'可建造区域',

                'Object Debug System': '物件 调试系统',
                'Net Debug System': '道路 调试系统',
                'Lane Debug System': '车道 调试系统',
                'Light Debug System': '光照 调试系统',
                'Water Culling Debug System': '水裁剪 调试系统',
                'Zone Debug System': '功能区 调试系统',
                'Area Debug System': '区域 调试系统',
                'Route Debug System': '路径 调试系统',
                'Navigation Debug System': '导航 调试系统',
                'Audio Grouping Debug System': '音频分组 调试系统',
                'Availability Debug System': '可用率 调试系统',
                'Density Debug System': '密度 调试系统',
                'Coverage Debug System': '覆盖 调试系统',
                'Path Debug System': '路径 调试系统',
                'Pathfinding Debug System': '寻路 调试系统',
                'Search Tree Debug System': '搜索树 调试系统',
                'Terrain Attractiveness Debug System': '地形吸引力 调试系统',
                'Land Value Debug System': '土地价值 调试系统',
                'Economy Debug System': '经济 调试系统',
                'Pollution Debug System': '污染 调试系统',
                'Ground Water Debug System': '地下水 调试系统',
                'Soil Water Debug System': '土壤水分 调试系统',
                'Natural Resource Debug System': '自然资源 调试系统',
                'Garbage Debug System': '垃圾 调试系统',
                'Terrain Debug System': '地形 调试系统',
                'Water Debug System': '水 调试系统',
                'Wind Debug System': '风 调试系统',
                'Event Debug System': '事件 调试系统',
                'Buildable Area Debug System': '可建造区域 调试系统'
            },
            [rif({func:[(i)=>{i.style.color = 'red'}]}).class('content_gqa').class('label_KyX').fontCN], {
                'Tradecost Debug System': '(危险) 贸易成本 调试系统'
            }
            ),
            开发者模式_main: RE(
                [开发者模式.顶栏.按钮], {
                'Display Stats': '显示数据',
                'Thumbnails': '缩略图',
                'Asset database': '数据',
                'Notifications': '通知',
                'ECS Components': 'ECS 组件',
                'Scene Flow': '场景流程',
                'GameRendering': '游戏渲染',
                'Gameplay': '游戏玩法',
                'Localization': '本地化',
                'UI Bindings': 'UI 绑定',
                'Watches': '监视器',
                'Radio': '无线电',
                'Climate': '气候',
                'Simulation': '模拟',
                'Pathfind': '寻路',
                'Serialization': '序列化',
                'Gizmos': '工具',
                'Camera': '摄像机',
                'Input': '输入',
                'Decals': '标贴',
                'Material': '材质',
                'Lighting': '光照',
                'Rendering': '渲染',
                'Profiler Metrics': '性能分析指标',
                'Main Camera': '主摄像机',
                'Virtual Texturing': '虚拟纹理',
                'Volume': '音量',
            },
                [开发者模式.内容.标签], {
                'Fullscreen Debug': '全屏调试'
            },
                [开发者模式.内容.值], {
                'None': '无',
            },
            [rif({func:[(i)=>{i.style.color = '#8B0000'}]}).class('content_gqa').class('value_fMT').fontCN], {
                'Disabled': '关闭'
            },
            [rif({func:[(i)=>{i.style.color = 'green'}]}).class('content_gqa').class('value_fMT').fontCN], {
                'Enabled': '开启'
            }

            ),
            信息隐现: RE(
                [HOOKUI.顶栏.名称], {
                'InfoLoom: Demographics': '信息隐现: 人口分布',
                'InfoLoom: Workforce': '信息隐现: 劳动力结构',
                'InfoLoom: Workplaces': '信息隐现: 工作场所',
                'InfoLoom: Demand Factors': '信息隐现: 建筑需求',
                'InfoLoom: Commercial Data': '信息隐现: 商业信息',
                'InfoLoom: Residential Data': '信息隐现: 住宅数据',
                'InfoLoom: Industrial and Office Data':'信息隐现: 工业和办公数据'
            },
                [HOOKUI.面板.标题], {
                'Demographics': '人口统计',
                'Demand': '需求',
                'Workforce Structure': '劳动力结构',
                'Workplace Distribution': '工作场所分布',
                'Commercial Data': '商业数据',
                'Residential Data': '住宅数据',
                'Industrial and Office Data': '工业和办公数据'
            },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('row_S2v').isStyle('width: 60.000000%; justify-content: center; ')], {
                'All Citizens': '所有市民',
                '- Locals': '- 本地居民',
                '- Tourists': '- 游客',
                '- Commuters': '- 通勤者',
                '- Moving Away': '- 搬离中',
                'Population': '人口',
                'Oldest citizen': '最年长市民',
                'Students': '学生',
                'Workers': '工人',
                'Homeless': '无家可归',
                'Dead': '死亡'
            },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').index(2).all], {
                'Work': '工作',
                'Elementary': '小学',
                'High school': '中学',
                'College': '学院制大学',
                'University': '综合性大学',
                'Other': '其他'
            },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('symbol_aAH').next], {
                'Education': '教育',
                'Uneducated': '无学历',
                'Poorly Educated': '低学历',
                'Highly Educated': '极高学历',
                'Well Educated': '高学历',
                'Educated': '普通学历',
                'TOTAL': '总计',
                'Companies':'公司'
            },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('labels_L7Q.row_S2v').class('row_S2v').haveStyle('justify-content: center')], {
                'Total': '总计',
                'Workers': '工人',
                'Unemployed': '失业',
                'Under': '在读',
                'Outside': '在外',
                'Homeless': '无家可归',

                'City': '服务',
                'Sales': '销售',
                'Leisure': '休闲',
                'Extract': '开采',
                'Industry': '工业',
                'Office': '办公',
                'Employees': '员工',
                'Open': '招聘',
                'Commute':'通勤',
            },
                [rif().class('infoview-panel-section_RXJ').class('left_Lgw.row_S2v')], {
                'BUILDING DEMAND': '建筑需求',
                'Residential Low': '低密度住宅',
                'Residential Medium': '中密度住宅',
                'Residential High': '高密度住宅',
                'Commercial': '商业',
                'Industrial': '工业',
                'Storage': '仓储',
                'Office': '办公',

                'RESIDENTIAL LOW': '低密度住宅',
                'RESIDENTIAL MEDIUM': '中密度住宅',
                'RESIDENTIAL HIGH': '高密度住宅',
                'COMMERCIAL': '商业',
                'INDUSTRIAL': '工业',
                'OFFICE': '办公',

                'EmptyBuildings': '空置建筑',
                'Happiness': '幸福度',
                'Taxes': '税收',
                'Unemployment': '失业率',
                'UneducatedWorkforce': '未受教育劳动力',
                'EducatedWorkforce': '受教育劳动力',
                'LocalDemand': '本地需求',
                'LocalInputs': '本地资源',
                'Homelessness': '无家可归',
                'Students': '学生',
                'Warehouses': '仓库',
                'PetrolDemand': '汽油需求',
                'TouristDemand': '游客需求',
                'PetrolLocalDemand':'汽油本地需求'
            }, [HOOKUI.面板.标签2], {
                'PROPERTYLESS COMPANIES': '破产公司',
                'EMPTY BUILDINGS': '空置建筑',
                'Standard': '标准',
                'Educated': '受过教育的',
                'Uneducated': '未受教育的',
                'No demand for:': '没有需求:',
                'conv.food': '方便食品',
                'food': '食物',
                'meals': '餐饮',
                'paper': '纸张',
                'furniture': '家具',
                'vehicles': '车辆',
                'lodging': '住宿',
                'petrochemicals': '石油化工',
                'plastics': '塑料',
                'electronics': '电子产品',
                'chemicals': '化学品',
                'pharmaceuticals': '药品',
                'beverages': '饮料',
                'textiles': '纺织品',
                'entertainment': '娱乐',
                'recreation': '休闲',
                'LOW': '低密度',
                'MEDIUM': '中密度',
                'HIGH': '高密度',

                'Total properties': '总财产',
                '- Occupied properties': '- 已占用财产',
                '= Empty properties': '= 空财产',
                "No demand at 10%": '无需求时为10%',
                'BUILDING DEMAND': '建筑需求',
                'STUDY POSITIONS': '学习位置',
                'HOUSEHOLDS': '家庭',

                'INDUSTRIAL': '工业',
                'OFFICE': '办公',

                'timber': '木材',
                'metals': '金属',
                'steel': '钢铁',
                'minerals': '矿石',
                'concrete': '混凝土',
                'machinery': '机械'
            },
                [HOOKUI.面板.标签_p], {
                'AVERAGE TAX RATE': '平均税率',
                '10% is the neutral rate': '正常为10%',
                'SERVICE UTILIZATION': '服务利用率',
                '30% is the neutral ratio': '正常为30%',
                'SALES CAPACITY': '销售能力',
                '100% when capacity = consumption': '当销售=消费时为100%',
                'EMPLOYEE CAPACITY RATIO': '员工容量',
                '75% is the neutral ratio': '正常为75%',
                'HAPPINESS': '幸福度',
                '50 is neutral': '正常为50%',
                'UNEMPLOYMENT': '失业率',
                '10% is neutral': '正常为10%',
                'HOMELESS': '无家可归',
                '0 is neutral': '正常为0%',

                "TAX RATE (weighted)": '税率（加权）',
                '10 % is neutral': '正常为10%',
                'HOUSEHOLD DEMAND': '家庭需求',
                'STUDENT CHANCE': '上学几率',

                'LOCAL DEMAND (ind)': '本地需求（工业）',
                '100% when production = demand': '生产=需求时为100%',
                'INPUT UTILIZATION (ind)': '输入利用率（工业）',
                '110% is the neutral ratio, capped at 400%': '110%是中性比率，上限为400%',
                '72% is the neutral ratio': '正常为72%',
                'Empty buildings': '空建筑',
                'Propertyless companies': '无物业公司',
                'DEMANDED TYPES': '需求类型'

            },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').first.first.index(11).first], {
                'AVAILABLE WORKFORCE': '可用劳动力'
            },
            [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').first.first.index(13).first.all], {
                'STORAGE': '储存',
                'The game will spawn warehouses when DEMANDED TYPES exist.': '当存在需求类型时，游戏将生成仓库。'
            }
            ),
            失业监视器: RE(
                [HOOKUI.面板.标题], {
                'Unemployment': '失业监视器'
            },
                [HOOKUI.顶栏.名称], {
                'Unemployment Data': '失业监视器',
                'Unemployment Monitor': '失业监视器',
            },
                [rif().class('panel_YqS').index(1).first.all.first.haveStyle('flex: 1.000000')], {
                'Unemployed': '失业',
                'Under Employed': '低收入就业',
                'Homeless Households': '无家可归家庭'
            },
                [rif().class('panel_YqS').index(1).index(1).all.first.haveStyle('font-weight')], {
                'TO': '总',
                'UN': '无',
                'PO': '低',
                'ED': '中',
                'WE': '高',
                'HI': '极高',
            },
                [rif().class('panel_YqS').index(1).index(1).index(6)], {
                'Total': '所有',
                'Uneducated': '无学历',
                'Poorly Educated': '低学历',
                'Well Educated': '高学历',
                'Highly Educated': '极高学历',
                'Educated': '普通学历',
            }
            ),
            城市监视器: RE(
                [HOOKUI.面板.标题, HOOKUI.顶栏.名称], {
                'City Monitor': '城市监视器',
            },
                [rif().class('content_1xS.focusable_GEc.item-focused_FuT').class('labels_L7Q.row_S2v').class('uppercase_RJI.left_Lgw.row_S2v'), rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('label_VSW.label_T__')], {
                'Electricity Availability': '电力资源可用性',
                'Water Availability': '水资源可用率',
                'Sewage': '污水处理',
                'Landfill Usage': '垃圾填埋使用率',
                'Healthcare Availability': '医疗资源可用率',
                'Average Health': '平均健康状况',
                'Cemetery Availability': '公墓资源可用率',
                'Fire Hazard': '火灾危险',
                'Crime Rate': '犯罪率',
                'Jail Availability': '监狱资源可用率',
                'Elementary School Availability': '小学资源可用率',
                'High School Availability': '中学资源可用率',
                'College Availability': '学院制大学资源可用率',
                'University Availability': '综合性大学资源可用率'
            },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').class('button_WWa')], {
                'Settings': '设置',
                'Meters': '完成'
            }
            ),
            条形工具: RE(
                [rif().class('tool-options-panel_Se6').id('line-tool-title')], {//
                'Line Tool': '条形工具',//
            },
                [MAIN.工具框.标签], {
                'Options': '设置',
                'Rotation': '旋转'
            },
                [MAIN.悬浮框.标题], {
                'Single item': '放置单个物件'
            },
                [MAIN.悬浮框.内容], {
                'Place one object at a time using the standard game tool.': '使用标准游戏工具一次放置一个对象。'

            },
                [rif().id('line-tool-title')], {
                'Line tool': '条形工具'
            }


            ),
            树木控制器: RE(
                [MAIN.悬浮框.提示], {
                'Right Click to Apply.': '右键以应用'

            },
                [MAIN.工具框.标签], {
                'Age': '树木年龄',
                'Selection': '选择',
                'Radius': '范围',
                'Tool Mode': '工具模式',
                'Sets': '集合',
                'Change':'改变模式'
            },
                [MAIN.设置.选项], {
                'Tree Controller': '树木控制器'
            },
                [MAIN.设置.标签, MAIN.设置.标题], {
                'Deciduous trees use Dead Model during Winter': '在冬季:落叶树使用枯木模型',
                'Disable Tree Growth': '禁用树木自然生长',
                'Age Selection Technique': '树木年龄随机方法',
                'Color Variation Set': '颜色变化集'
            },
                [MAIN.设置.描述], {
                'Will temporarily make all non-lumber industry deciduous trees use the dead model and pause growth during winter.':
                    '会暂时性的把所有 (非林场) 的落叶树转换为枯木模型',

                'Disable tree growth for the entire map except for lumber industry.':
                    '禁用整个地图的 (非林场) 树木的自然生长',

                'Sets of seasonal colors for Trees and Wild bushes. Vanilla is the base game. Yenyang\'s is my curated colors. Custom uses CSV files in the mod folder.': '树木和野生灌木的季节性颜色集。【原版】 是基础游戏的颜色。【Yenyang的颜色集】 是我策划的颜色。【自定义】 使用模组文件夹中的 CSV 文件',

                'After confirmation this will reload CSV files.':
                    '确认后，将重新加载 CSV 文件。',

                'Removes Tree Controller mod components and resets tree and bush model states. Only necessary during Winter and very end of Autumn. Must use reset button to undo setting change.':
                    '移除树木控制器模组的组件并重置树木和灌木模型状态。仅在冬季和秋季末尾非常需要。必须使用重置按钮来撤销设置更改。',

                'After confirmation this will reset Tree Controller Settings.':
                    '确认后，将重置树木控制器设置。',

                "When multiple Tree Ages are selected, one will be selected using this option. Equal Distribution is just a random selection. Forest Distribution randomly selects using the editor's approximation for a forest.":
                    '当选择多个树龄时，将使用此选项选择一个。平均分布仅是随机选择。森林分布随机使用编辑器对森林的近似值进行选择。'

            },
                [MAIN.下拉框.标签, MAIN.下拉框.值], {
                'Random: Equal Weight': '随机：完全随机',
                'Random: Weighted': '随机：按游戏编辑器',
                'Vanilla': '原版',
                'Yenyang\'s': 'Yenyang的颜色集',
                'Custom': '自定义'
            },
                [MAIN.按钮, MAIN.设置.标题], {
                'Reload CSVs': '重载CSV颜色集',
                'Safely Remove': '安全移除',
                'Reset Tree Controller Settings': '重置 树木控制器 模组设置'
            }
            ),
            车辆计数器: RE(
                [HOOKUI.面板.标题, HOOKUI.顶栏.名称], {
                'Vehicle Counter': '车辆计数器'
            },
                [HOOKUI.面板.标签], {
                'Active vehicles': '激活的车辆'
            },
                [MAIN.按钮], {
                'Remove vehicles': '移除车辆'
            }
            ),
            传统风味: RE(
                [HOOKUI.顶栏.名称], {
                'Legacy Flavour': '传统风味'
            }
            ),
            限速模组: RE(
                [HOOKUI.顶栏.名称], {
                'Speed Limit': '限速模组',
            },
                [HOOKUI.面板.标题], {
                'Speed Limit Editor': '限速模组:修改器'
            },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').first], {
                'No Road Selected': '没有道路被选择'
            }
            ),
            出行解锁: RE(
                [HOOKUI.面板.标题, HOOKUI.顶栏.名称], {
                'Traffic Unlocker': '出行解锁'
            },
                [HOOKUI.面板.标签], {
                'Population': '人口',
                'Traffic Reduction': '交通抑制系数',
                'Work Probability': '工作概率',
                'School Probability': '上学概率',
                'Leisure Probability': '休闲概率'
            }
            ),
            道路扩展升级: RE(
                [MAIN.工具栏.资产详情.标题], {
                'Quay': '护坡',
                'Retaining Wall': '护墙',
                'Elevated': '高架',
                'Tunnel': '隧道'
            },
                [MAIN.工具栏.资产详情.描述], {
                'A quay, if you installed this mod you know what it is :)': '护坡，如果你安装了这个模组，你知道它是什么:)',
                'A retaining wall, if you installed this mod you know what it is :)': '护墙，如果你安装了这个模组，你知道它是什么:)',
                'Elevated mode, kind of similar to bridges': '高架模式，有点类似于桥梁',
                'Tunnel mode, it might not look perfect but it works.': '隧道模式，它可能看起来不完美，但它能工作。'
            }
            ),
            更难的经济: RE(
                [MAIN.设置.选项], {
                'Economy Fixer': '难度更高的经济'
            },
                [MAIN.设置.分类], {
                'Gameplay Options': '游戏中设置'
            },
                [MAIN.设置.标签, MAIN.设置.标题], {
                'Economy Difficulty': '经济难度',
                'Bulldozing Building Costs Money': '拆除建筑需要拆迁费',
                'Bulldoze & De-zoning Causes Demolition': '推土机或取消功能区会导致建筑变成废墟'
            },
                [MAIN.设置.描述], {
                'Higher difficulty results in decreased subsidies, milestone rewards, income & higher expenses.': '更高的难度会导致减少补贴、里程碑奖励、收入和增加开支。',
                'Adds a monthly maintenance fee for demolition buildings. This fee is based on how many residents are getting evicted, how high the land value is, and how large is the building itself.': '为拆迁建筑添加了一个月度维护费用。该费用基于有多少居民被驱逐、土地价值有多高以及建筑本身有多大。',
                'Bulldozing a building or de-zoning an area will cause the buildings to collapse instead of disappearing, collapsed buildings take time to be cleaned up and affect nearby happiness. You can pay a small fee to immediately raze collapsed buildings.': '推倒建筑或取消区域划分将导致建筑物崩溃而不是消失，崩溃的建筑需要时间清理，并影响附近的幸福度。你可以支付一小笔费用立即夷平崩溃的建筑物。'
            },
                [MAIN.下拉框.值, MAIN.下拉框.标签], {
                'Easy': '简单',
                'Medium': '普通',
                'Hard': '困难',
                'Good Luck': '祝你好运',
            }
            ),
            图像叠加: RE(
                [MAIN.设置.选项], {
                'Image Overlay': '图像叠加'
            },
                [MAIN.设置.标签, MAIN.设置.标题], {
                'Overlay X-position': '图像X坐标',
                'Overlay Z-position': "图像Y坐标"
            },
                [MAIN.设置.描述], {
                'The X (east-west) coordinate of the center of the overlay image projection, in meters.  This can also be changed in-game using the left and right arrow keys while holding down control (for 1m increments) or shift (for 10m increments).': '覆盖图像投影中心的X坐标（东西方向），以米为单位。这也可以在游戏中使用左右箭头键进行更改，同时按住Control键（以1m为增量）或Shift键（以10m为增量）。',
                'The Z (north-south) coordinate of the center of the overlay image projection, in meters.  This can also be changed in-game using the up and down arrow keys while holding down control (for 1m increments) or shift (for 10m increments).': '覆盖图像投影中心的Z坐标（南北方向），以米为单位。这也可以在游戏中使用上下箭头键进行更改，同时按住Control键（以1m为增量）或Shift键（以10m为增量）',
                'Resets the overlay position to the center of the map.': '将覆盖位置重置为地图中心。'
            },
                [MAIN.下拉框.值, MAIN.下拉框.标签], {
                'None': '无',
            },
                [MAIN.按钮, MAIN.设置.标题], {
                'Reset overlay position': "重置覆盖位置"
            }
            ),
            无碰撞: RE(
                [MAIN.工具框.标签], {
                'Anarchy': '无碰撞'
            },
                [MAIN.设置.选项], {
                'Anarchy': '无碰撞'
            },
                [MAIN.设置.标签, MAIN.设置.标题], {
                'Always enable Anarchy with Bulldoze Tool': '始终启用推土机无碰撞',
                'Show Tooltip': '显示工具提示框',
                'Flaming Chirper': '燃烧小鸟',
                'Tool Icon': '工具图标',
                'Prevent Accidental Prop Culling': '防止意外的道具遗失',
                'Prop Refresh Frequency': '道具刷新频率',
                'Allow Placing Multiple Unique Buildings':'允许放置多个独特建筑',
                'Minimum Clearance Below Elevated Networks': '高架网络下的最小空间距离'

            },
                [MAIN.设置.描述], {
                'With this option enabled the Bulldoze Tool will always have anarchy enabled.': '启用此选项后，清障工具将始终启用无碰撞状态。',
                'With this option enabled a tooltip with Ⓐ will be shown when Anarchy is active for appropriate tools.': '启用此选项后，对适当的工具启用无碰撞时将显示带有Ⓐ的工具提示。',
                'With this option enabled the Chirper will be on fire when Anarchy is active for appropriate tools. Image Credit: Bad Peanut.': '微谈小鸟 将着火。 图片来源：Bad Peanut。  ',
                'With this option enabled a icon row with a single button for Anarchy will show up when using appropriate tools.': '启用此选项后，使用适当的工具时将显示一个包含单个无碰撞按  钮的图标显示。',
                'Upon confirmation this will reset the settings for Anarchy mod.': '确认后，这将重置 无碰撞模组 的设置。',
                'This will routinely trigger a graphical refresh to props placed with Anarchy that have been culled to prevent accidental culling of props. This affects performance.': '这将定期触发对使用 无碰撞 放置的被剔除的道具进行图形刷新，以防止意外的道具遗失。这会影响性能。',
                'This is number of frames between graphical refreshes to props placed with Anarchy to prevent accidental culling. Higher numbers will have better performance, but longer possible time that props may be missing.': '这是在 Anarchy 下放置的道具之间的图形刷新之间的帧数，以防止意外的剔除。数字越大，性能越好，但可能遗失道具的时间越长。',
                "If props placed with Anarchy have been accidently culled, you can press this button to bring them back now. This doesn't negatively effect performance.": '如果使用 无碰撞 放置的道具被意外剔除，您可以按下此按钮立即将它们恢复。这不会对性能产生负面影响。',
                'This allows you to place multiple copies of unique buildings using the normal UI menu with or without Anarchy enabled. The effects of these buildings stack!':'这允许您使用正常的 UI 菜单放置多个独特建筑，无论是否启用 Anarchy。这些建筑的效果叠加！',
                'With the net tool and Anarchy enabled you can violate the clearance of other networks. Zoning under low bridges can spawn buildings while doing this. This setting gives you some control over the minimum space below a low bridge. It would be better to just remove the zoning.':'当启用道路工具和 无碰撞 mod 时，您可以违反其他网络的空间限制。在低桥下划定区域可能会在执行此操作时生成建筑物。此设置允许您对低桥下的最小空间进行一些控制。最好是删除区域规划。'
            },
                [MAIN.按钮, MAIN.设置.标题], {
                'Reset Anarchy Settings': '重置 无碰撞模组 设置',
                'Refresh Props': '刷新道具',
            },
                [MAIN.悬浮框.标题], {
                'Anarchy': '无碰撞',
                'Gameplay Manipulation': '游戏中操纵',
                'Bypass Confirmation': '绕过确认',
                'Target Markers': '标记',
                'Target Surfaces': '地面/表面'
            },
                [MAIN.悬浮框.内容], {
                "Disables error checks for tools and does not display errors. When applicable, you can place vegetation and props (with DevUI 'Add Object' menu) overlapping or inside the boundaries of other objects and close together.":
                    '禁用工具错误检查，不显示错误。在适用的情况下，您可以将植被和道具（使用DevUI的“添加对象”菜单）放置在其他对象的边界重叠或内部并靠近一起。',
                "Allows you to use the bulldozer on moving objects such as vehicles or cims.":
                    '许在移动对象（如车辆或市民）上使用推土机。',
                "Disables the prompt for whether you are sure you want to demolish a building.":
                    '禁用是否确定要拆除建筑物的提示。',
                "Shows and EXCLUSIVELY targets markers and invisible roads. With this and anarchy enabled you can demolish invisible roads, but SAVE FIRST! You cannot demolish invisible roads within buildings.":
                    '同时启用这个和无碰撞时，您可以拆除不可见道路，但记得先保存游戏！您不能在建筑物内拆除不可见的道路。',
                "Makes the bulldozer EXCLUSIVELY target surfaces so you can remove them in one click. With Anarchy on you can bulldoze surfaces within buidings. You must turn this off to bulldoze anything else.":
                    '启用无碰撞后，您可以在建筑物内使用推土机清理地面/表面。您必须关闭此选项以回归正常推土机功能。'
            }

            ),
            建筑尺寸自定义: RE(
                [HOOKUI.面板.标题, HOOKUI.顶栏.名称], {
                'Zone Spawn Custom': '建筑尺寸自定义'
            },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS.content_BIL').class('toggle_cca.toggle_ATa').next], {
                'Residential': '住宅区',
                'Commercial': '商业区',
                'Industrial': '工业区',
                'Office': '办公区'
            },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS.content_BIL').class('toggle_cca.toggle_ATa').next.next.first], {
                'Detail': '细节'
            },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS.content_BIL').class('info-section_I7V').class('field_vGA')], {
                'Min': '最小',
                'Max': '最大'
            }
            ),
            地图纹理替换: RE(
                [HOOKUI.面板.标题, HOOKUI.顶栏.名称], {
                'Map Texture Replacer': '地图纹理替换'
            },
                [rif({ match: 'inc' }).class('content_XD5.content_AD7.child-opacity-transition_nkS').class('label_DGc.label_ZLb')], {
                'Pack Loaded': '加载的纹理包',
                'None': '无',
                'Grass Diffuse': '草地漫反射',
                'Grass Normal': '草地法线',
                'Dirt Diffuse': '泥土漫反射',
                'Dirt Normal': '泥土法线',
                'Cliff Diffuse': '悬崖漫反射',
                'Cliff Normal': '悬崖法线'
            },
                [MAIN.按钮], {
                'Load Texture Pack': '加载纹理包',
                'Select Image': '选择图像',
                'Reset': '重置'
            }
            ),
            全部区块解锁: RE(
                [MAIN.设置.选项], {
                '529 Tiles': '全部区块解锁'
            },
            ),
            无限刷子尺寸: RE(
                [MAIN.设置.选项], {
                    'Brush Size Unlimiter': '无限刷子尺寸'
                },
                [MAIN.设置.标签, MAIN.设置.标题], {
                    'Maximum Brush Size': '最大刷子大小',
                    'Hide Object Placement Preview With Large Brush Sizes': '巨型刷子下隐藏预览',
                },
                [rif({ match: 'inc', full: true }).class('option-page_CW8.option-section_VzQ').class('info-column_uQ0').class('info-description_wwd')], {
                    'Sets the maximum size the brush can be set to in the game/dev UI.':
                    '设置最大刷子大小限制  注意:刷子越大，性能消耗越高',

                    'Warning: Disabling this will make large object brushes with high strengths extremely laggy.':
                    '-启用此选项可大幅提高在使用大型对象刷子(≥2500大小)时的性能，通过在悬停时临时将刷子强度设置为0  警告：禁用此选项将使具有高强度的大型对象刷子非常卡顿。  如果存在兼容性问题，请禁用',
                }
            ),
            额外景观工具: RE(
                [MAIN.工具框.标签], {
                'Brush': '笔刷',
                'Brush Rotation': '笔刷角度',
                'Show Markers':'显示标记'
            },
                [MAIN.工具框.值], {
                'Custom 01': '自定义 01',
                'Mountain 01': '山脉 01',
                'Mountain 02': '山脉 02',
                'Mountain 03': '山脉 03',
                'Default Brush': '默认',
                'Mountain02Brush': '山脉 02',
                'TriangleBrush': '三角',
                'Mountain01Brush': '山脉 01',
                'Mesa01Brush': '台地 01',
                'RectangleBrush': '矩形',
                'PeakBrush': '峰',
                'TendrilBrush01': '卷曲 01',
                'TendrilBrush02': '卷曲 02',
                'MountainsBrush': '山脉',
                'Mountain03Brush': '山脉 03',
                'Mountain04Brush': '山脉 04',
                'TendrilBrush03': '卷曲 03',
                'River01Brush': '河流 01'
            },
                [MAIN.工具栏.资产详情.标题], {
                'SubServices.NAME[Surfaces]': '地面',
                'Decals':'标识'
            },
                [MAIN.工具栏.资产详情.描述], {
                'Assets.SUB_SERVICE_DESCRIPTION[Surfaces]': '一些地面/地表,无碰撞体积',
                'Decals':'标识'
            }
            ),
            扩展热键: RE(
                [HOOKUI.顶栏.名称], {
                'ExtendedHotkeys': '扩展热键'
            },
                [HOOKUI.面板.标题], {
                'Extended Hotkeys': '扩展热键'
            },
                [HOOKUI.面板.头], {
                'General': '常规',
                'Mouse Wheel': '鼠标滚轮',
                'Hotkeys': '快捷键'
            },
                [HOOKUI.面板.头描述], {

                'Extended actions with your mouse wheel while in net tool placing roads.': '在网工具放置道路时，使用鼠标滚轮进行扩展操作。',
                'Awesome actions with your keyboard.': '使用键盘进行出色的操作。'
            },
                [HOOKUI.面板.项目], {
                '升降步进卷轴': '高度阶段',
                '海拔重置': '高度重置',
                'Scroll elevation step level.': '高度阶段调整。',
                'Tool Modes': '工具模式',
                'Straight': '直线',
                'Curve': '曲线',
                'Complex Curve': '复杂曲线',
                'Continuous': '连续曲线',
                'Grid': '网格'
            }
            ),
            扩展提示框: RE(
                [HOOKUI.顶栏.名称], {
                'ExtendedTooltip': '扩展提示框'
            },
                [HOOKUI.面板.标题], {
                'Extended Tooltip': '扩展提示框'
            },
                [HOOKUI.面板.项目], {
                '无政府状态': '无碰撞状态',
                '如果启用了无政府模式，则会显示一个指示器。': '如果启用了无碰撞，则会显示一个指示器。',
            }
            ),
            随处开采: RE(
                [MAIN.设置.选项], {
                    'Extract Anywhere': '随处开采'
                },
                [MAIN.设置.标签, MAIN.设置.标题],{
                    "Can all extractors extract anywhere?":'可随处开采',
                    "Extraction radius multiplier": "采集半径倍增器",
                    'Textile Fibres': '棉花',
                    'Grain': '粮食',
                    'Vegetables': '蔬菜',
                    'Oil': '石油',
                    'Coal': '煤炭',
                    'Ore': '矿石'
                },
                [MAIN.设置.描述],{
                    "Toggle all extractors' abilities to extract resources without the need for a natural resource deposit.": 
                    '切换所有开采专门产业无需自然资源即可提取资源的能力。',

                    'Set the multiplier for the area sizes of all extractors.': 
                    '设置所有开采专门产业区域大小倍增。',

                    'Toggle whether or not textile fibres can be extracted without requiring fertile land. Turning this on means that extraction does not require fertile land.':
                    '切换棉花是否可以在不需要沃土的情况下种植。启用此选项表示不需要沃土。',

                    'Toggle whether or not grain can be extracted without requiring fertile land. Turning this on means that extraction does not require fertile land.':
                    '切换谷物是否可以在不需要沃土的情况下种植。启用此选项表示不需要沃土。',

                    'Toggle whether or not vegetables can be extracted without requiring fertile land. Turning this on means that extraction does not require fertile land.':
                    '切换蔬菜是否可以在不需要沃土的情况下种植。启用此选项表示不需要沃土。',

                    "Set the multiplier for the area size of the extractors. The default is 1 (base area size is 300). This will affect the following resource extractors: textile fibres, grain, livestock, vegetables.":
                    '设置专门产业区域大小的倍增。默认值为1（基础区域大小为300）。这将影响以下专门产业：棉花、谷物、牲畜、蔬菜。',

                    "Set the multiplier for the area size of the extractors. The default is 1 (base area size is 400). This will affect the following resource extractors: forestry.":
                    '设置专门产业区域大小的倍增。默认值为1（基础区域大小为400）。这将影响以下专门产业：林业。',

                    'Toggle whether or not oil can be extracted without requiring an oil deposit. Turning this on means that extraction does not require an oil deposit.':
                    '切换是否可以在不需要石油资源的情况下提取石油。启用此选项表示不需要石油资源。',

                    'Set the multiplier for the area size of the extractors. The default is 1 (base area size is 300). This will affect the following resource extractors: oil.':
                    '设置专门产业区域大小的倍增。默认值为1（基础区域大小为300）。这将影响以下专门产业：石油。',

                    'Toggle whether or not coal can be extracted without requiring an ore deposit. Turning this on means that extraction does not require an ore deposit.':
                    '切换是否可以在不需要矿脉的情况下开采煤炭。启用此选项表示不需要矿脉。',

                    'Toggle whether or not ore can be extracted without requiring an ore deposit. Turning this on means that extraction does not require an ore deposit.':
                    '切换是否可以在不需要矿脉的情况下开采矿石。启用此选项表示不需要矿脉。',

                    'Set the multiplier for the area size of the extractors. The default is 1 (base area size is 400). This will affect the following resource extractors: coal, ore, stone.':
                    '设置提取器区域大小的倍增器。默认值为1（基础区域大小为400）。这将影响以下专门产业：煤炭、矿石、石头。'

                },
                [MAIN.按钮, MAIN.设置.标题], {
                    'Reset to default': '重置为默认'
                },
                [MAIN.设置.TAB],{
                    'General': '常规',
                    'Fertile Land': '沃土',
                    'Forest': '林业',
                    'Oil': '石油',
                    'Ore': '矿石'
                },
                [MAIN.设置.分类],{
                    'Extract Anywhere': '随处开采'
                }


            ),
            // RICO: RE(
            //     [MAIN.工具栏.资产详情.描述,MAIN.工具栏.资产详情.标题],{
            //         'Residential Low Ploppable':'低密度住宅',
            //         'Residential Med Ploppable':'中密度住宅',
            //         'Residential High Ploppable':'高密度住宅',
            //         'Residential Row Ploppable':'中密度联排住宅',
            //         'Residential Low Rent Ploppable':'廉租公寓',
            //         'Mixed Ploppable':'混合型住宅',
            //         'Commercial Low Ploppable':'低密度商业',
            //         'Commercial High Ploppable':'高密度商业',
            //         'Office Low Ploppable':'低密度办公',
            //         'Office High Ploppable':'高密度办公',
            //         'Manufacturing Ploppable':'工厂',
            //         'Warehouse Ploppable':'仓库'
            //     },
            //     [rif({match:'inc',fullReplace:false}).class('asset-detail-panel_hf8.detail-panel_izf').class('title-bar_I7O.child-opacity-transition_nkS').class('title_qub')],{
            //         'EU_':'欧洲',
            //         'NA_':'北美',
            //         'ResidentialLowRent':'廉租公寓',
            //         'ResidentialLow':'低密度住宅 ',
            //         'ResidentialMed':'中密度住宅 ',
            //         'ResidentialHigh':'高密度住宅 ',
            //         'ResidentialRow':'中密度联排住宅',
            //         'MixedRight':'混合型住宅',
            //         'CommercialLow':'低密度商业',
            //         'CommercialHigh':'高密度商业',
            //         'Commercial':'商业',
            //         'GasStation':'加油站',
            //         'Motel':"旅馆",
            //         'OfficeLow':'低密度办公',
            //         'OfficeHigh':'高密度办公',
            //         'IndustrialManufacturingWarehouse':'仓库',
            //         'IndustrialManufacturing':'工厂',

            //         '_L':' 等级',
            //         '_ploppable':'',
            //         'Assets.NAME':''
            //     }
            // ),
            // 交通自定义: RE(
            //     [MAIN.设置.选项], {
            //         'CityPlayer Traffic Custom': '交通自定义'
            //     },
            //     [MAIN.设置.标签, MAIN.设置.标题],{
            //         'Use Rush Hour': '开启高峰时间',
            //         'Rush Hour Traffic Strength': '高峰交通强度',
            //         'Randomly Dummy Traffic - Car (On/Off)': '随机虚拟交通 - 汽车（开/关）',
            //         'Randomly Dummy Traffic - Train (On/Off)': '随机虚拟交通 - 火车（开/关）',
            //         'Randomly Dummy Traffic - Airplane (On/Off)': '随机虚拟交通 - 飞机（开/关）',
            //         'Randomly Dummy Traffic - Watercraft (On/Off)': '随机虚拟交通 - 水上交通工具（开/关）',
            //         'Taxi Preference': '出租车偏好',
            //         'PublicTransport Preference': '公共交通偏好',
            //         'PersonalCar Preference': '私家车偏好',
            //         'Buying PersonalCar Preference': '购买私家车偏好'

            //     },
            //     [MAIN.设置.分类],{
            //         'CityPlayer Traffic Custom': '交通自定义',
            //         'RUSH HOUR CUSTOM MOD': '高峰时间定制',
            //         'RANDOM TRAFFIC CUSTOM MOD': '随机虚拟交通定制',
            //         'CITIZEN TRANSPORTAION PREFERENCE CUSTOM MOD': '居民交通偏好定制',
            //         'EXPERIMAENTAL MOD': '实验性模组'
            //     },
            //     [MAIN.按钮, MAIN.设置.标题],{
            //         'RESET SETTINGS':'重置设置'

            //     },
            //     [MAIN.下拉框.值,MAIN.下拉框.标签],{
            //         'Very Low':'非常低',
            //         'Low':'低',
            //         'High':'高',
            //         'Very High':'非常高'
            //     },
            //     [MAIN.设置.描述],{
            //         "Reset 'CityPlayer Traffic Custom Mod' settings.":'重置城市玩家交通定制模组设置',
            //         "Creates Rush Hours for Cars and Trucks between Outside-Cities. This option can make game more difficult. (Rush hour varies in severity depending on the size of the city)":'在城市之间为汽车和卡车创建高峰时间。此选项可能使游戏更加困难。（高峰时间的严重程度取决于城市的大小）',
            //         "Control Strength of Rush Hour. (Default:3,  Min:1 Max:5)":'控制高峰时间的强度。（默认值：3，最小值：1 最大值：5）',
            //         "Turn On/Off randomly generated dummy Car Vehicles.":'打开/关闭随机生成的虚拟汽车交通。',
            //         "Turn On/Off randomly generated dummy Train Vehicles.":'打开/关闭随机生成的虚拟火车交通。',
            //         "Turn On/Off randomly generated dummy Airplane Vehicles.":'打开/关闭随机生成的虚拟飞机交通。',
            //         "Turn On/Off randomly generated dummy Watercraft Vehicles.":'打开/关闭随机生成的虚拟水上交通。',
            //         "Control Taxi preferences.(If set up to 'None', citizens don't use Taxi.)":"控制出租车偏好。（如果设置为“无”，市民不使用出租车。）",
            //         "Control PublicTransport preferences.":'控制公共交通偏好。',
            //         "Control Personal Car preferences.(If citizens not have own car, they don't use Personal Car)":'控制个人汽车偏好。（如果市民没有自己的汽车，他们不使用个人汽车。）',
            //         "Control Buying Personal Car preferences.(The higher preference, the more likely to buy a Personal Car.)":'控制购买个人汽车的偏好。（偏好值越高，购买个人汽车的可能性越大。）'
            //     }
            // ),
            // TWEAKUI: RE(
            //     [HOOKUI.顶栏.名称,HOOKUI.面板.标题],{
            //         'TweakUI':'调整 UI',
            //     },
            //     [rif().class('label_VSW').all],{
            //         'Transportation Overview Height': '交通总览高度',
            //         'Asset Menu Rows': '资产菜单行数'
            //     },
            //     [rif().class('description_VWf').class('paragraphs_nbD').all],{
            //         'Change the height of the transportation overview.': '更改交通总览的高度。',
            //         'Change the number of rows on the tool asset menu.': '更改工具资产菜单上的行数。'
            //     },
            //     [rif().class('tab-bar_oPw').class('tab_Hrb')],{
            //         'Settings':'设置'
            //     }

            // ),
            色彩调整: RE(
                [MAIN.设置.选项],{
                    'ColorAdjustments':'色彩调整'
                }
            ),
            水景工具:RE(
                [MAIN.设置.选项],{
                    'Water Features':'水景工具'
                },
                [MAIN.设置.标签,MAIN.设置.标题],{
                    'Enable Seasonal Streams': '启用季节性河流',
                    'Simulate Snow Melt': '模拟雪融化',
                    'Constant Flow Rate': '恒定流速',
                    'Seasonality': '季节性',
                    'Stormwater Effects': '雨水效果',
                    'Minimum Multiplier': '最小倍增器',
                    'Maximum Multiplier': '最大倍增器',

                    'Try Smaller Radii': '尝试较小的半径',
                    'Add Detention Basins (Restart Required)': '添加滞留池（需要重新启动）',
                    'Add Retention Basins (Restart Required)': '添加保留池（需要重新启动）',
                    'Evaporation Rate': '蒸发率',

                    'Enable Waves and Tides': '启用波浪和潮汐',
                    'Wave Height': '波浪高度',
                    'Wave Frequency': '波浪频率',
                    'Tide Height': '潮汐高度',
                    'Tide Classification': '潮汐分类',
                    'Damping': '阻尼'
                },
                [MAIN.设置.TAB],{
                    'Seasonal Streams': '季节性溪流',
                    'Water Tool': '水工具',
                    'Waves and Tides': '波浪和潮汐'
                },
                [MAIN.按钮,MAIN.设置.标题],{
                    'Reset Seasonal Streams Settings': '重置季节性溪流设置',
                    'Water Clean Up Cycle': '水清理周期',
                    'Reset Water Tool Settings': '重置水工具设置',
                    'Reset Waves and Tides Settings': '重置波浪和潮汐设置'
                },
                [MAIN.设置.描述],{
                    "Seasonal streams takes Streams (Modified Constant Rate Water Sources) and ties them to the climate and weather for the map. For example, if your map features a dry summer, then these water sources will decrease during the summer. Seasonal streams by it-self should not cause flooding since it treats the map's default water source amount as a maximum unless you change it. All aspects are optional and adjustable in the mod's settings.":
                    '季节性河流将水流（修改后的常定流水源）与地图的气候和天气联系起来。例如，如果你的地图有一个干燥的夏天，那么这些水源在夏天会减少。季节性河流本身不应该引起洪水，因为它将地图的默认水源量视为最大值，除非你进行更改。所有方面都可以在模组的设置中进行选择和调整。',

                    "Simulate snow accumulation and snow melt. Snow melt is not currently tied to snow visuals. This affects Constant Rate Water Sources, Detention and Retention basins.":
                    '模拟雪的积累和融化。目前，雪融化与雪的视觉效果没有直接关联。这会影响常定流水源、蓄水和保水盆地。',

                    "Constant flow rate from  Streams (Modified Constant Rate Water Sources) unaffected by season or weather.":
                    '来自水流（修改后的常定流水源）的常定流速，不受季节或天气的影响。',

                    "Streams (Modified Constant Rate Water Sources) flowrates will increase by this percentage during the season with the highest mean seasonal precipitation. Other seasons will be proportional.":
                    '在具有最高季节降水平均值的季节，水流（修改后的常定流水源）的流速将增加这个百分比。其他季节将成比例增加。',

                    "Streams (Modified Constant Rate Water Sources) flowrates will increase by this percentage when current precipitation (rain) is at a maximum. Less precipitation is proportional.":
                    '在当前降水（雨）达到最大值时，水流（修改后的常定流水源）的流速将增加这个百分比。降水较少时成比例增加。',

                    "Minimum multiplier applied to stream flowrates.":
                    '应用于流速的最小倍增器。',

                    "Maximum multiplier applied to stream flowrates.":
                    '应用于流速的最大倍增器。',

                    "On confirmation, resets Seasonal Streams Settings.":
                    '确认后，将重置季节性河流设置。',

                    "Lets you try to make a water source with a radius smaller than 5m. It will not always work, but will be increased to a radius that does work.":
                    '允许你尝试制作半径小于5米的水源。它不总是有效的，但会增加到有效的半径。',

                    "Custom modded water source that rises with precipitation and snowmelt and slowly drains when the weather is dry. They have a maximum water surface elevation but no minimum water surface elevation. You may need to adjust the global evaporation rate in the settings for desirable infiltration of the pond water.":
                    '自定义修改的水源，随着降水和融雪而上涨，在天气干燥时缓慢排水。它们具有最大水面高度，但没有最小水面高度。你可能需要在设置中调整全局蒸发速率，以便池塘水的渗透效果理想。',

                    "Custom modded water source that rises with precipitation and snowmelt and slowly drains when the weather is dry. They have a maximum water surface elevation and a minimum water surface elevation. You may need to adjust the global evaporation rate in the settings for desirable infiltration of the pond water.":
                    '自定义修改的水源，随着降水和融雪而上涨，在天气干燥时缓慢排水。它们具有最大水面高度和最小水面高度。你可能需要在设置中调整全局蒸发速率，以便池塘水的渗透效果理想。',

                    "Should probably leave at default unless you are using detention or retention basins. Actual evaporation rate is 1000x smaller but this gives you control over the rate. This is global and you may want to rebalance and increase flows of water sources after increasing it.":
                    '除非你正在使用蓄水池或保水池，否则最好保持默认值。实际蒸发速率要小1000倍，但这使你能够控制速率。这是全局的，你可能想在增加后重新平衡和增加水源的流量。',

                    "This will increase the rate of evaporation by 1000x FOR THE WHOLE MAP for a short amount of time before returning to normal. For cleaning up water messes but USE AT YOUR OWN RISK! Lakes with an target elevation below the ground level are a safer way to remove water.":
                    '这将在整个地图上短时间内将蒸发速率提高1000倍，然后恢复正常。用于清理水的混乱，但使用需谨慎！具有目标高程低于地面水平的湖泊是更安全的排水方式。',

                    "On confirmation, resets Water Tool Settings.":
                    '点击确认后，将重置水工具设置。',

                    "This feature is dependent on map design. Maps with a sea water source and a single shoreline work best. The point of the waves feature is to make the shore move in and out and make sand along the shoreline. A better way to make beaches is to just paint them with surface painter instead. Waves exacerbate the magnitude of the water surface. Tides happen once or twice a day. Waves and tides are always lower than the original sea level and do not cause flooding.":
                    '此功能依赖于地图设计。具有海水源和单个海岸线的地图效果最佳。波浪功能的目的是使海岸线进出，并在沿海形成沙滩。更好的制作海滩的方式是使用表面绘图工具直接绘制。波浪加剧了水面的幅度。潮汐每天发生一到两次。波浪和潮汐始终低于原始海平面，不会引起洪水。',

                    "On confirmation, resets Waves and Tides Settings.":
                    '点击确认后，将重置波浪和潮汐设置。',

                    'Waves are generated at the map boundary where there is a Sea water source. Once generated they head towards shore. Maps were not necessarily designed for these waves, and the waves exacerbate the water surface. Waves are lower than the sea level from the original map and do not cause flooding. Maps such as San Francisco with shallow seas will need waves and tides with smaller heights to avoid large swathes of non-playable area becoming dry sand.':
                    '海浪在地图边界的海水源处生成。一旦生成，它们就朝着岸边前进。地图不一定是为这些波浪设计的，而波浪使水面恶化。波浪低于原始地图的海平面，不会造成洪水。像旧金山这样海域较浅的地图将需要较小高度的波浪和潮汐，以避免大片非可玩区域变成干沙。',

                    'Frequency for waves per day.':
                    '每天的波浪频率。',

                    'Tides are the biggest waves and they cause the sea to rise and fall along the shore. Tides can add sandy graphics along shorelines but the sand may not persist the entire time between low tide and high tide. Tides are lower than the sea level from the original map and do not cause flooding. Maps such as San Francisco with shallow seas will need waves and tides with smaller heights to avoid large swathes of non-playable area becoming dry sand. ':
                    '潮汐是最大的波浪，它们使海水沿岸升降。潮汐可以在海岸线上添加沙质图形，但沙子可能不会在低潮和高潮之间的整个时间内持续存在。潮汐低于原始地图的海平面，不会造成洪水。像旧金山这样海域较浅的地图将需要较小高度的波浪和潮汐，以避免大片非可玩区域变成干沙。',

                    'Diurnal tides have one high and one low tide per day. Semidiurnal has two high tides and two low tides per day.':
                    '白天潮汐每天有一次高潮和一次低潮。半日潮有每天两次高潮和两次低潮。',

                    'A higher value makes waves stronger while a lower value makes waves weaker. Stronger waves reach farther into the map. Weak waves may disperse before reaching shore. Vanilla is 9950 Recommended 9980-9999. The actual value is 10000x less.':
                    '更高的值使波浪更强，而较低的值使波浪更弱。较强的波浪能够延伸到地图更远的地方。较弱的波浪可能在到达岸边之前就散开。原版是9950，推荐值为9980-9999。实际值是其10000倍之一。'
                },
                [MAIN.工具框.标签],{
                    "Flow":"流量",
                    'Depth':'深度'
                },
                [MAIN.悬浮框.标题],{
                    "Reduce Flow/Depth/Elevation": '减少流量/深度/高程',
                    'Increase Flow/Depth/Elevation': '增加流量/深度/高程',
                    'Flow/Depth/Elevation Rate of Change': '流量/深度/高程变化率',
                    'Reduce Radius': '减小半径',
                    'Increase Radius': '增加半径',
                    'Radius Rate of Change': '半径变化率'

                },
                [MAIN.悬浮框.内容],{
                    "Reduces the flow for Streams. Decreases the depth or elevation for rivers, seas, and lakes. Reduces the max depth for retention and detention basins.":
                    '减小河流的流量。减小河流、海洋和湖泊的深度或高程。减小蓄水和滞水池的最大深度。',

                    "Increases the flow for Streams. Increases the depth or elevation for rivers, seas, and lakes. Increases the max depth for retention and detention basins.":
                    '增加河流的流量。增加河流、海洋和湖泊的深度或高程。增加蓄水和滞水池的最大深度。',

                    "Changes the rate in which the increase and decrease buttons work for Flow, Depth and Elevation.":
                    '改变流量、深度和高程的增加和减少按钮的工作速率。',

                    "Reduces the radius.":'减小半径。',
                    "Increases the radius..":'增加半径。',
                    'Changes the rate in which the increase and decrease buttons work for Radius.':'改变增加和减少按钮在半径上的工作速率。'
                },
                [MAIN.工具栏.资产详情.标题],{
                    'Stream - Constant or Variable Rate Water Source': '小溪 - 恒定或可变速水源',
                    'River - Border River Water Source': '河流 - 边界河水源',
                    'Lake - Constant Level Water Source': '湖泊 - 恒定水平水源',
                    'Sea - Border Sea Water Source': '海洋 - 边界海水源',
                    'Water Tool':'水景工具'
                },
                [MAIN.工具栏.资产详情.描述],{
                    'Emits water depending on the settings for this mod. With Seasonal Streams disabled, the flow rate will be constant. With Seasonal Streams enabled the flow rate will vary with season, precipitation, and snowmelt depending on your settings. Left click to place within playable area. Hover over and right click to remove.':
                    '根据此mod的设置释放水。如果禁用了季节性流，流量将保持恒定。启用季节性流时，流量将根据您的设置随季节、降水和融雪而变化。左键单击以放置在可玩区域内。悬停并右键单击以移除。',
                    'Has a constant level and controls water flowing into or out of the border. While near the border, the source will snap to the border. Right click to designate the target elevation. Left click to place. Hover over and right click to remove.':
                    '具有恒定水平并控制流入或流出边界的水。靠近边界时，水源会捕捉到边界。右键单击以指定目标高程。左键单击以放置。悬停并右键单击以移除。',
                    'Fills quickly until it gets to the desired level and then maintains that level. If it has a target elevation below the ground level, it can drain water faster than evaporation. Right click to designate the target elevation. Left click to place within playable area. Hover over and right click to remove.':
                    '快速填充直到达到所需水平，然后保持该水平。如果目标高程低于地面水平，它可以比蒸发更快地排水。右键单击以指定目标高程。左键单击以放置在可玩区域内。悬停并右键单击以移除。',
                    'Controls water flowing into or out of the border and the lowest sea controls sea level. With Waves and Tides disabled, it will maintain constant level. With Waves and Tides enabled the sea level rises and falls below the original sea level. Right click to designate the elevation. Left click to place if the radius touches a border. Hover over and right click to remove.':
                    '控制流入或流出边界的水，最低海域控制海平面。如果禁用了波浪和潮汐，它将保持恒定水平。启用波浪和潮汐时，海平面将在原始海平面以下升降。右键单击以指定高程。如果半径触及边界，则左键单击以放置。悬停并右键单击以移除。',
                    'Water tool allows you to add and remove water sources from your map.':'水景工具允许您在地图上添加和移除水源。'
                },
                [MAIN.悬浮框.提示2],{
                    "Rivers must be placed near map border.":
                    "河流必须靠近地图边界。",
                    "Right click to designate the water surface elevation.":
                    "右键单击以指定水面高程。",
                    "Sea water sources must touch the map border.":
                    "海水源必须接触地图边界。",
                    'This water source must be placed inside the playable map.':
                    '水源必须在地图内'
                },
                [MAIN.下拉框.值,MAIN.下拉框.标签],{
                    'Semidiurnal': '半日潮',
                    'Diurnal': '昼夜潮'
                }
            ),
            // 终极监视器: RE(
            //     [HOOKUI.面板.标题, HOOKUI.顶栏.名称], {
            //         'City Monitor': '城市监视器',
            //     },
            //     [rif().class('panel_YqS').index(1).first.all.index(1).index(1)], {
            //         'Electricity': '电力资源可用性',
            //         'Water': '水资源可用率',
            //         'Sewage': '污水处理',
            //         'Garbage Processing': '垃圾处理',
            //         'Fire Hazard': '火灾危险',
            //         'Crime Rate': '犯罪率',
            //         'Traffic Flow': '交通流量',
            //         'Parking Availability': '停车位可用性',
            //         'Healthcare Efficiency': '医疗效率',
            //         'Deathcare Efficiency': '殡仪服务效率',
            //         'Imprisonment Capacity': '监狱容量',
            //         'Education Availability': '教育可用性',
            //         'Income Efficiency': '收入效率',
            //         'Monthly Population Growth': '每月人口增长',
            //         'Avg. Pollution': '平均污染'
            //     },
            //     [HOOKUI.面板.标题], {
            //         'City': '城市监视器'
            //     }
            // ), 
            额外景观工具扩展_地面: RE(
                [MAIN.悬浮框.内容,MAIN.悬浮框.标题],{
                    'Surfaces':'地面'
                },
                [MAIN.工具栏.资产详情.标题,MAIN.工具栏.资产详情.描述],{
                    'Concrete': '混凝土',
                    'Ground': '地面',
                    'Tiles': '瓷砖',
                    'Wood': '木材'
                },
                [MAIN.工具栏.资产详情.标题],{
                    'Asphalt 001': '沥青 001',
                    'Asphalt 002': '沥青 002',
                    'Cracked Asphalt': '破裂的沥青',
                    'Polished Concrete': '抛光混凝土',
                    'Weathered Asphalt': '风化的沥青',
                    'Grass 001': '草地 001',
                    'Snow': '雪',
                    'Scattered Leaves': '散落的树叶',
                    'Sand': '沙子',
                    'Rocky Sand': '岩石沙',
                    'Wet Sand': '湿沙',
                    'Mulch': '覆盖物',
                    'Mud': '泥巴',
                    'Grass Checkered Lawn': '格子草坪',
                    'Podzol': '灰土',

                    'Dark Grey Ceramic Tile': '深灰色陶瓷砖',
                    'Yellow & Grey Paving Stone': '黄灰色铺路石',
                    'White & Grey Plaza Paving Stone': '白灰色广场铺路石',
                    'Red Brick': '红砖',
                    'Hexagonal Grey Paving Stone': '六角灰色铺路石',
                    'Hexagonal Dark Grey Paving Stone': '六角深灰色铺路石',
                    'Herringbone Grey Paving Stone 002': '人字形灰色铺路石 002',
                    'Herringbone Grey Paving Stone 003': '人字形灰色铺路石 003',
                    'Grey Walking stone': '灰色行走石',
                    'Grey Paving Stone': '灰色铺路石',
                    'Grey Ceramic Tile': '灰色陶瓷砖',
                    'Grey Brick': '灰色砖',
                    'Eco Pavement': '生态铺路',
                    'Herringbone Grey Paving Stone 001': '人字形灰色铺路石 001',
                    'Wood 001': '木头 001',
                    'Wood 002': '木头 002',
                    'Wood 003': '木头 003'
                }
            ),
            额外景观工具扩展_资产: RE(
                [MAIN.悬浮框.内容,MAIN.悬浮框.标题],{
                    'Props':'道具'
                }
            ),
            更好的推土机: RE(
                [MAIN.悬浮框.内容],{
                    'Shows and EXCLUSIVELY targets markers and invisible roads. With this enabled you can demolish invisible networks, invisible parking decals, various spots, points, and spawners, but SAVE FIRST! You cannot demolish these within buildings.':
                    '显示并且专门针对标记和看不见的道路。启用此功能后，您可以拆除看不见的网络、看不见的停车标记、各种点、点和生成器，但是请先保存！您不能在建筑物内拆除这些。',

                    'Makes the bulldozer EXCLUSIVELY target surfaces and spaces inside or outside of buildings so you can remove them in one click. You must turn this off to bulldoze anything else.':
                    '使推土机专门针对建筑物内外的表面和空间，以便您可以一键移除它们。您必须关闭此功能才能拆除其他任何东西。'
                }
            ),
            树木风力控制器: RE(
                [HOOKUI.面板.标题,HOOKUI.顶栏.名称],{
                    'Tree Wind Controller':'树木风力控制器'
                },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').first.first.first.first],{
                    'Disable All Wind:':'关闭所有风'
                },
                [rif().class('content_XD5.content_AD7.child-opacity-transition_nkS').first.all.first],{
                    'Wind Strength:':'风强度',
                    'Wind Strength Variance:':'风力变化',
                    'Wind Strength Variance Period:':'风力变化周期',
                    'Wind Direction:':'风向',
                    'Wind Direction Variance:':'风向变化',
                    'Wind Direction Variance Period:':'风向变化周期'
                }
            ),
            地图编辑器_气候: RE(
                [rif().class('list-item_qRg.item_H00').class('name_u39'),rif().class('control_Hds').class('picker-toggle_d6k'),开发者模式.内容.控制值], {
                'ContinentalCorralRichesClimate': '陆地珊瑚气候',
                'ContinentalGreatHighlandsClimate': '陆地高地气候',
                'ContinentalLakelandClimate': '陆地湖泊气候',
                'ContinentalMountainVillageClimate': '陆地山村气候',
                'ContinentalTampereClimate': '陆地坦佩雷气候',
                'PolarSweepingPlainsClimate': '极地平原气候',
                'PolarTwinMountainClimate': '极地山地气候',
                'PolarWindyFjordsClimate': '极地峡湾气候',
                'TemperateArchipelagoHavenClimate': '温带群岛气候',
                'TemperateBarrierIslandClimate': '温带障碍岛气候',
                'TemperateSanFranciscoClimate': '温和的旧金山气候',
                'TemperateSunshinePeninsulaClimate': '温带阳光半岛气候',
                'TemperateWaterwayPassClimate': '温带航道气候',
                'TemperateRiverDeltaClimate': '温带河三角洲气候'
                }
            ),
            交通运输管理器: RE(
                [MAIN.设置.选项],{
                    'Extended T. Manager (v0.1.2)':'交通运输管理器'
                },
                [MAIN.设置.标签,MAIN.设置.标题],{
                    'Logging Level': '日志级别',
                    'Show this mod errors on UI': '在用户界面上显示此模组的错误',
                    'Mod Version': '模组版本'
                },
                [MAIN.设置.描述],{
                    'Changes the log level of this mod. Verbose mode generates A LOT of logging, be careful.':'更改此模组的日志级别。详细模式会生成大量日志，请小心。',
                    'Only disable it on emergencies!':'仅在紧急情况下禁用它！',
                    "The current mod version.\n\nIf version ends with 'B', it's a version compiled for BepInEx framework.":"当前模组版本。\n\n如果版本以'B'结尾，则是为 BepInEx 框架编译的版本。"
                    
                }
            ),
            模组工具链: RE(
                [MAIN.设置.标签],{
                    '工具链状态':'模组开发工具，非必要不需要安装'
                }
            ),
            可放置自长建筑: RE(
                [MAIN.设置.选项],{
                    'Plop the Growables':'可放置自长建筑'
                },
                [MAIN.设置.标签,MAIN.设置.标题],{
                    'Disable building levelling':'禁用建筑升级'
                },
                [MAIN.设置.描述],{
                    'Prevents buildings from changing levels, so that they keep their appearance.':'阻止建筑改变级别，使其保持原貌。'

                }
            ),
            额外UI界面: RE(
                [MAIN.设置.选项],{
                    'Extra UI Screens (v0.1.1)':'额外UI界面'
                },
                [MAIN.设置.TAB],{
                    'Monitors':'显示器',
                    'About':"关于",
                    'Meshes':'网格'

                },
                [
                    rif({match:'inc'}).class('option-page_CW8.option-section_VzQ').class('main-column_D0A').class('content_gqa').class('label_DGc.label_ZLb'),
                    rif({match:'inc'}).class('option-page_CW8.option-section_VzQ').class('info-column_uQ0').class('info-title_a3p')],{
                    'Use Monitor':'使用显示器'
                },
                [MAIN.设置.描述],{
                    'Create a EUIS overlay over the main screen. Use Ctrl+Tab to alternate between EUIS and game screens.':'在主屏幕上创建一个EUIS覆盖层。使用Ctrl+Tab在EUIS和游戏屏幕之间进行切换。'

                }
            ),
            编辑器: RE(
                编辑器.通用,{
                    'Building Prefab':'建筑资产',
                    'Meshes':'网格',
                    'Mesh':'网格',
                    'Position':'位置',
                    'Rotation':'旋转',
                    'Require State': '需求状态',
                    'Circular': '圆形资产',
                    'Access Type': '访问类型',
                    'Lot Width': '区域宽度',
                    'Lot Depth': '区域长度',
                    'Name': '名称',
                    'Front': '前',
                    'LeftCorner': '左',
                    'RightCorner': '右',
                    'LeftAndRightCorner': '左/右',
                    'LeftAndBackCorner': '左/后',
                    'RightAndBackCorner': '右/后',
                    'FrontAndBack': '前后',
                    'All': '全部',

                    'None': '无',
                    'Child': '儿童',
                    'Teen': '青少年',
                    'Adult': '成年人',
                    'Elderly': '老年人',
                    'Dead': '死亡',
                    'Stump': '树桩',
                    'Empty': '空',
                    'Full': '满',
                    'Clear': '清理',
                    'Track': '轨道',
                    'Partial1': '部分1',
                    'Partial2': '部分2',
                    'LefthandTraffic': '左侧通行',
                    'RighthandTraffic': '右侧通行',
                    'Cold': '寒冷',
                    'Warm': '温暖',
                    'Home': '居住地',
                    'Homeless': '无家可归',
                    'Motorcycle': '摩托车',
                    'Forward': '向前',
                    'Backward': '向后',

                    'Service Consumption': '服务消耗',
                    'Upkeep': '维护',
                    'Electricity Consumption': '电力消耗',
                    'Water Consumption': '用水量',
                    'Garbage Accumulation': '垃圾积累',
                    'Telecom Need': '电信需求',

                    'Service Object': '服务对象',
                    'Service': '服务',
                    'Communications': '通信',
                    'Education & Research': '教育与研究',
                    'Electricity': '电力',
                    'Fire & Rescue': '消防与救援',
                    'Garbage Management': '垃圾管理',
                    'Health & Deathcare': '健康与死亡护理',
                    'Landscaping': '园林绿化',
                    'Parks & Recreation': '公园与娱乐',
                    'Police & Administration': '警察与行政',
                    'Roads': '道路',
                    'Transportation': '交通',
                    'Water & Sewage': '供水与污水',

                    'Placeable Object': '可放置对象',
                    'Construction Cost': '建造费用',
                    'XP Reward': '经验奖励',
                    'Service Coverage': '服务覆盖范围',
                    'Range': '范围',
                    'Capacity': '容量',
                    'Magnitude': '大小',
                    'City Service Building': '城市服务建筑',
                    'Upkeeps': '维护费用',
                    'Park': '公园',
                    'Maintenance Pool': '维护池',
                    'Allow Homeless': '允许无家可归者',
                    'Attraction': '吸引力',
                    'Attractiveness': '吸引力',
                    'Leisure Provider': '休闲提供',
                    'Efficiency': '效率',
                    'Leisure Type': '休闲类型',

                    'UI Object': 'UI对象',
                    'Group': '组',
                    'Priority': '优先级',
                    'Icon': '图标',
                    'Large Icon': '大图标',
                    'Is Debug Object': '是否为调试对象',
                    'Administration': '行政管理',
                    'AirTransportGroup': '航空运输组',
                    'Areas': '区域',
                    'AreasGroup': '区域组',
                    'Budget': '预算',
                    'Business': '业务',
                    'CitizensCategory': '市民类别',
                    'CityCategory': '城市类别',
                    'CommunicationGroup': '通信组',
                    'Communications': '通信',
                    'CommunicationsPost': '通信邮件',
                    'CommunicationsTelecom': '通信电信',
                    'CompanyCount': '公司数量',
                    'Deathcare': '死亡护理',
                    'DisasterControl': '灾难控制',
                    'EconomyGroup': '经济组',
                    'Education': '教育',
                    'Education & Research': '教育和研究',
                    'EducationGroup': '教育组',
                    'Electricity': '电力',
                    'ElectricityGroup': '电力组',
                    'Employment': '就业',
                    'Expenses': '支出',
                    'Fire & Rescue': '消防和救援',
                    'Fire&RescueGroup': '消防和救援组',
                    'Garbage Management': '垃圾管理',
                    'GarbageManagement': '垃圾管理',
                    'Happiness': '幸福',
                    'Health & Deathcare': '健康与殡葬',
                    'Health&DeathcareGroup': '健康与殡葬',
                    'Healthcare': '医疗保健',
                    'HotelRooms': '酒店客房',
                    'lmmaterial Goods': '非物质商品',
                    'Income': '收入',
                    'InfoViewGroup': '信息视图组',
                    'InfoViewsCategory': '信息视图类别',
                    'Interface&ToolsCategory': '界面和工具类别',
                    'Jobs': '工作',
                    'Landscaping': '景观',
                    'LandscapingGroup': '景观组',
                    'LargeParks': '大型公园',
                    'LargeSportsParks': '大型体育公园',
                    'MapTileGroup': '地图瓦片组',
                    'Marker Object Prefabs': '标记对象资产',
                    'Material Goods': '物质商品',
                    'Materials': '材料',
                    'NotificationsGroup': '通知组',
                    'Parks & Recreation': '公园与娱乐',
                    'Parks&RecreationGroup': '公园与娱乐组',
                    'Pathways': '路径',
                    'PhotoModeGroup': '照片模式组',
                    'Police': '警察',
                    'Police & Administration': '警察与行政',
                    'Police&AdministrationGroup': '警察与行政组',
                    'Population': '人口',
                    'PopulationDecline': '人口减少',
                    'PopulationGrowth': '人口增长',
                    'Post': '邮政',
                    'ProgressionGroup': '进展组',
                    'PublicTransport': '公共交通',
                    'Research': '研究',
                    'RoadTransportGroup': '道路运输组',
                    'Roads': '道路',
                    'RoadsGroup': '道路组',
                    'RoadsHighways': '高速公路',
                    'RoadsIntersections': '道路交叉口',
                    'RoadsLargeRoads': '大型道路',
                    'RoadsMediumRoads': '中型道路',
                    'RoadsParking': '停车场',
                    'RoadsRoundabouts': '环形交叉路口',
                    'RoadsServices': '服务道路',
                    'RoadsSmallRoads': '小型道路',
                    'Services': '服务',
                    'Services Toolbar Group': '服务工具栏组',
                    'ServicesCategory': '服务类别',
                    'Signatures': '标志性',
                    'SignaturesCommercial': '商业标志性',
                    'Signatureslndustrial': '工业标志性',
                    'SignaturesLandmarks': '地标标志性',
                    'SignaturesOffice': '办公标志性',
                    'SignaturesResidential': '住宅标志性',
                    'SignaturesResidentialMixed': '混合住宅标志性',
                    'Spaces': '空间',
                    'SportsParks': '体育公园',
                    'Terraforming': '地形塑造',
                    'Tools Toolbar Group': '工具栏组',
                    'Tourism': '旅游业',
                    'TouristAttractions': '旅游景点',
                    'TrainGroup': '火车组',
                    'Transportation': '交通',
                    'TransportationAir': '空中交通',
                    'TransportationGroup': '交通组',
                    'TransportationRoad': '道路交通',
                    'TransportationSubway': '地铁交通',
                    'TransportationTrain': '火车交通',
                    'TransportationTram': '有轨电车交通',
                    'TransportationWater': '水上交通',
                    'Vegetation': '植被',
                    'Water & Sewage': '水和污水',
                    'Water&SewageGroup': '水和污水组',
                    'WaterTool': '水工具',
                    'WaterTransportationGroup': '水上交通组',
                    'Wealth': '财富',
                    'Workers': '工人',
                    'Zones': '区域',
                    'Zones Toolbar Group': '区域工具栏组',
                    'ZonesCommercial': '商业区',
                    'ZonesExtractors': '提取区',
                    'ZonesIndustrial': '工业区',
                    'ZonesOffice': '办公区',
                    'ZonesResidential': '居住区',
                    'ZoningGroup': '区域组',

                    'Object Sub Objects': '对象子对象',
                    'Object Sub Nets': '对象子网',
                    'Invert When': '反转条件',
                    'Sub Nets': '子线段',
                    'Net Prefab': '线段资产',
                    'Bezier Curve': '贝塞尔曲线',
                    'Node Index': '节点索引',
                    'Parent Mesh': '父网格',
                    'Upgrades': '升级',
                    'Sub Objects': '子对象',
                    'Object': '对象',
                    'Parent Mesh': '父网格',
                    'Group Index': '组索引',
                    'Probability': '概率',

                    'Effect Source': '效果源',
                    'Effects': '效果',
                    'Animation Curves': '动画曲线',
                    'Effect': '效果',
                    'Position Offset': '位置偏移',
                    'Scale': '比例',
                    'Intensity': '强度',
                    'Parent Mesh': '父网格',
                    'AnimationIndex': '动画索引',
                    'Unlockable': '可解锁',
                    'Require All': '需要全部',
                    'Require Any': '需要任意',
                    'Ignore Dependencies': '忽略依赖关系',
                    'Object Sub Areas': '对象子区域',
                    'Sub Areas': '子区域',
                    'Area Prefab': '区域资产',
                    'Node Positions': '节点位置',
                    'Parent Meshes': '父网格',

                    'Resources': '资源',
                    'Resource': '资源',
                    'Amount': '数量',
                    'Scale With Usage': '使用比例缩放',
                    'Pollution': '污染',
                    'Ground Pollution': '地面污染',
                    'Air Pollution': '空气污染',
                    'Noise Pollution': '噪音污染',
                    'Scale With Renters': '随租客数量缩放',
                    'Transport Station': '交通站点',
                    'Car Refuel Types': '汽车加油类型',
                    'Train Refuel Types': '火车加油类型',
                    'Watercraft Refuel Types': '水上交通工具加油类型',
                    'Aircraft Refuel Types': '飞机加油类型',
                    'Comfort Factor': '舒适因子',
                    'Fuel': '燃料',
                    'Electricity': '电力',
                    'FuelAndElectricity': '燃料和电力',
                    'Obsolete Identifiers': '已过时标识符',
                    'Building Terraform Override': '建筑地形改造覆盖',
                    'Level Min Offset': '平整最小偏移',
                    'Level Max Offset': '平整最大偏移',
                    'Level Front Left': '左前平整',
                    'Level Front Right': '右前平整',
                    'Level Back Left': '左后平整',
                    'Level Back Right': '右后平整',
                    'Smooth Min Offset': '平滑最小偏移',
                    'Smooth Max Offset': '平滑最大偏移',
                    'Height Offset': '高度偏移',
                    'Additional Smooth Areas': '额外平滑区域',
                    'Dont Raise': '不提升',
                    'Dont Lower': '不降低',
                    'School':'学校',
                    'Student Capacity': '学生容量',
                    'Level': '等级',
                    'Graduation Modifier': '毕业修改器',
                    'Student Wellbeing': '学生生活质量',
                    'Student Health': '学生健康',
                    'Service Fee Collector': '服务费收集器',
                    'Object Sub Lanes': '对象子车道',
                    'Sub Lanes': '子车道',
                    'Lane Prefab': '车道资产',
                    'Building Terraform Override': '建筑地形覆盖',
                    'Level Min Offset': '等级最小偏移',
                    'Level Max Offset': '等级最大偏移',
                    'Level Front Left': '前左等级',
                    'Level Front Right': '前右等级',
                    'Level Back Left': '后左等级',
                    'Level Back Right': '后右等级',
                    'Smooth Min Offset': '平滑最小偏移',
                    'Smooth Max Offset': '平滑最大偏移',
                    'Height Offset': '高度偏移',
                    'Additional Smooth Areas': '额外平滑区域',
                    'Dont Raise': '不提升',
                    'Dont Lower': '不降低',
                    'Prison': '监狱',
                    'Prison Van Capacity': '监狱车辆容量',
                    'Prisoner Capacity': '囚犯容量',
                    'Prisoner Wellbeing': '囚犯福祉',
                    'Prisoner Health': '囚犯健康',
                    'Local Effects': '局部影响',
                    'Type': '类型',
                    'Mode': '模式',
                    'Delta': '增量',
                    'Radius Combine Mode': '半径组合模式',
                    'Radius': '半径',
                    'Prefab Identifiers': '资产标识符',
                    'Power Plant': '发电厂',
                    'Electricity Production': '电力生产',
                    'Resource Consumer': '资源消耗',
                    'No Resource Notification Prefab': '无资源通知 资产',
                    'Storage Limit': '存储限制',

                    'Spawnable Building': '自长建筑',
                    'Zone Type': '区域类型',
                    'Level': '等级',
                    'Building Properties': '建筑属性',
                    'Residential Properties': '住宅属性',
                    'Allowed Sold': '允许销售',
                    'Allowed Manufactured': '允许制造',
                    'Allowed Stored': '允许存储',
                    'Space Multiplier': '空间倍增',
                    'NoResource': '无资源',
                    'Money': '金钱',
                    'Grain': '粮食',
                    'ConvenienceFood': '便利食品',
                    'Food': '食物',
                    'Vegetables': '蔬菜',
                    'Meals': '餐点',
                    'Wood': '木材',
                    'Timber': '木材',
                    'Paper': '纸张',
                    'Furniture': '家具',
                    'Vehicles': '车辆',
                    'Lodging': '住宿',
                    'UnsortedMail': '未分类邮件',
                    'LocalMail': '本地邮件',
                    'OutgoingMail': '外发邮件',
                    'Oil': '石油',
                    'Petrochemicals': '石化产品',
                    'Ore': '矿石',
                    'Plastics': '塑料',
                    'Metals': '金属',
                    'Electronics': '电子产品',
                    'Software': '软件',
                    'Coal': '煤炭',
                    'Stone': '石头',
                    'Livestock': '牲畜',
                    'Cotton': '棉花',
                    'Steel': '钢铁',
                    'Minerals': '矿物',
                    'Concrete': '混凝土',
                    'Machinery': '机械',
                    'Chemicals': '化学品',
                    'Pharmaceuticals': '药品',
                    'Beverages': '饮料',
                    'Textiles': '纺织品',
                    'Telecom': '电信',
                    'Financial': '金融',
                    'Media': '媒体',
                    'Entertainment': '娱乐',
                    'Recreation': '娱乐',
                    'Garbage': '垃圾',
                    'Count': '数量',
                    'Static Object Prefab': '静态对象资产',
                    'Tree Objec': '树木对象',
                    'Wood Amount': '木材数量',
                    'Standing Object': '站立对象',
                    'Leg Size': '根部尺寸',
                    'Circular Leg': '圆形根部',
                    'Sub Object Default Probability': '子对象默认概率',
                    'Default Probability': '默认概率',
                    'Rotation Symmetry': '旋转对称',
                    'Car Prefab': '汽车资产',
                    'Size Class': '尺寸类别',
                    'Energy Type': '能源类型',
                    'Max Speed': '最大速度',
                    'Acceleration': '加速度',
                    'Braking': '刹车',
                    'Turning': '转向',
                    'Stiffness': '刚度',
                    'Small': '小型',
                    'Medium': '中型',
                    'Large': '大型',
                    'Personal Car': '私家车',
                    'Passenger Capacity': '乘客容量',
                    'Baggage Capacity': '行李容量',
                    'Cost To Drive': '驾驶成本',
                    'Vehicle Side Effects': '车辆副作用',
                    'Road Wear': '路面磨损',
                    'Noise Pollution': '噪音污染',
                    'Air Pollution': '空气污染',
                    'Activity Location': '活动位置',
                    'Locations': '位置',
                    'Animated Prop Name': '动画道具名称',
                    'Require Authorization': '需要授权',
                    'Activity': '活动',
                    'Bench Sitting Location': '长椅坐着位置',
                    'Boarding Location': '上车位置',
                    'Disembarking Location': '下车位置',
                    'Driving Location': '驾驶位置',
                    'Entrance Location': '入口位置',
                    'Garage Spot Location': '车库停车位位置',
                    'Producing Location': '生产位置',
                    'PullUp Location': '停靠位置',
                    'Road Prefab': '道路资产',
                    'Sections': '区段',
                    'Node': '节点',
                    'Intersection': '交叉路口',
                    'DeadEnd': '死胡同',
                    'Crosswalk': '人行横道',
                    'BusStop': '公交车站',
                    'Median': '中央分隔带',
                    'TrainStop': '火车站',
                    'OppositeTrainStop': '对面火车站',
                    'Inverted': '倒置',
                    'TaxiStand': '出租车站',
                    'LevelCrossing': '道路平交道',
                    'Elevated': '高架',
                    'Tunnel': '隧道',
                    'Raised': '高起',
                    'Lowered': '下降',
                    'LowTransition': '低过渡',
                    'HighTransition': '高过渡',
                    'WideMedian': '宽中央分隔带',
                    'TramTrack': '有轨电车轨道',
                    'TramStop': '有轨电车站',
                    'OppositeTramTrack': '对面有轨电车轨道',
                    'OppositeTramStop': '对面有轨电车站',
                    'MedianBreak': '中央分隔带中断',
                    'ShipStop': '船只停靠点',
                    'Sidewalk': '人行道',
                    'Edge': '边缘',
                    'SubwayStop': '地铁站',
                    'OppositeSubwayStop': '对面地铁站',
                    'MiddlePlatform': '中间站台',
                    'Underground': '地下',
                    'Roundabout': '环形交叉口',
                    'OppositeSidewalk': '对面人行道',
                    'SoundBarrier': '隔音墙',
                    'Overhead': '架空',
                    'TrafficLights': '交通信号灯',
                    'PublicTransportLane': '公共交通车道',
                    'OppositePublicTransport': '对面公共交通',
                    'Spillway': '泄洪道',
                    'MiddleGrass': '中央草地',
                    'MiddleTrees': '中央树木',
                    'WideSidewalk': '宽人行道',
                    'SideGrass': '边缘草地',
                    'SideTrees': '边缘树木',
                    'OppositeGrass': '对面草地',
                    'OppositeTrees': '对面树木',
                    'Opening': '开口',
                    'Front': '前方',
                    'Back': '后方',
                    'Flipped': '翻转',
                    'RemoveTrafficLights': '移除交通信号灯',
                    'AllWayStop': '四路停车标志',
                    'Pavement': '人行道',
                    'Gravel': '碎石路',
                    'Tiles': '瓷砖',
                    'ForbidLeftTurn': '禁止左转',
                    'ForbidRightTurn': '禁止右转',
                    'OppositeWideSidewalk': '对面宽人行道',
                    'OppositeForbidLeftTurn': '对面禁止左转',
                    'OppositeForbidRightTurn': '对面禁止右转',
                    'OppositeSoundBarrier': '对面隔音墙',
                    'SidePlatform': '侧面站台',
                    'AddCrosswalk': '添加人行横道',
                    'RemoveCrosswalk': '移除人行横道',
                    'Lighting': '照明',
                    'OppositeBusStop': '对面公交站',
                    'OppositeTaxiStand': '对面出租车站',
                    'OppositeRaised': '对面高起',
                    'OppositeLowered': '对面下降',
                    'OppositeLowTransition': '对面低过渡',
                    'OppositeHighTransition': '对面高过渡',
                    'OppositeShipStop': '对面船只停靠点',
                    'OppositePlatform': '对面站台',
                    'OppositeAddCrosswalk': '对面添加人行横道',
                    'OppositeRemoveCrosswalk': '对面移除人行横道',
                    'Inside': '内部',
                    'ForbidStraight': '禁止直行',
                    'OppositeForbidStraight': '对面禁止直行',
                    'Require None': '需要 不存在:',
                    'Invert': '反转',
                    'Flip': '翻转',
                    'Median': '中央分隔带',
                    'Offset': '偏移',
                    'Set State': '设置状态',
                    'Match Type': '匹配类型',
                    'Both': '两者',
                    'Any': '任意',
                    'Exclusive': '唯一',
                    'Max Slope Steepness': '最大坡度陡峭程度',
                    'Aggregate Type': '聚合类型',
                    'Invert Mode': '反转模式',
                    'Road Type': '道路类型',
                    'Speed Limit': '速度限制',
                    'Zone Block': '区块',
                    'Traffic Lights': '交通信号灯',
                    'Highway Rules': '高速公路规则',
                    'InvertLefthandTraffic': '反转左侧交通',
                    'FlipLefthandTraffic': '翻转左侧交通',
                    'InvertRighthandTraffic': '反转右侧交通',
                    'FlipRighthandTraffic': '翻转右侧交通',
                    'KeepOriginal': '保留原始',
                    'Alley': '巷子',
                    'Bridge': '桥梁',
                    'Dam': '大坝',
                    'Golden Gate Bridge': '金门大桥',
                    'Grand Bridge': '大桥',
                    'Highway': '高速公路',
                    'Invisible Pathway': '隐形路径',
                    'Pathway': '小径',
                    'Public Transport Lane': '公共交通车道',
                    'Runway': '跑道',
                    'Seaway': '航道',
                    'Street': '街道',
                    'Subway Track': '地铁轨道',
                    'Taxiway': '滑行道',
                    'Train Track': '铁路',
                    'Tram Track': '有轨电车轨道',
                    'Placement': '放置',
                    'FixedIndex': '固定索引',
                    'Anchor Top': '锚定顶部',
                    'Anchor Center': '锚定中心',
                    'Require Elevated': '需要高架',
                    'Require Outside Connection': '需要市外连接',
                    'Require Dead End': '需要死胡同',
                    'Require Orphan': '需要孤立',
                    'Placeable Net': '可放置网络',
                    'Elevation Range': '高程范围',
                    'Allow Parallel Mode': '允许并列模式',
                    'Underground Prefab': '地下资产',
                    'Electricity Connection': '电力连接',
                    'Voltage': '电压',
                    'Direction': '方向',
                    'Low': '低',
                    'High': '高',
                    'Invalid': '无效',
                    'Select Nothing/Everything': '选择无/全部',
                    'Forward': '向前',
                    'Backward': '向后',
                    'Both': '两者',
                    'Water Pipe Connection': '水管连接',
                    'Fresh Capacity': '清水容量',
                    'Sewage Capacity': '污水容量',
                    'Storm Capacity': '雨水容量',
                    'Net Pollution': '道路污染',
                    'Noise Pollution Factor': '噪音污染因子',
                    'Air Pollution Factor': '空气污染因子',
                    'Underground Net Sections': '地下网络部分',
                    'Unlock On Build':'依赖建筑解锁',
                    'Deathcare Facility': '丧葬设施',
                    'Hearse Capacity': '救护车容量',
                    'Storage Capacity': '存储容量',
                    'Processing Rate': '处理速率',
                    'Long Term Storage': '长期存储',
                    'Workplace': '工作场所',
                    'Workplaces': '工作场所',
                    'Complexity': '复杂度',
                    'Evening Shift Probability': '晚班概率',
                    'Night Shift Probability': '夜班概率',
                    'Manual': '手动',
                    'Simple': '简单',
                    'Complex': '复杂',
                    'Hitech': '高科技',
                    'Commercial': '商业',
                    'Citylndoors': '城市室内',
                    'Travel': '旅行',
                    'CityPark': '城市公园',
                    'CityBeach': '城市海滩',
                    'Attractions': '景点',
                    'Relaxation': '放松',
                    'Sightseeing': '观光',
                    'Never': '从不',
                    'Unlocks': '解锁',
                    'Company Object': '公司对象',
                    'Select Company': '选择公司',
                    'Companies': '公司',
                    'Commercial_Bar': '商业_酒吧',
                    'Commercial_BookStore': '商业_书店',
                    'Commercial_ChemicalStore': '商业_化学品商店',
                    'Commercial_ConvenienceFoodStore': '商业_便利食品店',
                    'Commercial_DrugStore': '商业_药店',
                    'Commercial_ElectronicsStore': '商业_电子产品商店',
                    'Commercial_FashionStore': '商业_时装店',
                    'Commercial_FoodStore': '商业_食品商店',
                    'Commercial_FurnitureStore': '商业_家具商店',
                    'Commercial_GasStation': '商业_加油站',
                    'Commercial_Hotel': '商业_酒店',
                    'Commercial_LiquorStore': '商业_酒水店',
                    'Commercial_PlasticsStore': '商业_塑料制品商店',
                    'Commercial_RecreactionStore': '商业_娱乐用品店',
                    'Commercial_Restaurant': '商业_餐厅',
                    'Commercial_VehicleStore': '商业_车辆商店',
                    'Industrial_BeverageFromGrainFactory': '工业_谷物饮料工厂',
                    'Industrial_BeverageFromVegetablesFactory': '工业_蔬菜饮料工厂',
                    'Industrial_BioRefinery': '工业_生物炼制厂',
                    'Industrial_ChemicalFactory': '工业_化学品工厂',
                    'Industrial_CoalMine': '工业_煤矿',
                    'Industrial_ConcreteFactory': '工业_混凝土工厂',
                    'Industrial_ConvenienceFoodFromGrainFactory': '工业_便利食品(从谷物)工厂',
                    'Industrial_ConvenienceFoodFromLivestockFactory': '工业_便利食品(从牲畜)工厂',
                    'Industrial_CottonExtractor': '工业_棉花提取器',
                    'Industrial_ElectronicsFactory': '工业_电子产品工厂',
                    'Industrial_FoodFactory': '工业_食品工厂',
                    'Industrial_ForestryExtractor': '工业_林业提取器',
                    'Industrial_FurnitureFactory': '工业_家具工厂',
                    'Industrial_GrainExtractor': '工业_谷物提取器',
                    'Industrial_LivestockExtractor': '工业_牲畜提取器',
                    'Industrial_MachineryFactory': '工业_机械工厂',
                    'Industrial_MetalSmelter': '工业_金属冶炼厂',
                    'Industrial_MineralPlant': '工业_矿产加工厂',
                    'Industrial_OilExtractor': '工业_石油提取器',
                    'Industrial_OilRefinery': '工业_石油精炼厂',
                    'Industrial_OreExtractor': '工业_矿石提取器',
                    'Industrial_PaperMill': '工业_造纸厂',
                    'Industrial_PharmaceuticalsFactory': '工业_制药厂',
                    'Industrial_PlasticsFactory': '工业_塑料制品工厂',
                    'Industrial_SawMill': '工业_锯木厂',
                    'Industrial_SteelPlant': '工业_钢铁厂',
                    'Industrial_StoneQuarry': '工业_石材采石场',
                    'Industrial_TextileFromCottonFactory': '工业_纺织品(从棉花)工厂',
                    'Industrial_TextileFromLivestockFactory': '工业_纺织品(从牲畜)工厂',
                    'Industrial_TextileFromPetrochemicalsFactory': '工业_纺织品(从石油化工产品)工厂',
                    'Industrial_VegetableExtractor': '工业_蔬菜提取器',
                    'Industrial_VehicleFactory': '工业_车辆工厂',
                    'Industrial_WarehouseBeverages': '工业_饮料仓库',
                    'Industrial_WarehouseChemicals': '工业_化学品仓库',
                    'Industrial_WarehouseCoal': '工业_煤仓库',
                    'Industrial_WarehouseConcrete': '工业_混凝土仓库',
                    'Industrial_WarehouseConvenienceFood': '工业_便利食品仓库',
                    'Industrial_WarehouseCotton': '工业_棉花仓库',
                    'Industrial_WarehouseElectronics': '工业_电子产品仓库',
                    'Industrial_WarehouseFood': '工业_食品仓库',
                    'Industrial_WarehouseFurniture': '工业_家具仓库',
                    'Industrial_WarehouseGrain': '工业_谷物仓库',
                    'Industrial_WarehouseLivestock': '工业_牲畜仓库',
                    'Industrial_WarehouseMachinery': '工业_机械仓库',
                    'Industrial_WarehouseMetals': '工业_金属仓库',
                    'Industrial_WarehouseMinerals': '工业_矿产仓库',
                    'Industrial_WarehouseOil': '工业_石油仓库',
                    'Industrial_WarehouseOre': '工业_矿石仓库',
                    'Industrial_WarehousePaper': '工业_纸张仓库',
                    'Industrial_WarehousePetrochemicals': '工业_石化产品仓库',
                    'Industrial_WarehousePharmaceuticals': '工业_制药产品仓库',
                    'Industrial_WarehousePlastics': '工业_塑料仓库',
                    'Industrial_WarehouseSteel': '工业_钢铁仓库',
                    'Industrial_WarehouseStone': '工业_石材仓库',
                    'Industrial_WarehouseTextiles': '工业_纺织品仓库',
                    'Industrial_WarehouseTimber': '工业_木材仓库',
                    'Industrial_WarehouseVegetables': '工业_蔬菜仓库',
                    'Industrial_WarehouseVehicles': '工业_车辆仓库',
                    'Industrial_WarehouseWood': '工业_木材仓库',
                    'Office_Bank': '办公_银行',
                    'Office_MediaCompany': '办公_传媒公司',
                    'Office_SoftwareCompany': '办公_软件公司',
                    'Office_TelecomCompany': '办公_电信公司',
                    'Fire Station': '消防站',
                    'Fire Engine Capacity': '消防车辆容量',
                    'Fire Helicopter Capacity': '消防直升机容量',
                    'Disaster Response Capacity': '灾害响应容量',
                    'Vehicle Efficiency': '车辆效率',
                    'Transformer': '变压器',
                    'Solar Powered': '太阳能供电',
                    'Production': '生产',
                    'Battery': '电池',
                    'Power Output': '功率输出',
                    'Water Pumping Station': '水泵站',
                    'Purification': '净化',
                    'Allowed Water Types': '允许的水类型',
                    'Groundwater': '地下水',
                    'SurfaceWater': '地表水',
                    'Shoreline Object': '岸线物体',
                    'Shoreline Offset': '岸线偏移',
                    'Allow Dryland': '允许干地',
                    'Service Upgrade': '服务升级',
                    'Buildings': '建筑物',
                    'Upgrade Cost': '升级成本',
                    'Max Placement Offset': '最大放置偏移',
                    'Public Transport': '公共交通',
                    'Transport Type': '运输类型',
                    'Purposes': '用途',
                    'Maintenance Range': '维护范围',
                    'Bus': '公共汽车',
                    'Train': '火车',
                    'Taxi': '出租车',
                    'Tram': '有轨电车',
                    'Ship': '船',
                    'Helicopter': '直升飞机',
                    'Airplane': '飞机',
                    'Subway': '地铁',
                    'Rocket': '火箭',
                    'TransportLine': '运输线路',
                    'Evacuation': '疏散',
                    'PrisonerTransport': '囚犯运输',
                    'Other': '其他',
                    'Gender': '性别',
                    'Move Speed': '移动速度',
                    'Domesticated': '驯化',
                    'Idle Time': '空闲时间',
                    'Min Group Member Count': '最小组成员数',
                    'Max Group Member Count': '最大组成员数',
                    'Spawnable Object': '可生成对象',
                    'Placeholders': '占位符',
                    'Randomization Group': '随机化组',
                    'Selected Sound': '选择声音',
                    'Bear Species': '熊种',
                    'Chicken Species': '鸡种',
                    'Cow Species': '牛种',
                    'Deer Species': '鹿种',
                    'Dolphin Species': '海豚种',
                    'Eagle Species': '鹰种',
                    'Goose Species': '鹅种',
                    'Horse Species': '马种',
                    'Moose Species': '驼鹿种',
                    'PergolaStyle01': '凉亭风格01',
                    'Pig Species': '猪种',
                    'Seagull Species': '海鸥种',
                    'Shark Species': '鲨鱼种',
                    'Sheep Species': '绵羊种',
                    'Sidewalk Prop Group': '人行道道具组',
                    'Marker Object Prefab': '标记对象资产',
                    'Creature Spawner': '生物生成器',
                    'Max Group Count': '最大组数',
                    'Spawn Location': '生成位置',
                    'Connection Type': '连接类型',
                    'Track Types': '轨道类型',
                    'Road Types': '道路类型',
                    'Road': '道路',
                    'Pedestrian': '行人',
                    'Cargo': '货物',
                    'Air': '空中',
                    'Parking': '停车',
                    'Train': '火车',
                    'Tram': '有轨电车',
                    'Subway': '地铁',
                    'Car': '汽车',
                    'Watercraft': '水上交通工具',
                    'Helicopter': '直升飞机',
                    'Airplane': '飞机',
                    'Editor Asset Category Override': '编辑器资产类别覆盖',
                    'Include Categories': '包括类别',
                    'Exclude Categories': '排除类别',
                    'Attached Object': '附加对象',
                    'Attach Type': '附加类型',
                    'Attach Offset': '附加偏移',
                    'Animation Index': '动画索引',
                    'Street Light Object': '路灯对象',
                    'PDXAccount':'p社账号',
                    'BeachProperties':'海滩DLC',
                    'Localization': '本地化',
                    'Objects': '对象',
                    'Policies': '政策',
                    'Prefabs': '资产',
                    'Routes': '路线',
                    'Themes': '主题',
                    'Tools': '工具',
                    'UI': '用户界面',
                    'Achievement Filter': '成就过滤器',
                    'Object Achievement Component': '对象成就组件',
                    'Building Efficiency': '建筑效率',
                    'City Effects': '城市效应',
                    'CityServices': '城市服务',
                    'Extractor Facility': '提取设施',
                    'Initial Resources': '初始资源',
                    'Placeholder Building': '占位建筑',
                    'Pollution Modifier': '污染修正器',
                    'Resource Consumption': '资源消耗',
                    'Resource Producer': '资源生产者',
                    'Signature Building': '标志性建筑',
                    'Localization': '本地化',
                    'Random Gendered Localization': '随机性别本地化',
                    'Random Localization': '随机本地化',
                    'Brand Object': '品牌对象',
                    'Crane Object': '起重机对象',
                    'Destructible Object': '可摧毁对象',
                    'Electricity Outside Connection': '电力外部连接',
                    'Floating Object': '漂浮物体',
                    'Hovering Object': '悬浮物体',
                    'Lane Block': '车道阻塞',
                    'Lane Direction Object': '车道方向对象',
                    'Net Object': '网络对象',
                    'Outside Connection': '外部连接',
                    'Pillar Object': '柱状物体',
                    'Placeholder Object': '占位对象',
                    'Plant Object': '植物对象',
                    'Quantity Object': '数量对象',
                    'Renter Object': '租户对象',
                    'Spawnable Brand Dummy': '可生成品牌虚拟',
                    'Traffic Light Object': '交通灯对象',
                    'Traffic Sign Object': '交通标志对象',
                    'Tree Object': '树木对象',
                    'Underwater Object': '水下对象',
                    'Unique Object': '独特对象',
                    'Utility Object': '实用对象',
                    'Water Pipe Outside Connection': '水管外部连接',
                    'Water Source': '水源',
                    'Weather Object': '天气对象',
                    'Default Policies': '默认政策',
                    'Content': '内容',
                    'To Be Removed': '待删除',
                    'Unlocking': '解锁',
                    'Mail Box': '邮箱',
                    'Transport Stop': '交通站',
                    'Theme Object': '主题对象',
                    'Editor Container': '编辑器容器',
                    'Valid For': '有效',
                    'Not Valid For': '无效',
                    'Relative': '相对',
                    'Absolute': '绝对',
                    'InverseRelative': '反向相对',
                    'CrimeAccumulation': '犯罪累积',
                    'DisasterWarningTime': '灾害警告时间',
                    'DisasterDamageRate': '灾害伤害率',
                    'DiseaseProbability': '疾病概率',
                    'ParkEntertainment': '公园娱乐',
                    'CriminalMonitorProbability': '犯罪监视概率',
                    'IndustrialAirPollution': '工业空气污染',
                    'IndustrialGroundPollution': '工业地面污染',
                    'IndustrialGarbage': '工业垃圾',
                    'RecoveryFailChange': '恢复失败机率',
                    'OreResourceAmount': '矿石资源量',
                    'OilResourceAmount': '石油资源量',
                    'UniversityInterest': '大学兴趣',
                    'OfficeSoftwareDemand': '办公软件需求',
                    'IndustrialElectronicsDemand': '工业电子产品需求',
                    'OfficeSoftwareEfficiency': '办公软件效率',
                    'IndustrialElectronicsEfficiency': '工业电子产品效率',
                    'TelecomCapacity': '电信容量',
                    'HighwayTrafficSafety': '高速公路交通安全',
                    'PrisonTime': '监狱时间',
                    'CrimeProbability': '犯罪概率',
                    'CollegeGraduation': '大专毕业率',
                    'UniversityGraduation': '大学毕业率',
                    'ImportCost': '进口成本',
                    'LoanInterest': '贷款利率',
                    'BuildingLevelingCost': '建筑拆除成本',
                    'ExportCost': '出口成本',
                    'TaxiStartingFee': '出租车起步费',
                    'IndustrialEfficiency': '工业效率',
                    'OfficeEfficiency': '办公效率',
                    'PollutionHealthAffect': '污染对健康的影响',
                    'HospitalEfficiency': '医院效率',
                    'Administration Building': '行政大楼',
                    'Cargo Transport Station': '货物运输站',
                    'Disaster Facility': '灾害设施',
                    'Early Disaster Warning Syst': '早期灾害预警系统',
                    'Emergency Generator': '应急发电机',
                    'Emergency Shelter': '应急避难所',
                    'Firewatch Tower': '火灾监控塔',
                    'Garbage Facility': '垃圾处理设施',
                    'Garbage Powered': '垃圾发电',
                    'Ground Water Powered': '地下水发电',
                    'Hospital': '医院',
                    'Maintenance Depot': '维修车间',
                    'Parking Facility': '停车设施',
                    'Police Station': '警察局',
                    'Post Facility': '邮局',
                    'Research Facility': '研究设施',
                    'Sewage Outlet': '污水排放口',
                    'Telecom Facility': '电信设施',
                    'Traffic Spawner': '交通生成器',
                    'Transport Depot': '运输车间',
                    'Water Powered': '水力发电',
                    'Water Tower': '水塔',
                    'Welfare Office': '社会保障局',
                    'Wind Powered': '风力发电',
                    'Traded Resources': '交易资源',
                    'Transports': '运输',
                    'Loading Factor': '装载系数',
                    'Transport Interval': '运输间隔',
                    'Activation Threshold': '激活阈值',
                    'Shelter Capacity': '庇护所容量',
                    'Vehicle Capacity': '车辆容量',
                    'Garbage Capacity': '垃圾容量',
                    'Transport Capacity': '运输容量',
                    'Processing Speed': '处理速度',
                    'Industrial Waste Only': '仅限工业废物',
                    'Production Per Unit': '每单位生产',
                    'Maximum Ground Water': '最大地下水',
                    'Ambulance Capacity': '救护车容量',
                    'Medical Helicopter Capacity': '医疗直升机容量',
                    'Patient Capacity': '病人容量',
                    'Treatment Bonus': '治疗奖励',
                    'Health Range': '健康范围',
                    'Treat Diseases': '治疗疾病',
                    'Treat Injuries': '治疗伤害',
                    'Maintenance Type': '维护类型',
                    'Garage Marker Capacity': '车库标记容量',
                    'Patrol Car Capacity': '巡逻车容量',
                    'Police Helicopter Capacity': '警用直升机容量',
                    'Jail Capacity': '监狱容量',
                    'Patrol': '巡逻',
                    'Emergency': '应急',
                    'Intelligence': '情报',
                    'Post Van Capacity': '邮政面包车容量',
                    'Post Truck Capacity': '邮政卡车容量',
                    'Mail Storage Capacity': '邮件存储容量',
                    'Mail Box Capacity': '邮箱容量',
                    'Sorting Rate': '分拣速率',
                    'Allow Submerged': '允许水下',
                    'Network Capacity': '网络容量',
                    'Penetrate Terrain': '穿透地形',
                    'Track Type': '轨道类型',
                    'Spawn Rate': '生成速率',
                    'No Slow Vehicles': '无缓慢车辆',
                    'Energy Types': '能源类型',
                    'Vehicle Capacity': '车辆容量',
                    'Production Duration': '生产持续时间',
                    'Maintenance Duration': '维护持续时间',
                    'Dispatch Center': '调度中心',
                    'Production Factor': '生产因子',
                    'Capacity Factor': '容量因子',
                    'Maximum Wind': '最大风速',
                    'Rotation Range': '旋转范围',
                    'Initial Resources': '初始资源',
                    'Value': '价值',
                    'Building Type': '建筑类型',
                    'Hospital': '医院',
                    'PowerPlant': '发电厂',
                    'FreshWaterBuilding': '污水处理厂',
                    'SewageBuilding': '污水处理厂',
                    'StormWaterBuilding': '雨水处理厂',
                    'TransportDepot': '交通仓库',
                    'TransportStation': '交通站点',
                    'GarbageFacility': '垃圾处理设施',
                    'FireStation': '消防站',
                    'PoliceStation': '警察局',
                    'RoadMaintenanceDepot': '道路维护仓库',
                    'PostFacility': '邮政设施',
                    'TelecomFacility': '电信设施',
                    'EmergencyShelter': '紧急避难所',
                    'DisasterFacility': '灾难设施',
                    'FirewatchTower': '防火观察塔',
                    'DeathcareFacility': '死亡护理设施',
                    'AdminBuilding': '行政建筑',
                    'WelfareOffice': '社会保障局',
                    'ResearchFacility': '研究设施',
                    'ParkMaintenanceDepot': '公园维护仓库',
                    'ParkingFacility': '停车设施',
                    'ResidentialBuilding': '住宅建筑',
                    'CommercialBuilding': '商业建筑',
                    'IndustrialBuilding': '工业建筑',
                    'OfficeBuilding': '办公楼',
                    'SignatureResidential': '标志性住宅',
                    'ExtractorBuilding': '采集器建筑',
                    'SignatureCommercial': '标志性商业',
                    'SignatureIndustrial': '标志性工业',
                    'SignatureOffice': '标志性办公',
                    'LandValueSources': '土地价值来源',
                    'EUCommercialHigh': '欧洲高级商业',
                    'EUCommercialLow': '欧洲低级商业',
                    'EUResidentialHigh': '欧洲高级住宅',
                    'EUResidentialLow': '欧洲低级住宅',
                    'EUResidentialLowWaterfront': '欧洲低级住宅（水边）',
                    'EUResidentialMedium': '欧洲中级住宅',
                    'EUResidentialMediumRow': '欧洲中级住宅（排屋）',
                    'EUResidentialMixed': '欧洲混合住宅',
                    'IndustrialAgriculture': '工业农业',
                    'IndustrialForestry': '工业林业',
                    'IndustrialManufacturing': '工业制造',
                    'IndustrialOil': '工业石油',
                    'IndustrialOre': '工业矿石',
                    'NACommercialHigh': '北美高级商业',
                    'NACommercialLow': '北美低级商业',
                    'NAResidentialHigh': '北美高级住宅',
                    'NAResidentialLow': '北美低级住宅',
                    'NAResidentialLowWaterfront': '北美低级住宅（水边）',
                    'NAResidentialMedium': '北美中级住宅',
                    'NAResidentialMediumRow': '北美中级住宅（排屋）',
                    'NAResidentialMixed': '北美混合住宅',
                    'OfficeHigh': '高级办公楼',
                    'OfficeLow': '低级办公楼',
                    'ResidentialLowRent': '住宅低租金',
                    'Unzoned': '未划分区域',
                    'GroundPollutionMultiplier': '地面污染乘数',
                    'AirPollutionMultiplier': '空气污染乘数',
                    'NoisePollutionMultiplier': '噪音污染乘数',
                    'Consumptions': '消耗量',
                    'Consumption': '消耗',
                    'ProductionRate': '生产速率',
                    'UnlockEventImage': '解锁事件图片',
                    'LocalizationID': '本地化ID',
                    'MaleID': '男性ID',
                    'FemaleID': '女性ID',
                    'Brand': '品牌',
                    'DistanceRange': '距离范围',
                    'FireHazard': '火灾危险',
                    'StructuralIntegrity': '结构完整性',
                    'FloatingOffset': '浮动偏移',
                    'FixedToBottom': '固定在底部',
                    'HoveringHeight': '悬浮高度',
                    'Left': '左',
                    'Right': '右',
                    'Straight': '直线',
                    'Merge': '合并',
                    'Gentle': '缓和',
                    'Square': '正方形',
                    'UTurn': 'U型转弯',
                    'SetCompositionState': '设置组成状态',
                    'RequireRoad': '需要道路',
                    'TrackPassThrough': '轨道穿越',
                    'TradedResources': '交易资源',
                    'Commuting': '通勤',
                    'TransferType': '转移类型',
                    'Remoteness': '偏远度',
                    'VerticalPillarOffsetRange': '垂直柱偏移范围',
                    'Vertical': '垂直',
                    'Horizontal': '水平',
                    'Standalone': '独立',
                    'Base': '基础',
                    'RandomizeGroupIndex': '随机化组索引',
                    'MapFeature': '地图特征',
                    'Area': '区域',
                    'BuildableLand': '可建造土地',
                    'FertileLand': '肥沃土地',
                    'Forest': '森林',
                    'GroundWater': '地下水',
                    'RequireEmpty': '需要空地',
                    'RequireRenter': '需要租户',
                    'RequireGoodWealth': '需要良好财富',
                    'RequireDogs': '需要狗',
                    'RequireHomeless': '需要无家可归者',
                    'RequireChildren': '需要儿童',
                    'RequireTeens': '需要青少年',
                    'VehicleLeft': '左侧车辆',
                    'VehicleRight': '右侧车辆',
                    'CrossingLeft': '左侧人行横道',
                    'CrossingRight': '右侧人行横道',
                    'AllowFlipped': '允许翻转',
                    'ReachOffset': '达到偏移',
                    'Stop': '停止',
                    'Yield': '让行',
                    'NoTurnLeft': '禁止左转',
                    'NoTurnRight': '禁止右转',
                    'NoUTurnLeft': '禁止左转弯',
                    'NoUTurnRight': '禁止右转弯',
                    'DoNotEnter': '禁止通行',
                    'Motorway': '高速公路',
                    'Oneway': '单行道',
                    'SpeedLimit': '速度限制',
                    'BusOnly': '仅公交',
                    'TaxiOnly': '仅出租车',
                    'RoundaboutCounterclockwise': '逆时针环岛',
                    'RoundaboutClockwise': '顺时针环岛',
                    'UtilityType': '公用事业类型',
                    'UtilityPosition': '公用事业位置',
                    'WaterPipe': '给水管道',
                    'SewagePipe': '污水管道',
                    'StormwaterPipe': '雨水管道',
                    'LowVoltageLine': '低电压线路',
                    'Fence': '围栏',
                    'Catenary': '接触网',
                    'HighVoltageLine': '高电压线路',
                    'Polluted': '受污染的',
                    'RequireSnow': '需要雪',
                    'ForbidSnow': '禁止雪',
                    'LandmarkBuildings': '地标建筑',
                    'SanFranciscoSet': '旧金山套装',
                    'ReplaceWith': '替换为',
                    'MailCapacity': '邮件容量',
                    'AccessConnectionType': '接入连接类型',
                    'RouteConnectionType': '路线连接类型',
                    'AccessTrackType': '接入轨道类型',
                    'RouteTrackType': '路线轨道类型',
                    'AccessRoadType': '接入道路类型',
                    'RouteRoadType': '路线道路类型',
                    'EnterDistance': '进入距离',
                    'ExitDistance': '退出距离',
                    'AccessDistance': '接入距离',
                    'BoardingTime': '上车时间',
                    'LoadingFactor': '装载因子',
                    'PassengerTransport': '乘客运输',
                    'CargoTransport': '货物运输',
                    'Theme': '主题',
                    'Achievements':'成就',
                    'Early Disaster Warning System':'灾害预警系统',
                    'Modifiers': '修改器',
                    'Multiplier': '倍增器',
                    'Upkeep Modifier': '维护费修改器',
                    'Section': '部分',
                    'Edge States': '边缘状态',
                    'Node States': '节点状态',
                    'Net Sub Objects': '网络子对象',
                    'Net Upgrade': '网络升级',
                    'Overhead Net Sections': '高架网络部分',
                    'Fixed Index': '固定索引',
                    'Net': '网络',
                    'Unset State': '未设置状态',
                    'Ambulance': '救护车',
                    'Car Tractor': '车载拖拉机',
                    'Cargo Transport': '货物运输',
                    'Delivery Truck': '送货卡车',
                    'Fire Engine': '消防车',
                    'Garbage Truck': '垃圾车',
                    'Hearse': '灵车',
                    'Maintenance Vehicle': '维修车辆',
                    'Police Car': '警车',
                    'Post Van': '邮政货车',
                    'Work Vehicle': '工作车辆',
                    'Cargo Capacity': '货物容量',
                    'Max Resource Count': '最大资源数量',
                    'Transported Resources': '运输资源',
                    'Trailer Type': '拖车类型',
                    'Fixed Trailer': '固定拖车',
                    'Towbar': '拖车连接器',
                    'Semi': '半挂车',
                    'Fixed': '固定',
                    'Extinguishing Rate': '灭火速率',
                    'Extinguishing Spread': '灭火传播',
                    'Extinguishing Capacity': '灭火容量',
                    'Destroyed Clear Duration': '清除被毁持续时间',
                    'Unload Rate': '卸货速率',
                    'Maintenance Capacity': '维护容量',
                    'Maintenance Rate': '维护速率',
                    'Criminal Capacity': '罪犯容量',
                    'Crime Reduction Rate': '犯罪减少率',
                    'Shift Duration': '换班持续时间',
                    'Mail Capacity': '邮件容量',
                    'Work Type': '工作类型',
                    'Map Feature': '地图特征',
                    'Max Work Amount': '最大工作量',
                    'Lot Prefab': '地块预制体',
                    'Color': '颜色',
                    'Edge Color': '边缘颜色',
                    'Selection Color': '选中颜色',
                    'Selection Edge Color': '选中边缘颜色',
                    'Max Radius': '最大半径',
                    'Range Color': '范围颜色',
                    'Area Sub Objects': '区域子对象',
                    'Enclosed Area': '封闭区域',
                    'Extractor Area': '提取区域',
                    'Hangaround Area': '闲逛区域',
                    'Master Area': '主区域',
                    'Navigation Area': '导航区域',
                    'Placeholder Area': '占位符区域',
                    'Rendered Area': '渲染区域',
                    'Spawnable Area': '可生成区域',
                    'Storage Area': '存储区域',
                    'Terrain Area': '地形区域',
                    'Border Lane Type': '边界车道类型',
                    'Counter Clock Wise': '逆时针',
                    'Map Feature': '地图特征',
                    'Activities': '活动',
                    'Slave Areas': '从区域',
                    'Secondary Type': '次要类型',
                    'Roundness': '圆滑度',
                    'Lod Bias': 'LOD偏差',
                    'Renderer Priority': '渲染器优先级',
                    'Decal Layer Mask': '贴花层遮罩',
                    'Terrain': '地形',
                    'Creatures': '生物',
                    'Stored Resources': '存储资源',
                    'Slope Width': '坡宽',
                    'Noise Scale': '噪声比例',
                    'Noise Factor': '噪声因子',
                    'Surface Prefab': '表面预制体',
                    'Vertical Pillar Offset Range': '垂直柱偏移范围',
                    'Content Prerequisite': '内容先决条件',
                    'Manual Unlockable': '手动可解锁',
                    'Walk Speed': '步行速度',
                    'Run Speed': '奔跑速度',
                    'Creatures': '生物',
                    'Resident': '居民',
                    'Age': '年龄',
                    'Width': '宽度',
                    'Depth': '深度',
                    'Up Keep Cost': '维护成本',
                    'Asset Stamp Prefab': '资产图章预制体',
                    'Layer': '图层',
                    'Default': '默认',
                    'Fence Prefab': '栅栏预制体',
                    'Ground Max Speed': '地面最大速度',
                    'Ground Acceleration': '地面加速度',
                    'Ground Braking': '地面制动',
                    'Ground Turning': '地面转向',
                    'Flying Speed': '飞行速度',
                    'Flying Acceleration': '飞行加速度',
                    'Flying Braking': '飞行制动',
                    'Flying Turning': '飞行转向',
                    'Flying Angular Acceleration': '飞行角加速度',
                    'Climb Angle': '攀爬角度',
                    'Slow Pitch Angle': '缓慢俯仰角',
                    'Turning Roll Factor': '转向滚动系数',
                    'Airplane Prefab': '飞机预制体',
                    'Train Car Prefab': '火车车厢预制体',
                    'Bogie Offset': '转向架偏移',
                    'Angular Acceleration': '角加速度',
                    'Watercraft Prefab': '水上交通工具预制体',
                    'Multiple Unit Train Car Prefab': '多节火车车厢预制体',
                    'Min Multiple Unit Count': '最小多节车辆数量',
                    'Max Multiple Unit Count': '最大多节车辆数量',
                    'Carriages': '车厢',
                    'Carriage': '车厢',
                    'Min Count': '最小数量',
                    'Max Count': '最大数量',
                    'Add Reversed End Carriage': '添加反向尾部车厢',
                    'Car Trailer Prefab': '汽车拖车预制体',
                    'Work Vehicle': '工作车辆',
                    'Object Mesh Info': '物体网格信息',
                    'Render Prefab': '渲染预制体',
                    'Color Properties': '颜色属性',
                    'Color Variations': '颜色变化',
                    'Channels Binding': '通道绑定',
                    'Variation Groups': '变体组',
                    'Variation Ranges': '变体范围',
                    'Alpha Ranges': 'Alpha 范围',
                    'External Color Source': '外部颜色来源',
                    'Colors': '颜色',
                    'Variation Group': '变体组',
                    'Channel Id': '通道标识',
                    'Can Be Modified By External': '可由外部修改',
                    'Emissive Properties': '发光属性',
                    'Single Lights': '单个灯光',
                    'Multi Lights': '多个灯光',
                    'Signal Group Animations': '信号组动画',
                    'Purpose': '目的',
                    'Color': '颜色',
                    'Color Off': '关闭时颜色',
                    'Luminance': '亮度',
                    'Response Time': '响应时间',
                    'Materialld': '材料 ID',
                    'Base Properties': '基本属性',
                    'Base Type': '基本类型',
                    'Use Min Bounds': '使用最小边界',
                    'Latitude': '纬度',
                    'Longitude': '经度',
                    'FreezingTemperature': '冰点温度',
                    'DefaultWeather': '默认天气',
                    'DefaultWeathers': '默认天气',
                    'Seasons': '季节',
                    'Prefab': '预制体',
                    'Name ID': '名称 ID',
                    'Icon Path': '图标路径',
                    'Start Time': '开始时间',
                    'Temp Night Day': '夜间白天温度',
                    'Temp Deviation Night Day': '夜间白天温度偏差',
                    'Cloud Chance': '云量几率',
                    'Cloud Amount': '云量',
                    'Cloud Amount Deviation': '云量偏差',
                    'Precipitation Chance': '降水几率',
                    'Precipitation Amount': '降水量',
                    'Precipitation Amount Deviation': '降水量偏差',
                    'Turbulence': '湍流',
                    'Aurora Amount': '极光数量',
                    'Aurora Chance': '极光几率',
                    'Edit Climate': '编辑气候',
                    'Load climate prefab…': '加载气候预制体...'
                    
                },




                编辑器.通用inc,{
                    'Element ':'元素',
                    'EU_ChimneyStyle0': '欧洲烟囱风格0',
                    'EU_FenceResidentialPieceStyle0': '欧洲住宅围栏块风格0',
                    'EU_WallPylonStyle0': '欧洲墙体支架风格0',
                    'EU_WindowGuardRailingStyle0': '欧洲窗户护栏风格0',
                    'EU_WindowHatchStyle0': '欧洲窗户舱口风格0',
                    'EU_WindowOrnamentStyle0': '欧洲窗户装饰风格0',
                    'FencelndustrialHighStyle0': '工业围栏高风格0',
                    'FencelndustrialLowStyle0': '工业围栏低风格0',
                    'FenceResidentialHighStyle0': '住宅围栏高风格0',
                    'FenceResidentialLowStyle0': '住宅围栏低风格0',
                    'FireEscapeStyle0': '消防逃生梯风格0',
                    'GymParkStyle0': '健身公园风格0',
                    'LadderStyle0': '梯子风格0',
                    'LightpoleParkStyle0': '公园路灯风格0',
                    'LogPileStyle0': '圆木堆风格0',
                    'NA_ChimneyResidentialStyle0': '北美住宅烟囱风格0',
                    'NA_FenceResidentialPieceStyle0': '北美住宅围栏块风格0',
                    'NA_WindowHatchStyle0': '北美窗户舱口风格0',
                    'OutdoorSofaStyle0': '户外沙发风格0',
                    'PergolaStyle0': '凉亭风格0',
                    'SkateParkStyle0': '滑板公园风格0',
                    'SportParkStyle0': '体育公园风格0',
                    'StaircaseSpiralStyle0': '螺旋楼梯风格0',
                    'StreetLightStyle0': '路灯风格0',
                    'TableSetCommercialStyle0': '商业桌椅组风格0',
                    'TableSetStyle0': '桌椅组风格0',
                    'TennisCourtStyle0': '网球场风格0',
                    'VentilationDuctStyle0': '通风管道风格0'
                },
                [rif({func:[(i)=>{i.style.display = 'none'}]}).class('beta-banner_qiZ')],{
                    '包含地图创建工具的Beta版本编辑器':''
                }
            ),



        }
        for (const [ObjName, ObjReItems] of Object.entries(REPLACE_ITEM_NEW)) {
            for (const [ReFunc, ReStrs] of ObjReItems) {
                ReFunc.forEach(func => func.REPLACE(ReStrs))
            }
        }
        

        

    } catch (err) { addinfo += err ; console.log(err)}
    let time2 = new Date().getTime()
    if (window.__LOGGING__ && document.getElementsByClassName('fps-display_t30').length) {
        if (!document.getElementById('I18loginfo')) {
            let targetDiv = document.getElementsByClassName('fps-display_t30')[0]
            let infoDiv = document.createElement("div")
            infoDiv.innerHTML = `全局汉化: ${window.__LOGGING__} 段字符 , 耗时 ${time2 - time1} ms`
            infoDiv.id = 'I18loginfo'
            infoDiv.style.fontFamily = "Noto Sans SC"
            infoDiv.style.justifyContent = 'flex-end'
            targetDiv.appendChild(infoDiv);
        } else {
            document.getElementById('I18loginfo').innerHTML = `全局汉化: ${window.__LOGGING__} 段字符 , 耗时 ${time2 - time1} ms`

        }
    }
    try{
    if(rif().class('header_IuN.header_Bpo.child-opacity-transition_nkS').class('title-bar_PF4').items.length){
        let E = rif().class('header_IuN.header_Bpo.child-opacity-transition_nkS').class('title-bar_PF4').items[0]
        let child = E.children[4]
        E.removeChild(child)
        }
    }catch{}

}


setInterval(replaceContent, 135);

const testi18 = async (Func) => {
    function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    let clearTime = 0
    while (clearTime < 20) {
        await delay(200)
        try {
            Func()
        } catch { }
        clearTime +=1
    }
}
//REPLACE_ITEMS_END//