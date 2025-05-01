// 使用立即执行函数来避免全局变量污染
(function() {
    // 检查是否已经注入过
    if (window.__alertOverridden) {
        return;
    }

    // 标记已注入
    window.__alertOverridden = true;

    // 保存原始函数
    const _originalAlert = window.alert;
    const _originalConfirm = window.confirm;

    // Override alert
    window.alert = function(message) {
        console.log('[Intercepted Alert]:', message);
        return;
    };

    // Override confirm
    window.confirm = function(message) {
        console.log('[Intercepted Confirm]:', message);
        return true;
    };

    // Also override jQuery dialog if it exists
    if (window.jQuery) {
        const _originalDialog = jQuery.fn.dialog;
        jQuery.fn.dialog = function(options) {
            console.log('[Intercepted jQuery Dialog]:', options);
            if (typeof options === 'string') {
                return this;
            }
            if (options && options.buttons) {
                // Automatically trigger the first button (usually OK/Confirm)
                const firstButton = Object.values(options.buttons)[0];
                if (typeof firstButton === 'function') {
                    setTimeout(firstButton, 0);
                }
            }
            return this;
        };
    }
})();
