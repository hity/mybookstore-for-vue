export default {
    data() {
        return {
            moveBlock: {
                startX: undefined,
                startTime: undefined,
                criticalTime: 1000, // 判断快速滑动与缓动的临界值（ms）
                oprWidth: undefined, // 操作长度
                el: undefined,
                startLeft: undefined, // 操作时，滑条的位置
            }
        }
    },
    methods: {
        onTouchMove(event) {
            let {
                startX,
                oprWidth,
                el,
                startLeft,
            } = this.moveBlock;

            let endX = event.targetTouches[0].pageX;
            let leftMoveX = endX - startX + startLeft;
            if (leftMoveX < (oprWidth * -1)) {
                leftMoveX = oprWidth * -1;
            } else if (leftMoveX > 0) {
                leftMoveX = 0
            }
            el.style.left = leftMoveX + 'px';
        },
        onTouchStart(event) {
            let targetEl = event.currentTarget;
            this.moveBlock = Object.assign(this.moveBlock, {
                startX: event.targetTouches[0].pageX,
                startTime: new Date().getTime(),
                el: targetEl,
                oprWidth: targetEl.getElementsByClassName('book-item-opr-wp')[0].offsetWidth,
                startLeft: parseFloat(targetEl.style.left) || 0
            });
            targetEl.style.transition = 'left 0s ease 0s';
        },
        onTouchEnd(event) {
            let {
                startX,
                oprWidth,
                el,
                startLeft,
                startTime,
                criticalTime
            } = this.moveBlock;
            let endX = event.changedTouches[0].pageX;
            let moveTime = new Date().getTime() - startTime;
            el.style.transition = 'left 0.5s ease 0s';

            // 超出时间阈值，为快速滑动
            if (moveTime < criticalTime) {
                // 向左
                if ((endX - startX) < 0) {
                    el.style.left = (oprWidth * -1) + 'px';
                } else {
                    el.style.left = '0px';
                }
            } else {
                let leftMoveX = endX - startX + startLeft;
                // 缓动，按照 1/2区域原则 舍入
                if ((oprWidth * -0.5) <= leftMoveX && leftMoveX < 0) {
                    el.style.left = '0px';
                } else if ((oprWidth * -0.5) > leftMoveX && leftMoveX > (oprWidth * -1)) {
                    el.style.left = (oprWidth * -1) + 'px';
                }
            }
        },
    }
}
