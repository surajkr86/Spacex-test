function FetachData(base_url){
    var base_url = "https://api.spaceXdata.com/v3/launches?limit=100";
    let year_val ="";
    let launch_val ="";
    let land_val ="";
    
    $(".year_btn").each(function() {
    	if($(this).hasClass('active')){
    		year_val = $(this).html().trim().toLowerCase();
    	}
     });

$(".launch_btn").each(function(){
    if($(this).hasClass('active')){
        launch_val = $(this).html().trim().toLowerCase();
    }
});

$(".land_btn").each(function(){
if($(this).hasClass('active')){
    land_val = $(this).html().trim().toLowerCase();
}
});

 if(year_val!='')
 {
    base_url = base_url+'&launch_year='+year_val;
 }

 if(launch_val!='')
 {
    base_url = base_url+'&launch_success='+launch_val.trim().toLowerCase();
 }

 if(land_val!='')
 {
    base_url = base_url+'&land_success='+land_val.trim().toLowerCase();
 }

//base_url = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch_val}&land_success=${land_val}&launch_year=${year_val}`;
console.log(base_url);

    fetch(base_url)
    .then(response => response.json()) 
    .then(response => {
        if (response) { 
            loadindData(); 
        } 
        showData(response);
    });

}

FetachData();



function loadindData() { 
    document.getElementById('loading').style.display = 'block'; 
}

function showData(data) { 
    var card = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        card += `
            <div class="card">
                <div class="card-img"><img src=${element.links.mission_patch} alt="" srcset="">
                <span class="card-title"><a href="">${element.mission_name} #<span>${element.flight_number}</span></a></span>
                </div>
                <div class="card-body">
                    
                    <p><strong>Mission Ids: </strong>  ${element.mission_id}  </p>
                    <p><strong>Launch Year: </strong>  ${element.launch_year} </p>
                    <p><strong>Success Launch: </strong> <span class="badge ${element.launch_success}">${element.launch_success}</span </p>
                    <p><strong>Successful Landing: </strong> <span class="badge ${element.rocket.first_stage.cores[0].land_success}">${element.rocket.first_stage.cores[0].land_success}</span </p>
                </div>
            </div>
        `;
        document.getElementById('datashow').innerHTML=card;
        
    }
    
}

(function(){
    // years Button
    $(".year_btn").click(function(){
        if($(this).hasClass('active'))
        {
         $('.year_btn').removeClass('active');	
        }
        else{
          $('.year_btn').removeClass('active');
       $( this ).addClass('active');	
        }
        FetachData();
    });
    
    // launching success Button
    $(".launch_btn").click(function(){
        if($(this).hasClass('active'))
        {
         $('.launch_btn').removeClass('active');	
        }
        else{
          $('.launch_btn').removeClass('active');
       $( this ).addClass('active');	
        }
        FetachData();
    });

    // landing success Button
    $(".land_btn").click(function(){
        if($(this).hasClass('active'))
        {
         $('.land_btn').removeClass('active');	
        }
        else{
          $('.land_btn').removeClass('active');
       $( this ).addClass('active');	
        }
        FetachData();
    });


})();
