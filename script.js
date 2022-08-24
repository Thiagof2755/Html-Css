(function(){
	var cnv = document.querySelector("canvas");
	var ctx = cnv.getContext("2d");
	
	//largura e altura do canvas
	var HEIGHT = cnv.height, WIDTH = cnv.width;
	
	//variáveis para mover o player
	var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
	var mvLeft = mvUp = mvRight = mvDown = false;
	
	var tileSize = 32;
	
	//objeto player
	var player = {
		x: tileSize+2,
		y: tileSize+2,
		width: 28,
		height: 28,
		speed: 2
	};
	
	var maze = [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
		[1,1,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1],
		[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1],
		[1,0,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];
	
	//entradas das setas do teclado
	window.addEventListener("keydown",keydownHandler,false);
	window.addEventListener("keyup",keyupHandler,false);
	
	function keydownHandler(e){
		var key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = true;
				break;
			case RIGHT:
				mvRight = true;
				break;
			case UP:
				mvUp = true;
				break;
			case DOWN:
				mvDown = true;
				break;
		}
	}
	
	function keyupHandler(e){
		var key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = false;
				break;
			case RIGHT:
				mvRight = false;
				break;
			case UP:
				mvUp = false;
				break;
			case DOWN:
				mvDown = false;
				break;
		}
	}
	
	function update(){
		//movimento do player
		if(mvLeft && !mvRight){
			player.x -= player.speed;
		} else 
		if(mvRight && !mvLeft){
			player.x += player.speed;
		}
		if(mvUp && !mvDown){
			player.y -= player.speed;
		} else 
		if(mvDown && !mvUp){
			player.y += player.speed;
		}
	}
	
	function render(){
		ctx.clearRect(0,0,WIDTH,HEIGHT);
		ctx.save();
		for(var row in maze){
			for(var column in maze){
				var tile = maze[row][column];
				if(tile === 1){
					var x = column*tileSize;
					var y = row*tileSize;
					ctx.fillRect(x,y,tileSize,tileSize);
				}
			}
		}
		
		ctx.fillStyle = "#00f";
		ctx.fillRect(player.x,player.y,player.width,player.height);
		
		ctx.restore();
	}
	
	function loop(){
		update();
		render();
		requestAnimationFrame(loop,cnv);
	}
	
	requestAnimationFrame(loop,cnv);
}());
