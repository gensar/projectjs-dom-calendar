window.onload = function(){
	var today = new Date();
	var monthNamesCollection = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var currentMonth = today.getMonth();
	var currentYear = today.getFullYear();
	var currentDate = today.getDate();
	var daysCollection = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var daysInMonth = new Date(currentYear, currentMonth+1, 0).getDate();
	var firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();

	var initializeCalendar = function(month, date){
		currentMonth = month;
		daysInMonth = new Date(currentYear, currentMonth+1, 0).getDate();
		firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();
	}

	for(var i = 0; i < monthNamesCollection.length; i++){
		if(currentMonth == i){
			currentMonth = {
				name:monthNamesCollection[i]
			}
		}
	}


	var yearsCollection = [];

	for(var i=1900; i <= 2100; i++){

		var yearObject = {
			name:i,
			value:i
		}

		yearsCollection.push(yearObject);

	}

	//start creating the vizualization of the calendar
	_('body').addNewElement('div');
	_('div').changeAttr('id', 'calendarWrapper');
	_('#calendarWrapper').addNewElement('div', '', 'header', 'text-align-c');
	_('#header').getSetHTML('<a id="backArrow" class="back-arrow pull-left"> << </a> <span id="monthTitle" class="text-align-c"></span><span class="right-arrow pull-right"> >> </span>' )
	_("#monthTitle").getSetText(currentMonth.name);
	/*_('#backArrow').click(function(){
		initializeCalendar(currentMonth - 1, currentDate);
	})*/
	_('#calendarWrapper').addNewElement('table', '', 'calendarTable');
	_('#calendarTable').addNewElement('tr','','daysRow')

	for(var i=0; i < daysCollection.length; i++){
		_('#daysRow').addNewElement('td', daysCollection[i]);
	}

	_('#calendarTable').addNewElement('tr','','datesFirstRow');

	var daysLeft = 6;
	var dateNumber = 1;
	var currentDateClass = null;

	for(var i = 0; i < daysCollection.length; i++) {
		if(daysLeft >= 0){
			if(i == currentDate){
				currentDateClass = 'currentDay';	
			}
			if(i != firstDayOfMonth && _('#firstDayOfMonth').els.length == 0){
				_('#datesFirstRow').addNewElement('td','');
				daysLeft--;
			}else if(i == firstDayOfMonth){
				_('#datesFirstRow').addNewElement('td', dateNumber, 'firstDayOfMonth', currentDateClass);
				daysLeft--;
				dateNumber++;
			}else if(i != firstDayOfMonth && _('#firstDayOfMonth')){
				_('#datesFirstRow').addNewElement('td', dateNumber, '', currentDateClass);
				daysLeft--;
				dateNumber++;
			}

		}
	}

		var daysLeft = 6;
		var secondDaysLeft = 6;
		var thirdDaysLeft = 6;

		_('#calendarTable').addNewElement('tr','','datesSecondRow');
		for(var i=0; i <= daysInMonth; i++){
			currentDateClass = null;
			if(i == currentDate){
				currentDateClass = 'currentDay';	
			}

			if(i >= dateNumber){
				if(daysLeft >= 0){
					_('#datesSecondRow').addNewElement('td', i, '', currentDateClass);
					daysLeft--;
					dateNumber++;
				}else{
					if(_('#datesThirdRow').els.length <=0){
						_('#calendarTable').addNewElement('tr', '', 'datesThirdRow');
					}
					if(secondDaysLeft >= 0){
						_('#datesThirdRow').addNewElement('td', i, '', currentDateClass);
						secondDaysLeft--;
						dateNumber++;
					}else{	
						if(_('#datesFourthRow').els.length <=0){
							_('#calendarTable').addNewElement('tr', '', 'datesFourthRow');
						}
						
						if(thirdDaysLeft >= 0){
							_('#datesFourthRow').addNewElement('td', i, '', currentDateClass);
							thirdDaysLeft--;
							dateNumber++;
						}else{
							if(_('#datesFifthRow').els.length <=0){
								_('#calendarTable').addNewElement('tr', '', 'datesFifthRow');
							}
							_('#datesFifthRow').addNewElement('td', i, '', currentDateClass);
						}
					}
				}
			}
		}




		
}