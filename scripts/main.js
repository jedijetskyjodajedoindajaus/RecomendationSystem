window.addEventListener('load', () => {

    getData();

    async function getData() {
        const response = await fetch('../resources/baseDeDatosUsuarios.csv');
        const responseTravels = await fetch('../resources/travelDataBase.csv');

        const data = await response.text();
        const dataTravel=await responseTravels.text();
        const rows = data.split('\n').slice(1);
        const rowsT = dataTravel.split('\n').slice(1);

        const dataObjectList = [];
        const dataObjectListTravel = [];


        const result = document.querySelector('.images');

        const moneyRange = document.getElementById('money');
        const hostalRange = document.getElementById('hostal');
        const timeRange = document.getElementById('time');
        const busRange = document.getElementById('bus');
        const climaRange = document.getElementById('weater');
        const foodRange = document.getElementById('food');

        const imagenRecom =document.getElementById('img_recomedation');
        const imagenRecom2 =document.getElementById('img_recomedation2');
        const imagenRecom3 =document.getElementById('img_recomedation3');
        const imagenRecom4 =document.getElementById('img_recomedation4');
        const imagenRecom5 =document.getElementById('img_recomedation5');
        const imagenRecomIdeal =document.getElementById('destino__ideal');

        const amigoInicial1 =document.getElementById('amigo_item1');
        const amigoInicial2 =document.getElementById('amigo_item2');
        const amigoInicial3 =document.getElementById('amigo_item3');

        const amigoText1 =document.getElementById('amigoText1');
        const amigoText2 =document.getElementById('amigoText2');
        const amigoText3 =document.getElementById('amigoText3');


        moneyRange.addEventListener('input', updateComparison);
        hostalRange.addEventListener('input', updateComparison);
        timeRange.addEventListener('input', updateComparison);
        busRange.addEventListener('input', updateComparison);
        climaRange.addEventListener('input', updateComparison);
        foodRange.addEventListener('input', updateComparison);

        rowsT.forEach((e) => {
            const values = e.split(',');
            values[3] = parseInt(values[3]);

            const dataObject = {
                name: values[0],
                money: values[1],
                hostal: values[2],
                time: values[3],
                bus: values[4],
                clima: values[5],
                food: values[6],

            }
            dataObjectListTravel.push(dataObject);

        }); 

        rows.forEach((e) => {
            const values = e.split(',');
            values[3] = parseInt(values[3]);

            const dataObject = {
                name: values[0],
                money: values[1],
                hostal: values[2],
                time: values[3],
                bus: values[4],
                clima: values[5],
                food: values[6],

            }

            /*
            const option = document.createElement('option');
            option.setAttribute('value', values[0]);
            option.innerHTML = values[0];

            const image = document.createElement('img');
            image.setAttribute('src', './resources/img/'+dataObject.name+'.jpg');
            image.dataset.value = dataObject.name;
            
            result.appendChild(image);

            select.appendChild(option);*/

            dataObjectList.push(dataObject);

        }); 

        /*
        var listAltura=[];
        var listPeso=[];
        var listMascotas=[];
        var listEdad=[];

        for(var i=0;i<dataObjectList.length;i++){
            listAltura.push(dataObjectList[i].height);
            listPeso.push(dataObjectList[i].weight);
            listMascotas.push(dataObjectList[i].pets);
            listEdad.push(dataObjectList[i].age);
        }


        var elMayorAltura=Math.max(...listAltura);
        var elMayorPeso=Math.max(...listPeso);
        var elMayorMascotas=Math.max(...listMascotas);
        var elMayorEdad=Math.max(...listEdad);
        
        var elMenorAltura= Math.min(...listAltura);
        var elMenorPeso= Math.min(...listPeso);
        var elMenorMascotas= Math.min(...listMascotas);
        var elMenorEdad= Math.min(...listEdad);    
*/
        updateComparison();
        

        function updateComparison() {
              
        var usuarioBuscador = {
            money: moneyRange.value,
            hostal:  hostalRange.value,
            time: timeRange.value,
            bus: busRange.value,
            clima: climaRange.value,
            food: foodRange.value,
        }


        console.log(climaRange.value);
   
            let selected=usuarioBuscador;

            let results = [];

            //PARA PERSONAS
            dataObjectList.forEach((e) => {
                const productoPunto = ((selected.money* e.money) + (selected.hostal* e.hostal)+ (selected.time* e.time)+(selected.bus* e.bus)+(selected.clima* e.clima)+(selected.food* e.food));
                const magA = Math.sqrt((selected.money * selected.money)+(selected.hostal * selected.hostal)+(selected.time * selected.time)+(selected.bus * selected.bus)+(selected.clima * selected.clima)+(selected.food * selected.food));
                const magB = Math.sqrt((e.money * e.money)+(e.hostal * e.hostal)+(e.time * e.time)+(e.bus * e.bus)+(e.clima * e.clima)+(e.food * e.food));
    
                let resultValue;

                if(magA > 0 && magB > 0) {
                    resultValue = productoPunto / (magA * magB);
                } else {
                    resultValue = 0;
                }

               // console.log(e.name, productoPunto, magA, magB, resultValue);

                results.push({
                    name: e.name,
                    result: resultValue,
                    money: e.money,
                    hostal: e.hostal,
                    time: e.time,
                    bus: e.bus,
                    clima: e.clima,
                    food: e.food
                });
            });

            let resultsTravel = [];

            //PARA DESTINOS
            dataObjectListTravel.forEach((e) => {
                const productoPunto = ((selected.money* e.money) + (selected.hostal* e.hostal)+ (selected.time* e.time)+(selected.bus* e.bus)+(selected.clima* e.clima)+(selected.food* e.food));
                const magA = Math.sqrt((selected.money * selected.money)+(selected.hostal * selected.hostal)+(selected.time * selected.time)+(selected.bus * selected.bus)+(selected.clima * selected.clima)+(selected.food * selected.food));
                const magB = Math.sqrt((e.money * e.money)+(e.hostal * e.hostal)+(e.time * e.time)+(e.bus * e.bus)+(e.clima * e.clima)+(e.food * e.food));
    
                let resultValueTravel;

                if(magA > 0 && magB > 0) {
                    resultValueTravel = productoPunto / (magA * magB);
                } else {
                    resultValueTravel = 0;
                }


               resultsTravel.push({
                    name: e.name,
                    result: resultValueTravel,
                    money: e.money,
                    hostal: e.hostal,
                    time: e.time,
                    bus: e.bus,
                    clima: e.clima,
                    food: e.food
                });
            });


            results.sort(orderResults);

            resultsTravel.sort(orderResults)
            
            amigoInicial1.innerHTML=results[0].name.substring(0, 2);
            amigoInicial2.innerHTML=results[1].name.substring(0, 2);
            amigoInicial3.innerHTML=results[2].name.substring(0, 2);

            amigoText1.innerHTML=results[0].name;
            amigoText2.innerHTML=results[1].name;
            amigoText3.innerHTML=results[2].name;
            for(var i=0;i<3;i++){
                console.log(results[i].name,results[i].result);
            }

            console.log(imagenRecom.src);
            imagenRecom.src="/imagenes/"+resultsTravel[0].name+'.png';
            imagenRecom2.src="/imagenes/"+resultsTravel[0].name+'.png';
            imagenRecom3.src="/imagenes/"+resultsTravel[0].name+'.png';
            imagenRecom4.src="/imagenes/"+resultsTravel[0].name+'.png';
            imagenRecom5.src="/imagenes/"+resultsTravel[0].name+'.png';
            imagenRecomIdeal.src="/imagenes/"+resultsTravel[0].name+'Ideal.png';
            
           
            console.log("Tu destino soñado es:  "+resultsTravel[0].name);
        }

        function orderResults(a, b) {
            if(a.result > b.result) {
                return -1;
            } else if(a.result < b.result) {
                return 1;
            } else {
                return 0;
            }
        }
/*
        function updateComparison() {
            
            let selected;
            dataObjectList.forEach((e) => {
                if(select.value == e.name) selected = e;
            });

            let selected=usuarioBuscador;

            let results = [];
            dataObjectList.forEach((e) => {
                const productoPunto = (((selected.age-elMenorEdad/elMayorEdad) * moneyRange.value) * ((e.age-elMenorEdad/elMayorEdad) * moneyRange.value)) + (((selected.weight-elMenorPeso/elMayorPeso) * timeRange.value) * ((e.weight-elMenorPeso/elMayorPeso) * timeRange.value)) + (((selected.height-elMenorAltura/elMayorAltura) * hostalRange.value) * ((e.height-elMenorAltura/elMayorAltura) * hostalRange.value)) + (((selected.pets-elMenorMascotas/elMayorMascotas) * busRange.value) * ((e.pets-elMenorMascotas/elMayorMascotas) * busRange.value));
                const magA = Math.sqrt((((selected.age-elMenorEdad/elMayorEdad) * moneyRange.value) * ((selected.age-elMenorEdad/elMayorEdad) * moneyRange.value)) + (((selected.weight-elMenorPeso/elMayorPeso) * timeRange.value) * ((selected.weight-elMenorPeso/elMayorPeso) * timeRange.value)) + (((selected.height-elMenorAltura/elMayorAltura) * hostalRange.value) * ((selected.height-elMenorAltura/elMayorAltura)  * hostalRange.value)) + (((selected.pets-elMenorMascotas/elMayorMascotas) * busRange.value) * ((selected.pets-elMenorMascotas/elMayorMascotas) * busRange.value)));
                const magB = Math.sqrt((((e.age-elMenorEdad/elMayorEdad) * moneyRange.value) * ((e.age-elMenorEdad/elMayorEdad) * moneyRange.value)) + (((e.weight-elMenorPeso/elMayorPeso) * timeRange.value) * ((e.weight-elMenorPeso/elMayorPeso) * timeRange.value)) + (((e.height-elMenorAltura/elMayorAltura) * hostalRange.value) * ((e.height-elMenorAltura/elMayorAltura) * hostalRange.value)) + (((e.pets -elMenorMascotas/elMayorMascotas)* busRange.value) * ((e.pets -elMenorMascotas/elMayorMascotas) * busRange.value)));
    
                let resultValue;

                if(magA > 0 && magB > 0) {
                    resultValue = productoPunto / (magA * magB);
                } else {
                    resultValue = 0;
                }

                console.log(e.name, productoPunto, magA, magB, resultValue);

                results.push({
                    name: e.name,
                    result: resultValue,
                    edad: e.age,
                    altura: e.height,
                    mascotas: e.pets,
                    peso: e.weight
                });
            });

            results.sort(orderResults);
            
            const images = document.querySelectorAll('img');

            results.forEach((e, index) => {
                let selectedImg;
                images.forEach((img) => {
                    if(img.dataset.value == e.name) selectedImg = img;
                });
                selectedImg.style.left = (3 + (51 * index)) + 'px';

                
                selectedImg.style.width = 50*e.result + 'px';
                selectedImg.style.height = 50*e.result  + 'px';

            });
        }

        function orderResults(a, b) {
            if(a.result > b.result) {
                return -1;
            } else if(a.result < b.result) {
                return 1;
            } else {
                return 0;
            }
        }

     */




        /*const productoPunto = (person1.age * person2.age) + (person1.weight * person2.weight) + (person1.height * person2.height) + (person1.pets * person2.pets);
        const magA = Math.sqrt((person1.age*person1.age) + (person1.weight*person1.weight) + (person1.height*person1.height) + (person1.pets*person1.pets));
        const magB = Math.sqrt((person2.age*person2.age) + (person2.weight*person2.weight) + (person2.height*person2.height) + (person2.pets*person2.pets));
    
        const resultValue = productoPunto / (magA * magB);
        console.log(resultValue);

        result.innerHTML = resultValue;*/
        
    } 
});