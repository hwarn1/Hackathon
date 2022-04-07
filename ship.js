


function Ship() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.isBoosting = 0;

    // data field for the rope
    this.isFetching = false;  // rope
    this.ropeLen = 0;
    this.ropeSpeed = 6;
    this.ropeExtend = true;
    this.netRadius = 10;
    this.ropeMax = 240;

    this.boosting = function(b) {
        this.isBoosting = b;
    }

    this.update = function() {
        if (this.isBoosting == 1) {
            this.boost(true);
        } else if (this.isBoosting == 2) {
            this.boost(false);
        }
        if (this.isFetching) {
            if (this.ropeExtend && this.ropeLen < this.ropeMax)
                this.ropeLen += this.ropeSpeed;
            else {
                this.getBack();
                this.ropeLen -= this.ropeSpeed;
                if (this.ropeLen <= 0)
                    this.isFetching = false;
            }
        }
        if (!this.isFetching) {
            this.ropeLen = 0;
            this.ropeExtend = true;
        }

        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }

    this.boost = function(acc) {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        if (!acc) force = createVector().sub(force);
        this.vel.add(force);
    }

    this.fetching = function() {
        return this.isFetching;
    }

    this.getBack = function() {
        this.ropeExtend = false;
    }

    this.hits = function(trash) {
        var d = dist(this.pos.x, this.pos.y, trash.position.x, trash.position.y);
        if (d < this.r + trash.radius) {
            return true;
        } else {
            return false;
        }
    }

    // if the extended rope get an trash
    this.get = function(trash) {
        shipHead = p5.Vector.fromAngle(this.heading);
        shipHead.setMag(this.r);
        shipHead.add(this.pos);
        rope = p5.Vector.fromAngle(this.heading);
        rope.setMag(this.ropeLen);
        rope.add(shipHead);

        var d = dist(rope.x, rope.y, trash.position.x, trash.position.y);
        if (d < trash.radius && this.ropeExtend) {
            return true;
        } else {
            return false;
        }
    }

    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        fill(255);
        stroke(255);
        strokeWeight(2);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        // draw the rope
        if (this.isFetching) {
            stroke(255);
            strokeWeight(5);
            line(0, -this.r, 0, -this.ropeLen);
            arc(0, -this.ropeLen - 20, 30, 30, 0, PI);
            noFill();
        }
        pop();
    }

    this.edges = function() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

    this.setRotation = function(a) {
        this.rotation = a;
    }

    this.turn = function() {
        this.heading += this.rotation;
    }

}

