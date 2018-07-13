<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .product-file-page{
        min-height: 100%;

        .actions{
            text-align: center;
        }
        .pagination{
            text-align: center;
        }
        .el-upload{
            width: 100%;
            .el-upload-dragger{
                width: 100%;
            }
        }
    }
</style>
<template>
  <div class="product-file-page">
      <p class="top-bar">
        <el-button size="mini" type="primary" @click="add">新增</el-button>
        <span style="float:right;margin-right:20px">
            <el-input style="width:10em;" size="mini"  @keydown.enter.native="query" v-model="keywords" placeholder="名称"></el-input>
            <el-button  size="mini" type="primary"  @click="query">查询</el-button>
        </span>
      </p>
      <el-table
      :data="tableData"
        style="width: 100%;margin-top:5px;"
      >
          <el-table-column  width="150px" prop="csmEngineerCode" label="编号"></el-table-column>
          <el-table-column  width="150px" prop="csmEngineerName" label="名称"></el-table-column>
          <el-table-column  label="操作">
              <template slot-scope="scope">
                  <el-button @click="edit(scope.row)" size="mini" type="primary">编辑</el-button>
                  <el-button @click="deleteHandle(scope.row)" size="mini" type="primary">删除</el-button>
              </template>
          </el-table-column>
      </el-table>

     <el-pagination
      class="pagination"
      :current-page.sync="viewPage"
      :page-size="params.size"
      @current-change="pageChange"
      layout="total, prev, pager, next"
      :total="length">
    </el-pagination>



    <el-dialog class="custom-dialog" :visible="dialogFlag" width="30%">
       <template v-if="dialogFlag==='新增'">
            <el-form :model="form" label-width="5em">
                <el-form-item style="font-weight:bold;" label="基础信息"></el-form-item>
                <el-form-item label="编号" required>
                     <el-input size="mini" v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="名称" required>
                     <el-input size="mini" v-model="form.name" ></el-input>
                </el-form-item>
            </el-form>
            <p class="actions">
                <el-button size="mini" type="primary" @click="cb('keep')">保存</el-button>
                <el-button size="mini" @click="dialogFlag=false">取消</el-button>
            </p>
       </template>
        <template v-else-if="dialogFlag==='删除'">
            <p style="text-align:center;">您确定要删除吗?</p>
            <p class="actions" style="margin-top:30px">
                <el-button size="mini" type="danger" @click="cb('delete')">确定</el-button>
                <el-button size="mini" @click="dialogFlag=false">取消</el-button>
            </p>
        </template>
    </el-dialog>
  </div>
</template>

<script>
    import axios from "axios"

  export default {
  name: 'product-file-page',
  data() {
    return {
        tableData:[],
        dialogFlag:false,
        fileForm:{},
        length:0,
        viewPage:1,
        params:{
         page:0,
         size:10,
         keyword:''
        },
        keywords:''
    }
  },
  computed:{
  },
  methods: {
    formCheck(){
        return this.$formCheckContext(
            [
                ["code",v=>v,"请输入编号!"],
                ["name",v=>v,"请输入名称!"],
            ],
            this.form
        );
    },
    pageChange(page){
        this.params.page = page-1;
        this.reLoadPage();
    },
    cb(type){
        let cb = this._cb||(()=>{});
        cb(type);
    },
    add(){
        this.dialogFlag = '新增';
        this._cb = type=>{
            if(type==='keep'){
                if(this.formCheck()){
                    return;
                }
                this.$wrapLoadTarget(undefined,axios.post("/product",this.form)).then(()=>{
                    this.$success("新增成功!");
                    this.dialogFlag = false;
                    this.reLoad();
                });
            }
        }
    },
    edit(engineer){
        this.form = {...engineer};
        this.dialogFlag = '新增';
        this._cb = type=>{
            if(type==='keep'){
                if(this.formCheck()){
                    return;
                }
                this.$wrapLoadTarget(undefined,axios.put(`/product/${engineer.id}`,this.form)).then(()=>{
                    this.$success("保存成功!");
                    this.dialogFlag = false;
                    this.reLoad();
                });
            }
        }
    },
    deleteHandle(engineer){
        this.dialogFlag = '删除';
        this._cb = type=>{
            if(type==='delete'){
                this.$wrapLoadTarget(undefined,axios.delete(`/product/${engineer.id}`)).then(()=>{
                    this.$success("删除成功!");
                    this.dialogFlag = false;
                    this.reLoadPage().then(data=>{
                        if(!data.content || !data.content.length){
                            this.reLoad();
                        }
                    });
                });
            }
        }
    },
    query(){
        this.params.keyword = this.keywords;
        this.reLoad();
    },
    reLoad(){
        this.form = {};
        this.params.page = 0;
        this.viewPage = 1;
        this.reLoadPage();
    },
    reLoadPage(){
        return this.$wrapLoadTarget(undefined,axios.get("/product",{
            params:this.params||{}
        })).then(data=>{
            this.tableData = data.content;
            this.length = data.totalElements;
            return data;
        })
    }
  },
  created(){
      this.reLoad();
  },
  watch:{
  }
}
</script>

