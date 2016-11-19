var app = {};

app.occurrence = {
	once: 1,
	weekly: 52,
	biweekly: 26,
	monthly: 12,
	quarterly: 4
}

app.calculateBill = function(){
	var $this = $(this);
	console.log($this);
	
	app.inputValue = $this.siblings('[name=billTotal]').val();

	console.log("test: "+app.inputValue);

	app.onceTotal = app.inputValue*app.occurrence.once;
	app.weeklyTotal = app.inputValue*app.occurrence.weekly;
	app.biweeklyTotal = app.inputValue*app.occurrence.biweekly;
	app.monthlyTotal = app.inputValue*app.occurrence.monthly;
	app.quarterlyTotal = app.inputValue*app.occurrence.quarterly;

	var billArray = [];

	var billValue = $('.value');
	$('.value').each(function () {
   		billArray.push(parseFloat($(this).text()));
   			
	});
	var sumOfBills = 0;
	for (var i = 0; i <= billArray.length-1; i++){
		sumOfBills = sumOfBills + billArray[i];

		$('.totalYearly').html(`$${sumOfBills}`);	
	}
}

app.displayAmount = function(){
	var $this = $(this);
	var dropDownSelect = $this.val();

	if(dropDownSelect === "once"){
		$this.siblings('.yearlyTotal').html(`$<span class="value">${app.onceTotal}<span class="per">/year</span></span>`);
	}
	else if (dropDownSelect === 'weekly'){
		$this.siblings('.yearlyTotal').html(`$<span class="value">${app.weeklyTotal}<span class="per">/year</span></span>`);
	}
	else if (dropDownSelect === 'biweekly'){
		$this.siblings('.yearlyTotal').html(`$<span class="value">${app.biweeklyTotal}<span class="per">/year</span></span>`);
	}
	else if (dropDownSelect === 'quarterly'){
		$this.siblings('.yearlyTotal').html(`$<span class="value">${app.quarterlyTotal}<span class="per">/year</span></span>`);
	}
	else if(dropDownSelect === "monthly"){		
		$this.siblings('.yearlyTotal').html(`$<span class="value">${app.monthlyTotal}<span class="per">/year</span></span>`);

	}
	
}

app.addForm = function(){
	var $this = $(this);

	var newForm = `<form class="bill-form">
				<input class="form-input" type="text" placeholder="Expense" name="billName">	
				<input class="form-input" type="text" placeholder="Cost" name="billTotal" onkeypress="return isNumberKey(event)"><span class="per"></span>	
				<select class="cycle">
				  <option value="select">Select</option>
				  <option value="once">One time</option>
				  <option value="weekly">Weekly</option>
				  <option value="biweekly">Bi-weekly</option>
				  <option value="monthly">Monthly</option>
				  <option value="quarterly">Quarterly</option>
				</select>
				<span class="yearlyTotal"><span class="value">&nbsp;</span></span>
	   		 </form> `;

	 $('.form-container').append(newForm);  		 
}

app.init = function(){

	$('.form-container').on('keyup', '[name=billTotal]', function(){
		var $cycle = $('.cycle');
		$cycle.on('change', app.calculateBill);
		$cycle.on('change', app.displayAmount);

		if ($(this).siblings('.yearlyTotal').hasClass('highlight')){
			$cycle.change();
		}

	});

	$('.form-container').on('focusout', '[name=billTotal]', function(){
		var $cycle = $('.cycle');

		console.log($(this));
		
		if ($(this).siblings('.yearlyTotal').hasClass('highlight')){
			$cycle.change();
		}

	});
	
	$('.form-container').on('change', '.cycle', function(){
		$(this).siblings('.yearlyTotal').addClass('highlight', 500);

	});

	$('.add').on('click', function(){
		app.addForm();
	});

}

$(function(){
	app.init();
});

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}