export class Ball {
    constructor(stageWidth, stageHeight, radius, speed, block){
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;

        const diameter = this.radius * 2;
        this.x = diameter + (Math.random() * stageWidth - diameter); //스테이지에 랜덤으로 위치
        this.y = diameter + (Math.random() * stageHeight - diameter);
        this.block = block;
        }

    draw(ctx, stageWidth, stageHeight, block){
        this.x += this.vx;
        this.y += this.vy;

        this.bouncingWindow(stageWidth, stageHeight);
        this.bouncingBlock(this.block);

        ctx.fillStyle = '#fbd14b'
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill()
    }

    bouncingWindow(stageWidth, stageHeight){
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        if(this.x <=minX || this.x >= maxX){ //왼쪽이나 오른쪽에 닿으면
            this.vx *= -1; //x축 방향 반대로
            this.x += this.vx; 
        } else if (this.y<=minY || this.y>= maxY){ //위나 아래에 닿으면
            this.vy *= -1; //y축 방향 반대로
            this.y += this.vy;
        }
    }

    bouncingBlock(block){
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        if(this.x > minX && this.x <maxX && this.y > minY && this.y < maxY){
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(this.x - maxX);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(this.y - maxY);
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            if(min == min1){
                this.vx *= -1; //x축 방향 반대로
                this.x += this.vx; 
            } else if (min == min2){
                this.vy *= -1; //y축 방향 반대로
                this.y += this.vy;
            }
        }
    }
}