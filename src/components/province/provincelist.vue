<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-tooltip
          class="item"
          effect="dark"
          content="添加省份"
          placement="left"
        >
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="toaddprovince"
            circle
          ></el-button></el-tooltip
      ></el-col>
      <el-col :span="16"><p class="table_title">省份列表</p></el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%; border: 1px solid"
      :header-cell-style="{
        'background-color': '#F0F8FF',
        color: '#1E90FF',
        'font-size': '18px',
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
        label="省份ID"
        sortable
        width="150"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="省份"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column align="center" prop="tags" label="标签">
      </el-table-column>
      <el-table-column
        align="center"
        prop="placecounts"
        label="景点个数"
        sortable
        width="130"
      >
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="showView(scope.row)" size="mini" type="primary"
            >景点列表</el-button
          ><el-button @click="modifyProv(scope.row)" size="mini" type="warning"
            >修改省份</el-button
          ><el-button size="mini" type="danger" @click="deleteProv(scope.row)"
            >删除省份</el-button
          ></template
        ></el-table-column
      >
    </el-table>
    <div class="page">
      <el-pagination
        @current-change="findAll()"
        :current-page.sync="page"
        :page-size="rows"
        layout="prev, pager, next, jumper"
        :total="totals"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"], //注入页面刷新依赖
  name: "Prvincelist",
  data() {
    return {
      page: 1,
      rows: 4,
      totalPage: 0,
      totals: 0,
      tableData: [],
    };
  },
  methods: {
    findAll(indexpage) {
      //查询所有
      if (indexpage) {
        this.page = indexpage;
      }
      var _this = this;
      this.$axios.get("/province/findByPage?page=" + this.page).then((res) => {
        //console.log(res);
        _this.tableData = res.data.provinces;
        _this.page = res.data.page;
        _this.totalPage = res.data.totalPage;
        _this.totals = res.data.totals;
      });
    },
    toaddprovince() {
      this.$router.push("/home/addprovince");
    },
    modifyProv(row) {
      this.$router.push({
        name: "addprovince",
        params: {
          id: row.id,
          name: row.name,
          tags: row.tags,
          placecounts: row.placecounts,
        },
      });
    },
    deleteProv(row) {
      var id = row.id;
      if (row.placecounts != 0) {
        this.$message.error("景点个数不为0，无法删除省份！");
        return;
      }
      this.$confirm("此操作将删除该省份，不可恢复！", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.get("/province/delete?id=" + id).then((res) => {
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
    showView(row) {
      this.$router.push({
        name: "viewspotlist",
        params: { id: row.id },
      });
    },
  },
  created() {
    this.findAll();
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
.page {
  margin-top: 15px;
}
</style>
