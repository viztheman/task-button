'use strict';

$(function() {
	$('#get-task').click(async function() {
		let json;

		try {
			const response = await fetch('/task');
			json = await response.json();
		}
		catch (e) {
			console.error(e);
			return;
		}

		const $taskPanel = $('#task-panel');
		const $allDonePanel = $('#all-done-panel');

		$('#good-job-panel').addClass('d-none');

		if (json.task) {
			$('#id').val(json.task.id);
			$('#task').text(json.task.title);
			$taskPanel.removeClass('d-none');
			$allDonePanel.addClass('d-none');
		}
		else {
			$taskPanel.addClass('d-none');
			$allDonePanel.removeClass('d-none');
		}
	});

	$('#i-did-this').click(async function() {
		let json;

		const id = $('#id').val();

		try {
			const response = await fetch(`/complete/${id}`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'}
			});
			json = await response.json();

			if (!json.success)
				throw new Error('Internal failure: Couldn\'t find task to complete.');
		}
		catch (e) {
			console.error(e);
		}

		$('#task-panel').addClass('d-none');
		$('#good-job-panel').removeClass('d-none');
		$('#all-done-panel').addClass('d-none');
	});
});
