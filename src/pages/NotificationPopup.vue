<template>
    <div class="notification-popup" :class="type">
        <div class="notification-content">
            <p>{{ message }}</p>
            <button class="close-btn" @click="closeNotification"><v-icon>mdi-close-circle</v-icon></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNotificationService } from "@/store/api";
import { defineProps } from "vue";
const props = defineProps<{ message: string; type: "success" | "error" | "info"; id: number }>();
const { clearNotificationTimer } = useNotificationService();
const closeNotification = () => {
    clearNotificationTimer(props.id);
};
</script>

<style scoped>
.notification-popup {
    position: fixed;
    top: 68px;
    right: 8px;
    padding: 16px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    color: white;
    animation: slide-in 0.3s ease-out;
    max-width: 70%;
}

.notification-popup.success {
    background: #4caf50;
}

.notification-popup.error {
    background: #DD0034;
}

.notification-popup.info {
    background: #2196f3;
}

.close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 0px;
}

@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>