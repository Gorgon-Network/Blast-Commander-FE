import { ref } from "vue";
interface Notification {
    message: string;
    type: "success" | "error" | "info";
    id: number;
    timer: NodeJS.Timeout | null;
}
const notifications = ref<Notification[]>([]);
let nextId = 0;
export const useNotificationService = () => {
    const addNotification = (message: string, type: "success" | "error" | "info" = "info") => {
        const id = nextId++;
        const timer = setTimeout(() => {
            removeNotification(id);
        }, 5000);
        notifications.value.push({ message, type, id, timer });
    };

    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter(notification => notification.id !== id);
    };

    const clearNotificationTimer = (id: number) => {
        const notification = notifications.value.find(notification => notification.id === id);
        if (notification && notification.timer) {
            clearTimeout(notification.timer);
        }
        removeNotification(id);
    };

    return {
        notifications,
        addNotification,
        clearNotificationTimer,
    };
};