export class HoverEffect {
	constructor(el) {
		this.el = el;
		this.scrollCircle = el.querySelector(".scroll-circle");
		this.scrollArrow = el.querySelector(".scroll-arrow");
		this.hover = false;
		this.calculatePosition();
		this.attachEventsListener();
		this.HandleScroll();
	}

	attachEventsListener() {
		window.addEventListener("mousemove", (e) => this.onMouseMove(e));
		window.addEventListener("resize", (e) => this.calculatePosition(e), { passive: true });
		window.addEventListener("scroll", (e) => this.calculatePosition(e), { passive: true });
	}

	HandleScroll() {
		gsap.to(this.scrollCircle, {
			rotate: 180,
			ease: Linear.easeNone
		});
	}

	calculatePosition() {
		gsap.set(this.el, {
			x: 0,
			y: 0
		});
		const box = this.el.getBoundingClientRect();
		this.x = box.left + box.width * 0.5;
		this.y = box.top + box.height * 0.5;
		this.width = box.width;
		this.height = box.height;
	}

	onMouseMove(e) {
		let hover = false;
		let hoverArea = this.hover ? 0.7 : 0.5;
		let x = e.clientX - this.x;
		let y = e.clientY - this.y;
		let distance = Math.sqrt(x * x + y * y);
		if (distance < this.width * hoverArea) {
			hover = true;
			if (!this.hover) {
				this.hover = true;
			}
			this.onHover(e.clientX, e.clientY);
		}

		if (!hover && this.hover) {
			this.onLeave();
			this.hover = false;
		}
	}

	onHover(x, y) {
		gsap.to(this.scrollCircle, {
			x: (x - this.x) * 0.2,
			y: (y - this.y) * 0.2,
			duration: 0.4,
			ease: Power2.easeOut
		});
		gsap.to(this.scrollArrow, {
			x: (x - this.x) * 0.3,
			y: (y - this.y) * 0.3,
			duration: 0.4,
			ease: Power2.easeOut
		});
	}

	onLeave() {
		gsap.to([this.scrollArrow, this.scrollCircle], {
			x: 0,
			y: 0,
			duration: 0.7,
			ease: Power2.easeOut
		});
	}
}
