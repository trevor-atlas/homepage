import * as React from 'react';
import {TweenLite, Expo} from 'gsap';

interface Point {
    x: number;
    y: number;
    originX: number;
    originY: number;
    circle: Circle;
    active: number;
    closest: Point[] | any[];
}

const getColor = (opacity: number) => `rgba(166, 103, 248, ${opacity})`;

class Circle {
    public active: number;

    constructor(private pos: Point, private rad: number, private color: string) {
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI, false);
        ctx.fillStyle = getColor(this.active);
        ctx.fill();
    };
}

class ParticleHeader extends React.PureComponent<any> {
    private width: number;
    private height: number;
    private color: string;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private points: Point[];
    private target: { x: number, y: number };
    private animateHeader: boolean;

    constructor(props: any) {
        super(props);
        this.animateHeader = true;
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.initHeader();
        this.initAnimation();
        this.addListeners();
    }


    initHeader = () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.target = {x: this.width / 2, y: this.height / 2};

        (this.canvas as any) = this.refs.canvas;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.ctx = this.canvas.getContext('2d');

        // create points
        this.points = [];
        for (let x = 0; x < this.width; x = x + this.width / 10) {
            for (let y = 0; y < this.height; y = y + this.height / 10) {
                let px = x + Math.random() * this.width / 10;
                let py = y + Math.random() * this.height / 10;
                let p = {x: px, originX: px, y: py, originY: py};
                this.points.push(p as any);
            }
        }

        // for each point find the 5 closest points
        for (let i = 0; i < this.points.length; i++) {
            let closest = [];
            let p1: Point = this.points[i];
            for (let j = 0; j < this.points.length; j++) {
                let p2: Point = this.points[j];
                if (!(p1 == p2)) {
                    let placed = false;
                    for (let k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (let k = 0; k < 5; k++) {
                        if (!placed) {
                            if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for (let i in this.points) {
            let c = new Circle(this.points[i], 2 + Math.random() * 2, 'rgba(166, 103, 248, 1)');
            this.points[i].circle = c;
        }
    };

    // Event handling
    addListeners = () => {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', this.mouseMove);
        }
        window.addEventListener('scroll', this.scrollCheck);
        window.addEventListener('resize', this.resize);
    };

    mouseMove = (e: MouseEvent) => {
        const eventPos = (e.pageX || e.pageY);
        this.target.x =  eventPos ? e.pageX : e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        this.target.y = eventPos ? e.pageY: e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    };

    scrollCheck = () => {
        this.animateHeader = document.body.scrollTop <= this.height;
    };

    resize = () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    };

    // animation
    initAnimation = () => {
        this.animate();
        for (let i in this.points) {
            this.shiftPoint(this.points[i]);
        }
    };

    animate = () => {
        if (this.animateHeader) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            for (let i in this.points) {
                // detect points in range
                const distance = Math.abs(this.getDistance(this.target, this.points[i]));
                if (distance < 4510) {
                    this.points[i].active = 1;
                    this.points[i].circle.active = 1;
                } else if (distance < 30902) {
                    this.points[i].active = 0.618;
                    this.points[i].circle.active = 0.618;
                } else if (distance < 50000) {
                    this.points[i].active = 0.381;
                    this.points[i].circle.active = 0.381;
                } else {
                    this.points[i].active = 0;
                    this.points[i].circle.active = 0.236;
                }

                this.drawLines(this.points[i]);
                this.points[i].circle.draw(this.ctx);
            }
        }
        requestAnimationFrame(this.animate);
    };

    shiftPoint = async (p: Point) => {
        if (p.active > 0) {
            TweenLite.to(p, this.clamp(5, 20)(10 * Math.random()),
            {
                x: p.originX - 50 + Math.random() * 250,
                y: p.originY - 50 + Math.random() * 250,
                ease: Expo.easeInOut,
                onComplete: () => this.shiftPoint(p)
            })
        } else {
            await setTimeout(this.shiftPoint, 250, p);
        }

    };

    // Canvas manipulation
    drawLines = (p: Point) => {
        if (!p.active) return;
        for (let i in p.closest) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p.closest[i].x, p.closest[i].y);
            this.ctx.strokeStyle = getColor(p.active);
            this.ctx.stroke();
        }
    };

    clamp = (min: number, max: number) => (value: number) =>
        value < min ? min : value > max ? max : value;
    // Util
    getDistance = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
        return (Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };


    render() {
        return (
            <canvas style={{zIndex: -10, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0}} ref="canvas"></canvas>
        )
    }
}

export {ParticleHeader};
