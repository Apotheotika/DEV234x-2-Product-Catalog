(function(window){
	function myLibrary(){
		//execute code here
		var catalog = createRandomCatalog(100);
		
		return{
			searchProductByID: searchProductByID,
			searchProductsByPrice: searchProductsByPrice,
			searchProductsByType: searchProductsByType,
			searchAllProducts: searchAllProducts
		}
		
		//function definitions go here
		function createRandomProduct(){
			var typeArray = ['Electronics', 'Books', 'Clothing', 'Food'];
			var price = (Math.random()*500).toFixed(2)
			var type = typeArray[Math.floor(Math.random()*4)];
			
			return {price:price, type:type};
		}
		
		function createRandomCatalog(num){
			var catalog = [];
			for (var i=0; i<num; i++){
				var obj = createRandomProduct();
				catalog.push({id:i, price:obj.price, type: obj.type});
			}
			return catalog;
		}
		
		function searchAllProducts(){
			var promise = new Promise(function(resolve,reject){
				setTimeout(function(){
					resolve(catalog);
				}, 1000);
			});
			return promise;
		}
		
		function searchProductByID(id){
			var promise = new Promise(function(resolve,reject){
				var i = 0;
				setTimeout(function(){
					while (i<catalog.length){
						if(catalog[i].id == id){
							resolve({id:id, price:catalog[i].price, type:catalog[i].type});
						}
						i++;
					}
					reject("INvalid ID: " + id);
				}, 1000);
			});
			return promise;
		}
		
		function searchProductsByType(type){
			var promise = new Promise(function(resolve,reject){
				var i=0;
				var typeArray = [];
				var possibleTypes = ['Electronics', 'Books', 'Clothing', 'Food'];
				if(!possibleTypes.includes(type)){
					reject("INvalid type: " + type);
				}else{
					setTimeout(function(){
						while (i<catalog.length){
							if (catalog[i].type == type){
								typeArray.push({id:catalog[i].id, price:catalog[i].price, type: catalog[i].type});
							}
							i++
						}
						resolve(typeArray);
					}, 1000);
				}
			});
			return promise;
		}
		
		function searchProductsByPrice(price,difference){
			var promise = new Promise(function(resolve,reject){
				var i=0;
				var priceArray = [];
				if(!isFinite(price)){
					reject("Invalid Price: " + price);
				}else{
					setTimeout(function(){
						while(i < catalog.length){
							if (Math.abs(catalog[i].price - price) < difference){
								priceArray.push({id:catalog[i].id, price:catalog[i].price, type:catalog[i].type});
							}
							i++;
						}
						resolve(priceArray);
					}, 1000);
				}
			});
			return promise;
		}
	}
	
	if(typeof(window.api) === 'undefined'){
		window.api = myLibrary();
	}
})(window);