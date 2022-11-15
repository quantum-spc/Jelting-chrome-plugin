function show() {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  new Notification(hour + time[2] + ' ' + period, {
    icon: 'jelly.png',
    body: 'The chatting has arrived.'
  });
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}

// 5초마다 체크박스에 체크 되어 있을경우 갱신
setInterval(function() {
	if (JSON.parse(localStorage.isActivated)) {
		getChattingSync();
	}
}, 5000);

// 신규 채팅이 있으면 알람을 띄운다.
function getChattingSync() {
	$.ajax({
		url:'http://elzz.shop/MODEL/ChromePluginAlarm',
		dataType:'json',
		success:function(data) {
			if (data != 0) {
				show();
			}
		},
		error:function(data) {
			alert('error');
			console.log(data);
		}
	});
}
