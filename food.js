class Food{
    constructor(){
         this.foodStock = 0;
         this.fedTime;
         this.image = loadImage("Milk.png");
    }

    display(){
        var x = 80;
        var y = 150;

        imageMode(CENTER);
        image(this.image,720,500,70,70);

        if(this.foodStock != 0){
            for(var i = 0 ; i < this.foodStock ; i++){
                if(i % 10){
                    y = 150;
                    x = x + 25;
                }

                image(this.image,x,y,50,50);
                x = x + 15;
            }
        }
    }

    getFoodStock(){
        return this.foodStock;
    }
    
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    
    deductFood(){
        if(this.foodStock>0){ 
          this.foodStock = this.foodStock - 1; 
        }
    }
    
        getFedTime(fedTime)
    {
        this.fedTime = fedTime;
    }  
}
