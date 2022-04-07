function Trash(mode, pos, r) {
    this.mode = mode;   
    if (pos) {
        this.position = pos.copy();
    } else {
        this.position = createVector(random(width), random(height))
    }
    if (r) {
        this.radius = r * 0.5;
    } else {
        if (!this.mode)
            this.radius = random(15, 40);
        else this.radius = 50;  // recycle, preset image, size = 50
    }


    this.get = false;  // be collected by a ship's rope
    this.exist = true;
    this.collect = null;  // ship that collec it
    this.vel = p5.Vector.random2D();
    this.velocity = this.vel.mag();
    this.total = floor(random(5, 15));
    this.offset = [];
    for (var i = 0; i < this.total; i++) {
        this.offset[i] = random(-this.radius * 0.5, this.radius * 0.5);
    }
    this.acc = createVector();
    this.maxBound = this.radius + this.offset.reduce(function(a, b) {
        return Math.max(a, b);});
    if (this.mode) this.maxBound = this.radius;

    this.collected = function() {
        return !this.exist;
    }

    this.update = function() {
        if (this.get) {
            if (this.collect.ropeLen == 0) {
                this.exist = false;
                return;
            }
            this.vel = this.collect.pos.copy().sub(this.position);
            this.vel.setMag(this.collect.ropeSpeed);
        }          
        this.position.add(this.vel);
        if (!this.get) {
            this.vel.add(this.acc);
            this.vel.setMag(this.velocity);
            this.acc.mult(0);
        }
    }

    this.render = function() {
        push();
        stroke(255);
        strokeWeight(2);
        noFill();
        translate(this.position.x, this.position.y);
        beginShape();
        if (this.mode == 0) {
            for (var i = 0; i < this.total; i++) {
                var angle = map(i, 0, this.total, 0, TWO_PI);
                var r = this.radius + this.offset[i];
                var x = r * cos(angle);
                var y = r * sin(angle);
                vertex(x, y);
            }
            endShape(CLOSE);
        } 
        else if (this.mode == 1) {
            image(bag, -this.maxBound,-1.1*this.maxBound,2.25 * this.maxBound, 2.25 * this.maxBound);
            //ellipse(0, 0, this.maxBound, this.maxBound);
        }
        else if (this.mode == 2) {
            image(can, -1.625 * this.maxBound,-1.55*this.maxBound, 3.2 * this.maxBound, 3.2 * this.maxBound);
            //ellipse(0, 0, this.maxBound, this.maxBound);
        }
        else if (this.mode == 3) {
            image(bottle, -2 * this.maxBound,-2*this.maxBound, 4 * this.maxBound, 4 * this.maxBound);
            //ellipse(0, 0, this.maxBound, this.maxBound);
        }
        pop();
    }

    this.type = function() {
        return this.mode;
    }

    this.breakup = function() {
        var newA = [];
        newA[0] = new Trash(this.mode, this.position, this.radius);
        newA[1] = new Trash(this.mode, this.position, this.radius);
        return newA;
    }

    // Bouncing back from colliding trash
    this.collide = function(trashs) {
        let steering = createVector();
        for (let ast of trashs) {
            var d = dist(this.position.x, this.position.y, ast.position.x, ast.position.y);
            if (d < this.maxBound + ast.maxBound && ast != this) {
                let diff = p5.Vector.sub(this.position, ast.position);
                steering.add(diff);
            }
        }
        this.acc.add(steering);
    }

    this.beCollected = function(ship) {
        this.get = true;
        this.collect = ship;
    }

    this.edges = function() {
        if (this.position.x > width + this.radius) {
            this.position.x = -this.radius;
        } else if (this.position.x < -this.radius) {
            this.position.x = width + this.radius;
        }
        if (this.position.y > height + this.radius) {
            this.position.y = -this.radius;
        } else if (this.position.y < -this.radius) {
            this.position.y = height + this.radius;
        }
    }

}




