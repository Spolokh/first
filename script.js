jQuery(function($) 
{
	$('#registration').submit(function(e)
	{
		var	data = new FormData(this);
		var ajax = getXmlHttp();

		ajax.onreadystatechange = function()
		{
			if ( this.readyState == 4 ) {
				if ( this.status == 200 ) {
					$('#result').html(this.responseText);
					$('input[type="reset"]').click();
				}

				if ( this.status == 500 ) {
					$('#result').html(this.responseText);
				}
			} 
		};

		ajax.open ('POST', '/ajax/registration'); 
		ajax.setRequestHeader ('Cache-Control', 'no-cache');
		ajax.setRequestHeader ("X-Requested-With", "XMLHttpRequest");
		ajax.send(data); e.preventDefault();
	});

	$('#addPhone').submit(function(e)
	{
		var	data = new FormData(this);
		var ajax = getXmlHttp();
		var form = $(this);
		var click = form.find('button[type="submit"]');
			click.text('Wait...').attr('disabled', true);

		ajax.onreadystatechange = function()
		{
			if ( this.readyState == 4 )
			{
				if ( this.status == 200 )
				{
					var json = JSON.parse(this.responseText);
					jsonParse(json);
					form[0].reset();
				}

				if ( this.status == 500 )
				{
					alert(this.responseText);
				}
				click.text('Добавить').attr('disabled', null);
			}
		};

		ajax.open('POST', '/ajax/addphone'); 
		ajax.setRequestHeader('Cache-Control', 'no-cache');
		ajax.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		ajax.send(data); e.preventDefault();
	});

	$('#editPhone').submit (function(e)
	{
		var ajax = getXmlHttp();
		//var form = $(this);
		var	form = new FormData(this);
		var task = $('input.checkdelTask:checked');

		if ( !task || typeof task === "undefined" ) {
			alert('Not checked');
		}

		var click = $(this).find('button[type="submit"]');
			click.text('Wait...').attr('disabled', true);

		if ( !confirm('Вы действительно хотите удалить выбранное?') )
		{
			return;
		}

		ajax.onreadystatechange = function()
		{
			if ( this.readyState == 4 )
			{
				if ( this.status == 200 )
				{
					task.parent().parent().parent().hide();
				}
				if ( this.status == 500 )
				{
					alert(this.responseText);
				}

				click.text('Удалить').attr('disabled', null);
			}
		};

		ajax.open ('POST', '/ajax/delbook'); 
		ajax.setRequestHeader ('Cache-Control', 'no-cache');
		ajax.setRequestHeader ("X-Requested-With", "XMLHttpRequest");
		ajax.send(form); e.preventDefault();
	});


	$('#myTab a').on('click', function (e) {
		e.preventDefault()
		$(this).tab('show')
	});

	$('input[type="tel"]').mask("+7 (999) 999-99-99");
});

function jsonParse(j) {
    var out = '';
    var i;
    for(i = 0; i < j.length; i++) {
		out+= '<tr>';
		out+= '<td>' + j[i].id + '</td>';
		out+= '<td>' + j[i].name + '</td>';
		out+= '<td>' + j[i].mail + '</td>';
		out+= '<td>' + j[i].phone + '</td>';
		out+= '<td><figure><img class="img-circle" src="/img/' + j[i].icon + '" alt="'+j[i].name+'" /><figure></td>';
		out+= '<td><label class="option"><input name="item[]" type="checkbox" class="checkdelTask" value="'+j[i].id+'"/><span class="checkbox"></span></label></td>';
		out+= '</tr>';
	}
	$('#tbody').html(out);
	$('#myTab li:first-child a').tab('show');
}
