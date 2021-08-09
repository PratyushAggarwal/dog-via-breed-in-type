var breedlist=$("#breed");
var allowsubmit=true;

$.get("https://dog.ceo/api/breeds/list/all",function(data,status){
	let dogbreed=data.message;
	for(let breed in dogbreed){
		breedlist.append('<option value="' + breed + '">' + breed + ' </option>');
	}
});

breedlist.change(function(){
	var subbreedlist=$("#SUBbreed");
	var subbreedURL="https://dog.ceo/api/breed/" + breedlist.val() + "/list";
	$("#SUBbreed option").remove();
	$.get(subbreedURL,function(data,status){
		let dogsubbreed=data.message;
		for(let subbreed in dogsubbreed){
			subbreedlist.append('<option value="' + dogsubbreed[subbreed] + '">' + dogsubbreed[subbreed] + '</option>');
		}
	});
	console.log(subbreedURL);
});


$("form button").click(function(e){
	e.preventDefault();

	let breed=breedlist.val();
	let subbreed=$("#SUBbreed option").val();
	let url="https://dog.ceo/api/breed/" + breed;
	if(subbreed!== undefined){
		url+="/"+subbreed;
	}
	url+="/images";
	$("#images img").remove();
	
	$.get(url, function (data) {
        let imagesUrl = data.message;

        for (let imageUrl of imagesUrl) {
            $("#images").append('<img src="' + imageUrl + '" alt="' + breed + '">');
        }
    });

});