<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="5">&nbsp;</el-col>
        <el-col :span="16">
          <div style="margin-bottom: 15px">
            <el-autocomplete
              class="inline-input"
              v-model="searchKey"
              prefix-icon="el-icon-search"
              style="width: 20em"
              placeholder="搜索景点名称关键字"
              :fetch-suggestions="querySearch"
            ></el-autocomplete>
            <el-button type="primary" @click="searchSwitch">搜索</el-button>
            <span
              type="primary"
              id="clearLoacalStroage"
              @click="clearLoacalStroage"
              >清空历史</span
            >
          </div></el-col
        >
        <el-col :span="3">&nbsp;</el-col>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-tooltip
          class="item"
          effect="dark"
          content="添加景点"
          placement="left"
        >
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="toaddviewspot"
            circle
          ></el-button
        ></el-tooltip>
        <el-tooltip class="item" effect="dark" content="返回" placement="right"
          ><el-button
            type="info"
            icon="el-icon-back"
            @click="gohome"
            circle
          ></el-button
        ></el-tooltip>
      </el-col>
      <el-col :span="16"><p class="table_title">景点列表</p></el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%; border: 1px solid"
      :header-cell-style="{
        'background-color': '#F0F8FF',
        color: '#1E90FF',
        'font-size': '17px',
        'text-align': 'center',
        'border-bottom': '1px #4682B4 solid',
      }"
      :cell-style="{
        'font-size': '16px',
      }"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        align="center"
        prop="id"
        label="景点ID"
        sortable
        width="95"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="景点"
        sortable
        width="110"
      >
      </el-table-column>
      <el-table-column align="center" label="景点图" width="120">
        <!-- slot-scope="props" -->
        <template slot-scope="props">
          <el-image
            style="width: 100px; height: 100px"
            :src="props.row.picpath"
            :preview-src-list="[props.row.picpath]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="景点介绍" width="228">
        <template slot-scope="props">
          <div class="viewPlac">{{ props.row.placedes }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="hottime"
        label="旺季时间"
        sortable
        width="130"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="hotticket"
        label="旺季门票"
        sortable
        width="115"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="dimticket"
        label="淡季门票"
        sortable
        width="115"
      >
      </el-table-column>

      <el-table-column align="center" label="操作" width="205">
        <template slot-scope="scope">
          <el-button @click="modifyView(scope.row)" size="mini" type="warning"
            >修改景点</el-button
          ><el-button size="mini" type="danger" @click="deleteView(scope.row)"
            >删除景点</el-button
          ></template
        ></el-table-column
      >
    </el-table>
    <div class="page">
      <div v-if="!searcshow">
        <el-pagination
          @current-change="findAllPage()"
          :current-page.sync="page"
          :page-size="rows"
          layout="prev, pager, next, jumper"
          :total="totals"
        >
        </el-pagination>
      </div>
      <div v-if="searcshow">
        <el-pagination
          @current-change="searchview()"
          :current-page.sync="searchpage"
          :page-size="searchrows"
          layout="prev, pager, next, jumper"
          :total="searchtotals"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //注入页面刷新依赖
  name: "viewspotlist",
  data() {
    return {
      id: "",
      page: 1,
      rows: 3,
      totals: 0,
      totalPage: 0,
      searcshow: false,
      searchpage: 1,
      searchrows: 3,
      searchtotals: 0,
      searchTips: true,
      //abc: "",
      tableData: [],
      searchKey: "",
    };
  },
  methods: {
    gohome() {
      this.$router.push("/home");
    },
    //搜索的历史记录方法
    // 点击同意
    agreeProtocol: function () {
      this.handleSearchHistory();
    },
    // 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
    querySearch(queryString, cb) {
      var searchKeyHistory = this.getsearchKeyHistory();
      var results = queryString
        ? searchKeyHistory.filter(this.createFilter(queryString))
        : searchKeyHistory;
      cb(results);
    },
    createFilter(queryString) {
      return (searchKey) => {
        return (
          searchKey.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    // 存放查询记录
    handleSearchHistory() {
      let searchWordArray = localStorage.getItem("searchWord");
      //console.log("searchWordArray="+searchWordArray);
      if (searchWordArray != null) {
        searchWordArray = searchWordArray.split(",");
        if (searchWordArray.indexOf(this.searchKey) === -1) {
          //unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
          searchWordArray.unshift(this.searchKey);
        }
        if (searchWordArray.length > 6) {
          searchWordArray.pop();
        }
      } else {
        searchWordArray = this.searchKey;
      }
      localStorage.setItem("searchWord", searchWordArray);
    },
    // 渲染历史记录
    getsearchKeyHistory() {
      let searchWordArray = localStorage.getItem("searchWord");
      //console.log("searchWordArray="+searchWordArray);
      let searchKeyHistory = []; //历史纪律结果数组
      if (searchWordArray != null) {
        searchWordArray = searchWordArray.split(",");
        for (let i = 0; i < searchWordArray.length; i++) {
          let item = {
            value: searchWordArray[i],
            label: searchWordArray[i],
          };
          searchKeyHistory.push(item);
        }
      } else {
      }
      return searchKeyHistory;
    },
    clearLoacalStroage() {
      //清除历史记录
      let searchWordArray = localStorage.getItem("searchWord");
      if (searchWordArray == null) {
        this.$message("历史记录已为空！");
      } else {
        localStorage.removeItem("searchWord");
        this.$message({
          type: "success",
          message: "成功清空历史记录！",
        });
      }
    },
    //模糊搜素景点
    searchview(index) {
      var _this = this;
      // if (index) {
      //   this.searchpage = index;
      // }
      //console.log("name="+this.searchKey+",searchpage="+this.searchpage)
      if (this.searchKey != "") {
        this.agreeProtocol();
        this.$axios
          .get(
            "/place/searchPlace?provinceId=" +
              this.id +
              "&name=" +
              this.searchKey +
              "&page=" +
              this.searchpage
          )
          .then((res) => {
            //console.log(this.id + "&" + this.page);
            console.log(res);
            //_this.abc = require(res.data.places.picpath);
            _this.tableData = res.data.places;
            _this.searchpage = res.data.page;
            _this.searchtotals = res.data.counts;

            _this.page = 1;
            _this.rows = 3;
            _this.totals = 0;
          });
        this.searcshow = true;
        if (this.searchTips) {
          this.$message({
            type: "success",
            message: "搜索关键字“" + this.searchKey + "”成功!",
          });
          this.searchTips = false; //是否显示搜索成功的提示
        }
      } else {
        this.$message.error("搜索关键字不能为空！");
        this.findAllPage();
        this.searcshow = false;
      }
    },
    searchSwitch() {
      this.searchTips = true;
      this.searchview();
    },
    toaddviewspot() {
      this.$router.push({
        name: "addviewspot",
        params: { provid: this.id },
      });
    },
    modifyView(row) {
      this.$router.push({
        name: "addviewspot",
        params: {
          viewid: row.id,
        },
      });
    },
    deleteView(row) {
      var id = row.id;
      this.$confirm("此操作将删除该景点，不可恢复！", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.get("/place/delete?id=" + id).then((res) => {
            console.log(res);
            if (res.data.state) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.reload();
            } else {
              this.$message.error("网络或服务器错误！");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    findAllPage(index) {
      //封装查询所有的函数
      var _this = this;
      // if (index) {
      //   this.page = index;
      // }
      //console.log("findallpage-searchpage="+this.searchpage)

      this.$axios
        .get("/place/findAllPlace?provinceId=" + this.id + "&page=" + this.page)
        .then((res) => {
          //console.log(this.id + "&" + this.page);
          console.log(res);
          //_this.abc = require(res.data.places.picpath);
          _this.tableData = res.data.places;
          _this.totalPage = res.data.totalPage;
          _this.page = res.data.page;
          _this.totals = res.data.counts;

          _this.searchpage = 1;
          _this.searchtotals = 0;
          _this.searchrows = 3;
        });
    },
  },
  created() {
    var _this = this;
    // console.log(this.id);
    // console.log(this.$route.params.id);
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      // console.log("赋值");
      localStorage.removeItem("viewid");
      localStorage.setItem("viewid", this.id);
    } else {
      if (localStorage.hasOwnProperty("viewid")) {
        _this.id = localStorage.getItem("viewid");
      } else {
        // console.log("viewid不存在");
      }
    }
    this.findAllPage();
    // console.log(this.id);
    // console.log(this.$route.params.id);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button {
  width: 50p;
}
.table_title {
  font-size: 27px;
  margin: 0px 0px 15px 0px;
  color: #74a8f5;
  font-weight: bold;
  letter-spacing: 5px;
}
.viewPlac {
  overflow: auto;
  font-size: 14px;
  max-height: 135px;
}
.page {
  margin-top: 15px;
}
#clearLoacalStroage {
  color: #2e58ff;
  cursor: pointer;
  margin: 0px 0px 20px 0px;
  font-size: 14px;
}
</style>
