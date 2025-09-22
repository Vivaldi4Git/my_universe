class Vehicle
{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.home = this.pos.copy();
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.target = p5.Vector.random2D();
        this.max_speed = 0.4;
        this.max_force = 0.1;
    }
    update(){
        this.vel.add(this.acc);
        this.vel.limit(this.max_speed);
        this.pos.add(this.vel);
        this.acc.setMag(0);
    }
    show(){
        stroke(255);
        strokeWeight(8);
        point(this.pos.x, this.pos.y);
    }
    applyForce(force){
        this.acc.add(force);
    }
    flee(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let steering = createVector(0, 0);
        desired.setMag(this.max_speed);
        desired.mult(-1);
        steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.max_force);
        this.applyForce(steering);
    }
    seek(target){
        let desired = p5.Vector.sub(target, this.pos);
        let desired_speed = this.max_speed;
        
        desired.setMag(desired_speed);
        let steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.max_force);
        this.applyForce(steering);
    }
    arrive(target){
        let desired = p5.Vector.sub(target, this.pos);
        let desired_speed = this.max_speed;
        let distance = desired.mag();
        if (distance < 20) {
            desired_speed = map(distance, 0, 20, 0, this.max_speed);
        }
        desired.setMag(desired_speed);
        let steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.max_force);
        this.applyForce(steering);
         
    }
}