<template>
  <div class="project-detail">
    <!-- 游戏基础数据包含名称icon信息展示 -->
    <div class="base-introduce">
      <!-- 左侧游戏名称icon信息展示 -->
      <div class="introduce-left">
        <!-- 游戏名称、icon、游戏描述信息 -->
        <div class="product-data">
          <img :src="produtctInfo.icon" alt />
          <div class="product-name">
            <h3>{{ produtctInfo.name }}</h3>
            <p>{{ produtctInfo.describe | describeFormat }}</p>
          </div>
        </div>
        <!-- 开发者、技术选型、项目体量、产品权重、首发渠道、立项来源、提供者、创建时间展示 -->
        <div class="base-data">
          <div class="base-data-item">
            <p>开发者</p>
            <p>{{ produtctInfo.developer | developerFormat }}</p>
          </div>
          <i class="icon iconfont icon-vertical_line"></i>
          <div class="base-data-item">
            <p>技术选型</p>
            <p style="color: rgb(45, 149, 251)">{{ produtctInfo.techSelection }}</p>
          </div>
          <i class="icon iconfont icon-vertical_line"></i>
          <div class="base-data-item">
            <p>项目体量</p>
            <p style="color: rgb(45, 149, 251)">{{ produtctInfo.productVolume }}</p>
          </div>
          <i class="icon iconfont icon-vertical_line"></i>
          <div class="base-data-item">
            <p>产品权重</p>
            <p style="color: rgb(225, 22, 25)">{{ produtctInfo.productWeight }}</p>
          </div>
          <i class="icon iconfont icon-vertical_line"></i>
          <div class="base-data-item">
            <p>首发渠道</p>
            <p>{{ produtctInfo.firstChannel }}</p>
          </div>
          <i class="icon iconfont icon-vertical_line"></i>
          <div class="base-data-item">
            <p>立项来源</p>
            <p>{{ produtctInfo.productSource }}</p>
          </div>
          <i class="icon iconfont icon-vertical_line"></i>
          <div class="base-data-item">
            <p>提供者</p>
            <p>{{ produtctInfo.provider }}</p>
          </div>
          <i class="icon iconfont icon-vertical_line"></i>
          <div class="base-data-item">
            <p>创建时间</p>
            <p>{{ produtctInfo.createTime }}</p>
          </div>
        </div>
      </div>
      <!-- 右侧编辑按钮、二维码展示 -->
      <div class="introduce-right">
        <p>
          编辑
          <i class="icon iconfont icon-edit"></i>
        </p>
        <img :src="produtctInfo.codeLink.address" alt />
      </div>
    </div>
    <!-- 包含应用截图、游戏玩法、基础信息表格、产品分析表格、原品数据、文档数据展示 -->
    <div class="detail-base">
      <!-- 应用截图、视频展示 -->
      <div class="screen-shot">
        <h3>
          <div></div>应用截图
        </h3>
        <div class="file-content">
          <div class="full-page-media">
            <video controls autoplay>
              <source
                :src="produtctInfo.video.address"
                v-if="produtctInfo.video.address"
                type="video/mp4"
              />
            </video>
          </div>
          <img :src="item.address" alt v-for="(item, index) in produtctInfo.pictures" :key="index" />
        </div>
      </div>
      <!-- 游戏玩法介绍 -->
      <div class="product-regulation">
        <h3>
          <div></div>游戏描述
        </h3>
        <p>
          游戏剧情以《魔法少女小圆》动画为基础展开全新的篇章，在人物立绘以及副本场景设计上都完美延续了动画的风格。不光如此，动画的配乐还将在游戏中作为BGM登场，满足粉丝用户，兼顾新玩家的体验。
          【结合技能、魔法、连携的高策略战斗玩法】
        </p>
      </div>
      <!-- 基础信息表格 -->
      <div class="base-info">
        <h3>
          <div></div>基础信息
        </h3>
        <div class="table-randar">
          <vxe-table
            border
            show-header-overflow
            show-overflow
            highlight-hover-row
            align="center"
            :data="baseData"
            :show-header="false"
          >
            <vxe-table-column field="title" width="150"></vxe-table-column>
            <vxe-table-column field="name" width="250"></vxe-table-column>
            <vxe-table-column field="title1" width="150"></vxe-table-column>
            <vxe-table-column field="name1" width="250"></vxe-table-column>
          </vxe-table>
          <div id="randar-weight" class="randar-weight"></div>
        </div>
      </div>
      <!-- 产品分析表格 -->
      <div class="product-analysis">
        <h3>
          <div></div>产品分析
        </h3>
        <vxe-table
          border
          show-header-overflow
          show-overflow
          highlight-hover-row
          align="center"
          :data="[produtctInfo]"
          class="analysis-table"
        >
          <vxe-table-column field="userGroups" title="用户群体" width="140"></vxe-table-column>
          <vxe-table-column field="ageRange" title="年龄范围" width="140"></vxe-table-column>
          <vxe-table-column field="sex" title="性别" width="100"></vxe-table-column>
          <vxe-table-column field="productDifficulty" title="游戏难度" width="100"></vxe-table-column>
          <vxe-table-column field="productInterest" title="游戏趣味性">
            <template v-slot="{ row }">
              <p
                style="margin-left: 5px; margin-right: 20px; text-align: left"
                v-for="(item, index) in row.productInterest"
                :key="index"
              >{{ item }}</p>
            </template>
          </vxe-table-column>
          <vxe-table-column field="payPoint" title="付费点设计">
            <template v-slot="{ row }">
              <p
                style="margin-right: 20px; text-align: left"
                v-for="payItem in row.payPoint"
                :key="payItem"
              >{{ payItem }}</p>
            </template>
          </vxe-table-column>
          <vxe-table-column field="optimizations" title="优化方向">
            <template v-slot="{ row }">
              <p
                style="margin-right: 20px; text-align: left"
                v-for="(item, index) in row.optimizations"
                :key="index"
              >{{ item }}</p>
            </template>
          </vxe-table-column>
          <vxe-table-column field="analysisResult" title="分析结论" width="140"></vxe-table-column>
        </vxe-table>
      </div>
      <!-- 原品数据、文档数据 -->
      <div class="original-file">
        <div class="original-data">
          <h3>
            <div></div>原品数据
          </h3>
          <div class="original-data-row">
            <div class="original-data-title">游戏名称</div>
            <div class="original-data-value">{{produtctInfo.original_name}}</div>
          </div>
          <div class="original-data-row">
            <div class="original-data-title">发行厂家</div>
            <div class="original-data-value">{{produtctInfo.manufacturer_name}}</div>
          </div>
          <div class="original-data-row">
            <div class="original-data-title">主页链接</div>
            <div class="original-data-value">
              <a :href="produtctInfo.game_connection">{{produtctInfo.game_connection}}</a>
            </div>
          </div>
          <div class="original-data-row">
            <div class="original-data-title">产品成就</div>
            <div class="original-data-value">{{produtctInfo.achievement_description}}</div>
          </div>
          <div class="original-data-row">
            <div class="original-data-title">发行时间</div>
            <div class="original-data-value">{{produtctInfo.original_time}}</div>
          </div>
          <div class="original-data-row">
            <div class="original-data-title">游戏备注</div>
            <div class="original-data-value">{{produtctInfo.original_remark}}</div>
          </div>
        </div>
        <div class="file-data">
          <h3>
            <div></div>文档数据
          </h3>
          <div class="file-data-row">
            <div class="file-data-title">会议记录</div>
            <div
              class="file-data-file"
              v-for="item of produtctInfo.record"
              :key="item.name"
              @click="recordClick(item)"
            >{{item.name}}</div>
          </div>
          <div class="file-data-row">
            <div class="file-data-title">产品录入者</div>
            <div class="file-data-value">{{produtctInfo.person}}</div>
          </div>
        </div>
      </div>
    </div>
    <OfficePreview :fileUrl="previewFile" v-if="previewShow" :show.sync="previewShow" />
  </div>
</template>
<script>
import OfficePreview from '../../../node_modules/office-preview/src/components/Main';
export default {
  components: {
    OfficePreview
  },
  data() {
    return {
      previewShow: false,
      previewFile: '',
      // 游戏数据
      produtctInfo: {
        id: 1001,
        name: '魔法纪录-魔法少女小圆外传',
        icon:
          'http://axure.fenglinghudong.com/images/%E4%BA%A7%E5%93%81%E6%B1%A0/u348.svg',
        describe:
          'bilibili游戏独家代理魔法少女RPG手游《魔法纪录 魔法少女小圆外传》——记录在此的，是魔法少女们崭新的故事。由参与TV版动画《魔法少女小圆》制作的ANIPLEX和SHAFT、还有拥有丰富手游开发经验的f4samurai、角色原案苍树梅等原班人马协力打造原汁原味的官方正统外传。',
        developer: 'Shanghai Hode Information Technology Co.,Ltd.',
        techSelection: '3D横屏',
        productVolume: '轻度游戏',
        productWeight: 'S级',
        firstChannel: '微信平台',
        productSource: '直接立项',
        createTime: '2020-10-14',
        video: {
          type: 1,
          address: 'https://fl-cdn.feigo.fun/mda-kc5rivxjz5evfxjv.mp4'
        },
        pictures: [
          {
            type: 2,
            address:
              'https://is4-ssl.mzstatic.com/image/thumb/PurpleSource114/v4/d1/58/8f/d1588f46-1bcf-5c5a-f14c-5601d3e0dc1f/e8c59e6b-269e-4bc5-b5f9-a836f3cc44cf_1.jpg/883x497bb.jpg'
          },
          {
            type: 2,
            address:
              'https://is3-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/66/01/14/66011412-fcf4-531a-a86c-831a3d51615a/58c234c9-337f-4737-80b0-486a452dea61_2.jpg/883x497bb.jpg'
          },
          {
            type: 2,
            address:
              'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource114/v4/b6/ef/a4/b6efa47b-4e2d-ef64-29e6-b5b989eac196/a5f9f7d6-0808-4d1e-9f75-f6c347fcd68a_3.jpg/883x497bb.jpg'
          },
          {
            type: 2,
            address:
              'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource114/v4/1b/d4/71/1bd471e5-0762-851c-05e5-c6973ff22c72/27cbb9ff-dad6-4c3c-8e4f-67e7cd1e4abd_4.jpg/883x497bb.jpg'
          },
          {
            type: 2,
            address:
              'https://is3-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/66/01/14/66011412-fcf4-531a-a86c-831a3d51615a/58c234c9-337f-4737-80b0-486a452dea61_2.jpg/883x497bb.jpg'
          },
          {
            type: 2,
            address:
              'https://is3-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/66/01/14/66011412-fcf4-531a-a86c-831a3d51615a/58c234c9-337f-4737-80b0-486a452dea61_2.jpg/883x497bb.jpg'
          },
          {
            type: 2,
            address:
              'https://is3-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/66/01/14/66011412-fcf4-531a-a86c-831a3d51615a/58c234c9-337f-4737-80b0-486a452dea61_2.jpg/883x497bb.jpg'
          }
        ],
        codeLink: {
          type: 4,
          address:
            'http://axure.fenglinghudong.com/images/%E4%BA%A7%E5%93%81%E6%B1%A0/u461.svg'
        },
        fileSource: {
          type: 3,
          address:
            'https://space.dingtalk.com/s/gwHOAmSolgLOEeWo4APaACBlMjM3N2E2MTNkOTQ0ZTM5YTg0YmYwZWRlOWNjNTk3ZA'
        },
        productRegulation:
          ' 游戏剧情以《魔法少女小圆》动画为基础展开全新的篇章，在人物立绘以及副本场景设计上都完美延续了动画的风格。不光如此，动画的配乐还将在游戏中作为BGM登场，满足粉丝用户，兼顾新玩家的体验。【结合技能、魔法、连携的高策略战斗玩法】',
        productType: '车类',
        productTheme: '休闲类',
        productSponsor: '凌建风',
        selectionVotes: 0,
        provider: '朱志鹏',
        productGroup: '产品一组',
        userGroups: '儿童、青少年',
        ageRange: '10~25岁',
        sex: '女',
        productDifficulty: '简单',
        productInterest: '1、使受众普遍感兴趣的饶有趣味的新闻事实本身；2、引人入胜、生动风趣的表现形式。'.split(
          '；'
        ),
        payPoint: '1、游戏上手快；2、玩法系统不复杂；3、与社交系统联系紧密；4、用户量多但付费率较低。'.split(
          '；'
        ),
        optimizations: '1、音乐特效；2、操作流畅度；3、游戏难易程度调节；4、画面品质优化。'.split(
          '；'
        ),
        analysisResult: '直接通过该项目',
        originalName: '魔法纪录',
        mainLink:
          'https://www.qimai.cn/app/baseinfo/appid/1345175338/country/cn',
        productAchievement:
          '成就是一个简单的目标，所有游戏都拥有目标，不管是设置在代码中还是留给玩家自行决定。我们总是不能确定这类成就的数量，但是我们必须意识到玩家玩家将以它们为目标，并且我们也仍会用到许多成就设计元素。',
        issueDate: '2020-01-20',
        remark: '暂无',
        productInputer: '朱志鹏',
        original_name: '魔法纪录',
        manufacturer_name: 'Shanghai Hode Information Technology Co.,Ltd',
        game_connection:
          'https://www.qimai.cn/app/baseinfo/appid/1345175338/country/cn',
        achievement_description:
          '成就是一个简单的目标，所有游戏都拥有目标，不管是设置在代码中还是留给玩家自行决定。我们总是不能确定这类成就的数量，但是我们必须意识到玩家玩家将以它们为目标，并且我们也仍会用到许多成就设计元素。',
        original_time: '2020-01-20',
        original_remark: '暂无',
        record: [
          {
            name: '在遥远的遥远.docx',
            path: 'https://fl-cdn.feigo.fun/在遥远的遥远.docx'
          }
        ],
        person: '朱志鹏'
      },
      baseData: [
        {
          title: '产品名称',
          name: '魔法纪录-魔法少女小圆外传',
          title1: '产品权重',
          name1: 'S级'
        },
        {
          title: '游戏类型',
          name: '车类',
          title1: '游戏题材',
          name1: '休闲类'
        },
        {
          title: '项目体量',
          name: '轻度游戏',
          title1: '技术选型',
          name1: '3D横屏'
        },
        {
          title: '立项来源',
          name: '直接立项',
          title1: '选品结果',
          name1: '凌建风  直接立项'
        },
        {
          title: '产品提供者',
          name: '朱志鹏',
          title1: '产品分组',
          name1: '产品一组'
        }
      ]
    };
  },
  filters: {
    //   游戏发行厂商名称格式化
    developerFormat(val) {
      if (val.length > 22) {
        return val.slice(0, 20) + '...';
      }
      return val;
    },
    // 游戏描述信息格式化
    describeFormat(val) {
      if (val.length > 55) {
        return val.slice(0, 55) + '【详情】';
      }
      return val;
    }
  },
  mounted() {
    this.initRandar();

    console.log('$router', this.$route);
  },
  methods: {
    recordClick(row) {
      this.previewShow = true;
      this.previewFile = row.path;
    },
    // 初始化雷达图
    async initRandar() {
      let radarMap = this.$echarts.init(
        document.getElementById(`randar-weight`)
      );
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        radar: [
          {
            indicator: [
              { text: '操作手感', max: 10 },
              { text: '游戏关卡', max: 10 },
              { text: '美术动作', max: 10 },
              { text: '美术特效', max: 10 },
              { text: '音乐音效', max: 10 },

              { text: '画面质量', max: 10 }
            ],
            radius: 100,
            center: ['50%', '40%'],
            name: {
              textStyle: {
                color: '#222'
              }
            }
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            areaStyle: {},
            data: [
              {
                value: [7, 6, 8, 6, 5, 3],
                name: '游戏体验'
              }
            ]
          }
        ],
        color: ['#3895FB']
      };
      radarMap.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.project-detail {
  width: 100%;
  // 上半部分游戏基础信息介绍
  .base-introduce {
    width: 97%;
    background-color: rgba(240, 240, 243, 0.7);
    border-radius: 5px;
    margin: 20px auto;
    margin-bottom: 15px;
    padding: 20px 10px;
    padding-left: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .introduce-left {
      display: flex;
      flex-direction: column;
      // 游戏icon、名称、描述样式
      .product-data {
        display: flex;
        img {
          width: 70px;
          height: 70px;
          border-radius: 15px;
          margin-right: 15px;
        }
        .product-name {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h3,
          p {
            line-height: 35px;
          }
        }
      }
      // 分栏的游戏信息展示
      .base-data {
        display: flex;
        margin-top: 30px;
        margin-left: 10px;
        font-size: 13px;
        color: #555;
        i {
          margin-top: 5px;
          font-size: 30px;
          margin-left: 20px;
        }
        .base-data-item:not(:nth-of-type(1)) {
          margin-left: 30px;
        }
        .base-data-item {
          p:nth-child(2) {
            font-size: 16px;
            color: #222;
            margin-top: 5px;
            font-weight: 500;
          }
        }
      }
    }
    // 右侧二维码、编辑项样式
    .introduce-right {
      margin-right: 10px;
      position: relative;
      img {
        margin-top: 15px;
        margin-right: 75px;
        width: 160px;
        height: 160px;
      }
      p {
        position: absolute;
        top: -13px;
        right: 0px;
        font-size: 17px;
        font-weight: 500;
        color: rgba(45, 149, 251, 0.83);
        i {
          margin-left: 5px;
          font-size: 20px;
        }
        &:hover {
          color: rgba(45, 149, 251, 1);
          cursor: pointer;
        }
      }
    }
  }
  // 下半部分展示游戏基础信息、截图、视频、产品分析数据样式
  .detail-base {
    width: 97%;
    background-color: rgba(240, 240, 243, 0.7);
    border-radius: 5px;
    margin: 20px auto;
    margin-top: 10px;
    padding: 20px 10px;
    padding-left: 30px;
    box-sizing: border-box;
    // 应用截图样式
    .screen-shot {
      h3 {
        display: flex;
        align-items: center;
        div {
          margin-right: 10px;
          background-color: #3d97f7;
          height: 23px;
          width: 4px;
          border: none;
        }
      }
      // 图片样式
      .file-content {
        padding: 1px;
        width: 91%;
        overflow-x: scroll;
        margin-left: 40px;
        margin-top: 20px;
        border: 1px solid #cacaca;
        border-radius: 3px;
        display: flex;
        align-items: center;
        padding: 1px;
        box-sizing: border-box;
        .full-page-media {
          background-color: rgb(0, 0, 0);
          display: flex;
          align-items: center;
          width: 290px;
          height: 220px;
          border-radius: 5px;
          video {
            width: 290px;
          }
        }
        img {
          width: 290px;
          height: 220px;
          margin-left: 10px;
          border-radius: 5px;
        }
      }
    }
    // 游戏玩法样式
    .product-regulation {
      margin-top: 15px;
      h3 {
        display: flex;
        align-items: center;
        div {
          margin-right: 10px;
          background-color: #3d97f7;
          height: 23px;
          width: 4px;
          border: none;
        }
      }
      p {
        margin-top: 7px;
        width: 90%;
        font-size: 15px;
        margin-left: 45px;
        color: #333333;
        line-height: 20px;
        font-weight: 400;
      }
    }
    // 基础信息样式
    .base-info {
      margin-top: 15px;
      h3 {
        display: flex;
        align-items: center;
        div {
          margin-right: 10px;
          background-color: #3d97f7;
          height: 23px;
          width: 4px;
          border: none;
        }
      }
      .table-randar {
        width: 90%;
        margin-left: 40px;
        display: flex;
        padding-top: 21px;
        .randar-weight {
          margin-left: 50px;
          width: 408px;
          height: 275px;
        }
      }
    }
    // 产品分析样式
    .product-analysis {
      margin-top: 15px;
      h3 {
        display: flex;
        align-items: center;
        div {
          margin-right: 10px;
          background-color: #3d97f7;
          height: 23px;
          width: 4px;
          border: none;
        }
      }
      .analysis-table {
        width: 90%;
        margin-left: 40px;
        margin-top: 21px;
      }
    }
    // 原品数据、文档数据样式
    .original-file {
      display: flex;
      margin-top: 20px;
      font-size: 14px;
      text-align: left;
      line-height: 30px;
      // 原品数据样式
      .original-data {
        width: 70%;
        border-right: 1px solid #ccd0d4;

        .original-data-row {
          display: flex;
          .original-data-title {
            margin-left: 40px;
          }
          .original-data-value {
            margin-left: 50px;
            width: 60%;
          }
        }
      }
      // 文档数据样式
      .file-data {
        width: 20%;
        margin-left: 5%;
        .file-data-row {
          display: flex;
          .file-data-title {
            text-align: right;
            width: 100px;
          }
          .file-data-value {
            margin-left: 50px;
            width: 60%;
          }
          .file-data-file {
            margin-left: 50px;
            width: 60%;
          }
          .file-data-file:hover {
            cursor: pointer;
            color: blue;
          }
        }
      }
    }
  }
}
</style>
<style>
.project-detail .base-info .vxe-body--row td {
  color: #333333;
  height: 55px !important;
}
.project-detail .base-info .vxe-body--row td:nth-child(odd) {
  font-size: 15px;
  background-color: #f7f7f8;
  font-weight: 650;
}
.project-detail .base-info .vxe-body--row td:nth-child(even) {
  font-size: 13px;
  font-weight: 500;
}
.project-detail .base-info .vxe-body--row:nth-child(1) td:nth-child(2) {
  color: #3d97f7;
}
.project-detail .base-info .vxe-body--row:nth-child(1) td:nth-child(4) {
  color: red;
}

.project-detail .product-analysis .vxe-header--row {
  height: 50px;
}
.project-detail .product-analysis .vxe-body--row {
  height: 120px;
}
.vxe-checkbox .vxe-checkbox--label,
.vxe-radio-button .vxe-radio--label,
.vxe-radio .vxe-radio--label,
.vxe-table .vxe-body--column.col--ellipsis:not(.col--actived) > .vxe-cell,
.vxe-table .vxe-footer--column.col--ellipsis:not(.col--actived) > .vxe-cell,
.vxe-table .vxe-header--column.col--ellipsis:not(.col--actived) > .vxe-cell {
  max-height: none;
  white-space: inherit;
}
</style>