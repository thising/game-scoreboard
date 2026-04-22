// Storage Module - 数据存储模块
// 游戏积分记录板 - 本地存储封装

const STORAGE_KEY = 'scoretrack_activities';
const SETTINGS_KEY = 'scoretrack_settings';

/**
 * 存储模块
 * 封装 localStorage 操作，提供活动数据和设置的读写功能
 */
const storage = {
    /**
     * 获取所有活动
     * @returns {Object[]} 活动数组
     */
    getActivities() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('加载活动数据失败:', e);
            return [];
        }
    },

    /**
     * 保存所有活动
     * @param {Object[]} activities - 活动数组
     */
    saveActivities(activities) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
        } catch (e) {
            console.error('保存活动数据失败:', e);
            // 存储空间不足时给出提示
            if (e.name === 'QuotaExceededError') {
                alert('存储空间不足，请删除一些历史记录');
            }
        }
    },

    /**
     * 获取单个活动
     * @param {string} id - 活动ID
     * @returns {Object|null} 活动对象
     */
    getActivity(id) {
        const activities = this.getActivities();
        return activities.find(a => a.id === id) || null;
    },

    /**
     * 保存单个活动
     * @param {Object} activity - 活动对象
     */
    saveActivity(activity) {
        const activities = this.getActivities();
        const index = activities.findIndex(a => a.id === activity.id);
        if (index >= 0) {
            activities[index] = activity;
        } else {
            activities.push(activity);
        }
        this.saveActivities(activities);
    },

    /**
     * 删除活动
     * @param {string} id - 活动ID
     */
    deleteActivity(id) {
        const activities = this.getActivities().filter(a => a.id !== id);
        this.saveActivities(activities);
    },

    /**
     * 获取应用设置
     * @returns {Object} 设置对象
     */
    getSettings() {
        try {
            const data = localStorage.getItem(SETTINGS_KEY);
            return data ? JSON.parse(data) : { theme: 'auto', defaultScoreUnit: 1 };
        } catch (e) {
            return { theme: 'auto', defaultScoreUnit: 1 };
        }
    },

    /**
     * 保存应用设置
     * @param {Object} settings - 设置对象
     */
    saveSettings(settings) {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch (e) {
            console.error('保存设置失败:', e);
        }
    },

    /**
     * 生成唯一ID (UUID v4)
     * @returns {string} UUID 字符串
     */
    generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * 导出所有数据（用于备份）
     * @returns {string} JSON 字符串
     */
    exportData() {
        const data = {
            activities: this.getActivities(),
            settings: this.getSettings(),
            exportTime: Date.now()
        };
        return JSON.stringify(data, null, 2);
    },

    /**
     * 导入数据（用于恢复）
     * @param {string} jsonString - JSON 字符串
     * @returns {boolean} 是否成功
     */
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.activities) {
                this.saveActivities(data.activities);
            }
            if (data.settings) {
                this.saveSettings(data.settings);
            }
            return true;
        } catch (e) {
            console.error('导入数据失败:', e);
            return false;
        }
    },

    /**
     * 清空所有数据
     */
    clearAll() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(SETTINGS_KEY);
    }
};
