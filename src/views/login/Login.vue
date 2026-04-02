<script setup>
import LoginBrand from '@/components/login/LoginBrand.vue'
import AuthCard from '@/components/login/AuthCard.vue'
import AuthForm from '@/components/login/AuthForm.vue'
</script>

<template>
  <div class="auth-container">
    <LoginBrand />
    <AuthCard>
      <AuthForm />
    </AuthCard>
  </div>
</template>

<style scoped lang="scss">
.auth-container {
  display: flex;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
