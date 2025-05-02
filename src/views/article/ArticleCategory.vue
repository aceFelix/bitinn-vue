<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([
    {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])
// 导入getArticleListService()
import{ getArticleListService, addCategoryService, updateCategoryService, deleteCategoryService } from '@/api/article.js'
// 声明异步函数
const getCategorys = async () => {
    let res = await getArticleListService()
    categorys.value = res.data
}
getCategorys()

//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})
//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    categoryAlias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
    ]
}

import { ElMessage } from 'element-plus'
// 调用后台接口完成添加分类
const addCategory = async() =>{
    let res = await addCategoryService(categoryModel.value)
    ElMessage.success(res.message? res.message:'添加成功')
    //隐藏弹窗
    dialogVisible.value = false
    //刷新数据，再次访问后台接口，查询所有分类
    getCategorys()
}

// 定义变量，控制标题的展示
const title = ref('')

// 显示编辑分类弹窗
const showDialog = (row) => {
    dialogVisible.value = true
    title.value = '编辑分类'
    // 数据拷贝
    categoryModel.value.categoryName = row.categoryName
    categoryModel.value.categoryAlias = row.categoryAlias
    // 扩展id属性
    // 添加分类时，需要把id值传递给后台，后台才能知道要修改哪条数据
    categoryModel.value.id = row.id
}

// 调用后台接口完成修改分类
    const updateCategory = async() =>{
        let res = await updateCategoryService(categoryModel.value)
        ElMessage.success(res.message? res.message:'修改成功')
        //隐藏弹窗
        dialogVisible.value = false
        //刷新数据，再次访问后台接口，查询所有分类
        getCategorys()
    }  
    
// 点击添加分类时清空模型的数据
const clearCategoryModel = () => {
    categoryModel.value.categoryName = ''
    categoryModel.value.categoryAlias = ''
}

import { ElMessage, ElMessageBox } from 'element-plus'
// 调用后台接口完成删除分类
const deleteCategory = (row) => {
    // 提示用户 确认框
    ElMessageBox.confirm(
    '确认删除该分类信息吗?',
    '确认删除',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
        // 调用后台接口完成删除分类
        let res = await deleteCategoryService(row.id)
        // 刷新数据，再次访问后台接口，查询所有分类
        getCategorys()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}


</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true; title='添加分类'; clearCategoryModel()">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <!-- eslint-disable-next-line vue/no-unused-vars -->
                <template #default="row">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title=='添加分类'? addCategory():updateCategory()"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>