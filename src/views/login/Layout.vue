<script setup>
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <nav>
        <router-link to="/admin/article/manage">文章管理</router-link>
        <router-link to="/admin/article/category">分类管理</router-link>
        <router-link to="/admin/user/info">用户信息</router-link>
      </nav>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #2B2B2B;
}
.sidebar {
  width: 240px;
  background: #313335;
  padding: 20px;
}
.content {
  flex: 1;
  padding: 20px;
}
</style>
