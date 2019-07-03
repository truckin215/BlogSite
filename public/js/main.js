const taskItems = document.getElementsByTagName('li');

for (let i = 0; i < taskItems.length; i++) {
    const element = taskItems[i];
    element.addEventListener('dblclick', function(){
        fetch('/Post/' + element.id, {method: "delete"} )
        .then(function(res){
            // console.log(res.json());
            return res.json()
        })
        .then(function(data){
            location.reload();
        })
    }) 
}