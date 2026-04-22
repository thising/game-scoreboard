// Game Scoreboard App - Core Logic Module
// 游戏积分记录板 - 核心业务逻辑

// Constants - 常量定义
const PLAYER_COLORS = [
    '#0052ff', // 蓝
    '#e11d48', // 红
    '#16a34a', // 绿
    '#ca8a04', // 黄
    '#7c3aed', // 紫
    '#0d9488', // 青
    '#f97316', // 橙
    '#db2777', // 粉
    '#6366f1', // 靛
    '#84cc16', // 柠檬绿
];

const SCORE_UNITS = [1, 2, 5, 10, 50, 100];
const MAX_ROUNDS = 1000;
const AUTO_FINISH_HOURS = 1;

// App Module - 应用模块
const app = {
    /**
     * 创建新活动
     * @param {string} name - 活动名称
     * @param {string} location - 地点（可选）
     * @param {string[]} playerNames - 玩家名称数组
     * @param {number} scoreUnit - 积分单位
     * @returns {Object} 活动对象
     */
    createActivity(name, location, playerNames, scoreUnit) {
        const trimmedName = typeof name === 'string' ? name.trim() : '';
        if (!trimmedName) {
            throw new Error('活动名称不能为空');
        }

        if (!Array.isArray(playerNames) || playerNames.length < 2 || playerNames.length > 10) {
            throw new Error('玩家数量必须为2-10人');
        }

        const normalizedPlayerNames = playerNames.map((nickname, index) => {
            const trimmedNickname = typeof nickname === 'string' ? nickname.trim() : '';
            if (!trimmedNickname) {
                throw new Error(`玩家${index + 1}昵称不能为空`);
            }
            return trimmedNickname;
        });

        const now = Date.now();
        return {
            id: storage.generateId(),
            name: trimmedName,
            location: location?.trim() || undefined,
            createdAt: now,
            status: 'ongoing',
            scoreUnit: scoreUnit || 1,
            players: normalizedPlayerNames.map((nickname, index) => ({
                index,
                nickname,
                color: PLAYER_COLORS[index % PLAYER_COLORS.length]
            })),
            rounds: [],
            lastRoundAt: now
        };
    },

    /**
     * 添加轮次
     * @param {Object} activity - 活动对象
     * @param {number[]} scores - 本轮各玩家积分数组
     * @returns {Object} 更新后的活动对象
     */
    addRound(activity, scores) {
        if (activity.status !== 'ongoing') {
            throw new Error('活动已结束，无法添加轮次');
        }
        if (activity.rounds.length >= MAX_ROUNDS) {
            throw new Error(`已达到最大轮次限制（${MAX_ROUNDS}轮）`);
        }
        this.validateRoundScores(activity, scores);

        const now = Date.now();
        activity.rounds.push({
            roundNumber: activity.rounds.length + 1,
            timestamp: now,
            scores: [...scores] // 复制数组避免引用问题
        });
        activity.lastRoundAt = now;
        storage.saveActivity(activity);
        return activity;
    },

    /**
     * 更新轮次
     * @param {Object} activity - 活动对象
     * @param {number} roundIndex - 轮次索引
     * @param {number[]} scores - 新的积分数组
     * @returns {Object} 更新后的活动对象
     */
    updateRound(activity, roundIndex, scores) {
        if (roundIndex < 0 || roundIndex >= activity.rounds.length) {
            throw new Error('无效的轮次索引');
        }
        this.validateRoundScores(activity, scores);

        activity.rounds[roundIndex].scores = [...scores];
        storage.saveActivity(activity);
        return activity;
    },

    /**
     * 校验轮次积分
     * @param {Object} activity - 活动对象
     * @param {number[]} scores - 本轮各玩家积分数组
     */
    validateRoundScores(activity, scores) {
        if (!Array.isArray(scores) || scores.length !== activity.players.length) {
            throw new Error('积分数量必须与玩家数量一致');
        }

        if (!scores.every(score => Number.isInteger(score))) {
            throw new Error('本轮积分必须为整数');
        }

        const sum = scores.reduce((a, b) => a + b, 0);
        if (sum !== 0) {
            throw new Error('本轮积分必须平衡（总和为0）');
        }
    },

    /**
     * 删除轮次
     * @param {Object} activity - 活动对象
     * @param {number} roundIndex - 轮次索引
     * @returns {Object} 更新后的活动对象
     */
    deleteRound(activity, roundIndex) {
        if (roundIndex < 0 || roundIndex >= activity.rounds.length) {
            throw new Error('无效的轮次索引');
        }

        activity.rounds.splice(roundIndex, 1);
        // 重新编号
        activity.rounds.forEach((round, i) => {
            round.roundNumber = i + 1;
        });
        storage.saveActivity(activity);
        return activity;
    },

    /**
     * 结束活动
     * @param {Object} activity - 活动对象
     * @returns {Object} 更新后的活动对象
     */
    finishActivity(activity) {
        activity.status = 'finished';
        activity.endedAt = Date.now();
        storage.saveActivity(activity);
        return activity;
    },

    /**
     * 获取玩家当前总分
     * @param {Object} activity - 活动对象
     * @param {number} playerIndex - 玩家索引
     * @returns {number} 总分
     */
    getPlayerTotal(activity, playerIndex) {
        return activity.rounds.reduce(
            (sum, round) => sum + (round.scores[playerIndex] || 0),
            0
        );
    },

    /**
     * 获取所有玩家统计信息
     * @param {Object} activity - 活动对象
     * @returns {Object[]} 玩家统计数组
     */
    getPlayerStats(activity) {
        return activity.players
            .map((player, index) => ({
                ...player,
                totalScore: this.getPlayerTotal(activity, index)
            }))
            .sort((a, b) => b.totalScore - a.totalScore || a.index - b.index)
            .map((player, rank) => ({ ...player, rank: rank + 1 }));
    },

    /**
     * 获取当前领先者
     * @param {Object} activity - 活动对象
     * @returns {Object|null} 领先者信息
     */
    getLeader(activity) {
        const stats = this.getPlayerStats(activity);
        return stats.length > 0 ? stats[0] : null;
    },

    /**
     * 获取单轮最高分记录
     * @param {Object} activity - 活动对象
     * @returns {Object|null} 最高分记录
     */
    getMaxRoundScore(activity) {
        let maxRecord = null;
        activity.rounds.forEach(round => {
            round.scores.forEach((score, playerIndex) => {
                if (score > 0 && (!maxRecord || score > maxRecord.score)) {
                    maxRecord = {
                        roundNumber: round.roundNumber,
                        playerIndex,
                        score,
                        player: activity.players[playerIndex]
                    };
                }
            });
        });
        return maxRecord;
    },

    /**
     * 获取活动统计信息
     * @param {Object} activity - 活动对象
     * @returns {Object} 统计信息
     */
    getActivityStats(activity) {
        const playerStats = this.getPlayerStats(activity);
        const duration = activity.status === 'finished'
            ? (activity.endedAt - activity.createdAt)
            : (Date.now() - activity.createdAt);

        return {
            duration,
            totalRounds: activity.rounds.length,
            playerStats,
            topPlayer: playerStats[0] || null,
            maxRoundScore: this.getMaxRoundScore(activity)
        };
    },

    /**
     * 格式化时长
     * @param {number} ms - 毫秒数
     * @returns {string} 格式化后的时长
     */
    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}小时${minutes % 60}分钟`;
        } else if (minutes > 0) {
            return `${minutes}分钟${seconds % 60}秒`;
        } else {
            return `${seconds}秒`;
        }
    },

    /**
     * 格式化日期时间
     * @param {number} timestamp - 时间戳
     * @returns {string} 格式化后的日期时间
     */
    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        if (isToday) {
            return date.toLocaleString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return date.toLocaleString('zh-CN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * 格式化完整日期时间
     * @param {number} timestamp - 时间戳
     * @returns {string} 格式化后的完整日期时间
     */
    formatFullDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * 检查并执行自动结束
     * @param {Object} activity - 活动对象
     * @returns {boolean} 是否已自动结束
     */
    checkAutoFinish(activity) {
        if (activity.status !== 'ongoing') return false;
        if (!activity.lastRoundAt) return false;

        const oneHour = AUTO_FINISH_HOURS * 60 * 60 * 1000;
        if (Date.now() - activity.lastRoundAt > oneHour) {
            this.finishActivity(activity);
            return true;
        }
        return false;
    },

    /**
     * 获取玩家颜色
     * @param {number} index - 玩家索引
     * @returns {string} 颜色代码
     */
    getPlayerColor(index) {
        return PLAYER_COLORS[index % PLAYER_COLORS.length];
    },

    /**
     * 获取所有可用颜色
     * @returns {string[]} 颜色数组
     */
    getPlayerColors() {
        return [...PLAYER_COLORS];
    },

    /**
     * 获取支持的积分单位
     * @returns {number[]} 积分单位数组
     */
    getScoreUnits() {
        return [...SCORE_UNITS];
    }
};

// Theme Management - 主题管理模块
const theme = {
    MODES: ['light', 'dark', 'auto'],
    systemThemeListenerAdded: false,

    /**
     * 初始化主题
     * @returns {string} 当前主题模式
     */
    init() {
        const settings = storage.getSettings();
        const mode = this.normalizeMode(settings.theme);
        this.apply(mode);
        this.listenSystemChange();
        return mode;
    },

    /**
     * 标准化主题模式
     * @param {string} mode - 主题模式
     * @returns {string} 合法主题模式
     */
    normalizeMode(mode) {
        return this.MODES.includes(mode) ? mode : 'auto';
    },

    /**
     * 获取系统暗色偏好
     * @returns {boolean} 是否为暗色模式
     */
    prefersDark() {
        return window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    /**
     * 应用主题
     * @param {string} mode - 主题模式
     */
    apply(mode) {
        const normalizedMode = this.normalizeMode(mode);
        const html = document.documentElement;
        const isDark = normalizedMode === 'dark' ||
            (normalizedMode === 'auto' && this.prefersDark());
        html.classList.toggle('dark', isDark);

        const settings = storage.getSettings();
        settings.theme = normalizedMode;
        storage.saveSettings(settings);
    },

    /**
     * 切换主题
     * @returns {string} 新主题模式
     */
    toggle() {
        const settings = storage.getSettings();
        const current = this.normalizeMode(settings.theme);
        const currentIndex = this.MODES.indexOf(current);
        const nextIndex = (currentIndex + 1) % this.MODES.length;
        const nextMode = this.MODES[nextIndex];
        this.apply(nextMode);
        return nextMode;
    },

    /**
     * 获取主题图标名称
     * @returns {string} Material Icons 图标名称
     */
    getIcon() {
        const settings = storage.getSettings();
        const current = this.normalizeMode(settings.theme);
        if (current === 'dark') return 'dark_mode';
        if (current === 'light') return 'light_mode';
        return 'brightness_auto';
    },

    /**
     * 获取当前主题模式
     * @returns {string} 主题模式
     */
    getCurrent() {
        const settings = storage.getSettings();
        return this.normalizeMode(settings.theme);
    },

    /**
     * 监听系统主题变化
     * @param {Function} callback - 回调函数
     */
    listenSystemChange(callback) {
        if (this.systemThemeListenerAdded || !window.matchMedia) return;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const settings = storage.getSettings();
            if (this.normalizeMode(settings.theme) === 'auto') {
                this.apply('auto');
                if (callback) callback(e.matches ? 'dark' : 'light');
            }
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(handleChange);
        }
        this.systemThemeListenerAdded = true;
    }
};

// UI Helpers - UI 辅助函数
const ui = {
    /**
     * 创建玩家颜色标记
     * @param {string} color - 颜色代码
     * @param {string} size - 尺寸类名
     * @returns {string} HTML 字符串
     */
    colorBadge(color, size = 'w-8 h-8') {
        return `<div class="${size} rounded-full flex-shrink-0" style="background-color: ${color}"></div>`;
    },

    /**
     * 创建玩家竖条色卡
     * @param {string} color - 颜色代码
     * @param {string} className - 额外类名
     * @returns {string} HTML 字符串
     */
    playerColorBar(color, className = '') {
        return `<div class="w-3 h-10 rounded-full flex-shrink-0 ${className}" style="background-color: ${color}"></div>`;
    },

    /**
     * 创建排名徽章
     * @param {number} rank - 排名
     * @param {string} size - 尺寸类名
     * @returns {string} HTML 字符串
     */
    rankBadge(rank, size = 'w-6') {
        const isTop3 = rank <= 3;
        return `
            <div class="${size} text-center font-bold ${isTop3 ? 'text-primary' : 'text-gray-400'}">
                ${rank}
            </div>
        `;
    },

    /**
     * 创建分享页排名徽章
     * @param {number} rank - 排名
     * @returns {string} HTML 字符串
     */
    resultRankBadge(rank) {
        const trophyStyles = {
            1: '#FFD700',
            2: '#C0C0C0',
            3: '#CD7F32'
        };

        if (trophyStyles[rank]) {
            return `
                <div class="w-8 h-8 flex items-center justify-center flex-shrink-0" title="第${rank}名">
                    <span class="material-symbols-outlined text-3xl" style="color: ${trophyStyles[rank]}">emoji_events</span>
                </div>
            `;
        }

        return `
            <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                ${rank}
            </div>
        `;
    },

    /**
     * 创建状态标签
     * @param {string} status - 状态
     * @returns {string} HTML 字符串
     */
    statusBadge(status) {
        if (status === 'ongoing') {
            return `
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                    进行中
                </span>
            `;
        }
        return `
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                已结束
            </span>
        `;
    },

    /**
     * 创建积分显示
     * @param {number} score - 积分
     * @param {boolean} showSign - 是否显示正负号
     * @returns {string} HTML 字符串
     */
    scoreDisplay(score, showSign = false) {
        const sign = showSign && score > 0 ? '+' : '';
        const colorClass = score > 0 ? 'text-red-500' : score < 0 ? 'text-green-500' : 'text-gray-700';
        return `<span class="font-bold ${colorClass}">${sign}${score}</span>`;
    },

    /**
     * 创建积分单位按钮
     * @param {number} unit - 积分单位
     * @param {boolean} isActive - 是否选中
     * @param {string} className - 额外类名
     * @returns {string} HTML 字符串
     */
    scoreUnitButton(unit, isActive = false, className = '') {
        const baseClass = 'py-3 rounded-xl font-semibold text-sm transition-all';
        const activeClass = 'bg-primary text-white shadow-lg shadow-blue-500/25';
        const inactiveClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        return `
            <button type="button" data-unit="${unit}"
                class="score-unit-btn ${baseClass} ${isActive ? activeClass : inactiveClass} ${className}">
                ${unit}
            </button>
        `;
    },

    /**
     * 创建玩家输入项
     * @param {number} index - 玩家索引
     * @param {string} color - 颜色
     * @param {string} placeholder - 占位文本
     * @returns {string} HTML 字符串
     */
    playerInput(index, color, placeholder) {
        return `
            <div class="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700">
                ${this.playerColorBar(color)}
                <input type="text" name="player${index}"
                    class="flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary
                           focus:ring-2 focus:ring-primary/20 outline-none transition-all
                           dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="${placeholder}">
            </div>
        `;
    },

    /**
     * 创建主按钮
     * @param {string} text - 按钮文本
     * @param {string} icon - Material Icons 名称
     * @param {string} type - 按钮类型 (primary/secondary/danger)
     * @returns {string} HTML 字符串
     */
    primaryButton(text, icon = '', type = 'primary') {
        const baseClass = 'w-full font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]';
        const typeClass = {
            primary: 'bg-primary text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30',
            secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            danger: 'bg-red-500 text-white hover:bg-red-600'
        }[type] || typeClass.primary;

        const iconHtml = icon ? `<span class="material-symbols-outlined">${icon}</span>` : '';
        return `
            <button class="${baseClass} ${typeClass}">
                ${iconHtml}
                <span>${text}</span>
            </button>
        `;
    },

    /**
     * 创建卡片容器
     * @param {string} content - 卡片内容
     * @param {string} className - 额外类名
     * @returns {string} HTML 字符串
     */
    card(content, className = '') {
        return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 ${className}">
                ${content}
            </div>
        `;
    },

    /**
     * 创建统计卡片
     * @param {string} label - 标签
     * @param {string} value - 数值
     * @param {string} className - 额外类名
     * @returns {string} HTML 字符串
     */
    statCard(label, value, className = '') {
        return this.card(`
            <div class="p-4">
                <div class="text-sm text-gray-500 mb-1">${label}</div>
                <div class="text-xl font-bold text-gray-900 dark:text-white">${value}</div>
            </div>
        `, className);
    },

    /**
     * 创建空状态提示
     * @param {string} icon - Material Icons 名称
     * @param {string} text - 提示文本
     * @returns {string} HTML 字符串
     */
    emptyState(icon, text) {
        return `
            <div class="text-center py-12">
                <span class="material-symbols-outlined text-6xl text-gray-300">${icon}</span>
                <p class="text-gray-500 mt-4">${text}</p>
            </div>
        `;
    },

    /**
     * 显示确认对话框
     * @param {string} message - 确认消息
     * @returns {boolean} 用户是否确认
     */
    confirm(message) {
        return window.confirm(message);
    },

    /**
     * 显示警告对话框
     * @param {string} message - 警告消息
     */
    alert(message) {
        window.alert(message);
    },

    /**
     * 根据时间获取问候语
     * @returns {string} 问候语
     */
    getGreeting() {
        const hour = new Date().getHours();
        if (hour < 6) return '夜深了，注意休息';
        if (hour < 12) return '早上好，开始记录吧！';
        if (hour < 14) return '中午好，继续记录吧！';
        if (hour < 18) return '下午好，继续记录吧！';
        return '晚上好，继续记录吧！';
    }
};

// Note: theme.init() is called in index.html inline script
// Do not call it again here to avoid double initialization
